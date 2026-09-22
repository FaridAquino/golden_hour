// Todo el texto de la página vive aquí.
export const site = {
  fecha: '21 de setiembre',
  titulo: ['flores', 'amarillas'],
  dedicatoria: ['Hoy se regalan flores amarillas.', 'Estas son para ti.'],

  // La puerta de entrada: el sobre cerrado.
  sobre: {
    leyenda: 'para ti',
    pista: 'Toca para abrir',
  },

  hoy: {
    titulo: 'por qué hoy',
    parrafos: [
      'El 21 de setiembre se celebra la llegada de la primavera, y desde hace unos años la costumbre viene con flores amarillas: se le regalan a quien uno quiere, sin más motivo que el día.',
      'Estos tulipanes no se marchitan. Tócalos.',
    ],
  },

  // El candado. No cifra nada de verdad: el mensaje está en el código.
  cifrado: {
    titulo: 'un mensaje',
    intro: 'Está cerrado. Escribe la palabra y los diales giran.',
    etiqueta: 'la palabra',
    boton: 'Abrir',
    pista: '',
    clave: 'hola',
    mensaje:
      'Hoy vi el cielo amarillo, desperté con el faro amarillo, y si no fuera por el color de mi sangre, mi corazón también sería amarillo',
  },

  // Cada lista lee su CSV y su canción desde public/musica/, y su portada
  // desde public/imagenes/.
  listas: [
    {
      titulo: 'para el día',
      descripcion: 'Lo que suena mientras dura la primavera.',
      archivo: 'lista-1.csv',
      portada: 'imagenes/goldenHour.jpg',
      alt: 'Portada de golden hour, de JVKE',
      audio: {
        archivo: 'JVKE - golden hour (official music video).mp3',
        titulo: 'golden hour',
        artista: 'JVKE',
      },
    },
    {
      titulo: 'para la noche',
      descripcion: 'Para cuando el cielo se ponga de este color.',
      archivo: 'lista-2.csv',
      portada: 'imagenes/sayYesToHeaven.webp',
      alt: 'Portada de Say Yes To Heaven, de Lana Del Rey',
      audio: {
        archivo: 'Lana Del Rey - Say Yes To Heaven (Official Audio).mp3',
        titulo: 'Say Yes To Heaven',
        artista: 'Lana Del Rey',
      },
    },
  ],

  pie: 'Un ramo que no se marchita.',
}
