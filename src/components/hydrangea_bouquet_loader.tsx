import { useState, useEffect } from 'react';

/**
 * HydrangeaSpinLoader Component
 * A minimalist, subtle loading component for formal invitations.
 * Features only a spinning, blossoming sky-blue and white hydrangea bouquet animation.
 */
export default function HydrangeaSpinLoader({ isLoading = true }) {
  const [active, setActive] = useState(isLoading);

  useEffect(() => {
    setActive(isLoading);
  }, [isLoading]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAFCFF]/90 backdrop-blur-sm select-none">
      {/* Container for the spinning hydrangea bouquet animation */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        
        {/* Soft pulsing aura behind the flower */}
        <div className="absolute inset-0 rounded-full bg-sky-100/60 animate-ping opacity-75" style={{ animationDuration: '3s' }}></div>

        {/* Floating background petals */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => {
            const angle = (i * 60);
            return (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center animate-pulse"
                style={{ transform: `rotate(${angle}deg)`, animationDuration: `${2 + (i * 0.3)}s` }}
              >
                <div className="w-2 h-2 rounded-full bg-sky-200/80 -translate-y-12"></div>
              </div>
            );
          })}
        </div>

        {/* Central Spinning Hydrangea Blossom Bouquet */}
        <div className="relative z-10 w-24 h-24 flex items-center justify-center animate-spin-slow">
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full text-sky-400 drop-shadow-[0_4px_16px_rgba(56,189,248,0.25)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cluster of delicate round petals forming the hydrangea head */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle} 60 60)`}>
                <ellipse
                  cx="60"
                  cy="32"
                  rx="14"
                  ry="20"
                  fill={idx % 2 === 0 ? "#E0F2FE" : "#F0F9FF"}
                  stroke="#BAE6FD"
                  strokeWidth="0.75"
                  fillOpacity="0.9"
                />
                <ellipse
                  cx="60"
                  cy="26"
                  rx="8"
                  ry="12"
                  fill="#FFFFFF"
                  fillOpacity="0.6"
                />
              </g>
            ))}

            {/* Inner layered petals for depth */}
            {[22, 67, 112, 157, 202, 247, 292, 337].map((angle, idx) => (
              <ellipse
                key={`inner-${idx}`}
                cx="60"
                cy="42"
                rx="10"
                ry="15"
                transform={`rotate(${angle} 60 60)`}
                fill="#38BDF8"
                fillOpacity="0.65"
              />
            ))}

            {/* Soft center core */}
            <circle cx="60" cy="60" r="10" fill="#0284C7" fillOpacity="0.85" />
            <circle cx="60" cy="60" r="4" fill="#F0F9FF" />
          </svg>
        </div>
      </div>

      {/* Embedded Animation Styles */}
      <style>{`
        @keyframes spinSlow {
          0% { transform: rotate(0deg) scale(0.98); }
          50% { transform: rotate(180deg) scale(1.02); }
          100% { transform: rotate(360deg) scale(0.98); }
        }
        .animate-spin-slow {
          animation: spinSlow 12s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}