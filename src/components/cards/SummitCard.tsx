
import React, { useState } from 'react';

interface SummitCardProps {
  name: string;
  elevation: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  obtained: boolean;
  location: string;
  description: string;
}

const SummitCard: React.FC<SummitCardProps> = ({
  name,
  elevation,
  image,
  rarity,
  obtained,
  location,
  description
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <div 
      className={`summit-card h-64 w-full ${obtained ? '' : 'opacity-60 grayscale'}`}
      onClick={obtained ? handleFlip : undefined}
    >
      <div className={`card-flip-container h-full w-full ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <div className="relative h-full">
            <img 
              src={image} 
              alt={name} 
              className="h-full w-full object-cover"
            />
            <div className={`rarity-badge rarity-${rarity}`}>
              {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
            </div>
            
            {/* Card content overlay */}
            <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h3 className="text-lg font-bold">{name}</h3>
              <p className="text-sm">{elevation}</p>
            </div>
            
            {/* Lock overlay for unobtained cards */}
            {!obtained && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
            )}
          </div>
        </div>
        
        <div className="card-back">
          <div className="h-full w-full bg-gradient-to-br from-peakly-forest to-peakly-sky p-4 flex flex-col text-white">
            <h3 className="text-lg font-bold mb-1">{name}</h3>
            <div className="text-xs mb-2">{location}</div>
            <div className="text-sm flex-1 overflow-y-auto">{description}</div>
            <div className="mt-2 pt-2 border-t border-white/30 flex justify-between items-center">
              <div className="text-xs">Elevation: {elevation}</div>
              <div className={`text-xs font-bold px-2 py-0.5 rounded bg-rarity-${rarity}/80`}>
                {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummitCard;
