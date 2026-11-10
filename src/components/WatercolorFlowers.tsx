import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Eucalyptus, HydrangeaCorner, Leaf, WatercolorDefs, WatercolorHydrangea, mulberry32 } from './WatercolorHydrangea';

/**
 * Flores silvestres en acuarela (florecitas de 5 pétalos, lavanda, campanillas,
 * botones, hortensia de encaje y pastos) y los separadores entre secciones.
 * Usan el mismo filtro de bordes irregulares que las hortensias.
 */

/** Marca el elemento como visible la primera vez que entra a la pantalla. */
export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

// ---------- Paletas ----------
// [color, orilla] de cada florecita
const BLOSSOMS = [
  ['#a9c0ec', '#6f8fd2'],
  ['#8fa9e4', '#5d7cc6'],
  ['#c0c8f0', '#8190d8'],
  ['#b8d0ee', '#7097cf']
] as const;
const LAVENDER = ['#a99de0', '#bdb3ea', '#8d80d0', '#c9c1ee'];
const STEM = '#9fb39f';

const BLOSSOM_PETAL = 'M0,0 C-6,-3 -9.5,-11 -6.5,-16.5 C-3.5,-20.5 3.5,-20.5 6.5,-16.5 C9.5,-11 6,-3 0,0Z';
const BELL = 'M-6,0 C-7,7 -8,13 -10,18 L-5,15.5 L0,19 L5,15.5 L10,18 C8,13 7,7 6,0 C3,-2 -3,-2 -6,0Z';
const GRASS = 'M0,0 C-5,-25 -4,-50 3,-80 C2,-50 4,-25 0,0Z';

