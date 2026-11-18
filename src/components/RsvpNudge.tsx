import React, { useEffect, useState } from 'react';

/**
 * Botón flotante "Confirmar" con un sobre que se abre y se cierra en bucle
 * (sale una tarjetita con un corazón) para llamar la atención.
 * Si la persona prefiere menos movimiento, el sobre se queda quieto.
 */

const OPEN_MS = 1400;    // tiempo con el sobre abierto
const CLOSED_MS = 2400;  // tiempo con el sobre cerrado antes de volver a abrirse

export const RsvpNudge: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer: number;
    const cycle = (nextOpen: boolean) => {
      setOpen(nextOpen);
      timer = window.setTimeout(() => cycle(!nextOpen), nextOpen ? OPEN_MS : CLOSED_MS);
    };
    // Primera apertura poco después de aparecer el botón
    timer = window.setTimeout(() => cycle(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`rsvp-nudge ${open ? 'is-open' : ''}`}>
      <a
        href="#rsvp"
        aria-label="Confirmar asistencia"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className="rsvp-nudge-button"
      >
        <svg className="rsvp-envelope" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          {/* Fondo del sobre */}
          <rect x="2.5" y="7.5" width="19" height="12.5" rx="2" className="env-back" />
          {/* Solapa abierta (detrás de la tarjeta) */}
          <path d="M2.5 7.5 L12 1.8 L21.5 7.5 Z" className="env-flap-open" />
          {/* Tarjetita con corazón que asoma */}
          <g className="env-card">
            <rect x="5.5" y="8" width="13" height="9" rx="1" fill="#fff" />
            <path d="M12 14.6 C9.3 12.8 8.8 11.6 9.4 10.8 C10 10 11.2 10.2 12 11.1 C12.8 10.2 14 10 14.6 10.8 C15.2 11.6 14.7 12.8 12 14.6Z" fill="#BFA369" />
          </g>
          {/* Bolsillo delantero (tapa la parte baja de la tarjeta) */}
          <path d="M2.5 9.5 L12 15.5 L21.5 9.5 V18 Q21.5 20 19.5 20 H4.5 Q2.5 20 2.5 18 Z" className="env-front" />
          {/* Solapa cerrada (encima de todo) */}
          <path d="M2.5 7.5 L12 13.8 L21.5 7.5 Z" className="env-flap-closed" />
        </svg>
        <span>Confirmar</span>
      </a>
    </div>
  );
};
