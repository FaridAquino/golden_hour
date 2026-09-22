import { useEffect, useRef, useState } from 'react'
import './Reproductor.css'

// Solo una canción suena a la vez: la que empieza pausa a la anterior.
let sonandoAhora = null

const reloj = (s) => {
  if (!Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const r = Math.floor(s % 60)
  return `${m}:${String(r).padStart(2, '0')}`
}

export default function Reproductor({ archivo, titulo, artista }) {
  const ref = useRef(null)
  const [suena, setSuena] = useState(false)
  const [tiempo, setTiempo] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const a = ref.current
    return () => {
      if (sonandoAhora === a) sonandoAhora = null
    }
  }, [])

  function alternar() {
    const a = ref.current
    if (!a) return
    if (a.paused) {
      if (sonandoAhora && sonandoAhora !== a) sonandoAhora.pause()
      sonandoAhora = a
      a.play().catch(() => {})
    } else {
      a.pause()
    }
  }

  const avance = total > 0 ? (tiempo / total) * 100 : 0

  return (
    <div className={`tocar${suena ? ' suena' : ''}`}>
      <button
        type="button"
        className="tocar__burbuja"
        onClick={alternar}
        aria-label={`${suena ? 'Pausar' : 'Reproducir'} ${titulo}`}
      >
        <span className="tocar__onda" aria-hidden="true" />
        <span className="tocar__onda" aria-hidden="true" />
        <svg viewBox="0 0 18 18" aria-hidden="true">
          {suena ? (
            <>
              <rect x="5.4" y="4" width="2.6" height="10" rx="1.3" />
              <rect x="10" y="4" width="2.6" height="10" rx="1.3" />
            </>
          ) : (
            <path d="M6.2,3.8 C6.2,3.2 6.8,2.9 7.3,3.2 L14.4,8.4 C14.8,8.7 14.8,9.3 14.4,9.6 L7.3,14.8 C6.8,15.1 6.2,14.8 6.2,14.2 Z" />
          )}
        </svg>
      </button>

      <span className="tocar__texto">
        <span className="tocar__nombre">{titulo}</span>
        <span className="tocar__pie">
          <span>{artista}</span>
          <span>
            {reloj(tiempo)} / {reloj(total)}
          </span>
        </span>
        <span className="tocar__barra" aria-hidden="true">
          <span style={{ width: `${avance}%` }} />
        </span>
      </span>

      <audio
        ref={ref}
        src={`${import.meta.env.BASE_URL}musica/${encodeURIComponent(archivo)}`}
        preload="metadata"
        onPlay={() => setSuena(true)}
        onPause={() => setSuena(false)}
        onEnded={() => {
          setSuena(false)
          setTiempo(0)
        }}
        onTimeUpdate={(e) => setTiempo(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setTotal(e.currentTarget.duration)}
      />
    </div>
  )
}
