import { useState } from 'react'
import { Terminal, type TerminalLine } from '../components/Terminal'
import styles from '../styles/Download.module.css'

type OS = 'linux' | 'mac' | 'windows'

const terminalData: Record<OS, TerminalLine[]> = {
  linux: [
    { type: 'comment', text: '# Download and install QUASAR' },
    { type: 'command', text: 'git clone https://github.com/xdjhfr/QUASAR---Where-Logic-Meets-Silicon.git' },
    { type: 'output', text: 'Cloning into \'QUASAR---Where-Logic-Meets-Silicon\'...' },
    { type: 'output', text: 'Resolving deltas: 100% done.' },
    { type: 'output', text: '███████████████████████████████ 100%' },
    { type: 'command', text: 'cd QUASAR---Where-Logic-Meets-Silicon' },
    { type: 'command', text: 'sudo ./install.sh' },
    { type: 'success', text: '[OK] Logisim-evolution v3.9.0 installed' },
    { type: 'success', text: '[OK] Yosys 0.38 installed' },
    { type: 'success', text: '[OK] GTKWave 3.3.118 installed' },
    { type: 'success', text: 'QUASAR is ready. Run: quasar' },
  ],
  mac: [
    { type: 'comment', text: '# Clone and install' },
    { type: 'command', text: 'git clone https://github.com/xdjhfr/QUASAR---Where-Logic-Meets-Silicon.git' },
    { type: 'output', text: 'Cloning into \'QUASAR---Where-Logic-Meets-Silicon\'...' },
    { type: 'output', text: 'Resolving deltas: 100% done.' },
    { type: 'command', text: 'cd QUASAR---Where-Logic-Meets-Silicon' },
    { type: 'output', text: '==> Caveats: QUASAR requires Java 21+' },
    { type: 'success', text: '✔ quasar 1.0.0 installed successfully' },
    { type: 'command', text: 'quasar --version' },
    { type: 'output', text: 'QUASAR 1.0.0 (Logisim 3.9.0 / Yosys 0.38 / GTKWave 3.3.118)' },
  ],
  windows: [
    { type: 'comment', text: '# Clone and install' },
    { type: 'command', text: 'git clone https://github.com/xdjhfr/QUASAR---Where-Logic-Meets-Silicon.git' },
    { type: 'output', text: 'Cloning into \'QUASAR---Where-Logic-Meets-Silicon\'...' },
    { type: 'output', text: 'Resolving deltas: 100% done.' },
    { type: 'command', text: 'cd QUASAR---Where-Logic-Meets-Silicon' },
    { type: 'output', text: '  ██████████████████████████ 100%' },
    { type: 'success', text: 'Successfully installed QUASAR 1.0.0' },
    { type: 'comment', text: '# Or open the QUASAR app from Start Menu' },
  ],
}

const sysReqs = [
  { icon: '💻', label: 'OS', value: 'Linux / macOS / Windows 10+' },
  { icon: '☕', label: 'Java', value: 'OpenJDK 21 or newer' },
  { icon: '🧠', label: 'RAM', value: '4 GB minimum, 8 GB recommended' },
  { icon: '💾', label: 'Disk', value: '500 MB free space' },
  { icon: '🖥️', label: 'Display', value: '1280×720 minimum' },
  { icon: '🌐', label: 'Network', value: 'Required for initial install only' },
]

export function Download() {
  const [os, setOs] = useState<OS>('linux')

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>v1.0.0 — Latest Release</div>
          <h1 className={styles.title}>Download QUASAR</h1>
          <p className={styles.subtitle}>
            One installer. Three tools. Zero configuration.
          </p>
        </div>

        <div className={styles.osTabs}>
          {(['linux', 'mac', 'windows'] as OS[]).map(o => (
            <button
              key={o}
              className={`${styles.osTab} ${os === o ? styles.active : ''}`}
              onClick={() => setOs(o)}
            >
              {o === 'linux' && '🐧'} {o === 'mac' && '🍎'} {o === 'windows' && '🪟'}
              {' '}
              {o === 'mac' ? 'macOS' : o.charAt(0).toUpperCase() + o.slice(1)}
            </button>
          ))}
        </div>

        <Terminal os={os} lines={terminalData[os]} />

        <div className={styles.altDownload}>
          <a
            href="#"
            className={styles.downloadBtn}
            onClick={e => { e.preventDefault(); window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank') }}
          >
            Download Binary (.tar.gz / .dmg / .exe)
          </a>
          <span className={styles.altNote}>
            or build from source on{' '}
            <button
              className={styles.inlineLink}
              onClick={() => window.open('https://github.com/xdjhfr/QUASAR---Where-Logic-Meets-Silicon', '_blank')}
            >
              GitHub
            </button>
          </span>
        </div>

        <div className={styles.sysSection}>
          <h2 className={styles.sysTitle}>System Requirements</h2>
          <div className={styles.sysGrid}>
            {sysReqs.map(req => (
              <div key={req.label} className={styles.sysCard}>
                <span className={styles.sysIcon}>{req.icon}</span>
                <div>
                  <div className={styles.sysLabel}>{req.label}</div>
                  <div className={styles.sysValue}>{req.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
