export interface WeddingDetails {
  brideName: string;
  groomName: string;
  weddingDate: string;
  targetDate: string;
  venueName: string;
  venueAddress: string;
  city: string;
  stateCountry: string;
  theme: string;
  phoneWhatsapp: string;
  googleScriptUrl: string;
  themeColors: {
    name: string;
    hex: string;
    description: string;
  }[];
}

export const weddingInfo: WeddingDetails = {
  brideName: 'Fatima',
  groomName: 'Luis',
  weddingDate: 'Domingo 20 de Diciembre de 2026',
  targetDate: '2026-12-20T11:30:00',
  venueName: 'La Quebrada',
  venueAddress: 'Diagonal Santa Rita Final, Zona 2',
  city: 'La Esperanza',
  stateCountry: 'Quetzaltenango, Guatemala',
  theme: 'Boda Civil · Celeste y Blanco con Hortensias',
  phoneWhatsapp: '50247442616',
  googleScriptUrl: 'https://script.google.com/macros/s/AKfycbzTn6YVCtQ8JfGNNERmmt7LF7q6vrpWLhFUDwiYo-PKpUEOp5LfehBDLV7iAElxjF880Q/exec',
  themeColors: [
    { name: 'Celeste', hex: '#64b5ec', description: 'Tono hortensia suave y cielo despejado' },
    { name: 'Azul Hortensia', hex: '#1b67a2', description: 'Profundidad floral y elegancia' },
    { name: 'Blanco Marfil', hex: '#ffffff', description: 'Pureza en pétalos de rosa y gypsophila' },
    { name: 'Dorado', hex: '#bfa369', description: 'Detalle de anillos y monograma nupcial' }
  ]
};

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  description: string;
  location: string;
  badge?: string;
  iconType: 'floret-celeste' | 'flower-rose-white' | 'floret-white';
  iconName: string;
}

export const itineraryList: ItineraryItem[] = [
  {
    id: 'it-1',
    time: '11:30 AM',
    title: 'Recepción de Invitados',
    description: 'Bienvenida al área campestre y acomodo en asientos.',
    location: 'La Villa',
    badge: 'La Villa',
    iconType: 'floret-celeste',
    iconName: 'GlassWater'
  },
  {
    id: 'it-2',
    time: '11:45 AM',
    title: 'Ceremonia Civil Notarial',
    description: 'Lectura de acta, votos matrimoniales, intercambio de anillos y firmas.',
    location: 'La Villa',
    badge: 'Puntual',
    iconType: 'flower-rose-white',
    iconName: 'Heart'
  },
  {
    id: 'it-3',
    time: '12:40 PM',
    title: 'Boquitas & Fotos Oficiales',
    description: 'Aperitivos mientras se realiza la sesión fotográfica en los jardines.',
    location: 'Jardines',
    badge: 'Jardines',
    iconType: 'floret-white',
    iconName: 'Wine'
  },
  {
    id: 'it-4',
    time: '01:15 PM',
    title: 'Banquete de Almuerzo',
    description: 'Servicio del almuerzo para compartir en familia en el salón.',
    location: 'La Casona',
    badge: 'La Casona',
    iconType: 'floret-celeste',
    iconName: 'Utensils'
  },
  {
    id: 'it-5',
    time: '02:15 PM',
    title: 'Brindis Oficial & Palabras',
    description: 'Palabras de los recién casados, padres y brindis nupcial.',
    location: 'La Casona',
    iconType: 'floret-white',
    iconName: 'Sparkles'
  },
  {
    id: 'it-6',
    time: '02:40 PM',
    title: 'Corte de Pastel y Café',
    description: 'Corte del pastel matrimonial acompañado de café recién preparado.',
    location: 'La Casona',
    iconType: 'floret-celeste',
    iconName: 'Cake'
  }
];

export const scheduleList = itineraryList;

export const demoGuestsData: Record<string, { nombre: string; adultos: number; ninos: number; pases: number; nota: string }> = {
  '1': { nombre: 'Familia Morales Méndez', adultos: 2, ninos: 1, pases: 3, nota: 'Mesa de Honor reservada' },
  '2': { nombre: 'Lic. Carlos Castillo y Acompañante', adultos: 2, ninos: 0, pases: 2, nota: '' },
  'demo': { nombre: 'Familia Tezó Gómez', adultos: 3, ninos: 2, pases: 5, nota: '¡Nos llena de alegría contar con ustedes!' }
};

export const storyMilestones = [
  {
    id: 'm1',
    year: '2026',
    date: '20 de Diciembre de 2026',
    title: 'Nuestra Boda Civil',
    location: 'La Quebrada, Quetzaltenango',
    tag: 'El Gran Día',
    description: 'Con la bendición de Dios y de nuestras familias, celebramos nuestra unión matrimonial.'
  }
];

export const registryList = [
  {
    id: 'sobres',
    title: 'Lluvia de Sobres',
    category: 'Muestra de Cariño',
    description: 'Su presencia es nuestro mejor regalo. Dispondremos de un buzón para sobres en la recepción.',
    goalAmount: 1000,
    currentAmount: 1000,
    suggestedContribution: 100,
    icon: 'HeartHandshake'
  }
];

export const initialGuestbookEntries = [
  {
    id: 'gb-1',
    name: 'Familia Tezó Gómez',
    relationship: 'Familia',
    message: '¡Que Dios bendiga grandemente esta hermosa unión matrimonial de Fatima y Luis!',
    date: 'Hoy'
  }
];

export const entourageList = [
  {
    id: 'e1',
    name: 'Testigos de Honor',
    role: 'Testigos',
    relation: 'Familia y Amigos',
    description: 'Acompañándonos con amor en las firmas de nuestra acta matrimonial notarial.'
  }
];
