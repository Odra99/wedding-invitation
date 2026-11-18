/**
 * Desplazamiento suave con aceleración y frenado (ease-in-out), más pausado y
 * elegante que el salto de un enlace #ancla o que scroll-behavior: smooth.
 * Si la persona prefiere menos movimiento, va directo sin animar.
 */
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function smoothScrollTo(target: Element | null, { offset = 0, duration }: { offset?: number; duration?: number } = {}) {
  if (!target) return;
  const startY = window.scrollY;
  const endY = Math.max(0, target.getBoundingClientRect().top + startY - offset);
  const distance = endY - startY;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(distance) < 2) {
    window.scrollTo(0, endY);
    return;
  }

  // Más distancia = un poco más de tiempo, entre 1.1 s y 1.8 s
  const ms = duration ?? Math.min(1800, Math.max(1100, Math.abs(distance) * 1.1));
  const start = performance.now();

  // Si la persona toca o gira la rueda durante la animación, se cancela para no "pelear" con ella
  let cancelled = false;
  const cancel = () => { cancelled = true; };
  const opts = { passive: true, once: true } as const;
  window.addEventListener('wheel', cancel, opts);
  window.addEventListener('touchstart', cancel, opts);

  const step = (now: number) => {
    if (cancelled) return;
    const t = Math.min(1, (now - start) / ms);
    window.scrollTo(0, startY + distance * easeInOutCubic(t));
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
    }
  };
  requestAnimationFrame(step);
}
