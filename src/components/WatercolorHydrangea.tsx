import React, { useId, useMemo } from 'react';

/**
 * Hortensia estilo acuarela, dibujada en SVG.
 *
 * El "look" acuarela sale de cuatro trucos:
 *  1. Bordes irregulares: un filtro de turbulencia desplaza los contornos.
 *  2. Pigmento acumulado en el borde: cada pétalo va de blanco en el centro
 *     a un tono más oscuro en la orilla, con un trazo semitransparente.
 *  3. Veladuras: los pétalos son translúcidos y se encima unos sobre otros.
 *  4. Aguada de fondo: manchas difuminadas debajo del racimo dan volumen
 *     (claro arriba a la derecha, sombra abajo a la izquierda).
 *
 * Espacio local de una flor: 300 × 420, con el centro del racimo en (150, 125)
 * y el tallo bajando hasta (142, 420).
 */

// Generador pseudoaleatorio con semilla: la flor sale igual en cada render
export function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PETAL = 'M0,0 C-5,-4 -12,-10 -11.5,-16 C-11,-21 -4,-24.5 0,-25.5 C4,-24.5 11,-21 11.5,-16 C12,-10 5,-4 0,0Z';
const LEAF =
  'M0,0 C-20,-14 -31,-46 -22,-76 C-15,-96 -4,-106 0,-114 C4,-106 15,-96 22,-76 C31,-46 20,-14 0,0Z';
const LEAF_HALF = 'M0,0 C-20,-14 -31,-46 -22,-76 C-15,-96 -4,-106 0,-114 Z';

/**
 * Paletas por tono. Índices 0-4: de claro a oscuro; 5-6: acento
 * (lila en la azul, crema en la blanca).
 */
const TONES = {
  blue: {
    fills: ['#eaf2fc', '#d6e5f8', '#c0d7f3', '#a8c6ec', '#90b3e2', '#dcd8f4', '#c9c3ec'],
    edges: ['#a9c3e8', '#93b3e2', '#7ea2da', '#6a91d0', '#577fc3', '#b0a8de', '#9b92d3'],
    wash: ['#c4d8f2', '#8eaadc']
  },
  white: {
    fills: ['#ffffff', '#fbfcf9', '#f4f6f1', '#ebefe8', '#e1e7df', '#f8f3e6', '#f1ead8'],
    edges: ['#d9e0d6', '#cdd6cb', '#c0cbbf', '#b2bfb2', '#a3b2a5', '#e2d6b8', '#d6c7a2'],
    wash: ['#eef2ec', '#c6d2c8']
  }
} as const;
export type HydrangeaTone = keyof typeof TONES;

const LEAF_TONES = {
  sage: { from: '#dfe6b4', to: '#93b49a', shade: '#6f9a83' },
  teal: { from: '#a9cbbf', to: '#5d8d88', shade: '#3f6f6c' },
  euc: { from: '#d5ddd3', to: '#8aa498', shade: '#62807a' }
} as const;
export type LeafTone = keyof typeof LEAF_TONES;

type Floret = { x: number; y: number; s: number; rot: number; c: number };

function makeFlorets(seed: number): Floret[] {
  const rand = mulberry32(seed);
  const florets: Floret[] = [];
  for (let tries = 0; florets.length < 52 && tries < 8000; tries++) {
    const x = 50 + rand() * 200;
    const y = 5 + rand() * 245;
    // Racimo en cúpula alta que se angosta hacia abajo (forma de cono redondeado)
    const dx = (x - 150) / 94;
    const dy = (y - 118) / 112;
    if (dx * dx + dy * dy > 1) continue;
    if (y > 170 && Math.abs(x - 150) > 94 * (1 - (y - 170) / 90)) continue;
    if (florets.some((f) => Math.hypot(f.x - x, f.y - y) < 21)) continue;

    // Luz desde arriba a la derecha
    const light = ((x - 150) - (y - 122)) / 200 + (rand() - 0.5) * 0.7;
    const c = rand() < 0.12
      ? 5 + (light > 0 ? 0 : 1)
      : Math.min(4, Math.max(0, Math.round(((1 - light) / 2) * 4.4 - 0.9)));
    florets.push({ x, y, s: 1 + rand() * 0.35, rot: rand() * 90, c });
  }
  // Los del borde se pintan primero; los del frente (centro) quedan encima
  return florets.sort((a, b) => Math.hypot(b.x - 158, b.y - 112) - Math.hypot(a.x - 158, a.y - 112));
}

