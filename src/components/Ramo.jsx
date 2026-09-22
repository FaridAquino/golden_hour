import { useEffect, useRef, useState } from 'react'
import Tulipan from './Tulipan'
import './Ramo.css'

// alto de tallo, escala, inclinación y cuándo entra cada uno
const CANTERO = [
  { x: 42, alto: 126, escala: 0.82, inclinacion: -5, abierto: 16, retraso: 0.5 },
  { x: 96, alto: 168, escala: 0.95, inclinacion: -2, abierto: 14, retraso: 0.2 },
  { x: 164, alto: 194, escala: 1, inclinacion: 1, abierto: 15, retraso: 0 },
  { x: 232, alto: 156, escala: 0.92, inclinacion: 4, abierto: 17, retraso: 0.32 },
  { x: 292, alto: 118, escala: 0.8, inclinacion: 7, abierto: 15, retraso: 0.62 },
]

const SUELO = 252

export default function Ramo() {
  const [tocado, setTocado] = useState(null)
  const reloj = useRef(null)

  useEffect(() => () => clearTimeout(reloj.current), [])

  function tocar(i) {
    clearTimeout(reloj.current)
    setTocado(i)
    reloj.current = setTimeout(() => setTocado(null), 1800)
  }

  return (
    <div className="ramo">
      <svg
        viewBox="0 0 340 280"
        role="img"
        aria-label="Cinco tulipanes amarillos al atardecer"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="suelo" gradientUnits="userSpaceOnUse" x1="14" y1="0" x2="326" y2="0">
            <stop offset="0%" stopColor="#f7efe4" stopOpacity="0" />
            <stop offset="28%" stopColor="#f7efe4" stopOpacity="0.42" />
            <stop offset="72%" stopColor="#f7efe4" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#f7efe4" stopOpacity="0" />
          </linearGradient>
        </defs>

        <line
          className="linea-suelo"
          x1="14"
          y1={SUELO}
          x2="326"
          y2={SUELO}
          stroke="url(#suelo)"
          strokeWidth="1.25"
        />

        {CANTERO.map((t, i) => (
          <g key={t.x} transform={`translate(${t.x},${SUELO})`}>
            <Tulipan {...t} inclinado={tocado === i} onTocar={() => tocar(i)} />
          </g>
        ))}
      </svg>
    </div>
  )
}
