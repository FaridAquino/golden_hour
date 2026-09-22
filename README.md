# Flores amarillas

Una página para el 21 de setiembre: un ramo de tulipanes amarillos dibujado en SVG
y dos listas de canciones que se leen desde archivos CSV.

Pensada para abrirse en el celular.

## El sobre de entrada

Antes de la página hay un sobre cerrado con un listón. Tiembla en tandas cortas
—dos segundos quieto, una sacudida— y al tocarlo se desata el lazo, las dos
mitades del listón salen volando, la solapa se abate y salen ocho tulipanes.

Los textos están en `src/content/site.js`:

```js
sobre: {
  leyenda: 'para ti',      // lo escrito en el sobre
  pista: 'Toca para abrir',
},
```

Para cambiar las flores que salen, edita el arreglo `BROTES` en
`src/components/Sobre.jsx`: cada una lleva a dónde vuela (`x`, `y`), cuánto gira
(`r`), de qué tamaño es (`s`) y cuándo sale (`d`).

La página se monta cuando el sobre todavía se está desvaneciendo, así que los
tulipanes de verdad empiezan a crecer justo cuando se apagan los que salieron
volando. Con `prefers-reduced-motion` el sobre no tiembla y se abre de golpe.

## Cargar tu música

Las listas viven en `public/musica/` y se pueden editar sin tocar el código:

| Archivo | Sección |
| --- | --- |
| `public/musica/lista-1.csv` | primera lista |
| `public/musica/lista-2.csv` | segunda lista |

Formato: una fila de cabecera y una fila por canción.

```csv
titulo,artista,enlace,nota
Flores amarillas,Floricienta,https://open.spotify.com/track/...,La primera que aprendí
Amarillo,J Balvin,,
```

- **titulo** es la única columna obligatoria.
- **enlace** hace que la fila se abra en una pestaña nueva (Spotify, YouTube, lo que sea).
- **nota** aparece debajo, en cursiva, para una dedicatoria.

El lector es tolerante: acepta comas, punto y coma o tabulaciones como separador
(Excel en español exporta con punto y coma), comillas, acentos y BOM. También
reconoce cabeceras alternativas: `canción`, `tema`, `artist`, `url`, `link`,
`dedicatoria`. Si la primera fila no parece cabecera, lee las columnas en orden:
título, artista, enlace, nota.

Para exportar desde Excel o Google Sheets: **Archivo → Descargar → CSV**, y guarda
el archivo con ese nombre dentro de `public/musica/`.

## Las portadas y la canción

Cada lista tiene su portada y su canción, declaradas en `src/content/site.js`:

```js
portada: 'imagenes/goldenHour.jpg',
alt: 'Portada de golden hour, de JVKE',
audio: {
  archivo: 'JVKE - golden hour (official music video).mp3',
  titulo: 'golden hour',
  artista: 'JVKE',
},
```

Las imágenes van en `public/imagenes/` y los MP3 en `public/musica/`. El nombre
del archivo se escribe tal cual, con espacios y paréntesis incluidos: el código
lo codifica al pedirlo.

La portada llega pixelada y se resuelve a nítida cuando entra en pantalla
(componente `RefineFrame`, de [React Bits](https://reactbits.dev)). Se muestra a
300 px como máximo, así que no hace falta una imagen enorme, pero sí que llegue
a ese tamaño: `goldenHour.jpg` mide 300x300 y se ve justo, `sayYesToHeaven.webp`
mide 1200x1200 y sobra.

El botón de reproducción toca el MP3 en la misma página. Solo suena una canción
a la vez: al dar play a una, la otra se pausa sola.

## El mensaje cifrado

En `src/content/site.js`, dentro de `cifrado`:

```js
clave: 'hola',
mensaje: 'Hoy vi el cielo amarillo, ...',
pista: '',        // opcional, aparece bajo el campo
```

El texto se muestra como letras y cifras al azar, con la misma longitud y los
mismos espacios que el mensaje real. Al escribir la palabra y pulsar **Abrir**,
cada letra gira por el alfabeto y encaja por turno, de izquierda a derecha, como
los diales de un candado de combinación.

> Esto no es cifrado. El mensaje viaja en claro dentro del código de la página:
> cualquiera que abra el inspector puede leerlo. Es un juego, no un secreto.

## Cambiar los textos

Todo el texto está en `src/content/site.js`: la fecha, el titular, la dedicatoria,
el párrafo de "por qué hoy", los nombres de las dos listas y el pie.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173/golden_hour/
npm run build
npm run preview
```

## Publicar

1. Haz push a `main`.
2. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

El workflow `.github/workflows/deploy.yml` construye y publica en cada push.
Queda en https://faridaquino.github.io/golden_hour/

> `vite.config.js` usa `base: '/golden_hour/'`. Si cambia el nombre del repo, ajusta ese valor.

## Cómo está armado

```
src/
  content/site.js       textos
  styles/global.css     paleta, tipografía, la columna
  styles/pagina.css     portada y sección "por qué hoy"
  components/Tulipan    un tulipán en SVG (tallo, dos hojas, tres pétalos)
  components/Ramo       los cinco tulipanes y la animación de apertura
  components/Sobre        la puerta de entrada y su apertura
  components/Cifrado      el candado de diales
  components/Reproductor  el botón de play y su burbuja
  components/Playlist     portada, reproductor y lista
  components/RefineFrame  la portada que se resuelve (React Bits)
  lib/csv.js            lector de CSV
  lib/usePlaylist.js    carga el archivo y expone su estado
```

**Diseño.** El fondo es el cielo a la hora dorada: violeta arriba, ciruela cálida
en el horizonte. El amarillo se reserva para los tulipanes, nada más. Tipografía
Fraunces en cursiva para los títulos, Karla para la lectura.

**Movimiento.** Un solo momento al cargar: se traza el suelo, crecen los tallos,
se abren los pétalos escalonados. Después queda un vaivén lento. Al tocar un
tulipán se inclina y suelta un pétalo. Todo respeta `prefers-reduced-motion`:
sin movimiento, la escena aparece ya completa.

**Los tulipanes.** Para cambiar cuántos hay, su altura o su inclinación, edita el
arreglo `CANTERO` en `src/components/Ramo.jsx`.

**Botones.** Ninguno lleva contorno: son discos y píldoras rellenas, esmerilados
sobre el fondo, que se hunden al pulsarlos con un rebote corto. Mientras suena la
canción, el botón de play emite burbujas que se expanden y se apagan.

**RefineFrame** viene de React Bits con un solo cambio, marcado con un comentario
en el archivo: al desmontarse cancelaba su `requestAnimationFrame` sin poner el id
en cero, así que `wake()` creía para siempre que ya había un cuadro pedido y el
bucle no volvía a arrancar tras un remontaje. Con StrictMode eso pasa en cada
carga, y el lienzo se quedaba en negro. Si algún día actualizas el componente,
vuelve a aplicar ese arreglo.

El marco además solo se monta cuando la portada se acerca a la pantalla: en el
estado `queued` repinta el lienzo en cada cuadro, y no vale la pena gastar batería
en una imagen que nadie está viendo.

Trae `@hugeicons/react` y `@hugeicons/core-free-icons` como dependencias, aunque
esta página no muestra su chip de estado ni el botón de reintentar.
