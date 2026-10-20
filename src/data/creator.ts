import type { DailyMission, IdeaBrief, SeriesIdea } from '../types'

export const dailyMissions: DailyMission[] = [
  {
    id: 'm-camera-1',
    title: 'Un plano, una decisión.',
    detail: 'Graba 10 segundos de algo cotidiano con un solo movimiento. Sin cortar, sin zoom, sin hablar. Al verlo, deberías saber por qué empezó y por qué terminó.',
    minutes: 10,
    tag: 'CÁMARA',
    link: '/camara',
    action: 'Abrir manual',
  },
  {
    id: 'm-audio-1',
    title: 'Escucha antes de mirar.',
    detail: 'Graba 20 segundos de ambiente en tu calle, cocina o estación. Escúchalo con auriculares y escribe qué historia te sugiere. No añadas música.',
    minutes: 8,
    tag: 'SONIDO',
    link: '/camara',
    action: 'Ver audio',
  },
  {
    id: 'm-write-1',
    title: 'El gancho sin adjetivos.',
    detail: 'Escribe la primera frase de tu próxima pieza con un hecho concreto. Prohibido: increíble, brutal, épico, no te vas a creer.',
    minutes: 6,
    tag: 'ESCRITURA',
    link: '/crear?tab=editar',
    action: 'Abrir edición',
  },
  {
    id: 'm-edit-1',
    title: 'Tres clips, una idea.',
    detail: 'Abre el material de ayer y elige solo tres clips. Escribe qué cambia entre el primero y el último. Si no cambia nada, no es una historia: es un álbum.',
    minutes: 12,
    tag: 'MONTAJE',
    link: '/crear?tab=editar',
    action: 'Abrir edición',
  },
  {
    id: 'm-shutter-1',
    title: 'La textura del movimiento.',
    detail: 'Graba agua o gente caminando a 1/50 y a 1/500. Mantén la misma luz. Elige la versión que se sienta más humana, no la más nítida.',
    minutes: 10,
    tag: 'PRO',
    link: '/camara?tab=ajustes',
    action: 'Ver recetas',
  },
  {
    id: 'm-detail-1',
    title: 'Un detalle que nadie filma.',
    detail: 'Busca una textura a menos de 30 cm: una pared, una tela, una verja. Sin personas. Solo luz, forma y encuadre.',
    minutes: 8,
    tag: 'MIRADA',
    link: '/rodar',
    action: 'Ver plan',
  },
  {
    id: 'm-permission-1',
    title: 'Practica pedir permiso.',
    detail: 'Aprende la frase en chino y úsala antes de grabar a alguien. Si la persona dice no, la toma no existe. El respeto también es parte del oficio.',
    minutes: 5,
    tag: 'VIAJE',
    link: '/rodar',
    action: 'Ver frases',
  },
  {
    id: 'm-series-1',
    title: 'Una serie, no un video.',
    detail: 'Escribe tres títulos de episodios sobre la misma obsesión. Si puedes imaginar diez, tienes una serie. Si solo uno, tienes una anécdota.',
    minutes: 10,
    tag: 'SISTEMA',
    link: '/crear',
    action: 'Abrir sistema',
  },
  {
    id: 'm-face-1',
    title: 'Tu cara, sin actuar.',
    detail: 'Grábate 60 segundos contando una escena concreta, no una opinión. Sin guion. Luego corta los primeros 20 segundos: probablemente esté ahí la verdad.',
    minutes: 8,
    tag: 'VOZ',
    link: '/crear?tab=editar',
    action: 'Abrir edición',
  },
  {
    id: 'm-review-1',
    title: 'Mira sin editar.',
    detail: 'Revisa diez clips seguidos y marca solo los dos que recordarías mañana. El resto no es malo: es material de archivo.',
    minutes: 15,
    tag: 'SELECCIÓN',
    link: '/crear?tab=editar',
    action: 'Abrir edición',
  },
  {
    id: 'm-volume-1',
    title: 'La prueba del móvil.',
    detail: 'Pon el último clip que te guste en el móvil a volumen bajo. ¿Se entiende? ¿La cara se ve? ¿El primer segundo agarra? Corrige una sola cosa y vuelve a mirar.',
    minutes: 7,
    tag: 'PUBLICAR',
    link: '/crear?tab=editar',
    action: 'Ver checklist',
  },
  {
    id: 'm-film-1',
    title: 'La regla de los 2 segundos.',
    detail: 'Graba un plano que empiece y termine quieto durante dos segundos. Esos márgenes son los que salvan un corte. Hazlo tres veces.',
    minutes: 10,
    tag: 'CÁMARA',
    link: '/camara',
    action: 'Abrir manual',
  },
  {
    id: 'm-color-1',
    title: 'Normal vs. D-Log M.',
    detail: 'Graba la misma escena con los dos perfiles. Aplica la LUT de conversión al D-Log M y compara. No uses el que “parece más pro”: usa el que puedes terminar.',
    minutes: 15,
    tag: 'COLOR',
    link: '/camara?tab=ajustes',
    action: 'Ver recetas',
  },
  {
    id: 'm-china-1',
    title: 'Un plano, cinco capas.',
    detail: 'Encuentra una escena y haz cinco versiones: general, medio, detalle, sonido y un movimiento. Es la base de cualquier secuencia de viaje.',
    minutes: 15,
    tag: 'RODAJE',
    link: '/rodar',
    action: 'Ver plan',
  },
  {
    id: 'm-energy-1',
    title: 'Decide tu día A/B/C.',
    detail: 'Marca un día A (90 minutos de trabajo profundo), dos B (20 minutos de mantenimiento) y un C (descanso real) en tu semana. El descanso también se planifica.',
    minutes: 5,
    tag: 'ENERGÍA',
    link: '/crear',
    action: 'Abrir sistema',
  },
  {
    id: 'm-money-1',
    title: 'Ponle número al plan.',
    detail: 'Usa la calculadora de ingresos. ¿Cuántos clientes necesitas al mes para tu objetivo? Si el número te asusta, baja el ticket o sube el plazo.',
    minutes: 5,
    tag: 'NEGOCIO',
    link: '/crear?tab=ingresos',
    action: 'Abrir calculadora',
  },
  {
    id: 'm-copy-1',
    title: 'Copia el encuadre, no la historia.',
    detail: 'Elige un plano que admires y rehazlo con un objeto de tu casa. Cambia el sujeto, la luz y el sonido. Copiar la estructura no es copiar la mirada.',
    minutes: 12,
    tag: 'REFERENCIA',
    link: '/crear?tab=editar',
    action: 'Abrir edición',
  },
  {
    id: 'm-rest-1',
    title: 'Sal sin cámara.',
    detail: 'Camina 30 minutos sin grabar. Vuelve y escribe cinco sonidos que recuerdes. La próxima vez que grabes, empieza por el que te haya quedado.',
    minutes: 30,
    tag: 'ENERGÍA',
    link: '/crear',
    action: 'Abrir sistema',
  },
]

