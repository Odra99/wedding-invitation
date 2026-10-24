import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Sparkles } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const [showPromptBanner, setShowPromptBanner] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const hasUserPausedRef = useRef(false);

  // Progresión romántica de acordes (Frecuencias en Hz)
  // C - G - Am - F arpegio de arpa acústica suave y melodiosa
  const chordFrequencies = [
    // Acorde C (Do Mayor: C4, E4, G4, B4, C5)
    [261.63, 329.63, 392.0, 493.88, 523.25],
    // Acorde G (Sol Mayor: G3, B3, D4, G4, B4)
    [196.0, 246.94, 293.66, 392.0, 493.88],
    // Acorde Am (La menor: A3, C4, E4, A4, C5)
    [220.0, 261.63, 329.63, 440.0, 523.25],
    // Acorde F (Fa Mayor: F3, A3, C4, F4, A4)
    [174.61, 220.0, 261.63, 349.23, 440.0]
  ];

  const playChime = (freq: number, timeOffset: number) => {
    if (!audioCtxRef.current || isMuted) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime + timeOffset;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Envolvente acústico suave estilo arpa / caja musical
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 2.4);
  };

  const startArpeggio = async () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      if (audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume();
      }

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      let chordIndex = 0;

      const tick = () => {
        if (hasUserPausedRef.current) return;
        const chord = chordFrequencies[chordIndex];
        chord.forEach((freq, noteIdx) => {
          playChime(freq, noteIdx * 0.35);
        });
        chordIndex = (chordIndex + 1) % chordFrequencies.length;
      };

      tick();
      timerRef.current = window.setInterval(tick, 2400);
      setIsPlaying(true);
      setHasStartedOnce(true);
      setShowPromptBanner(false);
    } catch {
      // Bloqueado temporalmente por política del navegador hasta la interacción del usuario
    }
  };

  const stopArpeggio = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      hasUserPausedRef.current = true;
      stopArpeggio();
    } else {
      hasUserPausedRef.current = false;
      startArpeggio();
    }
  };

  // Intentar reproducción automática:
  // 1. Intento directo inmediato al montar.
  // 2. Si el navegador lo bloquea (requiere gesto del usuario), se activa en el primer toque / clic / scroll.
  useEffect(() => {
    // 1. Intento inmediato
    startArpeggio();

    // Comprobar si quedó suspendido o bloqueado
    const checkTimer = setTimeout(() => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') {
        setShowPromptBanner(true);
      }
    }, 1200);

    // 2. Escuchar la primera interacción en cualquier parte de la pantalla
    const handleFirstInteraction = () => {
      if (!hasUserPausedRef.current && (!audioCtxRef.current || audioCtxRef.current.state === 'suspended' || !timerRef.current)) {
        startArpeggio();
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('scroll', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true, once: true });

    return () => {
      clearTimeout(checkTimer);
      cleanupListeners();
      stopArpeggio();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <>
      {/* Banner de invitación con música (aparece sutilmente si el navegador bloquea el autoplay inicial) */}


      {/* Control flotante principal en la esquina inferior */}
      <div className="fixed bottom-5 right-5 z-40 bg-white/95 backdrop-blur-md border border-sky-200/90 rounded-full shadow-xl p-1.5 pl-3 flex items-center gap-2 transition-transform hover:scale-102">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar música romántica' : 'Reproducir música romántica'}
          className="flex items-center gap-2 text-xs font-medium text-[#1b476e] hover:text-[#2381c8] cursor-pointer focus:outline-none"
        >
          <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            isPlaying ? 'bg-[#1b67a2] text-white shadow-sm' : 'bg-sky-50 text-[#1b67a2]'
          }`}>
            {isPlaying ? (
              <span className="flex items-center gap-0.5">
                <span className="w-0.5 h-3 bg-white rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
                <span className="w-0.5 h-4 bg-white rounded-full animate-[pulse_1.2s_ease-in-out_infinite_200ms]" />
                <span className="w-0.5 h-2.5 bg-white rounded-full animate-[pulse_0.8s_ease-in-out_infinite_400ms]" />
              </span>
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5" />
            )}
          </span>
          <span className="hidden sm:inline text-xs font-serif italic text-[#1b476e]">
            {isPlaying ? 'Música de Boda Sonando' : 'Reproducir Música'}
          </span>
        </button>

        {isPlaying && (
          <button
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer transition-colors"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5 text-[#1b67a2]" />}
          </button>
        )}
      </div>
    </>
  );
};
