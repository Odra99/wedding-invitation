/**
 * Tarjeta de vista previa (Open Graph) para compartir la invitación por WhatsApp.
 * Mide exactamente 1200 × 630, el tamaño que WhatsApp, Facebook, etc. esperan.
 *
 * Cómo regenerar public/og-image.jpg (Windows, con `npm run dev` corriendo):
 *   1. msedge --headless=new --hide-scrollbars --force-device-scale-factor=1
 *        --window-size=1200,630 --virtual-time-budget=6000
 *        --screenshot=og.png http://localhost:5173/wedding-invitation/og-card.html
 *   2. Convertir og.png a JPG (calidad ~88) y guardarlo como public/og-image.jpg.
 *
 * El texto importante va centrado: en la lista de chats WhatsApp a veces
 * recorta la imagen a un cuadrado.
 */
import { createRoot } from 'react-dom/client';
import { HydrangeaCorner } from '../components/WatercolorHydrangea';

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0 }
  html, body { width: 1200px; height: 630px; overflow: hidden; background: #FAF7F2 }
  .card {
    position: relative; width: 1200px; height: 630px; overflow: hidden;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; color: #2F4A6B; font-family: 'Cormorant Garamond', Georgia, serif;
    background:
      radial-gradient(ellipse 42% 58% at 50% 50%, #ffffff 0%, rgba(255,255,255,0) 70%),
      radial-gradient(ellipse 80% 90% at 50% 50%, #EAF1F9, #FAF7F2 85%);
  }
  .corner { position: absolute; width: 420px; height: 420px; pointer-events: none }
  .tr { top: -85px; right: -85px }
  .bl { bottom: -85px; left: -85px }
  .tl { top: -100px; left: -100px; width: 250px; height: 250px; opacity: .85 }
  .br { bottom: -100px; right: -100px; width: 250px; height: 250px; opacity: .85 }
  .corner svg { width: 100%; height: 100% }
  /* El ramo está dibujado para la esquina superior derecha; los demás son reflejos */
  .bl svg { transform: rotate(180deg) }
  .tl svg { transform: scaleX(-1) }
  .br svg { transform: scaleY(-1) }
  .inner { position: relative; z-index: 2 }
  .kicker { font-size: 26px; font-weight: 600; letter-spacing: .32em; text-transform: uppercase; color: #6D7A86 }
  .names { font-family: 'Pinyon Script', cursive; font-size: 138px; line-height: 1.05; color: #5C7BA8; margin: 14px 0 6px }
  .amp { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 92px; color: #BFA369; margin: 0 22px; position: relative; top: -6px }
  .date { display: flex; align-items: center; justify-content: center; gap: 30px; margin-top: 4px }
  .date .side {
    font-size: 24px; letter-spacing: .2em; text-transform: uppercase; white-space: nowrap;
    padding: 8px 4px; border-top: 1.5px solid #BFA369; border-bottom: 1.5px solid #BFA369;
  }
  .date .mid { display: flex; flex-direction: column; align-items: center }
  .day { font-size: 78px; line-height: .95; color: #5C7BA8 }
  .month { font-size: 21px; letter-spacing: .24em; text-transform: uppercase }
  .place { margin-top: 22px; font-size: 22px; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: #6D7A86 }
`;

function OgCard() {
  return (
    <>
      <style>{css}</style>
      <div className="card" id="og-card">
        {/* Ramos de hortensias en las cuatro esquinas (los grandes en diagonal) */}
        <div className="corner tr"><HydrangeaCorner /></div>
        <div className="corner bl"><HydrangeaCorner /></div>
        <div className="corner tl"><HydrangeaCorner /></div>
        <div className="corner br"><HydrangeaCorner /></div>

        <div className="inner">
          <p className="kicker">Nuestra boda civil</p>
          <h1 className="names">Fatima<span className="amp">&amp;</span>Luis</h1>
          <div className="date">
            <span className="side">Domingo</span>
            <span className="mid">
              <span className="day">20</span>
              <span className="month">Diciembre · 2026</span>
            </span>
            <span className="side">11:30 AM</span>
          </div>
          <p className="place">La Quebrada · La Esperanza, Quetzaltenango</p>
        </div>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')!).render(<OgCard />);
