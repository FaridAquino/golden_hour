// Todo el texto de la página vive aquí.
export const site = {
  fecha: '21 de setiembre',
  titulo: ['flores', 'amarillas'],
  dedicatoria: ['Hoy se regalan cosas amarillas :b a mi me dieron una inca kola', 'Estas son para ti.'],

  // La puerta de entrada: el sobre cerrado.
  sobre: {
    leyenda: 'Para Ti :b',
    pista: 'Ábrelo',
  },

  hoy: {
    titulo: '¿por qué hoy?',
    parrafos: [
      'Porque no, digo yó, es la respuesta mas simple',
      'La verdad tenía planeado algo presencial perooo hubo inconvenientes...',
    ],
  },

  cifrado: {
    titulo: 'un mensaje',
    intro: 'Está cifrado. Escribe la palabra y se revelará por arte de magia 👻',
    etiqueta: 'Aquí ingresa la palabra (todo en minúscula y singular)',
    boton: 'Abrir',
    pista: 'Una pista: Lo peor son los 200 pinchasos',
    clave: 'gato',
    mensaje:
      'Hoy vi el cielo amarillo, desperté con el faro amarillo, y si no fuera por el color de mi sangre, mi corazón también sería amarillo',
  },

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

  pie: 'Gracias por abrir este sobre. Espero que te haya gustado. :b',

  // Botón al final de la página que lleva a /glow/.
  seguir: 'the glow',

  // Segunda página (/glow/): cada estrofa es una hoja que se escribe sola
  // cuando aparece en pantalla y luego se puede arrugar.
  parte2: {
    titulo: 'un poema',
    pista: 'Mantén presionada la hoja para arrugarla',
    // El tocadiscos de la izquierda: toca el disco para que suene.
    vinilo: {
      archivo: 'I Want Wind to Blow.mp3',
      titulo: 'I Want Wind to Blow',
      artista: 'The Microphones',
      portada: 'imagenes/The_Glow_pt._2.jpg',
    },
    estrofas: [
      `Hace un par de semanas que hablamos,
hace un par de semanas que solo pienso en los páramos,
hace un par de semanas que quedé embelesado con la idea de darte ramos.
No porque alguien se haya muerto, no porque alguien haya nacido,
sino porque una chica ha causado una turbulencia en mis sentidos.`,

      `Los poemas no se escriben cuando se debe, se escriben cuando uno quiere;
por eso escribo esto, porque presuntuosamente te quiero.
En esa noche en que más tardé en hablarte que en ponerme nervioso,
la razón fueron tus ojos, que se mueven como las aves en busca de reposo;
tus cachetes, que se ven tan suaves como masa de pan antes de entrar al horno,
y tu cabello, que, así como a Sansón le daba su fuerza, a ti te da lo hermoso.`,

      `Me hablas de ti, de lo que eres, de lo que sientes y de lo que te gusta ser.
Entiendo tus anhelos, trato de comprenderlos más de lo que me comprendo a mí,
pero la verdad es que el futuro es tan incierto como abstrusos son tus temas.`,

      `No te miento al decir que me cuesta pronunciarlo:
que la epidemiología, que la histología, que la embriología…
Si solo es poner "-logía" al final, yo solo te hablaría de "filo-logía":
te hablaría de que el sol brilla más con un beso en tu mejilla.`,

      `Estoy tan ansioso de conocer el todo de ti,
de saber qué significa tu nombre, qué significa Maryori.
Me pregunto a mí mismo: ¿tendrá que ver con el "MAR"?
¿Tendrá que ver con que a mi "YO" le empezaste a gustar?
¿Tendrá que ver con que me dejas "RI"sueño al hablar?
¿O será que simplemente estoy loco? Buscando razones de por qué me has de gustar.
Siendo consciente de que más tardaré en conocer el todo de ti que en morirme por ti.`,

      `Espero que este poema, atiborrado de sentimientos, no te cause alergia.
Tiene algo de gato, porque siete estrofas quise escribir;
tiene algo de calabaza, porque en pocos días Halloween ha de venir,
y esta rima solo la hice para que te puedas reír.`,

      `Espero que la salida, o cita, como quieras decirle, haya sido de tu gusto.
No puedo saber cuál será el futuro; solo puedo esperar el porvenir.
Por eso me quedé mirando al cielo mientras volvía al lugar donde nací,
para ver si el cielo tiene respuestas, ya que tantas citas vio pasar bajo su manto gris.`,
    ],
  },
}