export const ideaBriefs: IdeaBrief[] = [
  {
    id: 'idea-1',
    title: 'El inventario de lo que no entiendo',
    tag: 'VOZ PROPIA',
    premise:
      'Una pieza sobre las cosas que sigues sin comprender del viaje, contada como una lista íntima y no como un tutorial. Tú eres el que aprende, no el que explica.',
    why: 'La curiosidad es más magnética que la autoridad. Y nadie puede copiar tu lista porque nadie ha vivido tu versión del desconcierto.',
    opening:
      'Primer plano de una libreta con tres palabras escritas a mano. Tu voz, fuera de cámara: “Hay cosas de China que todavía no sé explicar”.',
    beats: [
      'Cada cosa que no entiendes se presenta con un objeto o un gesto: el menú, el gesto de pedir la cuenta, el sentido de una fila.',
      'No resuelvas todas. Resuelve una al final y deja las otras abiertas: la falta de cierre es el tema.',
      'Vuelve a la libreta. La última página está en blanco: eso es lo que todavía te queda por vivir.',
    ],
    constraint: 'Sin datos de Wikipedia. Todo lo que digas tiene que ser una observación tuya o una pregunta que hiciste a alguien.',
    format: '45–60 s · voz en off + planos del viaje',
  },
  {
    id: 'idea-2',
    title: 'La ruta de una botella de agua',
    tag: 'OBJETO',
    premise:
      'Sigue un objeto anónimo durante un día. Una botella, una taza, un billete. El objeto cambia de manos y de significado, y con él se cuenta el viaje.',
    why: 'Un objeto concreto da continuidad a un relato que, si no, sería una sucesión de paisajes. Y no requiere entrevistas ni permisos.',
    opening:
      'Primer plano del objeto sobre una mesa. Una mano lo coge. Corte directo a la calle: el mismo objeto, otro fondo.',
    beats: [
      'Muestra tres lugares distintos con el objeto en el mismo tipo de encuadre. La repetición hace el tiempo visible.',
      'Incluye un momento en que el objeto casi se pierde o se olvida. Ahí nace la tensión.',
      'Devuélvelo a la basura o a un bolsillo. El final es la desaparición, no la conclusión.',
    ],
    constraint: 'El objeto no puede hablar ni ser el centro de todos los planos. Es una presencia, no un protagonista.',
    format: '30–45 s · 6–8 planos · sonido directo',
  },
  {
    id: 'idea-3',
    title: 'La ciudad a la altura de los tobillos',
    tag: 'ÁNGULO',
    premise:
      'Todo el video está grabado por debajo de la rodilla: bordillos, zapatos, charcos, ruedas, escalones. La ciudad se entiende desde allí.',
    why: 'Cambiar la altura es la forma más barata de cambiar la mirada. Y la Pocket 3 está hecha para grabar cerca del suelo sin que parezca un truco.',
    opening:
      'Cámara a ras del suelo, un pie baja de un bordillo. El golpe del zapato es el único sonido.',
    beats: [
      'Avanza por texturas: baldosa, rejilla, tierra, mármol. Un lugar nuevo cada dos planos.',
      'Introduce una persona desde los pies: camina, se detiene, espera. No enseñes la cara hasta el final.',
      'Termina con tu propio pie en un umbral. El cambio de suelo es el cambio del viaje.',
    ],
    constraint: 'Ningún plano por encima de 50 cm. Si la cara no entra, no la fuerces: el tema es el suelo.',
    format: '20–30 s · sin voz · sonido del ambiente',
  },
  {
    id: 'idea-4',
    title: 'El sonido que no sale en las fotos',
    tag: 'SONIDO',
    premise:
      'Cada transición nace de un sonido real: una campana, una puerta, un anuncio, una bici. La imagen llega después, como si el lugar te llamara.',
    why: 'El sonido hace que un video de viaje se sienta vivido en vez de visto. Y casi nadie construye su edición alrededor de él.',
    opening:
      'Pantalla negra con el sonido de una puerta que se abre. Dos segundos después, la imagen.',
    beats: [
      'Graba primero el sonido y luego busca qué imagen lo explica mejor. No al revés.',
      'Usa tres sonidos contrastados: interior/exterior, natural/mecánico, humano/solitario.',
      'Cierra con el sonido del primer plano, pero sin imagen. El último sentido que se queda es el oído.',
    ],
    constraint: 'Cero música. Solo sonido directo y, como mucho, una textura grabada por ti.',
    format: '40–60 s · video collage',
  },
  {
    id: 'idea-5',
    title: 'El precio de una postal',
    tag: 'META',
    premise:
      'Muestra lo que hay detrás de un plano bonito: la espera, los intentos, la gente que se aparta, el turista que se cuela. La postal deja de ser un objeto y se vuelve una escena.',
    why: 'Rompe la ilusión de que viajar es producir imágenes perfectas. Es honesto, entretenido y profundamente tuyo.',
    opening:
      'Split screen: la foto perfecta en un lado, el caos del otro. Sin texto. El contraste es el gancho.',
    beats: [
      'Enseña tres intentos fallidos del mismo plano, con el sonido de tu respiración y la gente pasando.',
      'Cuenta el coste real: minutos, sudor, una cola, un plano que no salió.',
      'Termina con el mejor intento, no con el perfecto. Es más creíble.',
    ],
    constraint: 'No expliques la lección. No digas “todo esfuerzo vale la pena”. Que el montaje lo diga.',
    format: '30 s · montaje rápido + voz en off breve',
  },
  {
    id: 'idea-6',
    title: 'Lo que el mapa no te dice',
    tag: 'BÚSQUEDA',
    premise:
      'Ve de un punto A a un punto B sin mapas. Pregunta a desconocidos. El video no es el destino: es la cadena de gestos y personas que te llevan.',
    why: 'La vulnerabilidad de preguntar genera escenas imprevisibles. Y cada persona que ayuda deja una huella distinta.',
    opening:
      'Plano de la pantalla del móvil en modo avión. Tu voz: “Hoy no voy a usar el mapa”.',
    beats: [
      'Encadena tres intentos de pregunta. Alguno falla. El fallo es necesario.',
      'Graba manos señalando y calles desde la altura de los ojos. No grabes caras sin permiso.',
      'Llega al destino y muestra el objeto que ibas a buscar. Que sea pequeño: el contraste es el chiste.',
    ],
    constraint: 'El destino no puede ser un monumento. Mejor una panadería, una papelería o una parada de autobús.',
    format: '60 s · cámara en mano + subtítulos',
  },
  {
    id: 'idea-7',
    title: 'El gesto que sustituye una frase',
    tag: 'LENGUAJE',
    premise:
      'Una pequeña enciclopedia de gestos que usaste para comunicarte sin hablar: pedir la cuenta, decir “no”, señalar la talla, pedir que bajes el volumen.',
    why: 'Todos hemos estado ahí. El humor no viene de burlarse del idioma, sino de reconocer lo torpes que somos cuando no podemos hablar.',
    opening:
      'Tus manos haciendo tres gestos seguidos, sin contexto. Luego aparece el lugar donde funcionaron.',
    beats: [
      'Cada gesto se presenta con su traducción y una escena real, no con una lista de vocabulario.',
      'Incluye un gesto mal entendido. La torpeza es el corazón de la pieza.',
      'Cierra con un gesto que no necesita traducción: una sonrisa, un pulgar, un brindis.',
    ],
    constraint: 'Nada de tono de profesor. No enseñes chino: cuenta tu versión torpe de comunicarte.',
    format: '30–45 s · serie de 5–8 capítulos',
  },
  {
    id: 'idea-8',
    title: 'La hora en que la ciudad cambia',
    tag: 'TIEMPO',
    premise:
      'El mismo encuadre a las 6:00, a las 13:00 y a las 21:00. Lo que cambia no es solo la luz: es quién ocupa la calle y qué se oye.',
    why: 'La repetición convierte un plano anodino en una historia. No necesitas moverte: necesitas volver.',
    opening:
      'El mismo plano, tres veces, con un rótulo mínimo: 06:00 / 13:00 / 21:00. Sin música.',
    beats: [
      'Encuentra un encuadre que tenga capas: calle, personas, fondo. Vuelve a la misma hora y al mismo sitio.',
      'Graba 20 segundos de sonido en cada visita. El audio te dirá cuál es el orden correcto.',
      'Une los tres planos con corte seco y deja que el último dure más. El tiempo lo hace todo.',
    ],
    constraint: 'No cambies el encuadre entre visitas. La cámara es el único elemento fijo.',
    format: '15–20 s · tríptico · serie',
  },
  {
    id: 'idea-9',
    title: 'El plano que no pude repetir',
    tag: 'HONESTIDAD',
    premise:
      'Empieza por la mejor imagen del viaje y cuenta por qué no la puedes volver a grabar: la luz, la persona, el azar. No es una lección: es una confesión.',
    why: 'Lo irrepetible es lo que diferencia un archivo de una memoria. Y te permite mostrar tu trabajo sin alardear.',
    opening:
      'El plano, entero, con el sonido original. Sin introducción. Después, tu voz: “Este plano existe porque llegué tarde a otra cosa”.',
    beats: [
      'Cuenta las condiciones que se alinearon. Sé concreto: la hora, el tren, la persona que pasó.',
      'Enseña el intento anterior, peor. La comparación da credibilidad.',
      'Cierra con una imagen del lugar sin gente. El vacío explica por qué el plano fue un regalo.',
    ],
    constraint: 'No uses la palabra “suerte” sin explicar qué hiciste para estar ahí. La suerte tiene preparación.',
    format: '45–60 s · voz en off + clip original',
  },
  {
    id: 'idea-10',
    title: 'La prueba de que estuve ahí',
    tag: 'MEMORIA',
    premise:
      'Reúne las pruebas físicas del viaje: entradas, recibos, una suela gastada, una tarjeta de embarque, una servilleta con una palabra. La historia se cuenta con esos restos.',
    why: 'Los objetos gastados son más expresivos que los selfies. Y permiten un video íntimo sin tener que grabar a nadie.',
    opening:
      'Cámara cenital sobre una mesa vacía. Una mano deja caer un recibo. Luego otro. Sin explicación.',
    beats: [
      'Cada objeto aparece con el sonido que le corresponde: papel, metal, tela. Nada de música épica.',
      'Ordena los objetos del más cotidiano al más personal. El último debe doler un poco.',
      'Termina con la mesa vacía otra vez. Lo que queda es el video, no los objetos.',
    ],
    constraint: 'No muestres tu cara. El video es un autorretrato sin retrato.',
    format: '30–45 s · bodegón sonoro',
  },
  {
    id: 'idea-11',
    title: 'El turno de noche de un creador',
    tag: 'SEGUNDA VÍA',
    premise:
      'No es un video de “5 AM hustle”. Es la hora real después del trabajo: la mesa, la cámara, el cansancio y una decisión pequeña. La segunda vía se construye así.',
    why: 'La mayoría del contenido de productividad enseña rutinas imposibles. Tú puedes mostrar la versión que cabe en una vida con empleo.',
    opening:
      'Reloj marcando la salida del trabajo. Plano de la cámara en la mochila, sin abrir. Tu voz: “Hoy no tengo ganas. Voy a grabar igual, pero menos”.',
    beats: [
      'Muestra el espacio real: mesa compartida, luz de lámpara, ruido de casa. No lo estilices demasiado.',
      'Haz una sola tarea pequeña en tiempo real: importar clips, escribir un gancho, exportar. Que se vea el progreso.',
      'Cierra con la cámara apagándose. No con un discurso de motivación.',
    ],
    constraint: 'Nada de frases de emprendedor. Ninguna promesa de libertad financiera. Solo el trabajo real de hoy.',
    format: '60–90 s · vlog ensayo · serie',
  },
  {
    id: 'idea-12',
    title: 'El tutorial que no quería hacer',
    tag: 'PROCESO',
    premise:
      'Explica un ajuste de la Pocket 3 mientras muestras el error que cometiste por no saberlo. El conocimiento nace de una metedura de pata, no de una ficha técnica.',
    why: 'Los tutoriales se copian; las cicatrices no. Además, el video se vuelve útil y personal al mismo tiempo.',
    opening:
      'Un plano de archivo con el problema visible: luces parpadeando, foco blando, audio con viento. “Esto lo grabé mal”.',
    beats: [
      'Muestra el fallo sin esconderlo. Explica qué ajuste lo habría evitado.',
      'Graba la solución en el mismo lugar, con el ajuste correcto. Compara los dos planos.',
      'Cierra con una regla de tres palabras que puedas recordar en el próximo viaje.',
    ],
    constraint: 'No empieces con “en este video te voy a enseñar”. Empieza con el error.',
    format: '40–60 s · tutorial corto · serie',
  },
]

