import { useEffect, useMemo, useRef, useState } from 'react'
import './Cifrado.css'

// Esto no cifra nada: el mensaje viaja en claro dentro de la página.
// Es un candado de juguete, y la gracia está en cómo se abre.

const GLIFOS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const alAzar = () => GLIFOS[Math.floor(Math.random() * GLIFOS.length)]

const normalizar = (s) =>
  s
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

const PASO = 14 // desfase entre un dial y el siguiente, en ms
const GIRO = 520 // lo que gira cada dial antes de encajar, en ms
const VELOCIDAD = 45 // ms por glifo mientras gira
const CUADRO = 40 // no repintamos los diales más seguido que esto

export default function Cifrado({ titulo, intro, mensaje, clave, etiqueta, boton, pista }) {
  const [valor, setValor] = useState('')
  const [estado, setEstado] = useState('cerrado') // cerrado | girando | abierto
  const [fallo, setFallo] = useState(false)
  const letras = useRef([])
  const sinMovimiento = useRef(false)

  // Las palabras se reparten en diales, uno por letra. Los espacios no son
  // diales: los pone el hueco entre palabras, así se conserva la forma del texto.
  const palabras = useMemo(() => {
    let k = 0
    return mensaje.split(' ').map((palabra) => [...palabra].map((ch) => ({ ch, k: k++ })))
  }, [mensaje])

  const claros = useMemo(() => mensaje.replace(/ /g, '').split(''), [mensaje])
  const total = claros.length

  useEffect(() => {
    sinMovimiento.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Cerrado: ruido quieto que tiembla de a pocos.
  useEffect(() => {
    if (estado !== 'cerrado') return

    letras.current.forEach((el) => {
      if (el) {
        el.textContent = alAzar()
        el.classList.remove('esta-fija')
      }
    })

    if (sinMovimiento.current) return

    const id = setInterval(() => {
      for (let n = 0; n < 6; n++) {
        const el = letras.current[Math.floor(Math.random() * total)]
        if (el) el.textContent = alAzar()
      }
    }, 110)

    return () => clearInterval(id)
  }, [estado, total])

  // Girando: cada dial recorre el alfabeto en orden y encaja por turno.
  useEffect(() => {
    if (estado !== 'girando') return

    const fijar = (k) => {
      const el = letras.current[k]
      if (el && !el.classList.contains('esta-fija')) {
        el.textContent = claros[k]
        el.classList.add('esta-fija')
      }
    }

    if (sinMovimiento.current) {
      for (let k = 0; k < total; k++) fijar(k)
      setEstado('abierto')
      return
    }

    const inicio = performance.now()
    const fin = total * PASO + GIRO
    let ultimo = 0
    let raf = 0

    const paso = (ahora) => {
      const t = ahora - inicio
      const girar = ahora - ultimo >= CUADRO
      if (girar) ultimo = ahora

      for (let k = 0; k < total; k++) {
        if (t >= k * PASO + GIRO) {
          fijar(k)
        } else if (girar) {
          const el = letras.current[k]
          if (el) el.textContent = GLIFOS[Math.floor(t / VELOCIDAD + k * 7) % GLIFOS.length]
        }
      }

      if (t < fin) raf = requestAnimationFrame(paso)
      else setEstado('abierto')
    }

    raf = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(raf)
  }, [estado, claros, total])

  function probar(e) {
    e.preventDefault()
    if (normalizar(valor) !== normalizar(clave)) {
      setFallo(true)
      return
    }
    setFallo(false)
    setEstado('girando')
  }

  const abierto = estado === 'abierto'

  return (
    <section className="cifrado col">
      <h2>{titulo}</h2>
      {!abierto && <p className="tenue">{intro}</p>}

      <p className="cifrado__texto" aria-hidden="true">
        {palabras.map((palabra, i) => (
          <span className="cifrado__palabra" key={i}>
            {palabra.map(({ k }) => (
              <span
                key={k}
                className="cifrado__letra"
                ref={(el) => {
                  letras.current[k] = el
                }}
              />
            ))}
          </span>
        ))}
      </p>

      {abierto ? (
        <p className="solo-lectores" role="status">
          {mensaje}
        </p>
      ) : (
        <form className={`cifrado__forma${fallo ? ' no-encaja' : ''}`} onSubmit={probar}>
          <label htmlFor="clave">{etiqueta}</label>
          <div className="cifrado__fila">
            <input
              id="clave"
              type="text"
              value={valor}
              onChange={(e) => {
                setValor(e.target.value)
                setFallo(false)
              }}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              disabled={estado === 'girando'}
            />
            <button type="submit" disabled={estado === 'girando'}>
              {boton}
            </button>
          </div>
          {fallo ? (
            <p className="cifrado__fallo" role="alert">
              Esa no es.
            </p>
          ) : (
            pista && <p className="cifrado__pista">{pista}</p>
          )}
        </form>
      )}
    </section>
  )
}
