import React, { useEffect, useId, useState } from 'react';
import { WatercolorDefs, WatercolorHydrangea } from './WatercolorHydrangea';

// Duración de un ciclo de florecer (debe coincidir con .page-loader-flower en style.css)
const BLOOM_CYCLE_MS = 4600;

/**
 * Pantalla de carga a pantalla completa mientras se buscan los datos del
 * invitado. Una hortensia en acuarela florece: crece el tallo, se despliegan
 * las hojas y los floretes se abren uno a uno. Si la carga tarda, la flor se
 * desvanece y vuelve a florecer. Al terminar, la pantalla se desvanece.
 */
export const PageLoader: React.FC<{ visible: boolean }> = ({ visible }) => {
  const gid = 'pl' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const [mounted, setMounted] = useState(visible);
  // Cambiar la key vuelve a montar la flor y reinicia la animación
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      return;
    }
    // Espera a que termine el fade-out (ver .page-loader en style.css)
    const t = window.setTimeout(() => setMounted(false), 700);
    return () => window.clearTimeout(t);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const t = window.setInterval(() => setCycle((c) => c + 1), BLOOM_CYCLE_MS);
    return () => window.clearInterval(t);
  }, [visible]);

  if (!mounted) return null;

  return (
    <div className={`page-loader ${visible ? '' : 'is-hiding'}`} role="status" aria-live="polite">
      {/* viewBox cubre toda la flor (hojas incluidas: x ≈ -45…338, y ≈ -45…420) con un pequeño margen */}
      <svg key={cycle} className="page-loader-flower" viewBox="-55 -55 405 485" aria-hidden="true" focusable="false">
        <WatercolorDefs gid={gid} />
        <WatercolorHydrangea gid={gid} seed={5} bloom />
      </svg>
      <p className="page-loader-names">Fatima &amp; Luis</p>
      <p className="page-loader-text">
        Preparando tu invitación
        <span className="page-loader-dots" aria-hidden="true"><span>.</span><span>.</span><span>.</span></span>
      </p>
    </div>
  );
};