export const seriesIdeas: SeriesIdea[] = [
  {
    id: 'serie-1',
    title: '17 sonidos de China',
    logline: 'Cada día del viaje se cuenta con un sonido y un plano que llega tarde.',
    format: '15–30 s · vertical · sin música',
    why: 'Está integrada en la estructura del viaje, no depende de la inspiración diaria y te obliga a escuchar. Después puede seguir en tu ciudad.',
    episodes: [
      'El vapor de los dim sum',
      'El pitido de las puertas del tren',
      'El motor del ferry',
    ],
  },
  {
    id: 'serie-2',
    title: 'No sé pedir esto',
    logline: 'Una guía honesta de pedir comida en China cuando no hablas el idioma. La torpeza es el formato.',
    format: '30–45 s · vertical · voz en off + subtítulos',
    why: 'Tiene tensión incorporada, no requiere ser experto y conecta con cualquiera que haya viajado. El humor nace de la situación, no de ridiculizar a nadie.',
    episodes: [
      'Pedí “lo mismo que él”',
      'El plato que parecía sopa',
      'El desayuno que se sirve en una bolsa',
    ],
  },
  {
    id: 'serie-3',
    title: 'La ciudad a 30 cm',
    logline: 'China desde el suelo: texturas, bordillos, ruedas, umbrales. Sin caras, sin postales.',
    format: '20 s · vertical · sonido directo',
    why: 'La Pocket 3 es ideal para grabar cerca y pasar desapercibida. Es una firma visual barata de producir y difícil de imitar sin tu ojo.',
    episodes: [
      'Un bordillo de Cantón',
      'Una persiana de Chongqing',
      'El mármol de una estación',
    ],
  },
  {
    id: 'serie-4',
    title: 'El turno invisible',
    logline: 'La gente que mantiene el viaje en pie antes de que lleguen los turistas.',
    format: '60–90 s · horizontal o vertical · entrevista breve',
    why: 'Da profundidad humana a un viaje que, si no, es solo estética. Requiere consentimiento, contexto y cuidado. Si no puedes hacerlo con respeto, no lo hagas.',
    episodes: [
      'El barrendero del Bund a las 6:00',
      'La mujer que sirve el desayuno antes de abrir',
      'El portero que explica los pisos de Chongqing',
    ],
  },
  {
    id: 'serie-5',
    title: 'Una ventana, 17 días',
    logline: 'El mismo encuadre desde cada hotel, tren o autobús. Solo cambia la ciudad.',
    format: '10 s · vertical · un sonido por ventana',
    why: 'El formato se puede repetir en cualquier viaje. Crea una firma reconocible y una serie que se completa sola.',
    episodes: [
      'Cantón, 6:12',
      'El tren a Shenzhen',
      'La ventana de Yangshuo',
    ],
  },
  {
    id: 'serie-6',
    title: 'El precio de la postal',
    logline: 'Lo que hay detrás de los planos bonitos: la espera, el intento fallido, el turista que se cruza.',
    format: '30–45 s · vertical · meta-viaje',
    why: 'Rompe la cuarta pared sin ser pretencioso y muestra proceso, no perfección. Ideal para construir confianza como creador.',
    episodes: [
      'El ferry sin turistas (intento 1)',
      'El Bund a las 6:00',
      'El plano que no salió',
    ],
  },
  {
    id: 'serie-7',
    title: 'Mi trabajo no es mi enemigo',
    logline: 'Cómo se construye una segunda vía creativa con las horas que sobran después de un empleo.',
    format: '60–90 s · cara a cámara + b-roll',
    why: 'No necesitas vender humo: tu restricción es el contenido. La audiencia son personas con la misma vida, no emprendedores a tiempo completo.',
    episodes: [
      'Grabo después del trabajo, aunque no tenga ganas',
      'El día que no publiqué',
      'Lo que cuesta una pieza (en horas)',
    ],
  },
  {
    id: 'serie-8',
    title: 'Cómo se dice sin hablar',
    logline: 'Un diccionario visual de gestos para sobrevivir cuando el idioma no alcanza.',
    format: '20–30 s · vertical · serie de 8',
    why: 'Es universal, visual y se puede grabar solo. Cada capítulo tiene una estructura clara sin necesidad de guion largo.',
    episodes: [
      'Pedir la cuenta',
      'Decir que no',
      'Preguntar si pica',
    ],
  },
]

