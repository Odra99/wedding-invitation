import React from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import { HydrangeaCorner } from './WatercolorHydrangea';
import { weddingInfo } from '../data/weddingData';

export const InvitationHero: React.FC = () => {
  return (
    <header className="hero" id="invitacion">
      {/* Hortensias en acuarela: esquina superior derecha y la misma girada 180° abajo a la izquierda */}
      <div className="hero-floral hero-floral-tr animate-floral-sway">
        <HydrangeaCorner className="w-full h-full" />
      </div>
      <div className="hero-floral hero-floral-bl">
        <HydrangeaCorner className="w-full h-full rotate-180" />
      </div>

      <div className="hero-in">
        <p className="join hero-rise" style={{ animationDelay: '0.1s' }}>Nuestra Boda Civil</p>

        <h1 className="hero-rise" style={{ animationDelay: '0.3s' }}>
          <span className="n1">{weddingInfo.brideName}</span>
          <span className="hero-amp">&amp;</span>
          <span className="n2">{weddingInfo.groomName}</span>
        </h1>

        <div className="hero-date hero-rise" style={{ animationDelay: '0.55s' }}>
          <span>Domingo</span>
          <strong>
            <span className="hero-day">20</span>
            <span className="hero-month">Diciembre · 2026</span>
          </strong>
          <span>11:30 AM</span>
        </div>

        <p className="place hero-rise" style={{ animationDelay: '0.75s' }}>
          {weddingInfo.venueName} · {weddingInfo.city}, Quetzaltenango
        </p>
      </div>

      <a href="#bienvenida" className="hero-scroll hero-rise" style={{ animationDelay: '1.1s' }}>
        <span>Desliza</span>
        <CaretDownIcon className="hero-scroll-caret" />
      </a>
    </header>
  );
};
