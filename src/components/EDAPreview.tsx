import { useEffect, useRef, useState } from 'react'

export function EDAPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="section-eda" style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
      {/* Section header */}
      <div style={{ maxWidth: 1000, margin: '0 auto 36px' }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--text-dim)',
          letterSpacing: '0.08em',
          marginBottom: '10px',
        }}>
          // workspace
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          margin: '0 0 12px',
        }}>
          See It In Action
        </h2>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          maxWidth: 560,
        }}>
          A unified environment — circuit design, logic synthesis, and waveform analysis in one window.
        </p>
      </div>

      {/* Mock window */}
      <div
        ref={ref}
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          border: '1px solid var(--border)',
          borderRadius: 14,
          overflow: 'hidden',
          background: '#04050a',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.65s ease, transform 0.65s ease',
        }}
      >
        {/* ── MENUBAR ── */}
        <div style={{
          height: 32,
          background: '#07080f',
          borderBottom: '1px solid #131318',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* macOS dots */}
            <div style={{ display: 'flex', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#3a1a1a' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#3a2e10' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a2e1a' }} />
            </div>
            {/* Logo */}
            <span style={{
              fontFamily: 'Orbitron, var(--font-display)',
              fontSize: 11,
              color: '#c8c8d0',
              letterSpacing: '0.12em',
              marginLeft: 6,
            }}>
              QUASAR
            </span>
            {/* Menu items */}
            <div style={{ display: 'flex', gap: 14, marginLeft: 10 }}>
              {['File', 'Edit', 'Simulate', 'Synthesize'].map(m => (
                <span key={m} style={{ fontSize: 10, color: '#3a3a48', cursor: 'default' }}>{m}</span>
              ))}
            </div>
          </div>
          {/* Status badge */}
          <div style={{
            fontSize: 9,
            color: '#8a8aa0',
            border: '1px solid #2e2e40',
            borderRadius: 4,
            padding: '2px 7px',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.06em',
          }}>
            ● SIM RUNNING
          </div>
        </div>

        {/* ── TOOLBAR ── */}
        <div style={{
          height: 26,
          background: '#060710',
          borderBottom: '1px solid #111118',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: 10,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
        }}>
          <span style={{ color: '#303040' }}>cpu_riscv.circ</span>
          <span style={{ color: '#1a1a28' }}>·</span>
          <span style={{ color: '#1c1c28' }}>alu.v · sim.vcd</span>
        </div>

        {/* ── BODY ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '100px 1fr 148px',
          height: 380,
        }}>
          {/* LEFT SIDEBAR */}
          <div style={{
            background: '#05060c',
            borderRight: '1px solid #111118',
            padding: '10px 0',
            overflow: 'hidden',
          }}>
            {[
              { head: 'PROJECT', items: [
                { name: 'cpu_riscv', active: true },
                { name: '  ALU', active: true },
                { name: '  RegFile', active: false },
                { name: '  Control', active: false },
              ]},
              { head: 'HDL', items: [
                { name: 'alu.v', active: false },
                { name: 'regfile.v', active: false },
              ]},
              { head: 'SIM', items: [
                { name: 'sim.vcd', active: false },
              ]},
            ].map(group => (
              <div key={group.head}>
                <div style={{
                  fontSize: 8,
                  color: '#252530',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '6px 8px 3px',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {group.head}
                </div>
                {group.items.map(item => (
                  <div key={item.name} style={{
                    fontSize: 9,
                    color: item.active ? '#7a7a90' : '#2a2a38',
                    background: item.active ? '#0a0a14' : 'transparent',
                    padding: '3px 8px',
                    fontFamily: 'var(--font-mono)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {item.name}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* CENTER PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Tabs bar */}
            <div style={{
              height: 28,
              background: '#05060c',
              borderBottom: '1px solid #111118',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '0 8px',
              gap: 2,
              flexShrink: 0,
            }}>
              {[
                { label: 'ALU.circ', active: true },
                { label: 'alu.v', active: false },
                { label: 'sim.vcd', active: false },
              ].map(tab => (
                <div key={tab.label} style={{
                  fontSize: 9,
                  color: tab.active ? '#8080a0' : '#2a2a38',
                  borderBottom: tab.active ? '1.5px solid #505068' : '1.5px solid transparent',
                  padding: '4px 10px 5px',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'default',
                }}>
                  {tab.label}
                </div>
              ))}
            </div>

            {/* CANVAS AREA */}
            <div style={{
              flex: 1,
              background: '#04050a',
              position: 'relative',
              overflow: 'hidden',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.016) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 660 252"
                preserveAspectRatio="xMidYMid meet"
                style={{ display: 'block' }}
              >
                {/* ── Labels ── */}
                <text x="14" y="16" fontSize="6" fill="#252530" fontFamily="monospace">half adder bit0</text>
                <text x="14" y="92" fontSize="6" fill="#252530" fontFamily="monospace">half adder bit1</text>
                <text x="170" y="16" fontSize="6" fill="#252530" fontFamily="monospace">carry logic</text>
                <text x="270" y="16" fontSize="6" fill="#252530" fontFamily="monospace">full adder</text>

                {/* ── bit0 AND gate ── */}
                {/* Input wires */}
                <line x1="14" y1="30" x2="38" y2="30" stroke="#1a1a28" strokeWidth="1" />
                <line x1="14" y1="42" x2="38" y2="42" stroke="#1a1a28" strokeWidth="1" />
                <text x="7" y="32" fontSize="6" fill="#2a2a38" fontFamily="monospace">A[0]</text>
                <text x="7" y="44" fontSize="6" fill="#2a2a38" fontFamily="monospace">B[0]</text>
                {/* AND body: flat-left curved-right */}
                <path d="M38,24 L38,48 Q58,48 58,36 Q58,24 38,24 Z" fill="#08090f" stroke="#252535" strokeWidth="1" />
                <line x1="58" y1="36" x2="72" y2="36" stroke="#1a1a28" strokeWidth="1" />
                <circle cx="72" cy="36" r="2" fill="#353550" />
                <text x="44" y="38" fontSize="6" fill="#404055" fontFamily="monospace">AND</text>

                {/* ── bit0 XOR gate ── */}
                <line x1="14" y1="62" x2="38" y2="62" stroke="#1a1a28" strokeWidth="1" />
                <line x1="14" y1="74" x2="38" y2="74" stroke="#1a1a28" strokeWidth="1" />
                {/* XOR body */}
                <path d="M40,56 Q52,68 40,80 Q54,80 62,68 Q54,56 40,56 Z" fill="#08090f" stroke="#252535" strokeWidth="1" />
                {/* XOR extra arc */}
                <path d="M36,56 Q44,68 36,80" fill="none" stroke="#252535" strokeWidth="1" />
                <line x1="62" y1="68" x2="76" y2="68" stroke="#222235" strokeWidth="1" />
                <circle cx="76" cy="68" r="2" fill="#353550" />
                <text x="44" y="70" fontSize="6" fill="#404055" fontFamily="monospace">XOR</text>

                {/* ── bit1 AND gate ── */}
                <line x1="14" y1="106" x2="38" y2="106" stroke="#1a1a28" strokeWidth="1" />
                <line x1="14" y1="118" x2="38" y2="118" stroke="#1a1a28" strokeWidth="1" />
                <text x="7" y="108" fontSize="6" fill="#2a2a38" fontFamily="monospace">A[1]</text>
                <text x="7" y="120" fontSize="6" fill="#2a2a38" fontFamily="monospace">B[1]</text>
                <path d="M38,100 L38,124 Q58,124 58,112 Q58,100 38,100 Z" fill="#08090f" stroke="#252535" strokeWidth="1" />
                <line x1="58" y1="112" x2="72" y2="112" stroke="#1a1a28" strokeWidth="1" />
                <circle cx="72" cy="112" r="2" fill="#353550" />
                <text x="44" y="114" fontSize="6" fill="#404055" fontFamily="monospace">AND</text>

                {/* ── bit1 XOR gate ── */}
                <line x1="14" y1="138" x2="38" y2="138" stroke="#1a1a28" strokeWidth="1" />
                <line x1="14" y1="150" x2="38" y2="150" stroke="#1a1a28" strokeWidth="1" />
                <path d="M40,132 Q52,144 40,156 Q54,156 62,144 Q54,132 40,132 Z" fill="#08090f" stroke="#252535" strokeWidth="1" />
                <path d="M36,132 Q44,144 36,156" fill="none" stroke="#252535" strokeWidth="1" />
                <line x1="62" y1="144" x2="76" y2="144" stroke="#222235" strokeWidth="1" />
                <circle cx="76" cy="144" r="2" fill="#353550" />
                <text x="44" y="146" fontSize="6" fill="#404055" fontFamily="monospace">XOR</text>

                {/* ── OR gate (carry combine) ── */}
                <line x1="72" y1="36" x2="96" y2="52" stroke="#1a1a28" strokeWidth="1" strokeDasharray="3,2" />
                <line x1="72" y1="112" x2="96" y2="64" stroke="#1a1a28" strokeWidth="1" strokeDasharray="3,2" />
                <path d="M96,46 Q108,58 96,70 Q112,70 120,58 Q112,46 96,46 Z" fill="#08090f" stroke="#303045" strokeWidth="1" />
                <path d="M93,46 Q101,58 93,70" fill="none" stroke="#303045" strokeWidth="1" />
                <line x1="120" y1="58" x2="134" y2="58" stroke="#222235" strokeWidth="1" />
                <text x="100" y="60" fontSize="6" fill="#404055" fontFamily="monospace">OR</text>

                {/* ── Full adder XOR (sum) ── */}
                <line x1="76" y1="68" x2="186" y2="68" stroke="#222235" strokeWidth="1" />
                <line x1="76" y1="144" x2="186" y2="100" stroke="#1a1a28" strokeWidth="1" strokeDasharray="3,2" />
                <path d="M188,62 Q200,74 188,86 Q202,86 210,74 Q202,62 188,62 Z" fill="#08090f" stroke="#303045" strokeWidth="1" />
                <path d="M184,62 Q192,74 184,86" fill="none" stroke="#303045" strokeWidth="1" />
                <line x1="210" y1="74" x2="226" y2="74" stroke="#222235" strokeWidth="1" />
                <text x="192" y="76" fontSize="6" fill="#404055" fontFamily="monospace">XOR</text>

                {/* ── Full adder AND (carry) ── */}
                <line x1="186" y1="108" x2="210" y2="108" stroke="#1a1a28" strokeWidth="1" />
                <line x1="186" y1="120" x2="210" y2="120" stroke="#1a1a28" strokeWidth="1" />
                <path d="M210,102 L210,126 Q230,126 230,114 Q230,102 210,102 Z" fill="#08090f" stroke="#252535" strokeWidth="1" />
                <line x1="230" y1="114" x2="244" y2="114" stroke="#1a1a28" strokeWidth="1" />
                <text x="216" y="116" fontSize="6" fill="#404055" fontFamily="monospace">AND</text>

                {/* ── MUX 4:1 ── */}
                <line x1="226" y1="74" x2="264" y2="74" stroke="#222235" strokeWidth="1" />
                {/* trapezoid */}
                <path d="M264,52 L264,130 L286,118 L286,64 Z" fill="#08090f" stroke="#252535" strokeWidth="1" />
                <text x="268" y="87" fontSize="6" fill="#404055" fontFamily="monospace">MUX</text>
                <text x="268" y="96" fontSize="5" fill="#2a2a38" fontFamily="monospace">4:1</text>
                {/* select input */}
                <line x1="275" y1="130" x2="275" y2="142" stroke="#1a1a28" strokeWidth="1" strokeDasharray="2,2" />
                <text x="261" y="150" fontSize="5" fill="#2a2a38" fontFamily="monospace">op[1:0]</text>
                {/* mux inputs */}
                {[62, 78, 94, 110].map((y, i) => (
                  <line key={i} x1="244" y1={y} x2="264" y2={y} stroke="#1a1a28" strokeWidth="0.8" />
                ))}
                <text x="246" y="60" fontSize="5" fill="#2a2a38" fontFamily="monospace">ADD</text>
                <text x="246" y="76" fontSize="5" fill="#2a2a38" fontFamily="monospace">SUB</text>
                <text x="246" y="92" fontSize="5" fill="#2a2a38" fontFamily="monospace">AND</text>
                <text x="246" y="108" fontSize="5" fill="#2a2a38" fontFamily="monospace">OR</text>
                {/* output */}
                <line x1="286" y1="91" x2="310" y2="91" stroke="#222235" strokeWidth="1" />

                {/* ── REG block ── */}
                <rect x="310" y="66" width="72" height="56" rx="4" fill="#0c0d18" stroke="#404058" strokeWidth="1" />
                <text x="320" y="82" fontSize="7" fill="#9090b8" fontFamily="monospace" fontWeight="bold">REG</text>
                <text x="316" y="94" fontSize="6" fill="#606078" fontFamily="monospace">result[31:0]</text>
                <text x="326" y="106" fontSize="7" fill="#9090b8" fontFamily="monospace">0x000F</text>
                {/* clk input */}
                <line x1="346" y1="122" x2="346" y2="134" stroke="#1a1a28" strokeWidth="1" strokeDasharray="2,2" />
                <text x="338" y="142" fontSize="5" fill="#2a2a38" fontFamily="monospace">clk</text>
                {/* output */}
                <line x1="382" y1="91" x2="410" y2="91" stroke="#222235" strokeWidth="1.2" />

                {/* ── NOT gate (zero flag) ── */}
                <line x1="382" y1="91" x2="382" y2="160" stroke="#1a1a28" strokeWidth="1" strokeDasharray="3,2" />
                <line x1="382" y1="160" x2="406" y2="160" stroke="#1a1a28" strokeWidth="1" />
                <polygon points="406,152 406,168 422,160" fill="#08090f" stroke="#252535" strokeWidth="1" />
                <circle cx="425" cy="160" r="3" fill="#08090f" stroke="#252535" strokeWidth="1" />
                <line x1="428" y1="160" x2="440" y2="160" stroke="#1a1a28" strokeWidth="1" />
                <text x="409" y="158" fontSize="5" fill="#404055" fontFamily="monospace">NOT</text>
                <text x="432" y="156" fontSize="5" fill="#2a2a38" fontFamily="monospace">zero</text>

                {/* ── NOR gate ── */}
                <line x1="244" y1="114" x2="440" y2="182" stroke="#1a1a28" strokeWidth="0.8" strokeDasharray="3,2" />
                <path d="M440,174 Q452,182 440,190 Q456,190 464,182 Q456,174 440,174 Z" fill="#08090f" stroke="#252535" strokeWidth="1" />
                <path d="M436,174 Q444,182 436,190" fill="none" stroke="#252535" strokeWidth="1" />
                <circle cx="467" cy="182" r="3" fill="#08090f" stroke="#252535" strokeWidth="1" />
                <line x1="470" y1="182" x2="482" y2="182" stroke="#1a1a28" strokeWidth="1" />
                <text x="444" y="184" fontSize="5" fill="#404055" fontFamily="monospace">NOR</text>

                {/* ── Output line ── */}
                <line x1="410" y1="91" x2="510" y2="91" stroke="#222235" strokeWidth="1.2" />
                <text x="514" y="88" fontSize="7" fill="#404055" fontFamily="monospace">result[31:0]</text>
                <text x="514" y="98" fontSize="7" fill="#9090b8" fontFamily="monospace">0x000F</text>

                {/* ── Status bar ── */}
                <rect x="0" y="234" width="660" height="18" fill="#030408" />
                <text x="8" y="246" fontSize="6.5" fill="#1e1e2c" fontFamily="monospace">
                  ● SIM  |  ALU · ADD  |  A=0x000A  B=0x0005  result=0x000F  zero=0  overflow=0
                </text>
              </svg>
            </div>

            {/* WAVEFORM SPLIT */}
            <div style={{
              height: 100,
              borderTop: '1px solid #111118',
              background: '#04050c',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
            }}>
              {/* Header */}
              <div style={{
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 8px',
                borderBottom: '1px solid #0e0e18',
              }}>
                <span style={{ fontSize: 8, color: '#252530', fontFamily: 'var(--font-mono)' }}>
                  GTKWave — sim.vcd
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['Zoom+', 'Fit'].map(b => (
                    <span key={b} style={{
                      fontSize: 7,
                      color: '#1e1e2c',
                      border: '1px solid #0e0e18',
                      borderRadius: 3,
                      padding: '1px 5px',
                      fontFamily: 'var(--font-mono)',
                    }}>{b}</span>
                  ))}
                </div>
              </div>
              {/* Waveforms */}
              <div style={{ flex: 1, display: 'flex' }}>
                {/* Signal list */}
                <div style={{
                  width: 56,
                  borderRight: '1px solid #0e0e18',
                  padding: '4px 0',
                  flexShrink: 0,
                }}>
                  {['clk', 'a[31:0]', 'b[31:0]', 'result', 'zero'].map((sig, i) => (
                    <div key={sig} style={{
                      fontSize: 7,
                      color: '#1e1e2c',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 6px',
                      height: 14,
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                      {sig}
                    </div>
                  ))}
                </div>
                {/* SVG waveform */}
                <svg style={{ flex: 1 }} viewBox="0 0 400 80" preserveAspectRatio="none">
                  {/* clk square wave */}
                  <polyline
                    points="0,5 40,5 40,12 80,12 80,5 120,5 120,12 160,12 160,5 200,5 200,12 240,12 240,5 280,5 280,12 320,12 320,5 360,5 360,12 400,12"
                    fill="none" stroke="#282838" strokeWidth="1"
                  />
                  {/* a flat */}
                  <line x1="0" y1="22" x2="400" y2="22" stroke="#202030" strokeWidth="1" />
                  {/* b flat */}
                  <line x1="0" y1="36" x2="400" y2="36" stroke="#202030" strokeWidth="1" />
                  {/* result stepped */}
                  <polyline
                    points="0,54 100,54 100,48 200,48 200,54 300,54 300,48 400,48"
                    fill="none" stroke="#2a2a40" strokeWidth="1"
                  />
                  {/* zero flat low */}
                  <line x1="0" y1="68" x2="400" y2="68" stroke="#161622" strokeWidth="1" />
                  {/* cursor */}
                  <line x1="200" y1="0" x2="200" y2="80" stroke="#1e1e2c" strokeWidth="1" strokeDasharray="3,2" />
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div style={{
            background: '#05060c',
            borderLeft: '1px solid #111118',
            padding: '10px 8px',
            overflow: 'hidden',
          }}>
            <div style={{
              fontSize: 8,
              color: '#252530',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: 'var(--font-mono)',
              marginBottom: 6,
            }}>
              PROPERTIES
            </div>

            {/* Rows */}
            {[
              { key: 'Gate', val: 'XOR', highlight: false },
              { key: 'In A', val: '0x000A', highlight: false },
              { key: 'In B', val: '0x0005', highlight: false },
              { key: 'Out', val: '0x000F', highlight: true },
              { key: 'Delay', val: '2ns', highlight: false },
            ].map(row => (
              <div key={row.key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '2px 0',
                borderBottom: '1px solid #0a0a14',
              }}>
                <span style={{ fontSize: 8, color: '#252530', fontFamily: 'var(--font-mono)' }}>{row.key}</span>
                <span style={{ fontSize: 8, color: row.highlight ? '#9090b0' : '#4a4a60', fontFamily: 'var(--font-mono)' }}>{row.val}</span>
              </div>
            ))}

            <div style={{ borderTop: '1px solid #131318', margin: '5px 0' }} />

            {[
              { key: 'Op', val: 'ADD', highlight: false },
              { key: 'Zero', val: '0', highlight: false },
              { key: 'Carry', val: '0', highlight: false },
            ].map(row => (
              <div key={row.key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '2px 0',
                borderBottom: '1px solid #0a0a14',
              }}>
                <span style={{ fontSize: 8, color: '#252530', fontFamily: 'var(--font-mono)' }}>{row.key}</span>
                <span style={{ fontSize: 8, color: '#4a4a60', fontFamily: 'var(--font-mono)' }}>{row.val}</span>
              </div>
            ))}

            <div style={{ borderTop: '1px solid #131318', margin: '5px 0' }} />

            {[
              { key: 'Yosys', val: 'RV32I', highlight: false },
              { key: 'Gates', val: '1,204', highlight: false },
              { key: 'Freq', val: '1MHz', highlight: true },
            ].map(row => (
              <div key={row.key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '2px 0',
                borderBottom: '1px solid #0a0a14',
              }}>
                <span style={{ fontSize: 8, color: '#252530', fontFamily: 'var(--font-mono)' }}>{row.key}</span>
                <span style={{ fontSize: 8, color: row.highlight ? '#9090b0' : '#4a4a60', fontFamily: 'var(--font-mono)' }}>{row.val}</span>
              </div>
            ))}

            <div style={{ borderTop: '1px solid #131318', margin: '5px 0' }} />

            {/* Console */}
            <div style={{
              background: '#030408',
              border: '1px solid #0e0e18',
              borderRadius: 4,
              padding: '5px 6px',
              marginTop: 2,
            }}>
              {[
                { text: 'synth -top alu', dim: false },
                { text: '✓ Elaboration OK', dim: true },
                { text: '✓ Opt passes: 3', dim: true },
                { text: '✓ Netlist ready', dim: true },
                { text: 'sim -vcd sim.vcd', dim: false },
                { text: '✓ Simulation OK', dim: true },
              ].map((line, i) => (
                <div key={i} style={{
                  fontSize: 8,
                  color: line.dim ? '#606080' : '#1e1e28',
                  fontFamily: 'monospace',
                  lineHeight: 1.6,
                }}>
                  {line.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