export const creatorPrinciples = [
  {
    number: '01',
    title: 'Tu ventaja es el acceso, no el tema.',
    text: 'Cualquiera puede hacer “un vlog de China”. Muy pocos pueden hacer el tuyo: tu torpeza, tus horas de trabajo, la gente que te deja entrar. Haz una lista de lo que tienes a mano y otros no.',
  },
  {
    number: '02',
    title: 'Una serie vale más que un video viral.',
    text: 'La serie te obliga a repetir una idea hasta que se vuelve tuya. El algoritmo castiga la dispersión; la audiencia también. Elige un territorio y vuelve a él hasta que duela.',
  },
  {
    number: '03',
    title: 'Lo específico viaja mejor que lo genérico.',
    text: '“China es increíble” no le sirve a nadie. “El vapor de los dim sum de Cantón suena a esto” sí. Un detalle concreto atraviesa culturas; una conclusión general se olvida.',
  },
  {
    number: '04',
    title: 'La energía es inventario, no motivación.',
    text: 'No vas a estar inspirado todos los días después del trabajo. Diseña un sistema que funcione cuando estés cansado: una tarea pequeña, un estándar mínimo, un día de descanso real.',
  },
  {
    number: '05',
    title: 'Publicar no es terminar. Terminar es aprender.',
    text: 'Cada pieza debe darte una respuesta: qué retuvo, qué se compartió, qué te preguntaron. Si no mides nada, estás entreteniéndote, no construyendo.',
  },
  {
    number: '06',
    title: 'No pidas permiso para tener voz.',
    text: 'No necesitas un nicho perfecto, equipo profesional ni 10.000 seguidores para empezar. Necesitas una cámara, una obsesión y la disciplina de mirar dos veces.',
  },
]