const FlowerDefs: React.FC<{ gid: string }> = ({ gid }) => (
  <defs>
    {BLOSSOMS.map(([c, e], i) => (
      <radialGradient key={i} id={`${gid}-bl-${i}`} cx="0.5" cy="1" r="1.1">
        <stop offset="0%" stopColor="#f6f8fe" />
        <stop offset="40%" stopColor={c} />
        <stop offset="100%" stopColor={e} />
      </radialGradient>
    ))}
    <linearGradient id={`${gid}-bell`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#6f86cf" />
      <stop offset="100%" stopColor="#b9c6f0" />
    </linearGradient>
    <radialGradient id={`${gid}-bud`} cx="0.35" cy="0.3" r="0.9">
      <stop offset="0%" stopColor="#ece7f8" />
      <stop offset="60%" stopColor="#b6a8de" />
      <stop offset="100%" stopColor="#8a79c4" />
    </radialGradient>
  </defs>
);

// ---------- Flores individuales (cabeza dibujada en el origen) ----------
const Blossom: React.FC<{ gid: string; c: number; s: number }> = ({ gid, c, s }) => (
  <g transform={`scale(${s})`}>
    {[0, 72, 144, 216, 288].map((a) => (
      <path
        key={a}
        d={BLOSSOM_PETAL}
        transform={`rotate(${a})`}
        fill={`url(#${gid}-bl-${c})`}
        fillOpacity="0.92"
        stroke={BLOSSOMS[c][1]}
        strokeWidth="0.8"
        strokeOpacity="0.45"
      />
    ))}
    <circle r="3.2" fill="#f1e3a6" />
    <circle r="1.4" fill="#c9a659" />
  </g>
);

const LavenderSpike: React.FC<{ s: number; seed: number }> = ({ s, seed }) => {
  const rand = mulberry32(seed);
  return (
    <g transform={`scale(${s})`}>
      {Array.from({ length: 9 }, (_, i) => {
        const side = i % 2 ? 1 : -1;
        const size = 1 - i * 0.06;
        return (
          <ellipse
            key={i}
            cx={side * 3}
            cy={-i * 5.2}
            rx={2.6 * size}
            ry={4 * size}
            transform={`rotate(${side * 28} ${side * 3} ${-i * 5.2})`}
            fill={LAVENDER[Math.floor(rand() * LAVENDER.length)]}
            stroke="#7c6fc0"
            strokeWidth="0.5"
            strokeOpacity="0.4"
            opacity="0.9"
          />
        );
      })}
    </g>
  );
};

const Bellflower: React.FC<{ gid: string; s: number }> = ({ gid, s }) => (
  <g transform={`scale(${s}) rotate(150)`}>
    <path d={BELL} fill={`url(#${gid}-bell)`} fillOpacity="0.9" stroke="#5f77c2" strokeWidth="0.7" strokeOpacity="0.5" />
    <path d="M0,2 L0,14" stroke="#eef2fb" strokeWidth="0.9" opacity="0.6" />
  </g>
);

const Bud: React.FC<{ gid: string; s: number }> = ({ gid, s }) => (
  <g transform={`scale(${s})`}>
    <ellipse cx="0" cy="-7" rx="5.5" ry="8" fill={`url(#${gid}-bud)`} stroke="#7e6fbd" strokeWidth="0.6" strokeOpacity="0.4" />
    <path d="M0,0 C-4,-2 -7,-6 -7,-10 M0,0 C4,-2 7,-6 7,-10" fill="none" stroke="#86a58b" strokeWidth="1.2" strokeLinecap="round" />
  </g>
);

/** Hortensia de encaje: umbela con florecitas diminutas azules y verdes (como en la referencia). */
const LaceCluster: React.FC<{ s: number; seed: number }> = ({ s, seed }) => {
  const rand = mulberry32(seed);
  const pts = Array.from({ length: 16 }, () => {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * 18;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.75 - 4, c: rand() };
  });
  return (
    <g transform={`scale(${s})`}>
      {pts.map((p, i) => (
        <path key={'l' + i} d={`M0,14 Q${p.x * 0.4},6 ${p.x},${p.y}`} fill="none" stroke={STEM} strokeWidth="0.6" opacity="0.7" />
      ))}
      {pts.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.c * 90})`}>
          {[0, 90, 180, 270].map((a) => (
            <ellipse
              key={a}
              cx="0"
              cy="-2.6"
              rx="2"
              ry="2.8"
              transform={`rotate(${a})`}
              fill={p.c < 0.25 ? '#c7dcc0' : p.c < 0.7 ? '#a9bdea' : '#8ea4dc'}
              opacity="0.9"
            />
          ))}
          <circle r="0.8" fill="#5f75b8" />
        </g>
      ))}
    </g>
  );
};

// ---------- Pradera: franja de flores que crecen desde abajo ----------
type StemItem = {
  x: number; lean: number; h: number; type: 'blossom' | 'lavender' | 'bell' | 'bud' | 'grass' | 'lace';
  c: number; s: number; delay: number; leaf: boolean; seed: number;
};

const W = 800;
const H = 140;

function makeMeadow(seed: number): StemItem[] {
  const rand = mulberry32(seed);
  const items: StemItem[] = [];
  let laceDone = false;
  for (let x = 6 + rand() * 8; x < W - 6; x += 8 + rand() * 7) {
    const r = rand();
    let type: StemItem['type'] =
      r < 0.32 ? 'blossom' : r < 0.52 ? 'lavender' : r < 0.64 ? 'bell' : r < 0.76 ? 'bud' : 'grass';
    // Una hortensia de encaje cerca del centro, como protagonista
    if (!laceDone && x > W * 0.42 && x < W * 0.62) {
      type = 'lace';
      laceDone = true;
    }
    // Más altas hacia los extremos y el centro, más bajas entre medio (ondulado)
    const wave = 0.5 + 0.5 * Math.cos(((x / W) * 2 - 1) * Math.PI * 1.5);
    const h = type === 'grass' ? 35 + rand() * 45 : type === 'lace' ? 112 + rand() * 12 : 45 + wave * 45 + rand() * 30;
    items.push({
      x,
      lean: (rand() - 0.5) * 26,
      h: Math.min(h, H - 18),
      type,
      c: Math.floor(rand() * BLOSSOMS.length),
      s: 0.85 + rand() * 0.5,
      delay: (x / W) * 0.9 + rand() * 0.25,
      leaf: rand() < 0.4,
      seed: Math.floor(rand() * 1e6)
    });
  }
  // Pastos atrás, flores al frente
  return items.sort((a, b) => (a.type === 'grass' ? -1 : 0) - (b.type === 'grass' ? -1 : 0));
}

const MeadowStem: React.FC<{ gid: string; it: StemItem }> = ({ gid, it }) => {
  const tipX = it.x + it.lean;
  const tipY = H - it.h;
  const growStyle = { transitionDelay: `${it.delay.toFixed(2)}s` };
  const popStyle = { transitionDelay: `${(it.delay + 0.45).toFixed(2)}s` };

  if (it.type === 'grass') {
    return (
      <g className="mw-grow" style={growStyle}>
        <g transform={`translate(${it.x} ${H}) rotate(${it.lean * 0.9}) scale(${(it.h / 80).toFixed(2)})`}>
          <path d={GRASS} fill={`url(#${gid}-leaf-${it.c % 2 ? 'sage' : 'euc'})`} opacity="0.85" />
        </g>
      </g>
    );
  }

  return (
    <g className="mw-grow" style={growStyle}>
      <path
        d={`M${it.x},${H} Q${(it.x + it.lean * 0.15).toFixed(1)},${(H - it.h * 0.55).toFixed(1)} ${tipX.toFixed(1)},${tipY.toFixed(1)}`}
        fill="none"
        stroke={STEM}
        strokeWidth={it.type === 'lace' ? 1.6 : 1.1}
        strokeLinecap="round"
      />
      {it.leaf && (
        <g transform={`translate(${(it.x + it.lean * 0.08).toFixed(1)} ${(H - it.h * 0.35).toFixed(1)}) rotate(${it.lean > 0 ? 50 : -50}) scale(0.16)`}>
          <Leaf gid={gid} x={0} y={0} angle={0} scale={1} tone="sage" />
        </g>
      )}
      <g transform={`translate(${tipX.toFixed(1)} ${tipY.toFixed(1)}) rotate(${(it.lean * 0.8).toFixed(0)})`}>
        <g className="mw-pop" style={popStyle}>
          {it.type === 'blossom' && <Blossom gid={gid} c={it.c} s={it.s} />}
          {it.type === 'lavender' && <LavenderSpike s={it.s} seed={it.seed} />}
          {it.type === 'bell' && <Bellflower gid={gid} s={it.s} />}
          {it.type === 'bud' && <Bud gid={gid} s={it.s} />}
          {it.type === 'lace' && <LaceCluster s={1.15} seed={it.seed} />}
        </g>
      </g>
    </g>
  );
};

