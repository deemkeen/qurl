import './style.css'

document.querySelector('#app').innerHTML = `
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">
        <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
          <rect x="10" y="10" width="80" height="80" fill="currentColor" rx="8"/>
          <rect x="20" y="20" width="60" height="60" fill="white" rx="4"/>
          <rect x="30" y="30" width="40" height="40" fill="currentColor" rx="2"/>
        </svg>
        <span>qURL</span>
      </div>
      <a href="https://github.com/yourusername/qurl" class="github-link" target="_blank">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub
      </a>
    </div>
  </nav>

  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">
          Transfer files & text
          <span class="gradient-text">instantly</span>
        </h1>
        <p class="hero-subtitle">
          Share files and text between devices using QR codes. No apps, no accounts, no hassle. Just scan and go.
        </p>
        <div class="cta-buttons">
          <a href="#install" class="btn btn-primary">Get Started</a>
          <a href="#features" class="btn btn-secondary">Learn More</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="qr-demo">
          <svg viewBox="0 0 200 200" class="qr-code">
            <rect width="200" height="200" fill="#fff" rx="8"/>
            ${generateQRPattern()}
          </svg>
          <div class="scan-line"></div>
        </div>
      </div>
    </div>
  </section>

  <section id="features" class="features">
    <div class="container">
      <h2 class="section-title">Why qURL?</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </div>
          <h3>Bi-directional Transfer</h3>
          <p>Send files from your computer to mobile or receive them from mobile to computer. Works both ways seamlessly.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
          </div>
          <h3>No App Required</h3>
          <p>Just scan the QR code with your phone's camera. No need to install any additional apps or software.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h3>Lightning Fast</h3>
          <p>Direct peer-to-peer transfer over your local network. No cloud uploads, no waiting. Instant transfer.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3>Private & Secure</h3>
          <p>Files never leave your local network. Everything stays between your devices. Your data, your control.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h3>Any File Type</h3>
          <p>Share documents, images, videos, code, or plain text. No restrictions on file types or formats.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <h3>Cross-Platform</h3>
          <p>Works on Windows, macOS, and Linux. Transfer between any combination of devices and operating systems.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="how-it-works">
    <div class="container">
      <h2 class="section-title">How It Works</h2>
      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Run qURL</h3>
          <p>Open your terminal and run <code>qurl</code> to start sharing, or use <code>qurl -f filename</code> to share a specific file</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-number">2</div>
          <h3>Scan QR Code</h3>
          <p>A QR code appears in your terminal. Scan it with your phone's camera to open the transfer page</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-number">3</div>
          <h3>Transfer & Done</h3>
          <p>Upload files or share text instantly. The server automatically closes after successful transfer</p>
        </div>
      </div>
    </div>
  </section>

  <section id="install" class="install">
    <div class="container">
      <h2 class="section-title">Installation</h2>
      <div class="install-grid">
        <div class="install-card">
          <h3>From Source</h3>
          <div class="code-block">
            <code>git clone &lt;repository&gt;<br/>cd qurl<br/>./build.sh<br/>sudo cp qurl /usr/local/bin/</code>
          </div>
        </div>
        <div class="install-card">
          <h3>Quick Usage</h3>
          <div class="usage-examples">
            <div class="usage-item">
              <code>qurl</code>
              <span>Start server to receive files/text</span>
            </div>
            <div class="usage-item">
              <code>qurl -f file.txt</code>
              <span>Share a specific file</span>
            </div>
            <div class="usage-item">
              <code>qurl -t "Hello!"</code>
              <span>Share text message</span>
            </div>
            <div class="usage-item">
              <code>qurl -h</code>
              <span>Show help message</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <p>Built with Go. Powered by QR codes.</p>
      <p class="footer-links">
        <a href="https://github.com/yourusername/qurl">GitHub</a>
        <span>•</span>
        <a href="https://github.com/yourusername/qurl/issues">Issues</a>
        <span>•</span>
        <a href="https://github.com/yourusername/qurl/blob/main/LICENSE">License</a>
      </p>
    </div>
  </footer>
`

function generateQRPattern() {
  const size = 21;
  const cellSize = 200 / size;
  let pattern = '';

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (Math.random() > 0.5) {
        pattern += `<rect x="${j * cellSize}" y="${i * cellSize}" width="${cellSize}" height="${cellSize}" fill="#0ea5e9"/>`;
      }
    }
  }

  const finderSize = cellSize * 7;
  pattern += `
    <rect x="0" y="0" width="${finderSize}" height="${finderSize}" fill="white" stroke="#0ea5e9" stroke-width="2"/>
    <rect x="${cellSize}" y="${cellSize}" width="${cellSize * 5}" height="${cellSize * 5}" fill="white" stroke="#0ea5e9" stroke-width="2"/>
    <rect x="${cellSize * 2}" y="${cellSize * 2}" width="${cellSize * 3}" height="${cellSize * 3}" fill="#0ea5e9"/>

    <rect x="${200 - finderSize}" y="0" width="${finderSize}" height="${finderSize}" fill="white" stroke="#0ea5e9" stroke-width="2"/>
    <rect x="${200 - finderSize + cellSize}" y="${cellSize}" width="${cellSize * 5}" height="${cellSize * 5}" fill="white" stroke="#0ea5e9" stroke-width="2"/>
    <rect x="${200 - finderSize + cellSize * 2}" y="${cellSize * 2}" width="${cellSize * 3}" height="${cellSize * 3}" fill="#0ea5e9"/>

    <rect x="0" y="${200 - finderSize}" width="${finderSize}" height="${finderSize}" fill="white" stroke="#0ea5e9" stroke-width="2"/>
    <rect x="${cellSize}" y="${200 - finderSize + cellSize}" width="${cellSize * 5}" height="${cellSize * 5}" fill="white" stroke="#0ea5e9" stroke-width="2"/>
    <rect x="${cellSize * 2}" y="${200 - finderSize + cellSize * 2}" width="${cellSize * 3}" height="${cellSize * 3}" fill="#0ea5e9"/>
  `;

  return pattern;
}
