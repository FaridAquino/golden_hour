import { useEffect, useRef, useState } from 'react'
import { PETALO, PETALO_CENTRO } from './Tulipan'
import './Sobre.css'

// La boca del sobre, en coordenadas del dibujo. De aquí salen las flores.
const BOCA = { x: 200, y: 152 }

// A dónde vuela cada flor, cuánto gira, de qué tamaño y cuándo sale.
const BROTES = [
  { x: -178, y: -132, r: -40, s: 1.35, d: 0 },
  { x: -100, y: -206, r: -20, s: 1.6, d: 60 },
  { x: -26, y: -244, r: -6, s: 1.45, d: 130 },
  { x: 46, y: -238, r: 12, s: 1.55, d: 90 },
  { x: 118, y: -196, r: 28, s: 1.3, d: 40 },
  { x: 184, y: -124, r: 44, s: 1.4, d: 150 },
  { x: -150, y: -70, r: -68, s: 1.1, d: 200 },
  { x: 158, y: -64, r: 68, s: 1.1, d: 230 },
]

function FlorSuelta() {
  return (
    <>
      <g transform="rotate(-15)">
        <path className="brote__petalo" d={PETALO} />
      </g>
      <g transform="rotate(15)">
        <path className="brote__petalo" d={PETALO} />
      </g>
      <path className="brote__petalo brote__petalo--centro" d={PETALO_CENTRO} />
    </>
  )
}

export default function Sobre({ leyenda, pista, onRevelar, onFin }) {
  const [fase, setFase] = useState('quieto')
  const sinMovimiento = useRef(false)
  const relojes = useRef([])

  useEffect(() => {
    sinMovimiento.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
  }, [])

  // Mientras el sobre está cerrado no hay nada que desplazar.
  useEffect(() => {
    const previo = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previo
    }
  }, [])

  useEffect(() => () => relojes.current.forEach(clearTimeout), [])

  function abrir() {
    if (fase !== 'quieto') return
    setFase('abriendo')
    const rapido = sinMovimiento.current
    relojes.current = [
      setTimeout(onRevelar, rapido ? 120 : 1250),
      setTimeout(onFin, rapido ? 420 : 1900),
    ]
  }

  return (
    <div className={`sobre${fase === 'abriendo' ? ' se-abre' : ''}`}>
      <button
        type="button"
        className="sobre__boton"
        onClick={abrir}
        aria-label="Abrir el sobre"
      >
        <svg
          className="sobre__dibujo"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect
            className="sobre__papel"
            x="80"
            y="152"
            width="240"
            height="170"
            rx="10"
          />

          <text className="sobre__leyenda" x="200" y="304" textAnchor="middle">
            {leyenda}
          </text>

          {/* La solapa se abate hacia arriba sobre su borde superior. */}
          <path className="sobre__solapa" d="M80,152 L200,250 L320,152 Z" />

          {BROTES.map((f) => (
            <g key={`${f.x}-${f.y}`} transform={`translate(${BOCA.x},${BOCA.y})`}>
              <g
                className="brote"
                style={{
                  '--x': `${f.x}px`,
                  '--y': `${f.y}px`,
                  '--r': `${f.r}deg`,
                  '--s': f.s,
                  '--d': `${f.d}ms`,
                }}
              >
                <FlorSuelta />
              </g>
            </g>
          ))}

          {/* El listón: dos medias bandas que se separan y un lazo que se deshace. */}
          <g className="sobre__liston" transform="translate(0,-40)">
            <rect className="banda banda--izq" x="80" y="228" width="120" height="17" />
            <rect className="banda banda--der" x="200" y="228" width="120" height="17" />
            <g className="lazo">
              <path
                className="lazo__cola"
                d="M196,243 C182,268 168,282 153,292 L167,301 C182,288 194,270 200,249 Z"
              />
              <path
                className="lazo__cola"
                d="M204,243 C218,268 232,282 247,292 L233,301 C218,288 206,270 200,249 Z"
              />
              <path
                className="lazo__vuelta"
                d="M200,236 C176,206 136,204 134,228 C132,252 172,254 200,236 Z"
              />
              <path
                className="lazo__vuelta"
                d="M200,236 C224,206 264,204 266,228 C268,252 228,254 200,236 Z"
              />
              <circle className="lazo__nudo" cx="200" cy="237" r="12" />
            </g>
          </g>
        </svg>
      </button>

      <p className="sobre__pista">{pista}</p>
    </div>
  )
}
