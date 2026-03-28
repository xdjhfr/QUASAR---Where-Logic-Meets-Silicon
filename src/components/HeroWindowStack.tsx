import React from 'react'

// ─── Verilog token colors ────────────────────────────────────────────────────
const KW = '#5a70c0'   // keyword
const TY = '#4a8090'   // type
const VA = '#4a6070'   // value / literal
const CO = '#3d6050'   // comment
const ID = '#8090b0'   // identifier
const OP = '#607080'   // operator
const PU = '#4a5566'   // punctuation

type Tok = { t: string; c: string; i?: boolean }
const kw  = (t: string): Tok => ({ t, c: KW })
const ty  = (t: string): Tok => ({ t, c: TY })
const va  = (t: string): Tok => ({ t, c: VA })
const co  = (t: string): Tok => ({ t, c: CO, i: true })
const id_ = (t: string): Tok => ({ t, c: ID })
const op  = (t: string): Tok => ({ t, c: OP })
const pu  = (t: string): Tok => ({ t, c: PU })
const sp  = (n = 1):    Tok => ({ t: ' '.repeat(n), c: ID })

const CODE_LINES: Tok[][] = [
  [kw('module'), sp(), id_('alu_operation'), sp(), pu('('), kw('input'), sp(), ty('[31:0]'), sp(), id_('a, b,')],
  [sp(2), kw('input'), sp(), ty('[3:0]'), sp(), id_('alu_ctrl,')],
  [sp(2), kw('output'), sp(), ty('reg'), sp(), ty('[31:0]'), sp(), id_('result,'), sp(), kw('output'), sp(), id_('zero);')],
  [kw('assign'), sp(), id_('zero'), sp(), op('='), sp(), pu('('), id_('result'), sp(), op('=='), sp(), va('0'), pu(');')],
  [kw('always'), sp(), id_('@(*)'), sp(), kw('begin')],
  [sp(2), kw('case'), sp(), pu('('), id_('alu_ctrl'), pu(')')],
  [sp(4), va("4'b0000"), pu(':'), sp(), id_('result'), sp(), op('='), sp(), id_('a'), sp(), op('+'), sp(), id_('b;'), sp(3), co('// ADD')],
  [sp(4), va("4'b0001"), pu(':'), sp(), id_('result'), sp(), op('='), sp(), id_('a'), sp(), op('-'), sp(), id_('b;'), sp(3), co('// SUB')],
  [sp(4), va("4'b0010"), pu(':'), sp(), id_('result'), sp(), op('='), sp(), id_('a'), sp(), op('&'), sp(), id_('b;'), sp(3), co('// AND')],
  [sp(4), va("4'b0011"), pu(':'), sp(), id_('result'), sp(), op('='), sp(), id_('a'), sp(), op('|'), sp(), id_('b;'), sp(4), co('// OR')],
  [sp(4), va("4'b0100"), pu(':'), sp(), id_('result'), sp(), op('='), sp(), id_('a'), sp(), op('^'), sp(), id_('b;'), sp(3), co('// XOR')],
  [sp(4), va("4'b0101"), pu(':'), sp(), id_('result'), sp(), op('='), sp(), id_('a'), sp(), op('<<'), sp(), id_('b;'), sp(2), co('// SLL')],
  [sp(4), kw('default'), pu(':'), sp(), id_('result'), sp(), op('='), sp(), va("32'b0;")],
  [sp(2), kw('endcase')],
]

// ─── Shared window chrome ────────────────────────────────────────────────────
const WIN_BASE: React.CSSProperties = {
  position: 'absolute',
  borderRadius: 10,
  overflow: 'hidden',
  border: '1px solid #1a2535',
  boxShadow: '0 20px 60px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)',
  background: '#0c0e18',
}

function MacDots() {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {(['#3d2020', '#3a3018', '#1f3020'] as const).map((c, i) => (
        <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
      ))}
    </div>
  )
}