export const energyTiers = [
  {
    id: 'energia-a',
    letter: 'A',
    title: 'Día profundo · 90 min',
    when: 'Una o dos veces por semana, idealmente sin trabajo al día siguiente.',
    tasks: 'Editar la pieza madre, escribir el guion, cerrar un cliente o hacer una entrevista.',
    rule: 'Una sola cosa. El móvil en otra habitación. Si no puedes sostener 90 minutos, haz 45.',
  },
  {
    id: 'energia-b',
    letter: 'B',
    title: 'Día mantenimiento · 20 min',
    when: 'Después del trabajo, antes de cenar o en el transporte.',
    tasks: 'Copiar clips, seleccionar 3 tomas, responder un mensaje, escribir un título, programar una publicación.',
    rule: 'No abras la app de edición para “ver qué sale”. Elige una tarea concreta y termínala.',
  },
  {
    id: 'energia-c',
    letter: 'C',
    title: 'Día de descanso · 0 pantallas',
    when: 'Dos días por semana, protegidos de verdad.',
    tasks: 'Caminar, leer, estar con gente, ver una película sin analizarla. Alimentar la mirada también es trabajar.',
    rule: 'El descanso no se gana. Se programa. Si no descansas, tu contenido se vuelve una obligación y se nota.',
  },
]

