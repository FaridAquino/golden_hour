import { useState } from 'react'
import Sobre from './components/Sobre'
import Ramo from './components/Ramo'
import Cifrado from './components/Cifrado'
import Playlist from './components/Playlist'
import Footer from './components/Footer'
import { site } from './content/site'
import './styles/pagina.css'

export default function App() {
  // La página nace detrás mientras el sobre todavía se está desvaneciendo,
  // así los tulipanes crecen justo cuando se apagan los que salieron volando.
  const [abierta, setAbierta] = useState(false)
  const [haySobre, setHaySobre] = useState(true)

  return (
    <>
      {haySobre && (
        <Sobre
          {...site.sobre}
          onRevelar={() => setAbierta(true)}
          onFin={() => setHaySobre(false)}
        />
      )}

      {abierta && (
        <div className="pagina">
          <header className="portada col">
            <p className="fecha">{site.fecha}</p>
            <h1>
              {site.titulo.map((linea, i) => (
                <span key={linea} className={i ? 'portada__eco' : undefined}>
                  {linea}
                </span>
              ))}
            </h1>

            <Ramo />

            <p className="dedicatoria">
              {site.dedicatoria.map((linea) => (
                <span key={linea}>{linea}</span>
              ))}
            </p>
          </header>

          <main>
            <section className="hoy col">
              <h2>{site.hoy.titulo}</h2>
              {site.hoy.parrafos.map((t) => (
                <p key={t} className="tenue">
                  {t}
                </p>
              ))}
            </section>

            <div className="col">
              <hr className="hilo" />
            </div>

            <Cifrado {...site.cifrado} />

            <div className="col">
              <hr className="hilo" />
            </div>

            {site.listas.map((lista) => (
              <Playlist key={lista.archivo} {...lista} />
            ))}
          </main>

          <Footer />
        </div>
      )}
    </>
  )
}
