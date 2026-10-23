import React, { useState, useEffect } from 'react';
import {
  weddingInfo,
  itineraryList,
  demoGuestsData
} from '../data/weddingData';
import { FloralSvgDefs } from './FloralSvgDefs';
import { CalendarIcon, MapPinIcon } from "@phosphor-icons/react";

interface GuestData {
  id: string;
  nombre: string;
  adultos: number;
  ninos: number;
  pases: number;
  nota: string;
}

interface WeddingInvitationFatimaLuisProps {
  onOpenNextJsGuide: () => void;
}

export const WeddingInvitationFatimaLuis: React.FC<WeddingInvitationFatimaLuisProps> = ({
  onOpenNextJsGuide
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
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // RSVP Form state
  const [guestNameInput, setGuestNameInput] = useState('Familia y Amigos');
  const [attendanceStatus, setAttendanceStatus] = useState<'yes' | 'no'>('yes');
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(0);
  const [guestNote, setGuestNote] = useState('');
  const [rsvpSent, setRsvpSent] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');

  // Countdown state
  const [countdown, setCountdown] = useState({
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--'
  });

  // Floating petals
  const [petalsEnabled] = useState(true);

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
    const fetchUrl = `${weddingInfo.googleScriptUrl}?action=getInvitation&id=${encodeURIComponent(invitationId)}`;

    try {
      const res = await fetch(fetchUrl);
      const rawText = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(rawText);
      } catch {}

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

    // Demo fallback
    const lower = invitationId.toLowerCase();
    if (demoGuestsData[lower]) {
      applyGuestData({ id: invitationId, ...demoGuestsData[lower] });
      setIsLoadingGuest(false);
      return true;
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
    }).catch(() => {});

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
    } catch {}

    setRsvpSent(true);

    // 2. Open WhatsApp prefilled message
    let text = '';
    const idTag = currentGuest.id ? `🔖 *Código de Invitación:* #${currentGuest.id}\n` : '';

    if (status === 'yes') {
      text = `¡Hola Fatima y Luis! Confirmo con mucha alegría mi asistencia a su boda civil 💍✨\n\n` +
             idTag +
             `👤 *Invitado / Familia:* ${name}\n` +
             `👥 *Pases confirmados:* ${adults} Adulto(s) y ${children} Niño(s)\n`;
    } else {
      text = `¡Hola Fatima y Luis! Muchas gracias por la invitación a su boda civil. Lamentablemente no podré acompañarles en esta ocasión.\n\n` +
             idTag +
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
    <div className="w-full text-[#1b476e] font-sans antialiased selection:bg-sky-200 relative overflow-x-hidden md:py-8 lg:py-12">
      {/* Botánico SVG Dictionary */}
      <FloralSvgDefs />

      {/* Floating Petals Effect */}
      {petalsEnabled && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="petal-floating"
              style={{
                left: `${10 + i * 11.5}%`,
                animationDelay: `${i * 2.3}s`,
                animationDuration: `${15 + (i % 4) * 3.5}s`
              }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 opacity-75">
                <use href={i % 2 === 0 ? "#floret-pastel" : "#floret-white"} transform="scale(0.42)" />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* Toast Notification */}
      {copiedNotification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#1b67a2] text-white px-5 py-2.5 rounded-full shadow-2xl text-xs md:text-sm font-medium flex items-center gap-2 border border-sky-300 animate-fade-in">
          <i className="ph ph-check-circle text-lg text-emerald-300" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Botón flotante para confirmar en móviles */}
      <div className="fixed bottom-4 right-4 z-40 md:hidden transition-transform duration-300 hover:scale-105 active:scale-95">
        <a
          href="#rsvp"
          className="flex items-center gap-2 bg-[#1b67a2] text-white px-4 py-2.5 rounded-full shadow-2xl hover:bg-[#1a5684] transition active:scale-95 text-xs font-semibold tracking-wider uppercase border border-sky-300/50"
        >
          <i className="ph ph-envelope-open text-base" />
          <span>Confirmar</span>
        </a>
      </div>

      {/* CONTENEDOR PRINCIPAL RESPONSIVE */}
      <main className="w-full max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto bg-[#fbfcfd] min-h-screen shadow-2xl relative border-x border-sky-200/60 pb-20 overflow-hidden md:rounded-3xl lg:rounded-[2.5rem] md:border md:border-sky-200/80">

        {/* BARRA DE NAVEGACIÓN ELEGANTE EN TABLET Y ESCRITORIO */}
        <nav className="hidden md:flex items-center justify-between px-8 lg:px-12 py-3.5 border-b border-sky-100/90 text-xs tracking-wider uppercase font-semibold text-[#1a5684] glass-header sticky top-0 z-30 transition-all">
          <div className="flex items-center gap-2 text-[#1b476e] font-serif text-lg tracking-normal">
            <span className="font-bold">F</span> <span className="text-[#bfa369] italic text-sm">&amp;</span> <span className="font-bold">L</span>
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#2381c8] ml-2">20 · Dic · 2026</span>
          </div>

          <div className="flex items-center gap-5">
            <a href="#fecha" className="hover:text-[#2381c8] transition-colors">Fecha &amp; Lugar</a>
            <a href="#itinerario" className="hover:text-[#2381c8] transition-colors">Itinerario</a>
            <a href="#detalles" className="hover:text-[#2381c8] transition-colors">Detalles</a>
            <a href="#rsvp" className="bg-[#1b67a2] hover:bg-[#1a5684] text-white px-4 py-1.5 rounded-full shadow-sm transition active:scale-95">
              Confirmar (RSVP)
            </a>
            
            {/* Modal de Simulación para probar nombres y pases */}
            <button
              onClick={() => setShowSimulateModal(true)}
              className="px-2.5 py-1 text-[11px] font-medium text-[#1b67a2] hover:text-[#122e49] bg-sky-50 hover:bg-sky-100 rounded-full border border-sky-200 transition-colors flex items-center gap-1 cursor-pointer"
              title="Personalizar datos de prueba del invitado"
            >
              <i className="ph ph-user-switch" />
              <span>Personalizar Invitado</span>
            </button>

            <button
              onClick={onOpenNextJsGuide}
              className="px-2.5 py-1 text-[11px] font-medium text-[#1a5684] hover:text-[#122e49] bg-white hover:bg-sky-50 rounded-full border border-sky-200 transition-colors flex items-center gap-1 cursor-pointer"
              title="Ver código fuente Next.js"
            >
              <i className="ph ph-code" />
              <span>Next.js</span>
            </button>
          </div>
        </nav>

        {/* CABECERA FLORAL MONUMENTAL RESPONSIVE */}
        <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 -mb-6 pointer-events-none select-none overflow-hidden flex justify-center shadow-floral">
          <svg viewBox="0 0 540 230" className="w-full h-full animate-floral-sway" preserveAspectRatio="xMidYMin slice">
            {/* Hojas grandes de fondo en verde salvia botánico */}
            <g transform="translate(65, 45) rotate(-65) scale(0.9)"><use href="#hydrangea-leaf-large" /></g>
            <g transform="translate(175, 25) rotate(-35) scale(0.95)"><use href="#hydrangea-leaf-large" /></g>
            <g transform="translate(365, 25) rotate(35) scale(0.95)"><use href="#hydrangea-leaf-large" /></g>
            <g transform="translate(475, 45) rotate(65) scale(0.9)"><use href="#hydrangea-leaf-large" /></g>

            {/* Ramas de Eucalipto y Gypsophila extendidas */}
            <g transform="translate(45, 100) rotate(-55) scale(0.9)"><use href="#eucalyptus-sprig" /></g>
            <g transform="translate(495, 100) rotate(55) scale(0.9)"><use href="#eucalyptus-sprig" /></g>
            <g transform="translate(110, 115) rotate(-28) scale(0.85)"><use href="#flower-gypsophila" /></g>
            <g transform="translate(430, 115) rotate(28) scale(0.85)"><use href="#flower-gypsophila" /></g>
            <g transform="translate(270, 125) scale(0.9)"><use href="#flower-gypsophila" /></g>

            {/* Pompones de hortensias celestes y blancas */}
            <g transform="translate(110, 65) scale(1.15)"><use href="#hydrangea-pompom-celeste" /></g>
            <g transform="translate(195, 55) scale(1.1)"><use href="#hydrangea-pompom-white" /></g>
            <g transform="translate(345, 55) scale(1.1)"><use href="#hydrangea-pompom-celeste" /></g>
            <g transform="translate(430, 65) scale(1.15)"><use href="#hydrangea-pompom-white" /></g>

            {/* Gran Rosa Blanca de Jardín Realista en el Centro */}
            <g transform="translate(270, 48) scale(1.3)"><use href="#flower-rose-white" /></g>

            {/* Floretes de hortensia en cascada */}
            <g transform="translate(155, 108) scale(0.95)"><use href="#floret-celeste" /></g>
            <g transform="translate(215, 102) scale(0.9)"><use href="#floret-white" /></g>
            <g transform="translate(270, 98) scale(1.0)"><use href="#floret-celeste" /></g>
            <g transform="translate(325, 102) scale(0.9)"><use href="#floret-white" /></g>
            <g transform="translate(385, 108) scale(0.95)"><use href="#floret-celeste" /></g>

            <g transform="translate(75, 125) scale(0.8) rotate(25)"><use href="#floret-pastel" /></g>
            <g transform="translate(465, 125) scale(0.8) rotate(-25)"><use href="#floret-pastel" /></g>
          </svg>
        </div>

        {/* ENCABEZADO Y MONOGRAMA */}
        <header className="pt-2 pb-6 px-6 sm:px-10 md:px-16 text-center relative z-10">

          {/* Monograma F & L con Corona Floral */}
          
          
          <div>
            <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.28em] text-[10px] md:text-xs font-semibold text-[#1a5684] mb-2 px-4 py-1.5 bg-[#e0f1fc]/90 rounded-full border border-sky-200 shadow-sm">
              <i className="ph ph-sparkle text-[#2381c8] text-xs" />
              Nuestra Boda Civil
            </span>
          </div>

          <div>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-7xl text-[#122e49] font-normal tracking-tight leading-tight mt-1">
              Fatima <span className="text-[#bfa369] font-serif italic text-4xl sm:text-5xl md:text-6xl">&amp;</span> Luis
            </h1>
          </div>

          {/* Divisor con Hortensias */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="w-14 md:w-24 h-px bg-gradient-to-r from-transparent to-sky-300" />
            <svg viewBox="0 0 60 26" className="w-16 md:w-20 h-7 shadow-subtle">
              <g transform="translate(12, 13) rotate(-90) scale(0.3)"><use href="#hydrangea-leaf-large" /></g>
              <g transform="translate(48, 13) rotate(90) scale(0.3)"><use href="#hydrangea-leaf-large" /></g>
              <g transform="translate(30, 13) scale(0.6)"><use href="#floret-celeste" /></g>
              <g transform="translate(18, 13) scale(0.45)"><use href="#floret-white" /></g>
              <g transform="translate(42, 13) scale(0.45)"><use href="#floret-white" /></g>
            </svg>
            <div className="w-14 md:w-24 h-px bg-gradient-to-l from-transparent to-sky-300" />
          </div>

          <div>
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#1b476e]/90 max-w-md md:max-w-xl mx-auto leading-relaxed">
              "Con la bendición de Dios y de nuestras familias, tenemos el honor de invitarles a celebrar nuestra unión matrimonial."
            </p>
          </div>

          {/* Botones de acción rápida en la cabecera */}
         
        </header>

        {/* ================================================================= */}
        {/* TARJETA PERSONALIZADA: NOMBRE DEL INVITADO Y PASES ASIGNADOS     */}
        {/* ================================================================= */}
        <section id="guestCardSection" className="px-5 sm:px-8 md:px-10 lg:px-12 mb-8">
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-[#f0f7fd]/90 via-white to-[#f0f7fd]/90 rounded-3xl p-6 sm:p-7 md:p-8 border-2 border-sky-200 shadow-card text-center relative overflow-hidden interactive-card group reveal-item">
            
            {/* Esquina floral decorativa izquierda */}
            <div className="card-floral absolute -top-3 -left-3 w-24 h-24 pointer-events-none select-none opacity-90">
              <svg viewBox="0 0 80 80" className="w-full h-full">
                <g transform="translate(18, 18) rotate(-45) scale(0.38)"><use href="#hydrangea-leaf-large" /></g>
                <g transform="translate(32, 26) scale(0.55)"><use href="#flower-rose-white" /></g>
                <g transform="translate(20, 44) scale(0.5)"><use href="#floret-celeste" /></g>
                <g transform="translate(48, 20) scale(0.48)"><use href="#floret-white" /></g>
              </svg>
            </div>

            {/* Esquina floral decorativa derecha */}
            <div className="card-floral absolute -top-3 -right-3 w-24 h-24 pointer-events-none select-none opacity-90">
              <svg viewBox="0 0 80 80" className="w-full h-full">
                <g transform="translate(62, 18) rotate(45) scale(0.38)"><use href="#hydrangea-leaf-large" /></g>
                <g transform="translate(48, 26) scale(0.55)"><use href="#flower-rose-white" /></g>
                <g transform="translate(60, 44) scale(0.5)"><use href="#floret-celeste" /></g>
                <g transform="translate(32, 20) scale(0.48)"><use href="#floret-white" /></g>
              </svg>
            </div>

            <div className="relative z-10">
              {isLoadingGuest && (
                <div className="py-4 text-xs md:text-sm text-[#1b67a2] flex items-center justify-center gap-2">
                  <i className="ph ph-spinner animate-spin text-lg text-[#2381c8]" />
                  <span>Cargando datos de su invitación...</span>
                </div>
              )}

              <div className={isLoadingGuest ? 'opacity-40' : ''}>
                <p className="font-serif italic text-base md:text-lg text-[#1b67a2] mb-1">
                  Tenemos el honor de invitar a:
                </p>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-4xl font-bold text-[#122e49] tracking-wide my-2 leading-tight">
                  {currentGuest.nombre}
                </h3>
                
                <div className="w-14 h-0.5 bg-[#bfa369] mx-auto my-3" />

                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-sky-200 shadow-sm text-xs md:text-sm text-[#1b476e] font-medium transition-transform duration-300 group-hover:scale-105">
                  <i className="ph ph-ticket text-[#2381c8] text-base" />
                  <span>
                    Pases reservados:{' '}
                    <strong className="text-[#122e49] font-bold">
                      {currentGuest.ninos > 0
                        ? `${currentGuest.adultos} Adulto(s) y ${currentGuest.ninos} Niño(s) (${currentGuest.pases} Pases)`
                        : `${currentGuest.adultos} ${currentGuest.adultos === 1 ? 'Pase Personal' : 'Pases Asignados'}`}
                    </strong>
                  </span>
                </div>
                
                {currentGuest.nota && (
                  <p className="text-xs md:text-sm italic text-slate-600 mt-2.5 max-w-md mx-auto">
                    "{currentGuest.nota}"
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* BLOQUE RESPONSIVE: FECHA & LUGAR (2 Columnas)                    */}
        {/* ================================================================= */}
        <div id="fecha" className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5 sm:px-8 md:px-10 lg:px-12 mb-10 items-stretch">
          
          {/* TARJETA FECHA Y HORARIOS */}
          <section className="h-full reveal-item delay-100">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-sky-200/90 text-center relative overflow-hidden interactive-card group h-full flex flex-col justify-between">
              
              {/* Ramillete floral esquina superior derecha */}
              <div className="card-floral absolute -top-3 -right-3 w-32 h-32 pointer-events-none select-none">
                <svg viewBox="0 0 100 100" className="w-full h-full shadow-floral">
                  <g transform="translate(78, 22) rotate(45) scale(0.5)"><use href="#hydrangea-leaf-large" /></g>
                  <g transform="translate(60, 16) scale(0.55)"><use href="#eucalyptus-sprig" /></g>
                  <g transform="translate(68, 36) scale(0.65)"><use href="#hydrangea-pompom-celeste" /></g>
                  <g transform="translate(40, 22) scale(0.65)"><use href="#flower-rose-white" /></g>
                  <g transform="translate(30, 44) scale(0.52)"><use href="#floret-white" /></g>
                </svg>
              </div>

              <div className="relative z-10 pt-2">
                <div className="card-icon w-10 h-10 md:w-12 md:h-12 bg-[#e0f1fc] text-[#1b67a2] rounded-full flex items-center justify-center text-xl md:text-2xl mx-auto mb-3 shadow-sm">
                  <CalendarIcon />
                </div>
                <div className="font-serif text-3xl sm:text-3xl md:text-4xl font-bold text-[#122e49] tracking-wide mb-1">
                  20 de Diciembre de 2026
                </div>
                <p className="text-xs uppercase tracking-wider text-[#1a5684] font-semibold mb-4">Domingo</p>

                {/* Pastilla de Horarios */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] md:text-xs text-[#1b476e]">
                  <span className="bg-[#f0f7fd] border border-sky-200 px-3 py-1.5 rounded-full font-medium shadow-2xs">
                    Recepción de Invitados: <strong className="text-[#1b476e] font-bold">11:30 AM</strong>
                  </span>
                  <span className="bg-[#f0f7fd] border border-sky-200 px-3 py-1.5 rounded-full font-medium shadow-2xs">
                    Inicio Ceremonia Civil: <strong className="text-[#1b476e] font-bold">11:45 AM</strong>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-sky-100 relative z-10 mt-6">
                <button
                  type="button"
                  onClick={addToGoogleCalendar}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-[#f0f7fd] hover:bg-[#e0f1fc] text-[#1b476e] text-xs font-semibold border border-sky-200 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 w-full cursor-pointer"
                >
                  <i className="ph ph-calendar-plus text-base text-[#1b67a2]" />
                  <span>Google Calendar</span>
                </button>

                <button
                  type="button"
                  onClick={downloadIcsFile}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-white hover:bg-[#f0f7fd] text-[#1b476e] text-xs font-semibold border border-sky-200 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 w-full cursor-pointer"
                >
                  <i className="ph ph-download-simple text-base text-[#2381c8]" />
                  <span>Descargar iCal (.ics)</span>
                </button>
              </div>
            </div>
          </section>

          {/* TARJETA UBICACIÓN Y GPS */}
          <section id="ubicacion" className="h-full reveal-item delay-200">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-sky-200/90 text-center relative overflow-hidden interactive-card group h-full flex flex-col justify-between">
              
              {/* Ramillete floral esquina superior izquierda */}
              <div className="card-floral absolute -top-3 -left-3 w-32 h-32 pointer-events-none select-none">
                <svg viewBox="0 0 100 100" className="w-full h-full shadow-floral">
                  <g transform="translate(22, 22) rotate(-45) scale(0.5)"><use href="#hydrangea-leaf-large" /></g>
                  <g transform="translate(40, 16) scale(0.55)"><use href="#eucalyptus-sprig" /></g>
                  <g transform="translate(32, 36) scale(0.65)"><use href="#hydrangea-pompom-white" /></g>
                  <g transform="translate(60, 22) scale(0.65)"><use href="#flower-rose-white" /></g>
                  <g transform="translate(70, 44) scale(0.52)"><use href="#floret-celeste" /></g>
                </svg>
              </div>

              <div className="relative z-10 pt-2">
                <div className="card-icon w-10 h-10 md:w-12 md:h-12 bg-[#e0f1fc] text-[#1b67a2] rounded-full flex items-center justify-center text-xl md:text-2xl mx-auto mb-3 shadow-sm">
                  <MapPinIcon />
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#122e49]">La Quebrada</h3>
                
                <button
                  onClick={handleCopyLocation}
                  className="group inline-flex items-center justify-center gap-1 text-xs md:text-sm font-semibold text-slate-800 hover:text-[#1b67a2] mt-1 cursor-pointer transition-colors"
                  title="Click para copiar dirección"
                >
                  <span>Diagonal Santa Rita Final, Zona 2</span>
                  <i className="ph ph-copy text-slate-400 group-hover:text-[#1b67a2] transition-transform group-hover:scale-110" />
                </button>

                <p className="text-xs md:text-sm text-slate-500">La Esperanza, Quetzaltenango</p>

                <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] md:text-xs text-[#1b476e]">
                  <span className="bg-[#f0f7fd] border border-sky-200 px-3 py-1.5 rounded-full font-medium shadow-2xs transition-transform duration-300 hover:scale-105">🌿 Ceremonia: La Villa</span>
                  <span className="bg-[#f0f7fd] border border-sky-200 px-3 py-1.5 rounded-full font-medium shadow-2xs transition-transform duration-300 hover:scale-105">🏡 Almuerzo: La Casona</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-sky-100 relative z-10">
                <a
                  href="https://maps.google.com/?q=La+Quebrada+La+Esperanza+Quetzaltenango"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#1b67a2] hover:bg-[#1a5684] text-white py-3 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
                >
                  <i className="ph ph-navigation-arrow text-base" /> Google Maps
                </a>
                <a
                  href="https://waze.com/ul?q=La%20Quebrada%20La%20Esperanza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#1b88d8] hover:bg-[#156fb1] text-white py-3 px-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
                >
                  <i className="ph ph-car text-base" /> Abrir en Waze
                </a>
              </div>
            </div>
          </section>

        </div>

        {/* CUENTA REGRESIVA CON CORONACIÓN FLORAL */}
        <section className="px-5 sm:px-8 md:px-10 lg:px-12 mb-12 reveal-item delay-100">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-white via-[#f0f7fd]/50 to-white rounded-3xl p-6 md:p-8 border border-sky-200 shadow-card text-center relative interactive-card group overflow-hidden">
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg viewBox="0 0 35 16" className="w-10 h-5 transition-transform duration-500 group-hover:-translate-x-1">
                <g transform="translate(10, 8) rotate(-45) scale(0.22)"><use href="#hydrangea-leaf-large" /></g>
                <g transform="translate(25, 8) scale(0.42)"><use href="#floret-celeste" /></g>
              </svg>
              <span className="text-xs md:text-sm uppercase tracking-widest text-[#1b67a2] font-semibold">
                Para el Gran Día
              </span>
              <svg viewBox="0 0 35 16" className="w-10 h-5 transition-transform duration-500 group-hover:translate-x-1">
                <g transform="translate(10, 8) scale(0.42)"><use href="#floret-white" /></g>
                <g transform="translate(25, 8) rotate(45) scale(0.22)"><use href="#hydrangea-leaf-large" /></g>
              </svg>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-5 text-center">
              <div className="bg-white py-3 md:py-4 px-2 rounded-2xl border border-sky-100 shadow-sm countdown-box">
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b476e] block leading-tight tabular-nums">
                  {countdown.days}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1 block">Días</span>
              </div>
              <div className="bg-white py-3 md:py-4 px-2 rounded-2xl border border-sky-100 shadow-sm countdown-box">
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b476e] block leading-tight tabular-nums">
                  {countdown.hours}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1 block">Horas</span>
              </div>
              <div className="bg-white py-3 md:py-4 px-2 rounded-2xl border border-sky-100 shadow-sm countdown-box">
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b476e] block leading-tight tabular-nums">
                  {countdown.minutes}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1 block">Min</span>
              </div>
              <div className="bg-white py-3 md:py-4 px-2 rounded-2xl border border-sky-100 shadow-sm countdown-box">
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b476e] block leading-tight tabular-nums">
                  {countdown.seconds}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1 block">Seg</span>
              </div>
            </div>
          </div>
        </section>

        {/* SEPARADOR BOTÁNICO FLORAL AMPLIO */}
        <div className="flex items-center justify-center px-6 md:px-12 mb-10">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
          <div className="px-4 flex items-center gap-1.5 shadow-subtle">
            <svg viewBox="0 0 120 32" className="w-32 md:w-40 h-8">
              <g transform="translate(20, 16) rotate(-90) scale(0.35)"><use href="#hydrangea-leaf-large" /></g>
              <g transform="translate(100, 16) rotate(90) scale(0.35)"><use href="#hydrangea-leaf-large" /></g>
              <g transform="translate(40, 16) scale(0.55)"><use href="#floret-white" /></g>
              <g transform="translate(60, 16) scale(0.75)"><use href="#floret-celeste" /></g>
              <g transform="translate(80, 16) scale(0.55)"><use href="#floret-pastel" /></g>
            </svg>
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-sky-300 to-transparent" />
        </div>

        {/* ================================================================= */}
        {/* ITINERARIO DEL EVENTO                                             */}
        {/* ================================================================= */}
        <section id="itinerario" className="px-5 sm:px-8 md:px-10 lg:px-12 mb-14 reveal-item">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#122e49] font-normal">Itinerario del Día</h2>
            <div className="w-12 h-0.5 bg-[#bfa369] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {itineraryList.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white p-4 md:p-5 rounded-2xl border shadow-card itinerary-step group flex flex-col justify-between reveal-item delay-${((index % 3) + 1) * 100} ${
                  item.badge === 'Puntual' ? 'border-sky-300 ring-1 ring-sky-200' : 'border-sky-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 itinerary-icon transition-transform duration-300">
                        <use href={`#${item.iconType}`} transform="translate(12, 12) scale(0.48)" />
                      </svg>
                      <span className="text-xs md:text-sm font-bold text-[#1b67a2] tracking-wider transition-colors group-hover:text-[#2381c8]">{item.time}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium transition-transform duration-300 group-hover:scale-105 ${
                          item.badge === 'Puntual'
                            ? 'bg-[#1b67a2] text-white font-semibold shadow-2xs'
                            : 'bg-[#f0f7fd] text-[#1a5684] border border-sky-200/60'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif text-lg md:text-xl font-bold text-[#122e49] transition-colors group-hover:text-[#1b67a2]">{item.title}</h4>
                  <p className="text-xs md:text-sm text-slate-600 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* DETALLES: VESTIMENTA, SOBRES, PEQUEÑOS                            */}
        {/* ================================================================= */}
        <section id="detalles" className="px-5 sm:px-8 md:px-10 lg:px-12 mb-14 reveal-item">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#122e49] font-normal">Detalles para el Invitado</h2>
            <div className="w-10 h-0.5 bg-[#bfa369] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Código de Vestimenta */}
            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-card text-center relative overflow-hidden interactive-card group reveal-item delay-100 flex flex-col justify-between">
              <div className="card-floral absolute top-2 right-2 w-8 h-8 opacity-75">
                <svg viewBox="0 0 30 30" className="w-full h-full">
                  <use href="#floret-celeste" transform="translate(15, 15) scale(0.45)" />
                </svg>
              </div>
              <div>
                <div className="card-icon w-10 h-10 md:w-12 md:h-12 bg-[#f0f7fd] text-[#1b67a2] rounded-full flex items-center justify-center text-xl mx-auto mb-3 border border-sky-200">
                  <i className="ph ph-t-shirt" />
                </div>
                <h4 className="font-serif text-xl md:text-2xl font-bold text-[#122e49]">Código de Vestimenta</h4>
                <span className="inline-block text-xs font-bold text-[#1a5684] uppercase tracking-wider mt-2 mb-3 px-3.5 py-1 bg-[#e0f1fc] rounded-full border border-sky-200/80 transition-transform duration-300 group-hover:scale-105">
                  Formal Campestre de Día
                </span>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  Por llevarse a cabo en jardines y áreas verdes, recomendamos calzado cómodo, de piso o tacón corrido.
                </p>
              </div>
            </div>

            {/* Muestra de Cariño */}
            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-card text-center relative overflow-hidden interactive-card group reveal-item delay-200 flex flex-col justify-between">
              <div className="card-floral absolute top-2 right-2 w-8 h-8 opacity-75">
                <svg viewBox="0 0 30 30" className="w-full h-full">
                  <use href="#floret-white" transform="translate(15, 15) scale(0.45)" />
                </svg>
              </div>
              <div>
                <div className="card-icon w-10 h-10 md:w-12 md:h-12 bg-[#f0f7fd] text-[#1a5684] rounded-full flex items-center justify-center text-xl mx-auto mb-3 border border-sky-200">
                  <i className="ph ph-envelope-simple" />
                </div>
                <h4 className="font-serif text-xl md:text-2xl font-bold text-[#122e49]">Muestra de Cariño</h4>
                <span className="inline-block text-xs font-bold text-[#1b476e] uppercase tracking-wider mt-2 mb-3 px-3.5 py-1 bg-[#e0f1fc] rounded-full border border-sky-200/80 transition-transform duration-300 group-hover:scale-105">
                  Lluvia de Sobres
                </span>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  Su presencia y buenos deseos son nuestro mejor regalo. Para quienes deseen tener un detalle, dispondremos de un buzón para sobres en la recepción.
                </p>
              </div>
            </div>

            {/* Para los Pequeños */}
            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-card text-center relative overflow-hidden interactive-card group reveal-item delay-300 flex flex-col justify-between">
              <div className="card-floral absolute top-2 right-2 w-8 h-8 opacity-75">
                <svg viewBox="0 0 30 30" className="w-full h-full">
                  <use href="#floret-celeste" transform="translate(15, 15) scale(0.45)" />
                </svg>
              </div>
              <div>
                <div className="card-icon w-10 h-10 md:w-12 md:h-12 bg-[#f0f7fd] text-[#1b67a2] rounded-full flex items-center justify-center text-xl mx-auto mb-3 border border-sky-200">
                  <i className="ph ph-balloon" />
                </div>
                <h4 className="font-serif text-xl md:text-2xl font-bold text-[#122e49]">Para los Pequeños</h4>
                <span className="inline-block text-xs font-bold text-[#1a5684] uppercase tracking-wider mt-2 mb-3 px-3.5 py-1 bg-[#e0f1fc] rounded-full border border-sky-200/80 transition-transform duration-300 group-hover:scale-105">
                  Diversión Familiar
                </span>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  Las áreas verdes de La Villa cuentan con casitas infantiles y trampolín para que los pequeños también se diviertan.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ================================================================= */}
        {/* FORMULARIO RSVP RESPONSIVE CON WHATSAPP Y GOOGLE SHEETS           */}
        {/* ================================================================= */}
        <section id="rsvp" className="px-5 sm:px-8 md:px-10 lg:px-12 mb-12 reveal-scale">
          <div className="max-w-2xl mx-auto bg-gradient-to-b from-white via-[#f0f7fd]/30 to-white border-2 border-sky-300 rounded-3xl p-6 sm:p-8 md:p-10 shadow-card relative overflow-hidden interactive-card group">
            
            {/* Esquina floral superior derecha en el RSVP */}
            <div className="card-floral absolute -top-3 -right-3 w-32 h-32 pointer-events-none select-none">
              <svg viewBox="0 0 90 90" className="w-full h-full shadow-floral">
                <g transform="translate(75, 20) rotate(45) scale(0.45)"><use href="#hydrangea-leaf-large" /></g>
                <g transform="translate(56, 18) scale(0.55)"><use href="#flower-rose-white" /></g>
                <g transform="translate(66, 44) scale(0.6)"><use href="#hydrangea-pompom-celeste" /></g>
                <g transform="translate(34, 34) scale(0.52)"><use href="#floret-white" /></g>
              </svg>
            </div>

            <div className="text-center mb-6">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#122e49]">Confirmar Asistencia</h3>
              <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-md mx-auto">
                Por favor confirma antes del <strong className="text-[#1b476e] font-bold">2 de Diciembre</strong> para reservar tu lugar.
              </p>
            </div>

            {rsvpSent && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-xs md:text-sm text-emerald-800 space-y-2 animate-fade-in">
                <div className="flex items-center justify-center gap-2 font-semibold">
                  <i className="ph ph-check-circle text-lg text-emerald-600" />
                  <span>¡Muchas gracias! Tu confirmación ha sido guardada.</span>
                </div>
                <p className="text-slate-600 text-xs">
                  Si tu navegador bloqueó la ventana de WhatsApp, puedes{' '}
                  <a href={lastWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold underline">
                    hacer clic aquí para abrir WhatsApp
                  </a>.
                </p>
              </div>
            )}

            <form onSubmit={handleRSVPSubmit} className="space-y-4 relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-[#122e49] mb-1.5">
                    Nombre Completo o Familia *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestNameInput}
                    onChange={(e) => setGuestNameInput(e.target.value)}
                    placeholder="Ej. Familia Morales"
                    className="w-full px-4 py-3 rounded-xl border border-sky-200 text-sm focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-[#3c9de2] bg-white shadow-sm placeholder:text-slate-400 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-[#122e49] mb-1.5">
                    ¿Podrás acompañarnos? *
                  </label>
                  <select
                    value={attendanceStatus}
                    onChange={(e) => setAttendanceStatus(e.target.value as 'yes' | 'no')}
                    className="w-full px-4 py-3 rounded-xl border border-sky-200 text-sm focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-[#3c9de2] bg-white shadow-sm cursor-pointer transition-all duration-300"
                  >
                    <option value="yes">¡Sí, con mucho gusto asistiré!</option>
                    <option value="no">Lamentablemente no podré asistir</option>
                  </select>
                </div>
              </div>

              {attendanceStatus === 'yes' && (
                <div className="grid grid-cols-2 gap-4 transition-all duration-300">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-[#122e49] mb-1.5">Adultos</label>
                    <input
                      type="number"
                      min="1"
                      max="15"
                      value={adultCount}
                      onChange={(e) => setAdultCount(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-sky-200 text-sm focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-[#3c9de2] bg-white shadow-sm transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-[#122e49] mb-1.5">Niños</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={childCount}
                      onChange={(e) => setChildCount(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-sky-200 text-sm focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-[#3c9de2] bg-white shadow-sm transition-all duration-300"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs md:text-sm font-semibold text-[#122e49] mb-1.5">
                  Mensaje para los novios (opcional)
                </label>
                <textarea
                  rows={2}
                  value={guestNote}
                  onChange={(e) => setGuestNote(e.target.value)}
                  placeholder="¡Muchas felicidades Fatima y Luis!"
                  className="w-full px-4 py-3 rounded-xl border border-sky-200 text-sm focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-[#3c9de2] bg-white resize-none shadow-sm placeholder:text-slate-400 transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-4 px-6 rounded-xl font-semibold text-sm md:text-base flex items-center justify-center gap-2 shadow-lg animate-pulse-glow transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
              >
                <i className="ph ph-whatsapp-logo text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110" />
                <span>Confirmar y Enviar por WhatsApp</span>
              </button>
            </form>

            <p className="text-[11px] md:text-xs text-center text-slate-500 mt-4 leading-relaxed">
              Tu confirmación se guardará de inmediato en nuestra lista y se abrirá WhatsApp (+502 47442616).
            </p>
          </div>
        </section>

        {/* PIE DE PÁGINA CON BOUQUET FINAL */}
        <footer className="text-center px-6 pt-2 pb-8 relative reveal-item">
          <div className="flex justify-center mb-3">
            <svg viewBox="0 0 280 95" className="w-72 md:w-80 h-24 shadow-floral animate-floral-sway">
              <g transform="translate(50, 52) rotate(-60) scale(0.6)"><use href="#hydrangea-leaf-large" /></g>
              <g transform="translate(230, 52) rotate(60) scale(0.6)"><use href="#hydrangea-leaf-large" /></g>
              <g transform="translate(90, 36) rotate(-25) scale(0.65)"><use href="#eucalyptus-sprig" /></g>
              <g transform="translate(190, 36) rotate(25) scale(0.65)"><use href="#eucalyptus-sprig" /></g>

              <g transform="translate(85, 46) scale(0.75)"><use href="#hydrangea-pompom-celeste" /></g>
              <g transform="translate(140, 38) scale(1.05)"><use href="#flower-rose-white" /></g>
              <g transform="translate(195, 46) scale(0.75)"><use href="#hydrangea-pompom-white" /></g>

              <g transform="translate(140, 70) scale(0.65)"><use href="#floret-celeste" /></g>
              <g transform="translate(110, 66) scale(0.55)"><use href="#floret-white" /></g>
              <g transform="translate(170, 66) scale(0.55)"><use href="#floret-white" /></g>
            </svg>
          </div>

          <div className="w-8 h-8 rounded-full bg-sky-100 text-[#bfa369] flex items-center justify-center mx-auto mb-2 text-sm border border-sky-200/80 shadow-sm transition-transform duration-300 hover:scale-125">
            <i className="ph ph-heart-fill" />
          </div>
          <p className="font-serif text-2xl md:text-3xl text-[#122e49]">¡Esperamos celebrar juntos!</p>
          <p className="text-xs md:text-sm text-slate-500 mt-1">Fatima &amp; Luis · 20 de Diciembre de 2026</p>
        </footer>

      </main>

      {/* MODAL PARA PERSONALIZAR / PROBAR DATOS DEL INVITADO */}
      {showSimulateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-sky-200 relative">
            <button
              onClick={() => setShowSimulateModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <i className="ph ph-x text-lg" />
            </button>

            <div className="text-center mb-5">
              <div className="w-10 h-10 rounded-full bg-sky-50 text-[#1b67a2] flex items-center justify-center mx-auto mb-2">
                <i className="ph ph-user-circle text-2xl" />
              </div>
              <h3 className="font-serif text-2xl text-[#122e49] font-medium">Personalizar Invitado</h3>
              <p className="text-xs text-slate-500 mt-1">
                Prueba cómo ve la invitación un invitado específico antes de enviársela.
              </p>
            </div>

            <div className="space-y-4">
              {/* Presets rápidos */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Ejemplos Pre-configurados:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(demoGuestsData).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => {
                        applyGuestData({ id: key, ...val });
                        setShowSimulateModal(false);
                        triggerCopiedToast(`Cargado: ${val.nombre}`);
                      }}
                      className="px-2.5 py-1.5 rounded-lg border border-sky-200 bg-sky-50/60 hover:bg-sky-100 text-[11px] font-medium text-[#1b67a2] truncate transition-colors"
                    >
                      {val.nombre.split(' ')[0]} {val.nombre.split(' ')[1] || ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Formulario manual */}
              <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nombre o Familia:</label>
                  <input
                    type="text"
                    value={currentGuest.nombre}
                    onChange={(e) => applyGuestData({ nombre: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    placeholder="Ej. Familia Tezó Gómez"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Adultos:</label>
                    <input
                      type="number"
                      min="1"
                      value={currentGuest.adultos}
                      onChange={(e) => {
                        const a = Number(e.target.value);
                        applyGuestData({ adultos: a, pases: a + currentGuest.ninos });
                      }}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Niños:</label>
                    <input
                      type="number"
                      min="0"
                      value={currentGuest.ninos}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        applyGuestData({ ninos: n, pases: currentGuest.adultos + n });
                      }}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nota o dedicatoria:</label>
                  <input
                    type="text"
                    value={currentGuest.nota}
                    onChange={(e) => applyGuestData({ nota: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                    placeholder="Ej. Mesa de Honor reservada"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowSimulateModal(false)}
                  className="w-full py-2.5 bg-[#1b67a2] hover:bg-[#1a5684] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  Aplicar y Ver Invitación
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
