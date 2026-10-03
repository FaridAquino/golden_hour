import { useRef, useState } from 'react'
import './Vinilo.css'

// Un tocadiscos: el disco gira mientras suena y se queda quieto donde quedó al pausar.
export default function Vinilo({ archivo, titulo, artista, portada }) {
  const ref = useRef(null)
  const [suena, setSuena] = useState(false)

  function alternar() {
    const a = ref.current
    if (!a) return
    if (a.paused) a.play().catch(() => {})
    else a.pause()
  }

  return (
    <aside className={`vinilo${suena ? ' vinilo--suena' : ''}`}>
      <button
        type="button"
        className="vinilo__plato"
        onClick={alternar}
        aria-label={`${suena ? 'Pausar' : 'Reproducir'} ${titulo}, de ${artista}`}
        aria-pressed={suena}
      >
        <span className="vinilo__disco" aria-hidden="true">
          <img className="vinilo__etiqueta" src={`${import.meta.env.BASE_URL}${portada}`} alt="" />
        </span>
        {/* El brillo no gira: la luz del cuarto se queda quieta sobre el disco. */}
        <span className="vinilo__brillo" aria-hidden="true" />
        <span className="vinilo__eje" aria-hidden="true" />
        <svg className="vinilo__brazo" viewBox="0 0 60 160" aria-hidden="true">
          <circle cx="44" cy="14" r="11" />
          <path d="M44 14 L44 104 Q44 122 30 132" />
          <rect x="18" y="128" width="16" height="22" rx="3" transform="rotate(30 26 139)" />
        </svg>
      </button>

      <p className="vinilo__rotulo">
        <span className="vinilo__titulo">{titulo}</span>
        <span className="vinilo__artista">{artista}</span>
      </p>

      <audio
        ref={ref}
        src={`${import.meta.env.BASE_URL}musica/${encodeURIComponent(archivo)}`}
        preload="metadata"
        loop
        onPlay={() => setSuena(true)}
        onPause={() => setSuena(false)}
      />
    </aside>
  )
}
