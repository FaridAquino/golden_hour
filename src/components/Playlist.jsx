import { useEffect, useRef, useState } from 'react'
import usePlaylist from '../lib/usePlaylist'
import RefineFrame from './RefineFrame'
import Reproductor from './Reproductor'
import './Playlist.css'

function Capullo() {
  return (
    <svg className="capullo" viewBox="0 0 12 11" aria-hidden="true">
      <path d="M6,11 C1.4,8 0.9,3.4 6,0 C11.1,3.4 10.6,8 6,11 Z" />
    </svg>
  )
}

function Cancion({ cancion }) {
  const cuerpo = (
    <>
      <Capullo />
      <span className="cancion__texto">
        <span className="cancion__titulo">{cancion.titulo}</span>
        {cancion.artista && (
          <span className="cancion__artista">{cancion.artista}</span>
        )}
        {cancion.nota && <span className="cancion__nota">{cancion.nota}</span>}
      </span>
    </>
  )

  return (
    <li className="cancion">
      {cancion.enlace ? (
        <a href={cancion.enlace} target="_blank" rel="noreferrer">
          {cuerpo}
        </a>
      ) : (
        <span>{cuerpo}</span>
      )}
    </li>
  )
}

// La portada llega pixelada y se resuelve cuando entra en pantalla.
// El marco solo se monta cerca de la pantalla: mientras está en 'queued'
// repinta el lienzo en cada cuadro, y no vale la pena hacerlo para una
// imagen que todavía nadie ve.
function Portada({ src, alt }) {
  const caja = useRef(null)
  const [cerca, setCerca] = useState(false)
  const [fase, setFase] = useState('queued')

  useEffect(() => {
    const el = caja.current
    if (!el) return
    const ojo = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return
        setCerca(true)
        ojo.disconnect()
      },
      { rootMargin: '250px' },
    )
    ojo.observe(el)
    return () => ojo.disconnect()
  }, [])

  useEffect(() => {
    if (!cerca) return
    const t = setTimeout(() => setFase('complete'), 260)
    return () => clearTimeout(t)
  }, [cerca])

  return (
    <div className="portada-disco" ref={caja}>
      {cerca ? (
        <RefineFrame
          status={fase}
          aspectRatio="1 / 1"
          width={300}
          radius={20}
          background="#241a30"
          color="#f7efe4"
          stageDuration={220}
          showStatus={false}
          hideAfter={0}
        >
          <img src={src} alt={alt} />
        </RefineFrame>
      ) : (
        <div className="portada-disco__hueco" />
      )}
    </div>
  )
}

export default function Playlist({
  titulo,
  descripcion,
  archivo,
  portada,
  alt,
  audio,
}) {
  const { canciones, estado, reintentar } = usePlaylist(archivo)

  return (
    <section className="lista col">
      {portada && (
        <Portada src={`${import.meta.env.BASE_URL}${portada}`} alt={alt} />
      )}

      <h2>{titulo}</h2>
      {descripcion && <p className="tenue">{descripcion}</p>}

      {audio && <Reproductor {...audio} />}

      {estado === 'cargando' && <p className="lista__aviso">Cargando la lista.</p>}

      {estado === 'error' && (
        <p className="lista__aviso">
          No se pudo cargar la lista.{' '}
          <button type="button" onClick={reintentar}>
            Reintentar
          </button>
        </p>
      )}

      {estado === 'lista' && (
        <ul className="canciones">
          {canciones.map((c) => (
            <Cancion key={c.id} cancion={c} />
          ))}
        </ul>
      )}
    </section>
  )
}