export const energyRules = [
  'No edites al llegar del trabajo. Primero come, camina 20 minutos y luego decide si es un día A, B o C.',
  'Ten un “kit de mínimos”: una tarea de 20 minutos que puedas hacer incluso sin energía. La constancia no necesita heroísmo.',
  'Agrupa decisiones: mismo formato de export, misma plantilla de títulos, mismos ajustes de cámara. Ahorra energía para lo que importa.',
  'El día antes de viajar, no grabes. Prepara tarjetas, ropa y backups. El viaje se pierde en la logística, no en la creatividad.',
  'Cada cuatro semanas, revisa qué te está drenando. Si una serie te da más pereza que curiosidad, cámbiala.',
]

export const editBeats = [
  {
    number: '01',
    title: 'Cold open · 0–3 s',
    description:
      'Una imagen o un sonido que contenga una pregunta. No un logo, no “hola”, no una intro. El espectador debe querer saber qué pasa antes de que se lo expliques.',
    example: 'Plano de una puerta que se cierra. Sonido del pestillo. Corte al lugar.',
  },
  {
    number: '02',
    title: 'Orientación · 3–8 s',
    description:
      'Dónde estás y qué está en juego, con la mínima información. Un rótulo, una frase, una imagen. Si necesitas diez segundos para explicarlo, no lo tienes claro.',
    example: '“Cantón, 6:40. El primer día que no entiendo nada”.',
  },
  {
    number: '03',
    title: 'Promesa · 1 frase',
    description:
      'Lo que el espectador va a obtener si se queda. No es un clickbait: es un contrato honesto. “Voy a pedir comida sin hablar chino” es una promesa; “no te vas a creer lo que pasó” es una deuda.',
    example: '“Voy a intentar llegar a este sitio preguntando, sin mapa”.',
  },
  {
    number: '04',
    title: 'Escalada · 3 momentos',
    description:
      'Detalle, complicación, humana. Cada uno añade información nueva. Si el segundo no cambia el primero, sobra. Busca el momento en que la cosa se pone difícil.',
    example: 'Preguntas, malentendido, alguien te acompaña.',
  },
  {
    number: '05',
    title: 'Giro · 1 revelación',
    description:
      'La contradicción o la sorpresa. Puede ser cómica, incómoda o silenciosa. No tiene que ser un plot twist: puede ser una frase que reencuadra todo lo anterior.',
    example: '“La persona que me ayudó no hablaba inglés. Yo tampoco hablaba chino. Nos entendimos igual”.',
  },
  {
    number: '06',
    title: 'Cierre · deja una imagen',
    description:
      'Vuelve al inicio con otra mirada. Sin moraleja, sin “gracias por ver”, sin pedir tres cosas. El último plano debe quedarse en la cabeza un segundo más de lo que dura.',
    example: 'La puerta que se cierra. Ahora sabes qué hay detrás.',
  },
]

