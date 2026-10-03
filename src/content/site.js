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
      `Hace un par de semanas que hablamos
Hace un par de semanas que solo pienso en los páramos
Hace un par de semanas que quede embelesado con la idea de darte ramos
No porque alguien se ha muerto, no porque alguien ha nacido
Si no porque una chica a causado una turbulencia en mis sentidos`,

      `Los poemas no se escriben cuando se debe, se escriben cuando uno quiere
Por eso escribo esto, porque presuntuosamente te quiero
En esa noche donde más tardé en hablarte que en ponerme nervioso
La razón fue tus ojos, que se mueven como las aves en busca de reposo
En tus cachetes que se ven tan suaves como masa de pan antes de entrar al horno
Y en tu cabello que como a Sansón le da su fuerza a ti te da lo hermoso`,

      `Me hablas de ti, sobre lo que eres, sientes y te gusta ser
Entiendo tus anhelos, trato de comprenderlos más de lo que me comprendo a mi
Pero la verdad es que el futuro es tan incierto, como abstrusos son tus temas`,

      `No te miento al decir que me cuesta pronunciarlo
Que la epidemiología, que la histología, que la embriología
Que si solo es poner ología al final yo solo te hablaría de philogía
Te hablarían de que el sol brilla más con el acto de un beso en tu mejilla`,

      `Estoy tan ansioso de conocer el todo de ti
De que significa tu nombre, de que significa Maryori
Me pregunto a mi mismo, ¿Tendrá que ver con el MAR?,
¿Tendrá que ver con que a mi YO le empezaste a gustar?
¿Tendrá que ver cuando me dejas RIsueño al hablar?
¿O qué simplemente estoy loco pensándote en dar razones el porque me has de gustar?
Siendo consciente que más tardaré en conocer el todo de ti, que de morirme por ti`,

      `Espero que este poema atiborrado de sentimientos no cause alergia en ti
Tiene algo de gato porque 7 estrofas quiero escribir
Tiene algo de calabaza porque en pocos días Halloween a de venir
Esta rima solo la hice para que te puedas reír`,

      `Espero que la salida o cita como lo quieras decir, haya sido de buen gusto
No puedo saber cual será el futuro si no solo el porvenir
Por eso me quede mirando al cielo mientras volvía al lugar donde nací
Para ver si el cielo tiene respuestas ya que tantas citas vio pasar bajo su manto gris`,
    ],
  },
}