function Titlebar({
  left,
  right,
}: {
  left: React.ReactNode
  right?: React.ReactNode
}) {
  return (
    <div
      style={{
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        background: '#0d1020',
        borderBottom: '1px solid #141e2e',
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <MacDots />
        {left}
      </div>
      {right}
    </div>
  )
}

// ─── Window 1: Logisim circuit ───────────────────────────────────────────────
function CircuitSVG() {
  const cFill   = '#101828'
  const cStroke = '#2a4060'
  const aWire   = '#1e3a5a'
  const dWire   = '#141e2e'
  const lbl     = '#6a85a8'
  const val     = '#3a5a70'
  const pulse   = '#2a6aaf'

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 356 264"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block' }}
    >
      <defs>
        <pattern id="hw-dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="0.6" fill="#141c2e" />
        </pattern>
      </defs>

      {/* Background dot grid */}
      <rect width="356" height="264" fill="url(#hw-dot-grid)" />

      {/* Dim wires (painted under actives) */}
      <g stroke={dWire} strokeWidth="1.5" fill="none">
        <polyline points="82,44 112,44" />
        <polyline points="166,78 166,100 66,100 66,115" />
        <polyline points="122,138 165,138" />
        <polyline points="122,162 165,162" />
        <polyline points="255,150 318,150" />
        <polyline points="210,205 210,188" strokeDasharray="3,3" />
        <polyline points="90,205 90,193"  strokeDasharray="3,3" />
      </g>

      {/* Active wires (highlighted overlay) */}
      <g stroke={aWire} strokeWidth="1.8" fill="none">
        <polyline points="82,44 112,44" />
        <polyline points="122,138 165,138" />
        <polyline points="255,150 305,150" />
      </g>

      {/* PC */}
      <rect x="10" y="18" width="72" height="50" rx="4" fill={cFill} stroke={cStroke} strokeWidth="1.2" />
      <text x="46" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill={lbl} fontFamily="monospace">PC</text>
      <text x="46" y="57" textAnchor="middle" fontSize="10" fill={val} fontFamily="monospace">0x0004</text>

      {/* I-MEM */}
      <rect x="112" y="8" width="110" height="70" rx="4" fill={cFill} stroke={cStroke} strokeWidth="1.2" />
      <text x="167" y="33" textAnchor="middle" fontSize="13" fontWeight="700" fill={lbl} fontFamily="monospace">I-MEM</text>
      <line x1="122" y1="42" x2="212" y2="42" stroke="#161e2e" strokeWidth="0.8" />
      <text x="167" y="57" textAnchor="middle" fontSize="10" fill={val} fontFamily="monospace">ADD x1,x2,x3</text>

      {/* REG FILE */}
      <rect x="8" y="115" width="114" height="78" rx="4" fill={cFill} stroke={cStroke} strokeWidth="1.2" />
      <text x="65" y="135" textAnchor="middle" fontSize="12" fontWeight="700" fill={lbl} fontFamily="monospace">REG FILE</text>
      <line x1="18" y1="142" x2="112" y2="142" stroke="#161e2e" strokeWidth="0.8" />
      <text x="65" y="157" textAnchor="middle" fontSize="10" fill={val} fontFamily="monospace">x1=1  x2=2</text>
      <text x="65" y="172" textAnchor="middle" fontSize="10" fill={val} fontFamily="monospace">x3=3</text>

      {/* ALU (highlighted) */}
      <rect x="165" y="108" width="90" height="80" rx="4" fill="#141c28" stroke="#2e5080" strokeWidth="1.5" />
      <text x="210" y="130" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7aa0c0" fontFamily="monospace">ALU</text>
      <line x1="175" y1="138" x2="245" y2="138" stroke="#1e2e42" strokeWidth="0.8" />
      <text x="210" y="153" textAnchor="middle" fontSize="11" fill="#3a6070" fontFamily="monospace">a + b</text>
      <text x="210" y="170" textAnchor="middle" fontSize="11" fill="#2a6a7a" fontFamily="monospace">= 3</text>

      {/* Control Unit (dashed border) */}
      <rect x="78" y="205" width="132" height="44" rx="4" fill={cFill} stroke={cStroke} strokeWidth="1" strokeDasharray="4,3" />
      <text x="144" y="230" textAnchor="middle" fontSize="11" fontWeight="700" fill={lbl} fontFamily="monospace">Control Unit</text>

      {/* Active pulse dots */}
      <circle cx="112" cy="44"  r="3" fill={pulse} />
      <circle cx="122" cy="138" r="3" fill={pulse} />
      <circle cx="255" cy="150" r="3" fill={pulse} />

      {/* Output arrowhead */}
      <polyline points="312,146 318,150 312,154" stroke={aWire} strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function LogisimWindow() {
  return (
    <div
      style={{
        ...WIN_BASE,
        top: 0,
        right: 0,
        width: 460,
        height: 300,
        transform: 'translateZ(-20px)',
        zIndex: 1,
      }}
    >
      <Titlebar
        left={
          <span style={{ color: '#3a4d6a', fontSize: 11, fontFamily: 'monospace', letterSpacing: 0.3 }}>
            QUASAR · cpu_riscv.circ
          </span>
        }
      />

      <div style={{ display: 'flex', height: 268, overflow: 'hidden' }}>
        {/* Project-tree sidebar */}
        <div
          style={{
            width: 100,
            flexShrink: 0,
            background: '#0a0c16',
            borderRight: '1px solid #141e2e',
            padding: '8px 0',
          }}
        >
          {[
            { label: '▾ main',     indent: 0, active: false },
            { label: '▸ ALU',      indent: 1, active: true  },
            { label: '▸ Register', indent: 1, active: false },
            { label: '▸ Control',  indent: 1, active: false },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: `3px 8px 3px ${8 + item.indent * 10}px`,
                fontSize: 10,
                fontFamily: 'monospace',
                color: item.active ? '#4a7aaa' : '#253040',
                background: item.active ? 'rgba(30,55,85,0.35)' : 'transparent',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Circuit canvas */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <CircuitSVG />
        </div>
      </div>
    </div>
  )
}

// ─── Window 2: alu_operation.v ───────────────────────────────────────────────
function VerilogWindow() {
  return (
    <div
      style={{
        ...WIN_BASE,
        top: 80,
        right: 120,
        width: 420,
        height: 300,
        transform: 'translateZ(0px)',
        zIndex: 2,
      }}
    >
      <Titlebar
        left={
          <span style={{ color: '#4a6ab0', fontSize: 11, fontFamily: 'monospace' }}>
            alu_operation.v
          </span>
        }
        right={
          <span style={{ color: '#2a3a52', fontSize: 10, fontFamily: 'monospace' }}>
            Verilog · QUASAR
          </span>
        }
      />

      <div
        style={{
          height: 268,
          overflow: 'hidden',
          background: '#0c0e18',
          fontFamily: '"JetBrains Mono", "Fira Mono", monospace',
          fontSize: 10,
          lineHeight: '1.8',
          display: 'flex',
        }}
      >
        {/* Line numbers */}
        <div
          style={{
            width: 32,
            flexShrink: 0,
            padding: '8px 6px 8px 0',
            textAlign: 'right',
            color: '#252a3a',
            borderRight: '1px solid #141e2e',
            userSelect: 'none',
          }}
        >
          {CODE_LINES.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Syntax-highlighted code */}
        <div style={{ flex: 1, padding: '8px 0 8px 10px', overflow: 'hidden' }}>
          {CODE_LINES.map((toks, i) => (
            <div key={i} style={{ whiteSpace: 'pre' }}>
              {toks.map((tok, j) => (
                <span
                  key={j}
                  style={{ color: tok.c, fontStyle: tok.i ? 'italic' : undefined }}
                >
                  {tok.t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Public export ───────────────────────────────────────────────────────────
export function HeroWindowStack() {
  return (
    <div
      style={{
        width: 580,
        height: 400,
        position: 'relative',
        perspective: '1000px',
        flexShrink: 0,
      }}
    >
      {/* 3-D transform wrapper — both children inherit rotateY/X via preserve-3d */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: 'rotateY(18deg) rotateX(5deg)',
          transformOrigin: 'right center',
        }}
      >
        <LogisimWindow />
        <VerilogWindow />
      </div>
    </div>
  )
}
