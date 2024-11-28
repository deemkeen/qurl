package main

import (
	"embed"
	"flag"
	"fmt"
	"io"
	"math/rand"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"time"

	"github.com/skip2/go-qrcode"
)

//go:embed templates/upload.html
var templates embed.FS

const (
	letters      = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	suffixLength = 10
	defaultPort  = ":8081"
	ipPrefix     = "192.168." // try to guess the local net prefix
	uploadedMsg  = "File uploaded successfully"
)

type QRCode struct {
	size    int
	modules [][]bool
}

func main() {
	helpFlag := flag.Bool("h", false, "Show help message")
	shareFile := flag.String("f", "", "File to share")
	shareText := flag.String("t", "", "Text to share")
	flag.Parse()

	if *helpFlag {
		flag.Usage()
		os.Exit(0)
	}

	// If sharing text less than 200 chars, use QR code directly
	if *shareText != "" && len(*shareText) < 200 {
		qr, err := qrcode.New(*shareText, qrcode.Low)
		if err != nil {
			fmt.Printf("Failed to generate QR code: %v\n", err)
			os.Exit(1)
		}

		clearScreen()
		printQRCode(&QRCode{
			size:    len(qr.Bitmap()),
			modules: convertBitmap(qr.Bitmap()),
		})
		return
	}

	done := make(chan bool)

	// Generate random suffix
	src := rand.NewSource(time.Now().UnixNano())
	rand.New(src)

	b := make([]byte, suffixLength)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	randomSuffix := string(b)

	// Set up HTTP server
	http.HandleFunc("/"+randomSuffix, func(w http.ResponseWriter, r *http.Request) {
		if *shareFile != "" {
			file, err := os.Open(*shareFile)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			defer file.Close()

			w.Header().Set("Content-Disposition", "attachment; filename="+filepath.Base(*shareFile))
			io.Copy(w, file)
			clearScreen()
			fmt.Println(uploadedMsg)
			done <- true
			return
		} else if *shareText != "" {
			w.Write([]byte(*shareText))
			clearScreen()
			done <- true
			return
		}

		if r.Method == "GET" {
			template, err := templates.ReadFile("templates/upload.html")
			if err != nil {
				http.Error(w, "Failed to load template", http.StatusInternalServerError)
				return
			}
			w.Write(template)
		} else if r.Method == "POST" {
			if text := r.FormValue("text"); text != "" {
				clearScreen()
				fmt.Println(text)
				done <- true
				return
			}

			file, header, err := r.FormFile("file")
			if err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}
			defer file.Close()

			dst, err := os.Create(filepath.Join(".", header.Filename))
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			defer dst.Close()

			_, err = io.Copy(dst, file)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			clearScreen()
			fmt.Println(uploadedMsg)
			done <- true
		}
	})

	// Get local networks IP address or use environment variable
	var localIP string
	if envHost := os.Getenv("HOST_ADDR"); envHost != "" {
		localIP = envHost
	} else {
		addrs, err := net.InterfaceAddrs()
		if err != nil {
			fmt.Printf("Failed to get interface addresses: %v\n", err)
			os.Exit(1)
		}

		for _, addr := range addrs {
			if ipnet, ok := addr.(*net.IPNet); ok {
				ipStr := ipnet.IP.String()
				if len(ipStr) >= 8 && ipStr[:8] == ipPrefix {
					if ipnet.IP.To4() != nil {
						localIP = ipStr
						break
					}
				}
			}
		}

		if localIP == "" {
			fmt.Println("Could not find local networks IP address")
			os.Exit(1)
		}
	}

	// Get port from env var or use default
	port := defaultPort
	if envPort := os.Getenv("HOST_PORT"); envPort != "" {
		port = ":" + envPort
	}

	// Start server in goroutine
	go func() {
		if err := http.ListenAndServe(port, nil); err != nil {
			fmt.Printf("Failed to start server: %v\n", err)
			os.Exit(1)
		}
	}()

	url := fmt.Sprintf("http://%s%s/%s", localIP, port, randomSuffix)
	qr, err := qrcode.New(url, qrcode.Low)
	if err != nil {
		fmt.Printf("Failed to generate QR code: %v\n", err)
		os.Exit(1)
	}

	clearScreen()
	printQRCode(&QRCode{
		size:    len(qr.Bitmap()),
		modules: convertBitmap(qr.Bitmap()),
	})

	<-done
	os.Exit(0)
}

func convertBitmap(bitmap [][]bool) [][]bool {
	size := len(bitmap)
	modules := make([][]bool, size)
	for i := range modules {
		modules[i] = make([]bool, size)
		for j := range modules[i] {
			modules[i][j] = bitmap[i][j]
		}
	}
	return modules
}

func printQRCode(qr *QRCode) {
	for i := 0; i < qr.size; i++ {
		for j := 0; j < qr.size; j++ {
			if qr.modules[i][j] {
				fmt.Print("██")
			} else {
				fmt.Print("  ")
			}
		}
		fmt.Println()
	}
}

func clearScreen() {
	switch runtime.GOOS {
	case "linux", "darwin":
		cmd := exec.Command("clear")
		cmd.Stdout = os.Stdout
		cmd.Run()
	case "windows":
		cmd := exec.Command("cmd", "/c", "cls")
		cmd.Stdout = os.Stdout
		cmd.Run()
	}
}
