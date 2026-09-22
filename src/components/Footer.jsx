import { site } from '../content/site'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="pie col">
      <p>{site.pie}</p>
    </footer>
  )
}
