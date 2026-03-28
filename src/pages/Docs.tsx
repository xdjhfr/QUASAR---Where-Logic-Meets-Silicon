import { useState } from 'react'
import styles from '../styles/Docs.module.css'

interface DocSection {
  id: string
  title: string
  comingSoon?: boolean
  content: React.ReactNode
}

const sections: DocSection[] = [
  {
    id: 'intro',
    title: 'Introduction',
    content: (
      <>
        <h1>Introduction to QUASAR</h1>
        <p>
          QUASAR is an open-source EDA (Electronic Design Automation) platform designed
          to streamline RISC-V chip design education. It packages three industry-standard
          tools — Logisim-evolution, Yosys, and GTKWave — into a single cohesive environment.
        </p>
        <p>
          Whether you're taking a computer architecture course, doing research on processor
          design, or just exploring how CPUs work at the gate level, QUASAR removes the
          friction of tool setup and lets you focus on design.
        </p>
        <h2>Goals</h2>
        <ul>
          <li>Provide a zero-configuration starting point for RISC-V design</li>
          <li>Enable the full design-simulate-synthesize-verify workflow</li>
          <li>Remain accessible to students with no prior EDA experience</li>
          <li>Stay 100% open-source and free forever</li>
        </ul>
      </>
    ),
  },
  {
    id: 'installation',
    title: 'Installation',
    content: (
      <>
        <h1>Installation</h1>
        <p>QUASAR supports Linux, macOS, and Windows. Java 21+ is required.</p>
        <h2>Linux</h2>
        <pre><code>{`git clone https://github.com/xdjhfr/QUASAR---Where-Logic-Meets-Silicon.git
cd QUASAR---Where-Logic-Meets-Silicon
sudo ./install.sh`}</code></pre>
        <h2>macOS</h2>
        <pre><code>{`git clone https://github.com/xdjhfr/QUASAR---Where-Logic-Meets-Silicon.git
cd QUASAR---Where-Logic-Meets-Silicon`}</code></pre>
        <h2>Windows</h2>
        <pre><code>{`git clone https://github.com/xdjhfr/QUASAR---Where-Logic-Meets-Silicon.git
cd QUASAR---Where-Logic-Meets-Silicon`}</code></pre>
        <p>After installation, launch QUASAR from your application menu or by running <code>quasar</code> in a terminal.</p>
      </>
    ),
  },
  {
    id: 'quickstart',
    title: 'Quick Start',
    content: (
      <>
        <h1>Quick Start</h1>
        <p>Open QUASAR and select <strong>New Project → RISC-V Template</strong>.</p>
        <p>You'll get a pre-configured workspace with:</p>
        <ul>
          <li>A Logisim circuit file for a basic RV32I datapath</li>
          <li>A Yosys synthesis script targeting generic cells</li>
          <li>A GTKWave save file for common signal groupings</li>
        </ul>
        <h2>Run Your First Simulation</h2>
        <ol>
          <li>Open <code>riscv_core.circ</code> in Logisim</li>
          <li>Click <strong>Simulate → Run</strong></li>
          <li>Watch the program counter and register file update</li>
          <li>Export a VCD: <strong>File → Export → VCD</strong></li>
          <li>Switch to GTKWave to inspect signal waveforms</li>
        </ol>
      </>
    ),
  },
  {
    id: 'logisim',
    title: 'Logisim-evolution',
    content: (
      <>
        <h1>Logisim-evolution</h1>
        <p>
          Logisim-evolution is a digital logic circuit simulator. It provides a
          graphical environment for drawing and testing circuits ranging from simple
          gates to full processor datapaths.
        </p>
        <h2>Key Features Used in QUASAR</h2>
        <ul>
          <li>HDL export: convert drawn circuits to Verilog for Yosys synthesis</li>
          <li>Simulation: test combinational and sequential logic interactively</li>
          <li>FPGA targeting: map circuits to physical devices (optional)</li>
        </ul>
        <h2>QUASAR Integration</h2>
        <p>
          QUASAR automatically configures Logisim's project directory to match the
          shared workspace. Changes to <code>.circ</code> files are watched and can
          trigger re-synthesis in Yosys.
        </p>
      </>
    ),
  },
  {
    id: 'yosys',
    title: 'Yosys',
    content: (
      <>
        <h1>Yosys</h1>
        <p>
          Yosys is a free and open RTL synthesis framework. It reads Verilog HDL and
          produces optimized netlists for various target technologies.
        </p>
        <h2>Synthesis Script</h2>
        <pre><code>{`# quasar.ys - default synthesis script
read_verilog riscv_core.v
hierarchy -check -top riscv_core
proc; opt; fsm; opt; memory; opt
techmap; opt
write_verilog -noattr synth_output.v`}</code></pre>
        <h2>QUASAR Integration</h2>
        <p>
          The QUASAR dashboard exposes a one-click <strong>Synthesize</strong> button
          that runs the default script and opens the log output inline.
        </p>
      </>
    ),
  },
  {
    id: 'gtkwave',
    title: 'GTKWave',
    content: (
      <>
        <h1>GTKWave</h1>
        <p>
          GTKWave is a waveform viewer for VCD, FST, and LXT2 simulation dump files.
          It lets you inspect signal transitions over time to debug your design.
        </p>
        <h2>Loading a VCD File</h2>
        <ol>
          <li>Run your simulation and export a <code>.vcd</code> file</li>
          <li>In QUASAR, click <strong>Open in GTKWave</strong></li>
          <li>Drag signals from the signal list into the wave view</li>
          <li>Use the zoom controls to inspect specific clock cycles</li>
        </ol>
        <h2>Saved Signal Groups</h2>
        <p>
          QUASAR ships a <code>riscv_debug.gtkw</code> save file that pre-groups
          common RISC-V signals: PC, instruction, register file writes, and memory bus.
        </p>
      </>
    ),
  },
  {
    id: 'riscv',
    title: 'RISC-V Overview',
    comingSoon: true,
    content: (
      <>
        <h1>RISC-V Overview</h1>
        <p>This section is coming soon.</p>
      </>
    ),
  },
]

export function Docs() {
  const [active, setActive] = useState('intro')
  const section = sections.find(s => s.id === active)!

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTitle}>Documentation</div>
        <nav>
          {sections.map(s => (
            <button
              key={s.id}
              className={`${styles.navItem} ${active === s.id ? styles.navActive : ''}`}
              onClick={() => setActive(s.id)}
            >
              {s.title}
              {s.comingSoon && <span className={styles.soonBadge}>Soon</span>}
            </button>
          ))}
        </nav>
      </aside>

      <main className={styles.content}>
        <div className={styles.article}>
          {section.content}
        </div>
      </main>
    </div>
  )
}
