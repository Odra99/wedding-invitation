import React from 'react';

export const SkyBlueBotanicalCrest: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 80
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="48" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="60" cy="60" r="42" stroke="#0284C7" strokeWidth="0.75" opacity="0.8" />
      
      {/* Left laurel branch */}
      <path
        d="M32 64C30 52 38 34 56 26M33 58C28 54 26 46 29 42M30 46C24 40 25 32 30 28M39 36C35 28 38 21 44 20M49 28C48 20 54 16 60 17"
        stroke="#0284C7"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Right laurel branch */}
      <path
        d="M88 64C90 52 82 34 64 26M87 58C92 54 94 46 91 42M90 46C96 40 95 32 90 28M81 36C85 28 82 21 76 20M71 28C72 20 66 16 60 17"
        stroke="#0284C7"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Monogram Interlocking C & L */}
      <text
        x="60"
        y="65"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="24"
        fontWeight="600"
        fill="#0369A1"
        letterSpacing="2"
      >
        C & L
      </text>
      <text
        x="60"
        y="78"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontSize="7"
        letterSpacing="3"
        fill="#38BDF8"
        fontWeight="600"
      >
        2026
      </text>
    </svg>
  );
};

export const WaxSeal: React.FC<{
  monogram?: string;
  onClick?: () => void;
  size?: number;
  isOpen?: boolean;
}> = ({ monogram = 'C&L', onClick, size = 64, isOpen = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400`}
      style={{ width: size, height: size }}
      title={isOpen ? 'Invitation Opened' : 'Click to break wax seal and open invitation'}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-md"
      >
        <defs>
          <radialGradient id="skyWaxGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="45%" stopColor="#38BDF8" />
            <stop offset="80%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </radialGradient>
          <filter id="waxInnerShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feOffset dx="1" dy="2" />
            <feGaussianBlur stdDeviation="2" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="#0C4A6E" floodOpacity="0.4" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>
        
        {/* Organic wavy rim of the melted wax seal */}
        <path
          d="M50 4C65 3 76 10 85 20C95 31 98 46 95 60C92 75 83 87 70 94C56 99 41 97 28 91C15 84 6 72 4 57C2 42 10 28 20 18C30 8 38 4 50 4Z"
          fill="url(#skyWaxGrad)"
        />
        {/* Inner impressed circle */}
        <circle cx="50" cy="50" r="34" stroke="#BAE6FD" strokeWidth="1.5" strokeOpacity="0.8" />
        <circle cx="50" cy="50" r="30" fill="#0284C7" fillOpacity="0.3" />
        
        {/* Monogram */}
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="22"
          fontWeight="bold"
          letterSpacing="1"
          className="select-none"
        >
          {monogram}
        </text>
      </svg>
    </button>
  );
};

export const SeasideArchIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-sky-100 via-sky-50 to-white p-6 border border-sky-100 ${className}`}>
      <svg
        viewBox="0 0 600 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[360px] mx-auto select-none"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#E0F2FE" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#F0F9FF" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="seaGrad" x1="0" y1="180" x2="0" y2="270" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#0284C7" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="marbleGrad" x1="0" y1="0" x2="0" y2="100">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
        </defs>

        {/* Sky backdrop */}
        <rect width="600" height="230" fill="url(#skyGrad)" rx="8" />
        
        {/* Distant soft clouds */}
        <path d="M70 60 Q100 45 140 60 Q170 50 200 65 Q220 80 180 85 L80 85 Z" fill="#FFFFFF" fillOpacity="0.6" />
        <path d="M420 50 Q450 35 490 50 Q520 40 550 55 L430 75 Z" fill="#FFFFFF" fillOpacity="0.5" />
        
        {/* Ocean horizon */}
        <rect y="180" width="600" height="85" fill="url(#seaGrad)" />
        {/* Ocean sunlight glint */}
        <line x1="260" y1="195" x2="340" y2="195" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="240" y1="210" x2="360" y2="210" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="280" y1="225" x2="320" y2="225" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.7" />

        {/* Coastal stone terrace & cliff */}
        <path d="M0 260 L600 260 L600 380 L0 380 Z" fill="#F8FAFC" />
        <line x1="0" y1="260" x2="600" y2="260" stroke="#CBD5E1" strokeWidth="2" />
        <line x1="40" y1="290" x2="560" y2="290" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="40" y1="330" x2="560" y2="330" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />

        {/* Ceremony Wedding Archway in Center */}
        <g transform="translate(180, 70)">
          {/* Circular Double Arch Structure */}
          <circle cx="120" cy="130" r="110" stroke="#E2E8F0" strokeWidth="3" />
          <circle cx="120" cy="130" r="102" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.7" />

          {/* Lush White & Sky Blue Florals on the Arch */}
          {/* Left floral cluster */}
          <circle cx="28" cy="120" r="14" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1" />
          <circle cx="20" cy="100" r="12" fill="#E0F2FE" />
          <circle cx="36" cy="105" r="11" fill="#FFFFFF" />
          <circle cx="44" cy="135" r="13" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="0.5" />
          <circle cx="24" cy="140" r="10" fill="#FFFFFF" />

          {/* Top floral cluster */}
          <circle cx="120" cy="20" r="15" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1" />
          <circle cx="102" cy="24" r="12" fill="#E0F2FE" />
          <circle cx="138" cy="24" r="12" fill="#FFFFFF" />
          <circle cx="120" cy="35" r="9" fill="#7DD3FC" />

          {/* Right floral cluster */}
          <circle cx="212" cy="120" r="14" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1" />
          <circle cx="220" cy="100" r="12" fill="#BAE6FD" />
          <circle cx="204" cy="105" r="11" fill="#FFFFFF" />
          <circle cx="196" cy="135" r="13" fill="#E0F2FE" />

          {/* Gentle leaves */}
          <path d="M12 90 Q0 95 10 110" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          <path d="M228 90 Q240 95 230 110" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          <path d="M110 5 Q120 -5 130 5" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />

          {/* Pedestals with Urns */}
          <rect x="2" y="180" width="20" height="25" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" rx="2" />
          <rect x="218" y="180" width="20" height="25" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" rx="2" />
        </g>

        {/* Ceremony Aisle Runner */}
        <polygon points="265,380 285,260 315,260 335,380" fill="#FFFFFF" stroke="#E0F2FE" strokeWidth="1" />
        
        {/* Scattered White & Blue Petals along the aisle */}
        <circle cx="290" cy="290" r="2.5" fill="#38BDF8" opacity="0.8" />
        <circle cx="310" cy="305" r="3" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="0.5" />
        <circle cx="280" cy="330" r="3.5" fill="#BAE6FD" />
        <circle cx="320" cy="340" r="3" fill="#FFFFFF" />
        <circle cx="300" cy="360" r="4" fill="#38BDF8" opacity="0.6" />
        <circle cx="295" cy="315" r="2" fill="#0284C7" opacity="0.5" />

        {/* Guest Chairs on Left and Right (Representational) */}
        <g stroke="#94A3B8" strokeWidth="1.2">
          {/* Left chairs row */}
          <rect x="90" y="275" width="22" height="18" rx="2" fill="#FFFFFF" />
          <rect x="125" y="275" width="22" height="18" rx="2" fill="#FFFFFF" />
          <rect x="160" y="275" width="22" height="18" rx="2" fill="#FFFFFF" />
          <rect x="80" y="315" width="26" height="20" rx="2" fill="#FFFFFF" />
          <rect x="120" y="315" width="26" height="20" rx="2" fill="#FFFFFF" />
          <rect x="160" y="315" width="26" height="20" rx="2" fill="#FFFFFF" />

          {/* Right chairs row */}
          <rect x="420" y="275" width="22" height="18" rx="2" fill="#FFFFFF" />
          <rect x="455" y="275" width="22" height="18" rx="2" fill="#FFFFFF" />
          <rect x="490" y="275" width="22" height="18" rx="2" fill="#FFFFFF" />
          <rect x="415" y="315" width="26" height="20" rx="2" fill="#FFFFFF" />
          <rect x="455" y="315" width="26" height="20" rx="2" fill="#FFFFFF" />
          <rect x="495" y="315" width="26" height="20" rx="2" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};
