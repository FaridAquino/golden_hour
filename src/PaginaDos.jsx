import CartaEscrita from './components/CartaEscrita'
import Vinilo from './components/Vinilo'
import { site } from './content/site'
import './styles/pagina.css'

export default function PaginaDos() {
  const { parte2 } = site

  return (
    <div className="pagina">
      <header className="col">
        <h1>{parte2.titulo}</h1>
      </header>

      <Vinilo {...parte2.vinilo} />

      <main>
        {parte2.estrofas.map((estrofa, i) => (
          <CartaEscrita key={i} texto={estrofa} velocidad={8} pista={i === 0 ? parte2.pista : undefined} />
        ))}
      </main>
    </div>
  )
}
