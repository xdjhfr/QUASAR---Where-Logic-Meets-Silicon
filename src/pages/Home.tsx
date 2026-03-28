import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { StarField } from '../components/StarField'
import { BinaryBoard } from '../components/BinaryBoard'
import { ToolCard } from '../components/ToolCard'
import { FeatureItem } from '../components/FeatureItem'
import { QuasarAnimation } from '../components/QuasarAnimation'
import { EDAPreview } from '../components/EDAPreview'
import styles from '../styles/Home.module.css'

function FeatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScanned(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '48px' }}>
          Why QUASAR?
        </h2>
        <div
          ref={sectionRef}
          className={`${styles.featureGrid} ${scanned ? styles.featureGridScanned : ''}`}
        >
          <FeatureItem
            icon="🖥️"
            title="Unified Interface"
            description="Launch all three EDA tools from one dashboard. No PATH configuration, no version conflicts, no manual wiring."
            index={0}
            stat={{ value: 1, suffix: ' Dashboard' }}
          />
          <FeatureItem
            icon="🔗"
            title="Seamless Integration"
            description="Tools are pre-configured to hand off files to each other automatically. Logisim exports feed directly into Yosys synthesis."
            index={1}
            stat={{ value: 3, suffix: ' Tools' }}
          />
          <FeatureItem
            icon="🎓"
            title="Education-First"
            description="Built for academic environments. Comes with example RISC-V circuits, synthesis scripts, and guided project templates."
            index={2}
            stat={{ value: 50, suffix: '+ Examples' }}
          />
          <FeatureItem
            icon="📦"
            title="One-Click Install"
            description="A single installer bundles everything: Logisim-evolution, Yosys, GTKWave, and the QUASAR workspace launcher."
            index={3}
            stat={{ value: 1, suffix: ' Package' }}
          />
        </div>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <div className={styles.home}>
      <StarField />

      {/* ===== HERO ===== */}
      <section id="section-home" className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            QUASAR · OPEN SOURCE · RISC-V
          </div>

          <h1 className={styles.heroTitle}>
            Where Logic<br />
            Meets <em className={styles.heroEm}>Silicon</em>
          </h1>

          <p className={styles.heroSubtitle}>
            Open-Source RISC-V Design Platform — Logisim · Yosys · GTKWave
          </p>

          <div className={styles.heroCta}>
            <Link to="/download" className={styles.ctaPrimary}>
              Download Free
            </Link>
            <button
              className={styles.ctaSecondary}
              onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
            >
              View on GitHub
            </button>
          </div>

          <hr className={styles.heroRule} />

          <div className={styles.quoteBlock}>
            <div className={styles.quoteStat}>
              <span className={styles.quoteStatNum}>10<sup>9</sup></span>
              <span className={styles.quoteStatSub}>ops / sec</span>
            </div>
            <p className={styles.quotePrimary}>
              <strong>One tap. One billion operations.</strong>{' '}
              A chip the size of your fingernail makes it happen.
            </p>
            <p className={styles.quoteSecondary}>
              QUASAR is where the people who design that chip do their work.
            </p>
          </div>
        </div>

        <div className={styles.heroRight}>
          <BinaryBoard />
        </div>
      </section>

      {/* ===== WHAT IS IT ===== */}
      <section id="section-what" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.whatGrid}>
            <div className={styles.whatLeft}>
              <h2 className={styles.sectionTitle}>What is QUASAR?</h2>
              <p className={styles.sectionText}>
                QUASAR is an integrated EDA (Electronic Design Automation) platform
                built for students, researchers, and academics diving into RISC-V
                processor design. Instead of configuring three separate tools,
                QUASAR ships them all pre-wired and ready to go.
              </p>
              <p className={styles.sectionText} style={{ marginTop: '1rem' }}>
                From drawing logic circuits to synthesizing RTL to inspecting
                waveforms — the full chip design pipeline lives in one clean
                interface, no prior toolchain experience required.
              </p>
            </div>
            <div className={styles.whatRight}>
              <div className={styles.whatRightInner}>
                <QuasarAnimation />
                <div className={styles.pipeline}>
                  {[
                    { label: 'Design Input', sub: '.circ / .v files' },
                    { label: 'Logisim', sub: 'Logic Simulation' },
                    { label: 'Yosys', sub: 'RTL Synthesis' },
                    { label: 'GTKWave', sub: 'Waveform Analysis' },
                    { label: 'Silicon Output', sub: 'Netlist / VCD' },
                  ].map((node, i, arr) => (
                    <div key={i} className={styles.pipelineWrap}>
                      <div className={styles.pipelineNode}>
                        <span className={styles.nodeLabel}>{node.label}</span>
                        <span className={styles.nodeSub}>{node.sub}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className={styles.pipelineArrow}>↓</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EDA PREVIEW ===== */}
      <EDAPreview />

      {/* ===== TOOLS ===== */}
      <section id="section-tools" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '48px' }}>
            Bundled Tools
          </h2>
          <div className={styles.toolGrid}>
            <ToolCard
              icon="🔌"
              name="Logisim-evolution"
              badge="Circuit Design"
              description="Draw and simulate digital logic circuits visually. Build ALUs, registers, and full RISC-V datapaths with drag-and-drop components."
              index={0}
            />
            <ToolCard
              icon="⚙️"
              name="Yosys"
              badge="Logic Synthesis"
              description="Industry-grade open RTL synthesis framework. Translate your Verilog descriptions into optimized gate-level netlists ready for fabrication."
              index={1}
            />
            <ToolCard
              icon="📊"
              name="GTKWave"
              badge="Waveform Analysis"
              description="Inspect signal waveforms from simulation runs. Debug timing issues, verify control logic, and validate your RISC-V pipeline behavior."
              index={2}
            />
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <FeatureSection />

      {/* ===== CTA BANNER ===== */}
      <section id="section-download-cta" className={styles.ctaBanner}>
        <div className={styles.ctaGlow} />
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Design Silicon?</h2>
          <p className={styles.ctaSub}>
            Free, open-source, and runs on Linux, macOS, and Windows.
          </p>
          <Link to="/download" className={styles.ctaPrimary}>
            Download QUASAR
          </Link>
        </div>
      </section>
    </div>
  )
}
