import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TegakiRenderer } from 'tegaki'
import caveat from 'tegaki/fonts/caveat'
import PaperCrumple from './PaperCrumple'
import './CartaEscrita.css'

// Tamaño de la hoja sin escalar. La hoja escrita y la que se arruga
// comparten estas medidas para que el cambio entre una y otra no se note.
const ANCHO = 340
const ALTO = 480
const ESCENA = 560
const PAPEL = '#f7efe4'
// La foto de la hoja se toma a 3x: más nítida que la pantalla, así no se ve borrosa
// cuando PaperCrumple la usa como textura.
const NITIDEZ = 3

// Tamaño de letra en % del ancho de la hoja: se parte de LETRA y se achica
// hasta que el texto quepa, sin bajar de LETRA_MIN.
const LETRA = 8
const LETRA_MIN = 4.2

// Pasa la hoja escrita (fondo + el canvas de Tegaki) a una imagen,
// que es lo que PaperCrumple sabe arrugar.
function fotografiar(hoja) {
  const caja = hoja.getBoundingClientRect()
  const k = (ANCHO * NITIDEZ) / caja.width
  const foto = document.createElement('canvas')
  foto.width = ANCHO * NITIDEZ
  foto.height = ALTO * NITIDEZ
  const ctx = foto.getContext('2d')
  ctx.imageSmoothingQuality = 'high'
  ctx.fillStyle = PAPEL
  ctx.fillRect(0, 0, foto.width, foto.height)
  for (const lienzo of hoja.querySelectorAll('canvas')) {
    const r = lienzo.getBoundingClientRect()
    ctx.drawImage(lienzo, (r.left - caja.left) * k, (r.top - caja.top) * k, r.width * k, r.height * k)
  }
  return foto.toDataURL('image/png')
}

export default function CartaEscrita({ texto, tinta = '#22382b', velocidad = 1, pausa = 900, pista }) {
  const escenaRef = useRef(null)
  const hojaRef = useRef(null)
  const textoRef = useRef(null)
  const [activa, setActiva] = useState(false)
  const [imagen, setImagen] = useState(null)

  // La hoja empieza a escribirse recién cuando aparece en pantalla.
  useEffect(() => {
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setActiva(true)
          observador.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    observador.observe(escenaRef.current)
    return () => observador.disconnect()
  }, [])

  // Achica la letra hasta que el texto entre en la hoja.
  useLayoutEffect(() => {
    const hoja = hojaRef.current
    const caja = textoRef.current?.element
    if (!hoja || !caja) return
    let letra = LETRA
    hoja.style.setProperty('--letra', `${letra}cqw`)
    while (caja.offsetHeight > hoja.clientHeight && letra > LETRA_MIN) {
      letra -= 0.2
      hoja.style.setProperty('--letra', `${letra}cqw`)
    }
  }, [activa, texto])

  function alTerminar() {
    // Un respiro con la carta terminada antes de volverla papel.
    setTimeout(() => {
      if (hojaRef.current) setImagen(fotografiar(hojaRef.current))
    }, pausa)
  }

  return (
    <div className="carta" ref={escenaRef}>
      {imagen ? (
        <PaperCrumple
          src={imagen}
          alt={texto}
          width={ANCHO}
          height={ALTO}
          sceneHeight={ESCENA}
          paperColor={PAPEL}
          releaseBehavior="creased"
          creaseStrength={0.25}
          shadowOpacity={0.25}
        />
      ) : (
        <div className="carta__escena" style={{ height: ESCENA }}>
          <div
            ref={hojaRef}
            className="carta__hoja"
            style={{ '--ancho': `${ANCHO}px`, aspectRatio: `${ANCHO} / ${ALTO}`, background: PAPEL }}
          >
            {activa && (
              <TegakiRenderer
                ref={textoRef}
                className="carta__texto"
                font={caveat}
                // Tegaki dibuja con más resolución que la pantalla para que la foto salga nítida.
                quality={{ pixelRatio: NITIDEZ / (window.devicePixelRatio || 1), smoothing: true }}
                time={{ mode: 'uncontrolled', speed: velocidad }}
                reducedMotion="user"
                onComplete={alTerminar}
                style={{ color: tinta }}
              >
                {texto}
              </TegakiRenderer>
            )}
          </div>
        </div>
      )}
      {pista && <p className={`carta__pista${imagen ? ' carta__pista--lista' : ''}`}>{pista}</p>}
    </div>
  )
}