/** Franja de flores silvestres que "crece" de izquierda a derecha al aparecer en pantalla. */
export const MeadowDivider: React.FC<{ seed?: number; className?: string }> = ({ seed = 1, className = '' }) => {
  const gid = 'md' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const items = useMemo(() => makeMeadow(seed), [seed]);
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className={`flower-divider meadow ${inView ? 'in-view' : ''} ${className}`} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" focusable="false">
        <WatercolorDefs gid={gid} />
        <FlowerDefs gid={gid} />
        <g filter={`url(#${gid}-edge)`}>
          {items.map((it, i) => <MeadowStem key={i} gid={gid} it={it} />)}
        </g>
      </svg>
    </div>
  );
};

// ---------- Ramito central: separador pequeño con hortensias y líneas doradas ----------
/** Ramito centrado (hortensia azul y blanca, eucalipto, lavanda) entre dos líneas doradas que se dibujan. */
export const SprigDivider: React.FC<{ seed?: number; className?: string }> = ({ seed = 3, className = '' }) => {
  const gid = 'sd' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={`flower-divider sprig ${inView ? 'in-view' : ''} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 120" focusable="false">
        <WatercolorDefs gid={gid} />
        <FlowerDefs gid={gid} />
        <path className="sd-line" d="M30,62 C80,58 120,64 150,60" pathLength={1} />
        <path className="sd-line" d="M370,62 C320,58 280,64 250,60" pathLength={1} />
        <g className="sd-side sd-left">
          <g filter={`url(#${gid}-edge)`}>
            <Eucalyptus gid={gid} x={196} y={66} angle={-104} scale={0.5} />
            <Leaf gid={gid} x={194} y={70} angle={-118} scale={0.55} tone="teal" />
            <g transform="translate(158 72) rotate(-60)"><LavenderSpike s={0.9} seed={seed} /></g>
          </g>
        </g>
        <g className="sd-side sd-right">
          <g filter={`url(#${gid}-edge)`}>
            <Eucalyptus gid={gid} x={204} y={66} angle={100} scale={0.5} />
            <Leaf gid={gid} x={206} y={70} angle={114} scale={0.55} tone="sage" />
            <g transform="translate(244 70) rotate(64)"><LavenderSpike s={0.9} seed={seed + 1} /></g>
          </g>
        </g>
        <g className="sd-center">
          <WatercolorHydrangea gid={gid} seed={seed * 7} tone="white" leaves={false} transform="translate(214 66) scale(0.2) translate(-150 -125)" />
          <WatercolorHydrangea gid={gid} seed={seed * 13} leaves={false} transform="translate(192 58) scale(0.24) translate(-150 -125)" />
          <g filter={`url(#${gid}-edge)`} transform="translate(222 44)"><Blossom gid={gid} c={1} s={0.7} /></g>
        </g>
      </svg>
    </div>
  );
};

/**
 * Ramos de hortensias en las dos esquinas inferiores (para el pie de página).
 * Reutiliza el ramo de la portada girado; entran deslizándose desde la esquina.
 */
export const BottomBouquets: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none ${inView ? 'in-view' : ''}`} aria-hidden="true">
      <div className="corner-bouquet bl"><HydrangeaCorner className="w-full h-full rotate-180" /></div>
      <div className="corner-bouquet br"><HydrangeaCorner className="w-full h-full rotate-90" /></div>
    </div>
  );
};
