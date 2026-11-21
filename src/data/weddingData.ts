export interface WeddingDetails {
  brideName: string;
  groomName: string;
  venueName: string;
  city: string;
  phoneWhatsapp: string;
  googleScriptUrl: string;
}

export const weddingInfo: WeddingDetails = {
  brideName: 'Fatima',
  groomName: 'Luis',
  venueName: 'La Quebrada',
  city: 'La Esperanza',
  phoneWhatsapp: '50247442616',
  googleScriptUrl: 'https://script.google.com/macros/s/AKfycbyhbUQTz7wn4VriJC7bRBAOU9KgaRyOframzAS5_bP0InKOBXU0iz1ByUO1jsnlV8PI_w/exec'
};

/**
 * Música de fondo. El archivo va en public/music/ (sin acentos ni espacios en el nombre).
 * Los datos de crédito se muestran en el pie de página.
 */
export const backgroundMusic = {
  file: 'music/si-bheag-si-mhor.mp3',
  title: 'Sí Bheag, Sí Mhór',
  composer: "Turlough O'Carolan",
  performer: 'Stephen Murray Music'
};

/**
 * Itinerario. Por ahora la página muestra la hora y el título;
 * `description` y `location` quedan listos por si se quieren mostrar.
 */
export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
  location: string;
}

export const itineraryList: ItineraryItem[] = [
  {
    time: '11:30 AM',
    title: 'Recepción de invitados',
    description: 'Bienvenida al área campestre y acomodo en asientos.',
    location: 'La Villa'
  },
  {
    time: '11:45 AM',
    title: 'Ceremonia civil',
    description: 'Lectura de acta, votos matrimoniales, intercambio de anillos y firmas.',
    location: 'La Villa'
  },
  {
    time: '12:30 PM',
    title: 'Boquitas y fotos oficiales',
    description: 'Aperitivos mientras se realiza la sesión fotográfica en los jardines.',
    location: 'Jardines'
  },
  {
    time: '01:15 PM',
    title: 'Brindis y palabras de los novios',
    description: 'Servicio del almuerzo para compartir en familia en el salón.',
    location: 'La Casona'
  },
  {
    time: '01:30 PM',
    title: 'Almuerzo',
    description: 'Palabras de los recién casados, padres y brindis nupcial.',
    location: 'La Casona'
  },
  {
    time: '02:30 PM',
    title: 'Corte del pastel y café',
    description: 'Corte del pastel matrimonial acompañado de café recién preparado.',
    location: 'La Casona'
  },
  {
    time: '03:15 PM',
    title: 'Cierre del evento',
    description: 'Corte del pastel matrimonial acompañado de café recién preparado.',
    location: 'La Casona'
  }
];

/** Mesa de regalos (sección "Mesa de regalos"). */
export const giftRegistry = {
  store: 'CEMACO',
  listName: 'Boda Fatima y Luis · 20.12.2026',
  url: 'https://www.cemaco.com/list/BodaLuisyFatima20122026',
  // Para comprar en tienda: se da este número en caja
  eventNumber: '202611-00088'
};
