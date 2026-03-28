import styles from '../styles/About.module.css'

const tools = [
  {
    name: 'Logisim-evolution',
    org: 'logisim-evolution',
    license: 'GPL-3.0',
    desc: 'A digital logic circuit simulator and designer, forked and actively maintained by a community of educators and researchers.',
    link: 'https://github.com/logisim-evolution/logisim-evolution',
  },
  {
    name: 'Yosys',
    org: 'YosysHQ',
    license: 'ISC',
    desc: 'A framework for RTL synthesis tools, widely used in academic and professional chip design flows.',
    link: 'https://github.com/YosysHQ/yosys',
  },
  {
    name: 'GTKWave',
    org: 'gtkwave',
    license: 'GPL-2.0',
    desc: 'A fully featured GTK+ based waveform viewer for Unix and Win32 which reads LXT, LXT2, VZT, FST, and GHW files.',
    link: 'https://github.com/gtkwave/gtkwave',
  },
]

export function About() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>About QUASAR</h1>
          <p className={styles.subtitle}>
            An open-source project built on the shoulders of giants.
          </p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Open Source Credits</h2>
          <p className={styles.sectionText}>
            QUASAR is a packaging and integration layer — the real magic comes from
            these three incredible open-source projects:
          </p>
          <div className={styles.toolGrid}>
            {tools.map(t => (
              <div key={t.name} className={styles.toolCard}>
                <div className={styles.toolHeader}>
                  <h3 className={styles.toolName}>{t.name}</h3>
                  <span className={styles.licenseBadge}>{t.license}</span>
                </div>
                <p className={styles.toolOrg}>by {t.org}</p>
                <p className={styles.toolDesc}>{t.desc}</p>
                <a
                  href={t.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.toolLink}
                >
                  View on GitHub →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Creator</h2>
          <div className={styles.creatorCard}>
            <div className={styles.avatar}>J</div>
            <div className={styles.creatorInfo}>
              <h3 className={styles.creatorName}>Jom</h3>
              <p className={styles.creatorRole}>Creator & Maintainer</p>
              <p className={styles.creatorBio}>
                Computer Engineering student passionate about processor architecture,
                open hardware, and making chip design accessible to everyone. Built
                QUASAR to solve the setup friction I experienced in my own RISC-V
                coursework — so no one else has to fight their toolchain.
              </p>
              <div className={styles.creatorLinks}>
                <button
                  className={styles.creatorLink}
                  onClick={() => window.open('https://github.com/xdjhfr/QUASAR---Where-Logic-Meets-Silicon', '_blank')}
                >
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>License</h2>
          <div className={styles.licenseCard}>
            <div className={styles.licenseIcon}>📄</div>
            <div>
              <div className={styles.licenseName}>GNU General Public License v3.0</div>
              <p className={styles.licenseText}>
                QUASAR itself is released under GPL-3.0. The bundled tools carry
                their own licenses (GPL-3.0, ISC, GPL-2.0) — all open-source and
                free for academic and commercial use.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