export const mobileWorkflow = [
  {
    number: '01',
    title: 'Ingesta · 10 min',
    steps: [
      'Copia los clips del día a una carpeta con nomenclatura: D03_BJ_001. No los dejes en la galería mezclados.',
      'Haz un backup de los archivos originales antes de tocar nada.',
      'Revisa audio y foco de cada clip durante 2 segundos. Marca los que no sirven.',
    ],
  },
  {
    number: '02',
    title: 'Selección · 8 min',
    steps: [
      'Para un video de 45 s, elige 8–12 clips como máximo. Más no es mejor: es más lento.',
      'Busca un cold open, tres momentos que avancen y un cierre. Si un clip no cambia la historia, fuera.',
      'Elige la toma más honesta, no la más bonita. Un plano con una persona tropezando puede valer más que uno perfecto.',
    ],
  },
  {
    number: '03',
    title: 'Audio primero · 8 min',
    steps: [
      'Coloca la voz o el sonido ambiente antes de montar la imagen. El audio marca el ritmo.',
      'Corta las pausas largas y los “eh”. No hace falta que suene a locutor.',
      'Baja la música 12–18 dB por debajo de la voz. Si no se entiende la frase, sube la voz, no bajes la música.',
    ],
  },
  {
    number: '04',
    title: 'Montaje · 12 min',
    steps: [
      'Corta en movimiento, no en reposo. Un brazo que pasa puede unir dos planos.',
      'Elimina transiciones decorativas. Un corte seco es más limpio que un giro de pantalla.',
      'Cada plano debe durar lo que necesite la información. Si dudas, quita un segundo.',
    ],
  },
  {
    number: '05',
    title: 'Color y texto · 5 min',
    steps: [
      'Aplica una sola conversión si grabaste D-Log M. Ajusta contraste y saturación con moderación.',
      'Subtítulos: revisa nombres propios y lugares. Los errores de subtítulos son más visibles que el ruido.',
      'Portada: un frame con una cara o un objeto reconocible. Texto de 3–5 palabras, no un párrafo.',
    ],
  },
  {
    number: '06',
    title: 'Salida · 3 min',
    steps: [
      'Exporta 1080×1920, 30 fps, H.264. Si es YouTube, mantén 16:9 y la calidad alta.',
      'Mira el video en el móvil, a volumen bajo y a plena luz. Si se entiende así, funciona.',
      'Guarda el proyecto y el master. Publica y anota una cosa que harías distinto.',
    ],
  },
]

export const clipSystem = {
  tree: `TUTO_CHINA_2026/
├── 00_RAW/
│   ├── D01_PEKIN/
│   ├── D02_PEKIN/
│   └── D03_MUTIANYU/
├── 01_SELECTS/
│   └── D01_PEKIN/
├── 02_AUDIO/
│   ├── ambientes/
│   └── notas_voz/
├── 03_PROJECTS/
│   └── pieza_01/
├── 04_EXPORTS/
└── 05_ARCHIVE/`,
  naming: 'D03_BJ_0027_hutong_amanecer.mp4',
  rules: [
    'Día, ciudad, número de clip, lugar, momento. Se entiende sin abrir el archivo.',
    'La tarjeta se queda intacta hasta que hay dos copias verificadas.',
    'No edites desde la tarjeta. Copia, verifica y luego monta.',
    'Una carpeta de selects por día. El resto es archivo, no fracaso.',
    'Al final del viaje, un archivo de audio con las notas de voz de cada día.',
  ],
}

export const publishChecklist = [
  { id: 'pub-1', label: 'El primer segundo se entiende sin explicación.' },
  { id: 'pub-2', label: 'La voz se escucha por encima de la música.' },
  { id: 'pub-3', label: 'Hay un detalle concreto, no solo una conclusión general.' },
  { id: 'pub-4', label: 'El video muestra algo que solo tú podías grabar.' },
  { id: 'pub-5', label: 'Los subtítulos están corregidos a mano.' },
  { id: 'pub-6', label: 'La portada tiene un sujeto claro a tamaño móvil.' },
  { id: 'pub-7', label: 'El final no pide like, comentario y suscripción a la vez.' },
  { id: 'pub-8', label: 'He visto la pieza entera en el móvil, sin saltarme nada.' },
]

