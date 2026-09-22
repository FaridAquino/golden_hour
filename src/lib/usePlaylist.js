import { useCallback, useEffect, useState } from 'react'
import { aCanciones } from './csv'

// Los CSV viven en public/ para poder cambiarlos sin recompilar.
export default function usePlaylist(archivo) {
  const [canciones, setCanciones] = useState([])
  const [estado, setEstado] = useState('cargando')
  const [intento, setIntento] = useState(0)

  const reintentar = useCallback(() => setIntento((n) => n + 1), [])

  useEffect(() => {
    const control = new AbortController()
    const url = `${import.meta.env.BASE_URL}musica/${archivo}`

    setEstado('cargando')
    fetch(url, { signal: control.signal })
      .then((r) => {
        if (!r.ok) throw new Error(r.status)
        return r.text()
      })
      .then((texto) => {
        const lista = aCanciones(texto)
        setCanciones(lista)
        setEstado(lista.length ? 'lista' : 'vacia')
      })
      .catch((e) => {
        if (e.name !== 'AbortError') setEstado('error')
      })

    return () => control.abort()
  }, [archivo, intento])

  return { canciones, estado, reintentar }
}