/** Hoja grande con nervaduras. Base en (x, y); con angle 0 la punta apunta hacia arriba. */
export const Leaf: React.FC<{
  x: number; y: number; angle: number; scale: number; tone: LeafTone; gid: string;
}> = ({ x, y, angle, scale, tone, gid }) => (
  <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
    <path d={LEAF} fill={`url(#${gid}-leaf-${tone})`} opacity="0.92" />
    {/* Media hoja más oscura: el pliegue que se ve en la acuarela */}
    <path d={LEAF_HALF} fill={LEAF_TONES[tone].shade} opacity="0.28" />
    <path d={LEAF} fill="none" stroke={LEAF_TONES[tone].shade} strokeWidth="1.2" opacity="0.35" />
    <path d="M0,-2 Q2,-55 0,-108" fill="none" stroke="#f4f7ea" strokeWidth="1.6" opacity="0.55" strokeLinecap="round" />
    {[-30, -52, -74].map((vy) => (
      <g key={vy} stroke="#f4f7ea" strokeWidth="0.9" opacity="0.4" fill="none">
        <path d={`M0,${vy} Q-9,${vy - 4} -16,${vy - 12}`} />
        <path d={`M0,${vy - 6} Q9,${vy - 10} 16,${vy - 18}`} />
      </g>
    ))}
  </g>
);

/**
 * Rama de eucalipto: tallo curvo con hojas redondas por pares que se achican
 * hacia la punta. Base en (x, y); con angle 0 crece hacia arriba (≈ 150 de largo).
 */
export const Eucalyptus: React.FC<{ x: number; y: number; angle: number; scale?: number; gid: string }> = ({
  x, y, angle, scale = 1, gid
}) => (
  <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
    <path d="M0,0 Q8,-70 -4,-150" fill="none" stroke="#8a9e8c" strokeWidth="1.6" strokeLinecap="round" />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => {
      const t = i / 7;
      const py = -16 - t * 128;
      const px = 8 * Math.sin(t * 2.6) - t * 4;
      const r = 13 - i * 1.3;
      return (
        <g key={i}>
          {[-1, 1].map((side) => (
            <ellipse
              key={side}
              cx={px + side * (r * 0.95)}
              cy={py + 3}
              rx={r}
              ry={r * 0.82}
              transform={`rotate(${side * 18} ${px + side * r} ${py})`}
              fill={`url(#${gid}-leaf-euc)`}
              stroke={LEAF_TONES.euc.shade}
              strokeWidth="0.7"
              strokeOpacity="0.4"
              opacity={0.88}
            />
          ))}
        </g>
      );
    })}
    <ellipse cx="-4" cy="-152" rx="5" ry="4" fill={`url(#${gid}-leaf-euc)`} opacity="0.9" />
  </g>
);

