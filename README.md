# qURL

qURL is a simple command-line tool that allows you to quickly transfer files or text between devices using QR codes.

## Features

- Bi-directional file and text sharing
- Easy file upload via web interface
- Direct QR code generation for short text
- No app installation required on mobile device
- Clean and responsive web interface
- Cross-platform (Windows, macOS, Linux)

## Requirements

- Go 1.23 or higher

## Installation

```bash
# Clone the repository
git clone <this repo>

cd qurl

# Build the binary
./build.sh

# Optional: Copy binary to your PATH to run from anywhere
sudo cp qurl /usr/local/bin/
```

## Usage

### Receiving Files/Text

1. Run the `qurl` binary in your terminal:
```bash
./qurl
```

2. A QR code will appear in your terminal

3. Scan the QR code with your mobile device's camera

4. Your browser will open with two options:
   - Upload a file by clicking "Choose File"
   - Share text by typing in the text area

5. Click "Upload" to send the file or text to your terminal

### Sharing Files/Text

Share a file:
```bash
./qurl -f path/to/file.txt
```

Share text (two methods):
```bash
# For text under 200 characters - generates direct QR code
./qurl -t "Quick message to share"

# For longer text - creates temporary web server
./qurl -t "$(cat long_text.txt)"
```

## Environment Variables

- `HOST_ADDR`: Set a specific IP address or hostname (default: auto-detect)
- `HOST_PORT`: Set a specific port (default: 8081)

Example:
```bash
HOST_ADDR=192.168.1.100 HOST_PORT=3000 ./qurl
```

## Notes

- The server automatically shuts down after successful transfer
- The upload URL contains a random suffix for basic security
- Works on any device with a browser and camera
- No need to be on the same Wi-Fi network as long as the device can reach the host IP
- Short text messages (<200 chars) are encoded directly in QR code without server
- Longer text and files are shared via temporary web server

## Similar Projects

After development of qURL, similar projects were discovered:
- [qrcp](https://github.com/claudiodangelis/qrcp.git) - A tool for transferring files over Wi-Fi from your computer to your mobile device by scanning a QR code

## Credits

QR code generation is powered by [github.com/skip2/go-qrcode](https://github.com/skip2/go-qrcode)

## License

MIT License
