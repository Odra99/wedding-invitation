import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';
import { backgroundMusic } from '../data/weddingData';

/**
 * Reproductor de música de fondo con un archivo MP3 (public/music/).
 *
 * - Usa un <audio> normal: en iPhone suena aunque el interruptor de silencio
 *   esté activado (a diferencia del audio generado con Web Audio).
 * - Autoplay: se intenta al cargar. En celulares el navegador lo bloquea hasta
 *   un toque real, así que esperamos el primer toque/clic en cualquier parte.
 *   OJO: scroll y touchstart NO cuentan como permiso; sí touchend, pointerup,
 *   click y keydown.
 * - Entra con un fade-in suave y se repite en bucle. (iOS no permite cambiar
 *   el volumen desde la página, así que ahí suena al volumen del teléfono.)
 */

// BASE_URL = '/wedding-invitation/' (ver vite.config.ts), para que funcione en GitHub Pages
const SONG_URL = `${import.meta.env.BASE_URL}${backgroundMusic.file}`;
const SONG_TITLE = backgroundMusic.title;
const TARGET_VOLUME = 0.45;
const FADE_MS = 3000;

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);
  const hasUserPausedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  // true si la persona pausó a propósito (entonces no mostramos la pista "toca para música")
  const [userPaused, setUserPaused] = useState(false);

  // Con temporizador y no requestAnimationFrame: rAF se detiene si la página no
  // se está pintando, y el volumen podría quedarse en 0.
  const fadeIn = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) clearInterval(fadeRef.current);
    const start = performance.now();
    audio.volume = 0;
    fadeRef.current = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - start) / FADE_MS);
      audio.volume = TARGET_VOLUME * t * t; // curva suave
      if (t >= 1 && fadeRef.current) {
        clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    }, 50);
  };

  /** Intenta reproducir. Devuelve true si el navegador lo permitió. */
  const play = async (): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      audio.volume = 0;
      await audio.play();
      fadeIn();
      return true;
    } catch {
      // NotAllowedError: el navegador exige un toque antes de reproducir sonido
      return false;
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      hasUserPausedRef.current = true;
      setUserPaused(true);
      audio.pause();
    } else {
      hasUserPausedRef.current = false;
      setUserPaused(false);
      play();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    const events = ['pointerup', 'touchend', 'click', 'keydown'] as const;
    const removeListeners = () => events.forEach((ev) => window.removeEventListener(ev, onGesture));

    // Se queda escuchando hasta que la música realmente suene (no "once"),
    // para que un scroll o un toque fallido previo no la desactive.
    async function onGesture(e: Event) {
      // Si tocó el propio botón del reproductor, ese botón decide (play/pausa)
      if ((e.target as Element | null)?.closest?.('[data-music-player]')) return;
      if (hasUserPausedRef.current || !audio!.paused) {
        removeListeners();
        return;
      }
      if (await play()) removeListeners();
    }

    play().then((ok) => {
      if (!ok) events.forEach((ev) => window.addEventListener(ev, onGesture, { passive: true }));
    });

    // Pausar si cambia de app/pestaña y retomar al volver
    let pausedByVisibility = false;
    const onVisibility = () => {
      if (document.hidden && !audio.paused) {
        pausedByVisibility = true;
        audio.pause();
      } else if (!document.hidden && pausedByVisibility && !hasUserPausedRef.current) {
        pausedByVisibility = false;
        play();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      removeListeners();
      document.removeEventListener('visibilitychange', onVisibility);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      if (fadeRef.current) clearInterval(fadeRef.current);
      audio.pause();
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={SONG_URL} loop preload="auto" />

      {/* Control flotante en la esquina inferior */}
      <div data-music-player className="fixed bottom-5 right-5 z-40 bg-white/95 backdrop-blur-md border border-line rounded-full shadow-xl p-1.5 pl-3 flex items-center gap-2 transition-transform hover:scale-102">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? `Pausar música: ${SONG_TITLE}` : `Reproducir música: ${SONG_TITLE}`}
          className="flex items-center gap-2 text-xs font-medium text-ink hover:text-blue cursor-pointer focus:outline-none"
        >
          <span className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            isPlaying ? 'bg-blue text-white shadow-sm' : 'bg-mist text-blue'
          }`}>
            {isPlaying ? (
              <span className="flex items-center gap-0.5">
                <span className="w-0.5 h-3 bg-white rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
                <span className="w-0.5 h-4 bg-white rounded-full animate-[pulse_1.2s_ease-in-out_infinite_200ms]" />
                <span className="w-0.5 h-2.5 bg-white rounded-full animate-[pulse_0.8s_ease-in-out_infinite_400ms]" />
              </span>
            ) : (
              <>
                {/* Pista visual mientras el navegador espera el primer toque */}
                {!userPaused && <span className="absolute inset-0 rounded-full bg-line animate-ping" />}
                <Play className="relative w-3.5 h-3.5 ml-0.5" />
              </>
            )}
          </span>
          <span className="hidden sm:inline text-sm font-serif italic text-ink">♪ {SONG_TITLE}</span>
          {!isPlaying && !userPaused && (
            <span className="sm:hidden text-sm font-serif italic text-ink pr-1">Toca para música</span>
          )}
        </button>

        {isPlaying && (
          <button
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            className="p-1.5 text-muted hover:text-ink rounded-full cursor-pointer transition-colors"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-muted" /> : <Volume2 className="w-3.5 h-3.5 text-blue" />}
          </button>
        )}
      </div>
    </>
  );
};