/** Definiciones compartidas (filtros y gradientes). Ponla una vez por <svg>. */
export const WatercolorDefs: React.FC<{ gid: string }> = ({ gid }) => (
  <defs>
    <filter id={`${gid}-edge`} x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="7" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" result="wobble" />
      <feGaussianBlur in="wobble" stdDeviation="0.35" />
    </filter>
    <filter id={`${gid}-wash`} x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="12" />
    </filter>
    {(Object.keys(LEAF_TONES) as LeafTone[]).map((k) => (
      <linearGradient key={k} id={`${gid}-leaf-${k}`} x1="0" y1="1" x2="0.3" y2="0">
        <stop offset="0%" stopColor={LEAF_TONES[k].to} />
        <stop offset="100%" stopColor={LEAF_TONES[k].from} />
      </linearGradient>
    ))}
    {(Object.keys(TONES) as HydrangeaTone[]).map((tone) =>
      TONES[tone].fills.map((col, i) => (
        <radialGradient key={tone + i} id={`${gid}-pet-${tone}-${i}`} cx="0.5" cy="1" r="1.05">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor={col} />
          <stop offset="100%" stopColor={TONES[tone].edges[i]} />
        </radialGradient>
      ))
    )}
    <linearGradient id={`${gid}-stem`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#8fae9c" />
      <stop offset="100%" stopColor="#b9a479" />
    </linearGradient>
  </defs>
);

/** Una hortensia con tallo y hojas, dibujada como <g> en coordenadas locales 300 × 420. */
export const WatercolorHydrangea: React.FC<{
  gid: string; seed?: number; transform?: string; leaves?: boolean; tone?: HydrangeaTone;
}> = ({ gid, seed = 1, transform, leaves = true, tone = 'blue' }) => {
  const florets = useMemo(() => makeFlorets(seed), [seed]);
  const pal = TONES[tone];

  return (
    <g transform={transform}>
      {leaves && (
        <g filter={`url(#${gid}-edge)`}>
          {/* Hojas de atrás (asoman detrás del racimo) */}
          <Leaf gid={gid} x={112} y={196} angle={-84} scale={1.35} tone="sage" />
          <Leaf gid={gid} x={192} y={170} angle={80} scale={1.25} tone="sage" />
          {/* Tallo */}
          <path d="M150,215 C149,290 147,355 142,420" fill="none" stroke={`url(#${gid}-stem)`} strokeWidth="3.4" strokeLinecap="round" />
          <path d="M148,300 C160,312 172,318 186,322" fill="none" stroke="#9fb39f" strokeWidth="1.6" strokeLinecap="round" />
          {/* Hojas de abajo, delante del tallo */}
          <Leaf gid={gid} x={140} y={262} angle={-104} scale={1.05} tone="teal" />
          <Leaf gid={gid} x={160} y={272} angle={112} scale={1.1} tone="teal" />
          <Leaf gid={gid} x={186} y={322} angle={138} scale={0.72} tone="teal" />
          <Leaf gid={gid} x={146} y={318} angle={-136} scale={0.66} tone="sage" />
        </g>
      )}

      {/* Aguada de fondo que da volumen al racimo */}
      <g filter={`url(#${gid}-wash)`}>
        <ellipse cx="150" cy="122" rx="86" ry="100" fill={pal.wash[0]} opacity="0.6" />
        <ellipse cx="122" cy="168" rx="50" ry="42" fill={pal.wash[1]} opacity="0.35" />
        <ellipse cx="182" cy="80" rx="50" ry="44" fill="#ffffff" opacity="0.7" />
      </g>

      {/* Floretes de 4 pétalos */}
      <g filter={`url(#${gid}-edge)`}>
        {florets.map((f, i) => (
          <g key={i} transform={`translate(${f.x.toFixed(1)} ${f.y.toFixed(1)}) rotate(${f.rot.toFixed(0)}) scale(${f.s.toFixed(2)})`}>
            {[0, 90, 180, 270].map((a) => (
              <path
                key={a}
                d={PETAL}
                transform={`rotate(${a})`}
                fill={`url(#${gid}-pet-${tone}-${f.c})`}
                fillOpacity="0.93"
                stroke={pal.edges[f.c]}
                strokeWidth="0.9"
                strokeOpacity="0.45"
              />
            ))}
          </g>
        ))}
      </g>

      {/* Centritos de cada florete */}
      <g>
        {florets.map((f, i) => (
          <circle key={i} cx={f.x.toFixed(1)} cy={f.y.toFixed(1)} r={1.5 * f.s} fill={tone === 'white' ? '#c9b98a' : pal.edges[f.c]} opacity="0.8" />
        ))}
      </g>
    </g>
  );
};

/**
 * Ramo para la esquina superior derecha: hojas y eucalipto que salen hacia la
 * página y racimos azules y blancos con la punta del cono hacia la esquina,
 * como si el tallo saliera de ahí. Para otras esquinas, gira el <svg> completo.
 */
export const HydrangeaCorner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const gid = 'wc' + useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <svg viewBox="0 0 320 320" className={className} aria-hidden="true" focusable="false" style={{ overflow: 'visible' }}>
      <WatercolorDefs gid={gid} />
      <g filter={`url(#${gid}-edge)`}>
        <Eucalyptus gid={gid} x={150} y={20} angle={-100} scale={1.05} />
        <Eucalyptus gid={gid} x={300} y={150} angle={-178} scale={1.05} />
        <Leaf gid={gid} x={196} y={34} angle={-78} scale={1.63} tone="sage" />
        <Leaf gid={gid} x={232} y={70} angle={-112} scale={1.86} tone="teal" />
        <Leaf gid={gid} x={238} y={104} angle={-142} scale={1.94} tone="sage" />
        <Leaf gid={gid} x={276} y={122} angle={-172} scale={1.78} tone="teal" />
        <Leaf gid={gid} x={300} y={190} angle={-196} scale={1.32} tone="sage" />
        <Leaf gid={gid} x={130} y={30} angle={-58} scale={1.16} tone="teal" />
        <Eucalyptus gid={gid} x={228} y={96} angle={-128} scale={0.9} />
      </g>
      <WatercolorHydrangea gid={gid} seed={11} tone="white" leaves={false} transform="translate(148 46) rotate(-118) scale(0.52) translate(-150 -125)" />
      <WatercolorHydrangea gid={gid} seed={29} leaves={false} transform="translate(290 176) rotate(-160) scale(0.48) translate(-150 -125)" />
      <WatercolorHydrangea gid={gid} seed={5} leaves={false} transform="translate(246 72) rotate(-135) scale(0.74) translate(-150 -125)" />
    </svg>
  );
};
