import React from 'react';

export const FloralSvgDefs: React.FC = () => {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        {/* ================================================================= */}
        {/* GRADIENTES BOTÁNICOS REALISTAS PARA FLORES Y FOLLAJE              */}
        {/* ================================================================= */}

        {/* Hortensias Celestes - Gradiente Profundo */}
        <linearGradient id="hydrCelesteDeep" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e6fa8" />
          <stop offset="50%" stopColor="#439de0" />
          <stop offset="100%" stopColor="#8ecbf8" />
        </linearGradient>

        {/* Hortensias Celestes - Gradiente Medio Luminoso */}
        <linearGradient id="hydrCelesteMedium" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b91d4" />
          <stop offset="50%" stopColor="#6ebbf3" />
          <stop offset="100%" stopColor="#c5e6fc" />
        </linearGradient>

        {/* Hortensias Celestes - Gradiente Pastel Suave */}
        <linearGradient id="hydrCelestePale" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#62aae2" />
          <stop offset="55%" stopColor="#a9dbfb" />
          <stop offset="100%" stopColor="#eaf5fd" />
        </linearGradient>

        {/* Hortensias Blancas y Perla */}
        <linearGradient id="hydrWhitePure" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bad7ee" />
          <stop offset="45%" stopColor="#e8f3fb" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        {/* Rosa Blanca - Capas Exteriores */}
        <linearGradient id="rosePetalOuter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c8e0f4" />
          <stop offset="60%" stopColor="#f3f8fd" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        {/* Rosa Blanca - Capas Interiores */}
        <linearGradient id="rosePetalInner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9fc8e8" />
          <stop offset="50%" stopColor="#d9ecf8" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        {/* Centro de la Rosa - Crema y Marfil con reflejos dorados */}
        <linearGradient id="roseHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#deb87a" />
          <stop offset="45%" stopColor="#f9edd4" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        {/* Hojas de Hortensia - Verde Botánico Salvia Vivo */}
        <linearGradient id="leafGradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#214a31" />
          <stop offset="45%" stopColor="#3d7250" />
          <stop offset="100%" stopColor="#6da57f" />
        </linearGradient>

        {/* Hojas de Eucalipto - Verde Cenizo Plateado */}
        <linearGradient id="leafGradEucalyptus" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2b493c" />
          <stop offset="50%" stopColor="#4c7562" />
          <stop offset="100%" stopColor="#78a08c" />
        </linearGradient>

        {/* Dorado Metálico Suave para Estambres y Anillos */}
        <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e9d3a5" />
          <stop offset="50%" stopColor="#bfa369" />
          <stop offset="100%" stopColor="#8c733f" />
        </linearGradient>

        {/* Sombra suave para flores y pétalos */}
        <filter id="petalShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#1b476e" floodOpacity="0.22" />
        </filter>

        <filter id="flowerGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#3c9de2" floodOpacity="0.25" />
        </filter>

        {/* ================================================================= */}
        {/* PÉTALO REALISTA DE HORTENSIA (Forma acorazonada / ovalada amplia) */}
        {/* ================================================================= */}
        <path
          id="floret-petal-wide"
          d="M 0,0 C -6,-3 -13,-9 -12,-18 C -11,-24 -3,-27 0,-25 C 3,-27 11,-24 12,-18 C 13,-9 6,-3 0,0 Z"
        />

        {/* ================================================================= */}
        {/* FLORETES INDIVIDUALES DE HORTENSIA (4 PÉTALOS CLAROS Y DEFINIDOS) */}
        {/* ================================================================= */}

        {/* Florete Celeste Intenso */}
        <g id="floret-celeste">
          <use href="#floret-petal-wide" fill="url(#hydrCelesteDeep)" stroke="#1a6396" strokeWidth="0.6" />
          <use href="#floret-petal-wide" fill="url(#hydrCelesteDeep)" stroke="#1a6396" strokeWidth="0.6" transform="rotate(90)" />
          <use href="#floret-petal-wide" fill="url(#hydrCelesteDeep)" stroke="#1a6396" strokeWidth="0.6" transform="rotate(180)" />
          <use href="#floret-petal-wide" fill="url(#hydrCelesteDeep)" stroke="#1a6396" strokeWidth="0.6" transform="rotate(270)" />
          
          {/* Nervaduras tenues en pétalos */}
          <line x1="0" y1="-2" x2="0" y2="-17" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
          <line x1="-2" y1="0" x2="-17" y2="0" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
          <line x1="0" y1="2" x2="0" y2="17" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
          <line x1="2" y1="0" x2="17" y2="0" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />

          {/* Pistilo central realista */}
          <circle cx="0" cy="0" r="3.2" fill="#ffffff" stroke="#1f71a9" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1.8" fill="#deb87a" />
          <circle cx="0" cy="0" r="0.8" fill="#8c733f" />
        </g>

        {/* Florete Celeste Claro / Pastel */}
        <g id="floret-pastel">
          <use href="#floret-petal-wide" fill="url(#hydrCelestePale)" stroke="#499bd8" strokeWidth="0.6" />
          <use href="#floret-petal-wide" fill="url(#hydrCelestePale)" stroke="#499bd8" strokeWidth="0.6" transform="rotate(90)" />
          <use href="#floret-petal-wide" fill="url(#hydrCelestePale)" stroke="#499bd8" strokeWidth="0.6" transform="rotate(180)" />
          <use href="#floret-petal-wide" fill="url(#hydrCelestePale)" stroke="#499bd8" strokeWidth="0.6" transform="rotate(270)" />

          <line x1="0" y1="-2" x2="0" y2="-17" stroke="#ffffff" strokeWidth="0.9" opacity="0.75" />
          <line x1="-2" y1="0" x2="-17" y2="0" stroke="#ffffff" strokeWidth="0.9" opacity="0.75" />
          <line x1="0" y1="2" x2="0" y2="17" stroke="#ffffff" strokeWidth="0.9" opacity="0.75" />
          <line x1="2" y1="0" x2="17" y2="0" stroke="#ffffff" strokeWidth="0.9" opacity="0.75" />

          <circle cx="0" cy="0" r="3" fill="#ffffff" stroke="#55aae9" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1.6" fill="#deb87a" />
          <circle cx="0" cy="0" r="0.7" fill="#8c733f" />
        </g>

        {/* Florete Blanco Marfil */}
        <g id="floret-white">
          <use href="#floret-petal-wide" fill="url(#hydrWhitePure)" stroke="#a1c8e6" strokeWidth="0.6" />
          <use href="#floret-petal-wide" fill="url(#hydrWhitePure)" stroke="#a1c8e6" strokeWidth="0.6" transform="rotate(90)" />
          <use href="#floret-petal-wide" fill="url(#hydrWhitePure)" stroke="#a1c8e6" strokeWidth="0.6" transform="rotate(180)" />
          <use href="#floret-petal-wide" fill="url(#hydrWhitePure)" stroke="#a1c8e6" strokeWidth="0.6" transform="rotate(270)" />

          <line x1="0" y1="-2" x2="0" y2="-17" stroke="#87badf" strokeWidth="0.7" opacity="0.5" />
          <line x1="-2" y1="0" x2="-17" y2="0" stroke="#87badf" strokeWidth="0.7" opacity="0.5" />
          <line x1="0" y1="2" x2="0" y2="17" stroke="#87badf" strokeWidth="0.7" opacity="0.5" />
          <line x1="2" y1="0" x2="17" y2="0" stroke="#87badf" strokeWidth="0.7" opacity="0.5" />

          <circle cx="0" cy="0" r="3" fill="#ffffff" stroke="#79b2db" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1.6" fill="#deb87a" />
          <circle cx="0" cy="0" r="0.7" fill="#8c733f" />
        </g>

        {/* Botón cerrado de Hortensia */}
        <g id="hydrangea-bud">
          <circle cx="0" cy="0" r="3.8" fill="url(#hydrCelesteDeep)" stroke="#1a6396" strokeWidth="0.5" />
          <path d="M -2.5,-2.5 L 2.5,2.5 M -2.5,2.5 L 2.5,-2.5" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />
        </g>

        {/* ================================================================= */}
        {/* ROSA BLANCA DE JARDÍN (MULTI-CAPA, PÉTALOS CONFORMADOS REALISTAS)  */}
        {/* ================================================================= */}
        <g id="flower-rose-white" filter="url(#petalShadow)">
          {/* Sépalos verdes debajo de la flor */}
          <path d="M 0,0 C -8,-15 -25,-35 -35,-32 C -32,-22 -15,-8 0,0 Z" fill="#3a6a4a" />
          <path d="M 0,0 C 8,-15 25,-35 35,-32 C 32,-22 15,-8 0,0 Z" fill="#3a6a4a" />
          <path d="M 0,0 C -20,5 -38,15 -42,8 C -35,-2 -18,-2 0,0 Z" fill="#325d40" />
          <path d="M 0,0 C 20,5 38,15 42,8 C 35,-2 18,-2 0,0 Z" fill="#325d40" />
          <path d="M 0,0 C -5,22 -10,38 0,42 C 10,38 5,22 0,0 Z" fill="#2d543a" />

          {/* CAPA 1: Pétalos exteriores grandes y redondeados */}
          <path
            d="M -30,-12 C -42,-30 -15,-46 0,-42 C 15,-46 42,-30 30,-12 C 45,6 30,35 15,38 C -15,38 -45,6 -30,-12 Z"
            fill="url(#rosePetalOuter)"
            stroke="#a9cde8"
            strokeWidth="0.8"
          />

          {/* Pétalos guardas ondulados */}
          <path
            d="M -26,-20 C -18,-38 18,-38 26,-20 C 36,-6 28,18 18,28 C -18,28 -36,-6 -26,-20 Z"
            fill="#ffffff"
            stroke="#a1c8e6"
            strokeWidth="0.8"
          />

          {/* CAPA 2: Pétalos intermedios envolventes */}
          <path
            d="M -22,-8 C -30,-22 0,-34 16,-26 C 30,-18 30,6 20,18 C 6,28 -20,24 -22,-8 Z"
            fill="url(#rosePetalInner)"
            stroke="#92bfe1"
            strokeWidth="0.7"
          />
          <path
            d="M 18,-14 C 28,-2 22,22 2,24 C -18,24 -26,8 -18,-8 C -8,-24 10,-24 18,-14 Z"
            fill="#ffffff"
            stroke="#98c3e3"
            strokeWidth="0.7"
          />

          {/* CAPA 3: Pétalos interiores con curvatura elegante */}
          <path
            d="M -14,-4 C -18,-16 4,-24 14,-16 C 22,-8 18,12 8,16 C -6,18 -12,8 -14,-4 Z"
            fill="url(#rosePetalOuter)"
            stroke="#8dbde0"
            strokeWidth="0.7"
          />
          <path
            d="M 10,-8 C 16,0 12,12 0,14 C -12,14 -14,2 -8,-6 C 0,-14 8,-12 10,-8 Z"
            fill="#ffffff"
            stroke="#87b8dc"
            strokeWidth="0.7"
          />

          {/* CAPA 4: Corazón de la rosa arremolinado con toques crema/dorado */}
          <path
            d="M -7,-2 C -10,-10 4,-14 9,-8 C 13,-2 10,8 4,10 C -4,11 -6,4 -7,-2 Z"
            fill="url(#roseHeartGrad)"
            stroke="#cca35e"
            strokeWidth="0.6"
          />
          
          {/* Espiral central del capullo de rosa */}
          <path
            d="M -4,-1 C -5,-6 3,-8 6,-5 C 8,-2 6,4 2,5 C -2,6 -4,3 -3,0 C -2,-2 2,-3 3,-1"
            fill="none"
            stroke="#b38a45"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="0.5" cy="-0.5" r="1.2" fill="#d4af37" />
        </g>

        {/* ================================================================= */}
        {/* RAMA DE GYPSOPHILA (NUBE BLANCA CON ESTRELLITAS Y RAMAS)          */}
        {/* ================================================================= */}
        <g id="flower-gypsophila">
          {/* Tallo principal */}
          <path d="M 0,42 Q 6,24 2,6 Q -4,-12 0,-32" fill="none" stroke="#487556" strokeWidth="1.2" strokeLinecap="round" />
          {/* Ramitas */}
          <path d="M 3,24 Q -12,18 -20,10" fill="none" stroke="#558463" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M 1,8 Q 16,2 24,-6" fill="none" stroke="#558463" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M -1,-8 Q -16,-14 -22,-24" fill="none" stroke="#558463" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M 0,-16 Q 14,-22 20,-34" fill="none" stroke="#558463" strokeWidth="0.9" strokeLinecap="round" />

          {/* Flores estrelladas de Gypsophila */}
          <g transform="translate(-20, 10)">
            <circle cx="0" cy="0" r="4.2" fill="#ffffff" stroke="#90c2e4" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="1.2" fill="#deb87a" />
          </g>
          <g transform="translate(24, -6)">
            <circle cx="0" cy="0" r="4.5" fill="#ffffff" stroke="#90c2e4" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="1.2" fill="#deb87a" />
          </g>
          <g transform="translate(-22, -24)">
            <circle cx="0" cy="0" r="4.2" fill="#ffffff" stroke="#90c2e4" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="1.2" fill="#deb87a" />
          </g>
          <g transform="translate(20, -34)">
            <circle cx="0" cy="0" r="4.5" fill="#ffffff" stroke="#90c2e4" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="1.2" fill="#deb87a" />
          </g>
          <g transform="translate(0, -32)">
            <circle cx="0" cy="0" r="5" fill="#ffffff" stroke="#90c2e4" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="1.4" fill="#deb87a" />
          </g>
          {/* Pequeños capullitos */}
          <circle cx="-10" cy="18" r="2.2" fill="#eaf3fb" stroke="#75a585" strokeWidth="0.5" />
          <circle cx="10" cy="4" r="2.2" fill="#eaf3fb" stroke="#75a585" strokeWidth="0.5" />
          <circle cx="-8" cy="-14" r="2.2" fill="#eaf3fb" stroke="#75a585" strokeWidth="0.5" />
        </g>

        {/* ================================================================= */}
        {/* HOJA BOTÁNICA DE HORTENSIA (VERDE NATURAL CON NERVADURAS VIVAS)  */}
        {/* ================================================================= */}
        <g id="hydrangea-leaf-large" filter="url(#petalShadow)">
          {/* Silueta dentada y elegante de hoja */}
          <path
            d="M 0,0 C -12,-12 -22,-32 -18,-54 C -14,-70 0,-85 0,-85 C 0,-85 14,-70 18,-54 C 22,-32 12,-12 0,0 Z"
            fill="url(#leafGradGreen)"
            stroke="#1b3d28"
            strokeWidth="0.8"
          />
          {/* Nervadura principal */}
          <path d="M 0,-82 L 0,-2" stroke="#bfe2c8" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
          {/* Nervaduras secundarias alternas */}
          <path d="M 0,-65 Q -8,-58 -14,-56" stroke="#bfe2c8" strokeWidth="1.1" fill="none" opacity="0.8" />
          <path d="M 0,-62 Q 8,-55 14,-53" stroke="#bfe2c8" strokeWidth="1.1" fill="none" opacity="0.8" />
          <path d="M 0,-48 Q -10,-40 -16,-38" stroke="#bfe2c8" strokeWidth="1.1" fill="none" opacity="0.8" />
          <path d="M 0,-44 Q 10,-36 16,-34" stroke="#bfe2c8" strokeWidth="1.1" fill="none" opacity="0.8" />
          <path d="M 0,-30 Q -8,-24 -14,-22" stroke="#bfe2c8" strokeWidth="1.1" fill="none" opacity="0.8" />
          <path d="M 0,-26 Q 8,-20 14,-18" stroke="#bfe2c8" strokeWidth="1.1" fill="none" opacity="0.8" />
        </g>

        {/* ================================================================= */}
        {/* RAMA DE EUCALIPTO (HOJAS REDONDEADAS SALVIA/CENIZO)               */}
        {/* ================================================================= */}
        <g id="eucalyptus-sprig" filter="url(#petalShadow)">
          <path d="M 0,48 Q -4,20 0,-30" fill="none" stroke="#365745" strokeWidth="1.6" strokeLinecap="round" />
          
          <g transform="translate(-10, 28) rotate(-28)">
            <ellipse cx="0" cy="0" rx="9" ry="7" fill="url(#leafGradEucalyptus)" stroke="#224233" strokeWidth="0.6" />
            <line x1="-7" y1="0" x2="7" y2="0" stroke="#a4c9b5" strokeWidth="0.8" opacity="0.75" />
          </g>
          <g transform="translate(10, 16) rotate(26)">
            <ellipse cx="0" cy="0" rx="9" ry="7" fill="url(#leafGradEucalyptus)" stroke="#224233" strokeWidth="0.6" />
            <line x1="-7" y1="0" x2="7" y2="0" stroke="#a4c9b5" strokeWidth="0.8" opacity="0.75" />
          </g>
          <g transform="translate(-9, 0) rotate(-22)">
            <ellipse cx="0" cy="0" rx="8" ry="6" fill="url(#leafGradEucalyptus)" stroke="#224233" strokeWidth="0.6" />
            <line x1="-6" y1="0" x2="6" y2="0" stroke="#a4c9b5" strokeWidth="0.8" opacity="0.75" />
          </g>
          <g transform="translate(9, -14) rotate(22)">
            <ellipse cx="0" cy="0" rx="7.5" ry="5.5" fill="url(#leafGradEucalyptus)" stroke="#224233" strokeWidth="0.6" />
            <line x1="-5.5" y1="0" x2="5.5" y2="0" stroke="#a4c9b5" strokeWidth="0.8" opacity="0.75" />
          </g>
          <g transform="translate(0, -28)">
            <ellipse cx="0" cy="0" rx="6.5" ry="5" fill="url(#leafGradEucalyptus)" stroke="#224233" strokeWidth="0.6" />
            <line x1="-4.5" y1="0" x2="4.5" y2="0" stroke="#a4c9b5" strokeWidth="0.8" opacity="0.75" />
          </g>
        </g>

        {/* ================================================================= */}
        {/* POMPÓN LUSH DE HORTENSIA CELESTE (RACIMO COMPACTO Y DEFINIDO)     */}
        {/* ================================================================= */}
        <g id="hydrangea-pompom-celeste" filter="url(#flowerGlow)">
          {/* Fondo base sólido floral para evitar transparencias extrañas */}
          <ellipse cx="0" cy="0" rx="42" ry="38" fill="#1b6ca3" opacity="0.85" />

          {/* CAPA DE FONDO: Floretes de profundidad */}
          <g transform="translate(-26, -18) scale(0.9) rotate(15)"><use href="#floret-celeste" /></g>
          <g transform="translate(0, -26) scale(0.92) rotate(-10)"><use href="#floret-celeste" /></g>
          <g transform="translate(26, -18) scale(0.9) rotate(25)"><use href="#floret-pastel" /></g>
          <g transform="translate(-30, 6) scale(0.88) rotate(45)"><use href="#floret-celeste" /></g>
          <g transform="translate(30, 6) scale(0.88) rotate(-35)"><use href="#floret-pastel" /></g>
          <g transform="translate(-22, 24) scale(0.88) rotate(-15)"><use href="#floret-pastel" /></g>
          <g transform="translate(0, 28) scale(0.92) rotate(20)"><use href="#floret-celeste" /></g>
          <g transform="translate(22, 24) scale(0.88) rotate(10)"><use href="#floret-white" /></g>

          {/* CAPA MEDIA: Floretes voluminosos en celeste medio y pastel */}
          <g transform="translate(-14, -12) scale(1.05) rotate(-18)"><use href="#floret-celeste" /></g>
          <g transform="translate(14, -12) scale(1.05) rotate(16)"><use href="#floret-pastel" /></g>
          <g transform="translate(-16, 12) scale(1.02) rotate(32)"><use href="#floret-pastel" /></g>
          <g transform="translate(16, 12) scale(1.02) rotate(-15)"><use href="#floret-white" /></g>

          {/* CAPA FRONTAL: Florete principal destacado en el centro */}
          <g transform="translate(0, 0) scale(1.22) rotate(8)"><use href="#floret-celeste" /></g>

          {/* Capullitos intercalados para realismo botánico */}
          <g transform="translate(-32, -8)"><use href="#hydrangea-bud" /></g>
          <g transform="translate(32, -8)"><use href="#hydrangea-bud" /></g>
          <g transform="translate(-8, -32)"><use href="#hydrangea-bud" /></g>
          <g transform="translate(8, 32)"><use href="#hydrangea-bud" /></g>
        </g>

        {/* ================================================================= */}
        {/* POMPÓN LUSH DE HORTENSIA BLANCA (RACIMO COMPACTO Y LUMINOSO)      */}
        {/* ================================================================= */}
        <g id="hydrangea-pompom-white" filter="url(#flowerGlow)">
          {/* Fondo base sólido para volumen */}
          <ellipse cx="0" cy="0" rx="42" ry="38" fill="#8cb9db" opacity="0.75" />

          {/* CAPA DE FONDO: Floretes en blanco y celeste tenue */}
          <g transform="translate(-25, -18) scale(0.9) rotate(12)"><use href="#floret-white" /></g>
          <g transform="translate(0, -26) scale(0.92) rotate(-8)"><use href="#floret-pastel" /></g>
          <g transform="translate(25, -18) scale(0.9) rotate(22)"><use href="#floret-white" /></g>
          <g transform="translate(-28, 6) scale(0.88) rotate(40)"><use href="#floret-white" /></g>
          <g transform="translate(28, 6) scale(0.88) rotate(-30)"><use href="#floret-white" /></g>
          <g transform="translate(-22, 24) scale(0.88) rotate(-12)"><use href="#floret-pastel" /></g>
          <g transform="translate(0, 28) scale(0.92) rotate(18)"><use href="#floret-white" /></g>
          <g transform="translate(22, 24) scale(0.88) rotate(8)"><use href="#floret-white" /></g>

          {/* CAPA MEDIA */}
          <g transform="translate(-13, -11) scale(1.05) rotate(-16)"><use href="#floret-white" /></g>
          <g transform="translate(13, -11) scale(1.05) rotate(18)"><use href="#floret-white" /></g>
          <g transform="translate(-15, 12) scale(1.02) rotate(28)"><use href="#floret-pastel" /></g>
          <g transform="translate(15, 12) scale(1.02) rotate(-12)"><use href="#floret-white" /></g>

          {/* CAPA FRONTAL DESTACADA */}
          <g transform="translate(0, 0) scale(1.22) rotate(5)"><use href="#floret-white" /></g>

          {/* Capullitos */}
          <g transform="translate(-30, -6)"><use href="#hydrangea-bud" /></g>
          <g transform="translate(30, -6)"><use href="#hydrangea-bud" /></g>
          <g transform="translate(-6, -30)"><use href="#hydrangea-bud" /></g>
          <g transform="translate(6, 30)"><use href="#hydrangea-bud" /></g>
        </g>

      </defs>
    </svg>
  );
};
