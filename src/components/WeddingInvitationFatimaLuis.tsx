import React, { useState, useEffect } from 'react';
import {
  weddingInfo,
  itineraryList,
  backgroundMusic
} from '../data/weddingData';
import { InvitationHero } from './InvitationHero';
import { BottomBouquets, MeadowDivider, SprigDivider } from './WatercolorFlowers';
import {
  HeartIcon,
  CheckCircleIcon,
  EnvelopeOpenIcon,
  CalendarPlusIcon,
  DownloadSimpleIcon,
  CopyIcon,
  NavigationArrowIcon,
  CarIcon,
  WhatsappLogoIcon,
  MinusIcon,
  PlusIcon
} from '@phosphor-icons/react';

interface GuestData {
  id: string;
  nombre: string;
  adultos: number;
  ninos: number;
  pases: number;
  nota: string;
}

interface WeddingInvitationFatimaLuisProps {
}

/**
 * Selector de cantidad con botones − / +. Reemplaza a <input type="number">,
 * cuyas flechitas no aparecen en celulares; así nadie tiene que escribir y el
 * valor nunca sale del rango de pases asignados.
 */
function Stepper({ label, value, min, max, onChange }: {
  label: string; value: number; min: number; max: number; onChange: (n: number) => void;
}) {
  const btn =
    'w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-lg border border-line bg-white text-blue ' +
    'hover:bg-mist active:scale-90 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer transition';
  return (
    <div role="group" aria-label={label}>
      <p className="block text-base md:text-lg font-semibold text-ink mb-1.5">{label}</p>
      <div className="flex items-center justify-between gap-2 px-1.5 py-1.5 rounded-full border border-line bg-white shadow-sm">
        <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Quitar ${label.toLowerCase()}`}>
          <MinusIcon weight="bold" />
        </button>
        <span className="font-serif text-2xl text-ink tabular-nums" aria-live="polite">{value}</span>
        <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`Agregar ${label.toLowerCase()}`}>
          <PlusIcon weight="bold" />
        </button>
      </div>
      <p className="text-sm text-muted mt-1">máximo {max}</p>
    </div>
  );
}

/**
 * Sección con revelado al hacer scroll (título y contenido suben y aparecen).
 * `top`: adorno arriba del título (p. ej. un ramito); `bottom`: adorno pegado
 * al borde inferior (p. ej. la pradera de flores).
 */
function Section({ title, id, children, top, bottom }: {
  title: string; id: string; children: React.ReactNode; top?: React.ReactNode; bottom?: React.ReactNode;
}) {
  return (
    <section className="sec" id={id}>
      {top}
      {title && <h2 className="reveal-item">{title}</h2>}
      <div className="reveal-item delay-150">{children}</div>
      {bottom}
    </section>
  )
}

export const WeddingInvitationFatimaLuis: React.FC<WeddingInvitationFatimaLuisProps> = ({

}) => {
  // Guest state
  const [currentGuest, setCurrentGuest] = useState<GuestData>({
    id: '',
    nombre: 'Familia y Amigos',
    adultos: 2,
    ninos: 0,
    pases: 2,
    nota: ''
  });
  const [isLoadingGuest, setIsLoadingGuest] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // RSVP Form state
  const [guestNameInput, setGuestNameInput] = useState('Familia y Amigos');
  const [attendanceStatus, setAttendanceStatus] = useState<'yes' | 'no'>('yes');
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(0);
  const [guestNote, setGuestNote] = useState('');
  const [rsvpSent, setRsvpSent] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');
  // El botón flotante aparece solo después de pasar la portada
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    // Visible entre la portada y el formulario de confirmación (ahí ya no hace falta)
    const onScroll = () => {
      const rsvp = document.getElementById('rsvp');
      const beforeRsvp = !rsvp || rsvp.getBoundingClientRect().top > window.innerHeight * 0.6;
      setPastHero(window.scrollY > window.innerHeight * 0.6 && beforeRsvp);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Countdown state
  const [countdown, setCountdown] = useState({
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--'
  });


  // Update countdown
  useEffect(() => {
    const targetDate = new Date(2026, 11, 20, 11, 30, 0).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown({
          days: d < 10 ? '0' + d : String(d),
          hours: h < 10 ? '0' + h : String(h),
          minutes: m < 10 ? '0' + m : String(m),
          seconds: s < 10 ? '0' + s : String(s)
        });
      } else {
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Apply guest data helper
  const applyGuestData = (data: Partial<GuestData>) => {
    setCurrentGuest((prev) => {
      const updated = { ...prev, ...data };
      if (updated.nombre && updated.nombre !== 'Familia y Amigos') {
        setGuestNameInput(updated.nombre);
      }
      if (updated.adultos !== undefined) {
        setAdultCount(updated.adultos);
      }
      if (updated.ninos !== undefined) {
        setChildCount(updated.ninos);
      }
      return updated;
    });
  };

  // Fetch guest from Google Apps Script or demo fallback
  const fetchGuestById = async (invitationId: string) => {
    setIsLoadingGuest(true);
    const fetchUrl = `${weddingInfo.googleScriptUrl}?id=${encodeURIComponent(invitationId)}`;

    try {
      const res = await fetch(fetchUrl);
      const rawText = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(rawText);
      } catch { }

      if (data && (data.status === 'success' || data.nombre || data.name)) {
        applyGuestData({
          id: invitationId,
          nombre: data.nombre || data.name || 'Familia y Amigos',
          adultos: parseInt(data.adultos || data.adults || 2, 10),
          ninos: parseInt(data.ninos || data.children || 0, 10),
          pases: parseInt(data.pases || data.passes || ((parseInt(data.adultos, 10) || 2) + (parseInt(data.ninos, 10) || 0)), 10),
          nota: data.nota || data.note || ''
        });
        setIsLoadingGuest(false);
        return true;
      }
    } catch {
      // Ignore network errors and check demo fallback
    }
    setIsLoadingGuest(false);
    return false;
  };

  // Load guest from URL search params on mount
  useEffect(() => {
    let search = window.location.search;
    if (!search && window.location.hash.includes('?')) {
      search = window.location.hash.substring(window.location.hash.indexOf('?'));
    }
    const urlParams = new URLSearchParams(search);
    const invitationId = urlParams.get('id') || urlParams.get('invitacion') || urlParams.get('codigo');
    const directName = urlParams.get('nombre') || urlParams.get('name');
    const directAdults = urlParams.get('adultos') || urlParams.get('adults');
    const directChildren = urlParams.get('ninos') || urlParams.get('children');
    const directPasses = urlParams.get('pases') || urlParams.get('passes');
    const directNote = urlParams.get('nota');

    if (directName) {
      applyGuestData({
        id: invitationId || '',
        nombre: directName,
        adultos: directAdults ? parseInt(directAdults, 10) : 2,
        ninos: directChildren ? parseInt(directChildren, 10) : 0,
        pases: directPasses ? parseInt(directPasses, 10) : (parseInt(directAdults || '2', 10) + parseInt(directChildren || '0', 10)),
        nota: directNote || ''
      });
      return;
    }

    if (invitationId) {
      fetchGuestById(invitationId);
    }

    // Expose global tester on window
    (window as any).buscarInvitado = (id: string) => fetchGuestById(id);
  }, []);

  // Observador de revelado con transiciones suaves en scroll
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-item, .reveal-scale');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -25px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Handle RSVP Submit (Google Sheets webhook + WhatsApp)
  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = guestNameInput.trim();
    const status = attendanceStatus;
    const adults = status === 'yes' ? adultCount : 0;
    const children = status === 'yes' ? childCount : 0;
    const note = guestNote.trim();

    // 1. Send webhook POST to Google Apps Script
    const formData = new FormData();
    formData.append('id', currentGuest.id || '');
    formData.append('name', name);
    formData.append('status', status);
    formData.append('adults', String(adults));
    formData.append('children', String(children));
    formData.append('note', note);

    fetch(weddingInfo.googleScriptUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    }).catch(() => { });

    // Save in localStorage
    try {
      localStorage.setItem('boda_fatima_luis_rsvp', JSON.stringify({
        id: currentGuest.id,
        nombre: name,
        asistencia: status,
        adultos: adults,
        ninos: children,
        nota: note,
        fecha: new Date().toISOString()
      }));
    } catch { }

    setRsvpSent(true);

    // 2. Open WhatsApp prefilled message
    let text = '';

    if (status === 'yes') {
      text = `¡Hola Fatima y Luis! Confirmo con mucha alegría mi asistencia a su boda civil 💍✨\n\n` +
        `👤 *Invitado / Familia:* ${name}\n` +
        `👥 *Pases confirmados:* ${adults} Adulto(s) y ${children} Niño(s)\n`;
    } else {
      text = `¡Hola Fatima y Luis! Muchas gracias por la invitación a su boda civil. Lamentablemente no podré acompañarles en esta ocasión.\n\n` +
        `👤 *Nombre:* ${name}\n`;
    }

    if (note) {
      text += `💬 *Dedicatoria:* "${note}"`;
    }

    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${weddingInfo.phoneWhatsapp}?text=${encoded}`;
    setLastWhatsAppUrl(url);
    window.open(url, '_blank');
  };

  const addToGoogleCalendar = () => {
    const startDate = '20261220T173000Z'; // 11:30 AM GT (UTC-6)
    const endDate = '20261220T214500Z';
    const title = encodeURIComponent('Boda Civil: Fatima & Luis');
    const details = encodeURIComponent('Recepción: 11:30 AM | Ceremonia Civil: 11:45 AM en La Villa. Almuerzo en La Casona.');
    const location = encodeURIComponent('La Quebrada, Diagonal Santa Rita Final, Zona 2, La Esperanza, Quetzaltenango');

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  const downloadIcsFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Boda Civil Fatima & Luis//ES',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'SUMMARY:Boda Civil: Fatima & Luis',
      'DESCRIPTION:Recepción: 11:30 AM | Ceremonia Civil Notarial: 11:45 AM en La Villa. Almuerzo en La Casona. Vestimenta: Formal Campestre.',
      'LOCATION:La Quebrada\\, Diagonal Santa Rita Final\\, Zona 2\\, La Esperanza\\, Quetzaltenango',
      'DTSTART:20261220T173000Z',
      'DTEND:20261220T214500Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'Boda-Civil-Fatima-y-Luis.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerCopiedToast('¡Archivo de calendario descargado!');
  };

  const handleCopyLocation = () => {
    const fullLoc = 'La Quebrada, Diagonal Santa Rita Final, Zona 2, La Esperanza, Quetzaltenango';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullLoc);
      triggerCopiedToast('¡Dirección copiada al portapapeles!');
    }
  };




  const triggerCopiedToast = (msg: string) => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification(null), 2800);
  };

  return (
    <div className="w-full text-ink antialiased selection:bg-line relative overflow-x-hidden md:py-5 lg:py-12">
      {copiedNotification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-blue text-white px-5 py-2.5 rounded-full shadow-2xl text-base md:text-lg font-medium flex items-center gap-2 border border-line animate-fade-in">
          <CheckCircleIcon weight="fill" className="text-lg text-gold" />
          <span>{copiedNotification}</span>
        </div>
      )}
      {/* Botón flotante para confirmar en móviles (se oculta tras confirmar) */}
      {!rsvpSent && pastHero && <div className="fixed bottom-4 left-4 z-40 md:hidden transition-transform duration-300 hover:scale-105 active:scale-95">
        <a
          href="#rsvp"
          className="flex items-center gap-2 bg-blue text-white px-4 py-2.5 rounded-full shadow-2xl hover:bg-blue-dark transition active:scale-95 text-sm font-semibold tracking-wider uppercase border border-line/50"
        >
          <EnvelopeOpenIcon className="text-base" />
          <span>Confirmar</span>
        </a>
      </div>}

      {/* CONTENEDOR PRINCIPAL RESPONSIVE */}
      <main className="w-full max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto bg-white min-h-screen shadow-2xl relative border-x border-line/60 pb-20 overflow-hidden md:rounded-3xl lg:rounded-[2.5rem] md:border md:border-line/80">

        <InvitationHero />

        <Section title="" id="bienvenida" bottom={<MeadowDivider seed={3} />}>
          <p className={`greet transition-opacity duration-300 ${isLoadingGuest ? 'opacity-40' : ''}`}>
            {isLoadingGuest ? 'Cargando…' : currentGuest.nombre}
          </p>
          <div>
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-ink/90 max-w-md md:max-w-xl mx-auto leading-relaxed">
              Con la bendición de Dios y de nuestras familias, tenemos el honor de invitarles a celebrar nuestra unión matrimonial.
            </p>
          </div>
          <div className="seats">
            Pases reservados:{' '}
            <strong className="text-ink font-bold">
              {currentGuest.ninos > 0
                ? `${currentGuest.adultos} Adulto(s) y ${currentGuest.ninos} Niño(s) (${currentGuest.pases} Pases)`
                : `${currentGuest.adultos} ${currentGuest.adultos === 1 ? 'Pase Personal' : 'Pases Asignados'}`}
            </strong>
          </div>
        </Section>

        <Section title="Fecha" id="fecha">
          <div className="rounded-3xl p-6 md:p-8  text-center relative overflow-hidden group h-full flex flex-col justify-between">
            <div className="relative z-10 pt-2">
              <p className="font-serif text-sm uppercase tracking-[0.2em] text-blue-dark font-semibold mb-4">Domingo</p>
              <div className="font-serif text-3xl sm:text-3xl md:text-4xl font-bold text-ink tracking-wide mb-1">
                20 de Diciembre de 2026
              </div>
              <div className="flex justify-center gap-3 sm:gap-5 mt-6" aria-label="Cuenta regresiva">
                {([
                  ['Días', countdown.days],
                  ['Horas', countdown.hours],
                  ['Min', countdown.minutes],
                  ['Seg', countdown.seconds]
                ] as const).map(([label, value]) => (
                  <div key={label} className="flex flex-col items-center min-w-[3.5rem]">
                    <span className="font-serif text-4xl md:text-5xl text-blue tabular-nums leading-none">{value}</span>
                    <span className="text-sm uppercase tracking-[0.15em] text-muted mt-1">{label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-sm md:text-base text-ink">
                <span className=" px-3 py-1.5 rounded-full font-medium shadow-2xs">
                  Recepción de Invitados: <strong className="text-ink font-bold">11:30 AM</strong>
                </span>
                <span className=" px-3 py-1.5 rounded-full font-medium shadow-2xs">
                  Inicio Ceremonia Civil: <strong className="text-ink font-bold">11:45 AM</strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-mist relative z-10 mt-6">
              <button
                type="button"
                onClick={addToGoogleCalendar}
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-full bg-blue hover:bg-blue-dark text-white text-base font-semibold border border-line transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 w-full cursor-pointer"
              >
                <CalendarPlusIcon className="text-lg" />
                <span>Google Calendar</span>
              </button>

              <button
                type="button"
                onClick={downloadIcsFile}
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-full bg-white hover:bg-mist text-ink text-base font-semibold border border-line transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 w-full cursor-pointer"
              >
                <DownloadSimpleIcon className="text-lg text-blue" />
                <span>Descargar iCal (.ics)</span>
              </button>
            </div>
          </div>

        </Section>

        <Section title="Lugar" id="lugar" top={<SprigDivider seed={4} />} bottom={<MeadowDivider seed={12} />}>

          <div className="relative z-10 pt-2">

            <h3 className="font-serif text-3xl md:text-4xl font-bold text-ink">La Quebrada</h3>

            <button
              onClick={handleCopyLocation}
              className="group inline-flex items-center justify-center gap-1 text-base md:text-lg font-semibold text-ink hover:text-blue mt-1 cursor-pointer transition-colors"
              title="Click para copiar dirección"
            >
              <span className="font-serif">Diagonal Santa Rita Final, Zona 2</span>
              <CopyIcon className="text-muted group-hover:text-blue transition-transform group-hover:scale-110" />
            </button>

            <p className="font-serif text-base md:text-lg text-muted">La Esperanza, Quetzaltenango</p>

            <div className="font-serif flex flex-wrap items-center justify-center gap-2 mt-4 text-sm md:text-base text-ink">
              <span className="bg-mist border border-line px-3 py-1.5 rounded-full font-medium shadow-2xs transition-transform duration-300 hover:scale-105">🌿 Ceremonia: La Villa</span>
              <span className="bg-mist border border-line px-3 py-1.5 rounded-full font-medium shadow-2xs transition-transform duration-300 hover:scale-105">🏡 Almuerzo: La Casona</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-mist relative z-10">
            <a
              href="https://maps.google.com/?q=La+Quebrada+La+Esperanza+Quetzaltenango"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue hover:bg-blue-dark text-white py-3 px-3 rounded-full text-base md:text-lg font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
            >
              <NavigationArrowIcon className="text-base" /> Google Maps
            </a>
            <a
              href="https://waze.com/ul?q=La%20Quebrada%20La%20Esperanza"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white hover:bg-mist text-ink border border-line py-3 px-3 rounded-full text-base md:text-lg font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
            >
              <CarIcon className="text-base" /> Abrir en Waze
            </a>
          </div>
        </Section>


        <Section title="Itinerario" id="itinerario" top={<SprigDivider seed={6} />}>
          <ol className="timeline">
            {itineraryList.map((e, i) => (
              <li key={e.time} className="reveal-item from-left" style={{ transitionDelay: `${0.25 + i * 0.12}s` }}>
                <time>{e.time}</time><div><h3>{e.title}</h3></div>
              </li>
            ))}
          </ol>
        </Section>
        <Section title="Mesa de regalos" id="regalos" top={<SprigDivider seed={9} />} bottom={<MeadowDivider seed={21} />}>
          <p className="lead">Su presencia es nuestro mejor regalo. Si desean tener un detalle con nosotros, aquí nos pueden encontrar.</p>

        </Section>

        <Section id="rsvp" title="">
          <div className="max-w-2xl mx-auto bg-gradient-to-b from-white via-mist/30 to-white border-2 border-line rounded-3xl p-6 sm:p-8 md:p-10 shadow-card relative overflow-hidden interactive-card group">
            <div className="text-center mb-6">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink">Confirmar Asistencia</h3>
              <p className="text-base md:text-lg text-muted mt-2 max-w-md mx-auto">
                Por favor confirma antes del <strong className="text-ink font-bold">2 de Diciembre</strong> para reservar tu lugar.
              </p>
            </div>

            {rsvpSent && (
              <div className="mb-6 p-4 bg-mist border border-line rounded-2xl text-center text-base md:text-lg text-ink space-y-2 animate-fade-in">
                <div className="flex items-center justify-center gap-2 font-semibold">
                  <CheckCircleIcon weight="fill" className="text-lg text-ink" />
                  <span>¡Muchas gracias! Tu confirmación ha sido guardada.</span>
                </div>
                <p className="text-muted text-sm">
                  Si tu navegador bloqueó la ventana de WhatsApp, puedes{' '}
                  <a href={lastWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="text-ink font-bold underline">
                    hacer clic aquí para abrir WhatsApp
                  </a>.
                </p>
              </div>
            )}

            <form onSubmit={handleRSVPSubmit} className="space-y-4 relative z-10">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="block text-base md:text-lg font-semibold text-ink mb-1.5">
                    Confirmando para
                  </p>
                  <p className="w-full px-4 py-3 rounded-xl border border-line bg-mist font-serif text-lg text-ink">
                    {guestNameInput}
                  </p>
                </div>

                <div>
                  <label htmlFor="rsvp-status" className="block text-base md:text-lg font-semibold text-ink mb-1.5">
                    ¿Podrás acompañarnos? *
                  </label>
                  <select
                    id="rsvp-status"
                    value={attendanceStatus}
                    onChange={(e) => setAttendanceStatus(e.target.value as 'yes' | 'no')}
                    className="w-full px-4 py-3 rounded-xl border border-line text-base focus:outline-none focus:ring-4 focus:ring-mist focus:border-blue bg-white shadow-sm cursor-pointer transition-all duration-300"
                  >
                    <option value="yes">¡Sí, con mucho gusto asistiré!</option>
                    <option value="no">Lamentablemente no podré asistir</option>
                  </select>
                </div>
              </div>

              {attendanceStatus === 'yes' && (
                <div className="grid grid-flow-col gap-4 transition-all duration-300">
                  <Stepper label="Adultos" value={adultCount} min={1} max={currentGuest.adultos} onChange={setAdultCount} />
                  {currentGuest.ninos > 0 && (
                    <Stepper label="Niños" value={childCount} min={0} max={currentGuest.ninos} onChange={setChildCount} />
                  )}
                </div>
              )}

              <div>
                <label htmlFor="rsvp-note" className="block text-base md:text-lg font-semibold text-ink mb-1.5">
                  Mensaje para los novios (opcional)
                </label>
                <textarea
                  id="rsvp-note"
                  rows={2}
                  value={guestNote}
                  onChange={(e) => setGuestNote(e.target.value)}
                  placeholder="¡Muchas felicidades Fatima y Luis!"
                  className="w-full px-4 py-3 rounded-xl border border-line text-base focus:outline-none focus:ring-4 focus:ring-mist focus:border-blue bg-white resize-none shadow-sm placeholder:text-muted transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue hover:bg-blue-dark text-white py-4 px-6 rounded-full font-semibold text-lg md:text-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
              >
                <WhatsappLogoIcon className="text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110" />
                <span>Confirmar y Enviar por WhatsApp</span>
              </button>
            </form>

            <p className="text-sm md:text-base text-center text-muted mt-4 leading-relaxed">
              Tu confirmación se guardará en nuestra lista y se abrirá WhatsApp para enviarnos el mensaje.
            </p>
          </div>
        </Section>


        {/* PIE DE PÁGINA CON BOUQUET FINAL */}
        <footer className="text-center px-6 pt-2 pb-8 relative">
          <BottomBouquets />
          <div className="relative z-10 reveal-item">
          <div className="w-8 h-8 rounded-full bg-mist text-gold flex items-center justify-center mx-auto mb-2 text-sm border border-line/80 shadow-sm transition-transform duration-300 hover:scale-125">
            <HeartIcon weight="fill" size={20} />
          </div>
          <p className="font-serif text-2xl md:text-3xl text-ink">¡Esperamos celebrar juntos!</p>
          <p className="text-base md:text-lg text-muted mt-1">Fatima &amp; Luis · 20 de Diciembre de 2026</p>
          <p className="music-credit">
            ♪ Música: «{backgroundMusic.title}» de {backgroundMusic.composer},
            interpretada por {backgroundMusic.performer}
          </p>
          </div>
        </footer>

      </main>


    </div>
  );
};