export const incomePhases = [
  {
    number: '01',
    phase: 'Prueba pública',
    horizon: '0–30 días',
    goal: 'Tener 3 piezas que puedas enseñar sin vergüenza.',
    actions: [
      'Elige una serie y publica al menos 3 capítulos.',
      'Cuida audio, subtítulos y primer segundo. El resto puede ser imperfecto.',
      'Al final de cada pieza, anota una métrica: retención a 3 s, guardados o respuestas.',
    ],
    warning: 'No esperes a tener audiencia para empezar. La prueba es el trabajo, no el resultado.',
  },
  {
    number: '02',
    phase: 'Servicio directo',
    horizon: '1–3 meses',
    goal: 'Cobrar por resolver un problema concreto, no por “tener una marca”.',
    actions: [
      'Ofrece 3 verticales + 1 horizontal a un negocio local o a un creador que ya conozcas.',
      'Enseña 30 segundos de tu serie como prueba. No regales un proyecto entero.',
      'Cobra un depósito del 50% y define por escrito entregables y rondas de cambios.',
    ],
    warning: 'Los brand deals no son el primer ingreso. Son una consecuencia. Empieza por servicio.',
  },
  {
    number: '03',
    phase: 'Sistema recurrente',
    horizon: '3–6 meses',
    goal: 'Dos o tres clientes mensuales con un proceso repetible.',
    actions: [
      'Especialízate en un tipo de cliente: turismo, hostelería, gastronomía o creadores.',
      'Crea una plantilla de propuesta, un calendario de entregas y un precio base.',
      'Sube el precio cuando tengas resultados, no cuando tengas miedo.',
    ],
    warning: 'Más clientes no siempre es más ingresos. Si el sistema no escala, estás comprando un segundo trabajo.',
  },
  {
    number: '04',
    phase: 'Producto propio',
    horizon: '6–12 meses',
    goal: 'Vender algo que no dependa de tus horas: plantillas, guía, presets, comunidad.',
    actions: [
      'Lanza solo cuando te lo pidan al menos 5 veces.',
      'Convierte tu proceso en un activo pequeño: una guía de 20 páginas vale más que un curso infinito.',
      'Mide la lista de correo o los DMs, no solo los seguidores.',
    ],
    warning: 'No construyas un curso antes de tener una audiencia que pregunte. El producto no crea demanda.',
  },
]

export const incomeRules = [
  'Una audiencia no es un negocio. Un cliente sí. Separa las dos cosas desde el primer día.',
  'Vende una transformación concreta: “3 videos verticales al mes para que tu restaurante tenga presencia”, no “contenido de calidad”.',
  'El viaje es tu portfolio, no tu plan de ingresos. Los clientes que pagan están en tu ciudad o en internet, no en el Bund.',
  'No aceptes “hazlo gratis y te etiqueto”. El crédito no paga el alquiler.',
  'Antes de comprar más equipo, vende una pieza. El equipo no valida la oferta.',
  'Tu ventaja es que tienes un trabajo: puedes elegir clientes. No conviertas la necesidad de ingresos en permiso para decir sí a todo.',
]

export const incomeMetrics = [
  { label: 'Retención a 3 s', why: 'Si no aguantan el inicio, el resto no existe.' },
  { label: 'Guardados / compartidos', why: 'Son la señal de que el video sirve para algo más que entretener.' },
  { label: 'DMs con una pregunta concreta', why: 'Son el primer paso de una relación comercial o de comunidad.' },
  { label: 'Propuestas enviadas', why: 'Un negocio creativo se mide en conversaciones, no solo en vistas.' },
  { label: 'Clientes recurrentes', why: 'La estabilidad importa más que un pico de reproducciones.' },
]

export const thirtyDayPlan = [
  {
    days: '01–03',
    title: 'Elige una serie y una oferta.',
    tasks: [
      'Escribe 10 títulos posibles de la serie. Quédate con los 3 que podrías grabar en China.',
      'Define una oferta de servicio en una frase: para quién, qué resultado y en qué formato.',
      'Crea la carpeta del proyecto y prueba el flujo completo con 30 s de metraje.',
    ],
  },
  {
    days: '04–20',
    title: 'Modo captura.',
    tasks: [
      'Sigue el plan diario de esta app: no edites durante el viaje, solo graba y copia.',
      'Cada noche, elige 5 clips, escribe una nota de voz y verifica el backup.',
      'No publiques por obligación. El viaje es la materia prima, no el calendario.',
    ],
  },
  {
    days: '21–26',
    title: 'Edita tres piezas y una madre.',
    tasks: [
      'Elige los tres capítulos más fuertes de la serie. Edítalos con el flujo de 45 minutos.',
      'Monta una pieza más larga (3–5 min) con el arco del viaje.',
      'Pide a tres personas que vean el corte y anota en qué segundo se pierden.',
    ],
  },
  {
    days: '27–30',
    title: 'Publica y prueba la oferta.',
    tasks: [
      'Publica dos capítulos y la pieza madre en días distintos.',
      'Envía 5 propuestas a negocios o creadores concretos. Personaliza cada una.',
      'Revisa: qué pieza trajo más conversaciones, no más likes. Ajusta el siguiente mes.',
    ],
  },
]

export const creatorMetrics = ['Guardados', 'Compartidos', 'Respuestas', 'DMs', 'Suscripciones', 'Clientes']

export const formatPillars = [
  {
    label: 'Diario · 20 min',
    title: 'La nota de campo',
    text: 'Una imagen, un sonido, una frase. Se publica rápido y construye presencia. No pretende ser perfecta.',
    ideal: 'Stories, Shorts, TikTok',
  },
  {
    label: 'Semanal · 90 min',
    title: 'El capítulo',
    text: 'Una pieza de 30–90 s que desarrolla una idea de la serie. Aquí se construye la voz y la confianza.',
    ideal: 'Reels, Shorts, TikTok',
  },
  {
    label: 'Mensual · medio día',
    title: 'La pieza madre',
    text: 'El video que te gustaría enseñar dentro de un año. Más largo, más trabajado, con una historia completa.',
    ideal: 'YouTube, portfolio, clientes',
  },
]
