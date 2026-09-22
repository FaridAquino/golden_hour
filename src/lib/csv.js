// Lector de CSV tolerante: acepta comas, punto y coma o tabulaciones
// (Excel en español exporta con punto y coma), comillas y BOM.

const SEPARADORES = [',', ';', '\t', '|']

function detectarSeparador(texto) {
  const primera = texto.split(/\r?\n/, 1)[0] || ''
  const fuera = primera.replace(/"[^"]*"/g, '')
  let mejor = ','
  let max = 0
  for (const sep of SEPARADORES) {
    const n = fuera.split(sep).length - 1
    if (n > max) {
      max = n
      mejor = sep
    }
  }
  return mejor
}

export function parsearCSV(texto) {
  const limpio = texto.replace(/^﻿/, '')
  const sep = detectarSeparador(limpio)
  const filas = []
  let fila = []
  let campo = ''
  let enComillas = false

  for (let i = 0; i < limpio.length; i++) {
    const c = limpio[i]
    if (enComillas) {
      if (c === '"') {
        if (limpio[i + 1] === '"') {
          campo += '"'
          i++
        } else {
          enComillas = false
        }
      } else {
        campo += c
      }
    } else if (c === '"') {
      enComillas = true
    } else if (c === sep) {
      fila.push(campo)
      campo = ''
    } else if (c === '\n') {
      fila.push(campo)
      filas.push(fila)
      fila = []
      campo = ''
    } else if (c !== '\r') {
      campo += c
    }
  }
  if (campo !== '' || fila.length) {
    fila.push(campo)
    filas.push(fila)
  }

  return filas
    .map((f) => f.map((v) => v.trim()))
    .filter((f) => f.some((v) => v !== ''))
}

const ALIAS = {
  titulo: ['titulo', 'cancion', 'tema', 'nombre', 'title', 'song', 'track'],
  artista: ['artista', 'interprete', 'autor', 'artist', 'banda', 'grupo'],
  enlace: ['enlace', 'link', 'url', 'spotify', 'youtube'],
  nota: ['nota', 'dedicatoria', 'comentario', 'mensaje', 'porque'],
}

const normalizar = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z]/g, '')

function leerCabecera(fila) {
  const mapa = {}
  fila.forEach((celda, i) => {
    const clave = normalizar(celda)
    for (const [campo, alias] of Object.entries(ALIAS)) {
      if (mapa[campo] === undefined && alias.includes(clave)) mapa[campo] = i
    }
  })
  return mapa
}

// Devuelve las canciones. Si la primera fila no parece cabecera,
// se leen las columnas en orden: título, artista, enlace, nota.
export function aCanciones(texto) {
  const filas = parsearCSV(texto)
  if (!filas.length) return []

  const mapa = leerCabecera(filas[0])
  const tieneCabecera = mapa.titulo !== undefined
  const posiciones = tieneCabecera
    ? mapa
    : { titulo: 0, artista: 1, enlace: 2, nota: 3 }
  const datos = tieneCabecera ? filas.slice(1) : filas

  return datos
    .map((fila, i) => ({
      id: `${i}-${fila[posiciones.titulo] || i}`,
      titulo: fila[posiciones.titulo] || '',
      artista: fila[posiciones.artista] || '',
      enlace: fila[posiciones.enlace] || '',
      nota: fila[posiciones.nota] || '',
    }))
    .filter((c) => c.titulo !== '')
}
