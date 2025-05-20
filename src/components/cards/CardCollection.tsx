
import React, { useState } from 'react';
import SummitCard from './SummitCard';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample data for demonstration
const sampleCards = [
  {
    id: 1,
    name: "Mount Rainier",
    elevation: "4,392 m",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=600",
    rarity: "legendary" as const,
    obtained: true,
    location: "Washington, USA",
    description: "The highest mountain in Washington State and the Cascade Range, Mount Rainier is an active stratovolcano. It is considered one of the most dangerous volcanoes in the world."
  },
  {
    id: 2,
    name: "Half Dome",
    elevation: "2,694 m",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
    rarity: "epic" as const,
    obtained: true,
    location: "Yosemite, California",
    description: "Rising nearly 1,500 meters above the valley floor, Half Dome is an iconic landmark in Yosemite National Park. The granite dome is a popular but challenging hiking destination."
  },
  {
    id: 3,
    name: "Mount Hood",
    elevation: "3,429 m",
    image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?auto=format&fit=crop&q=80&w=600",
    rarity: "rare" as const,
    obtained: true,
    location: "Oregon, USA",
    description: "Mount Hood is Oregon's highest peak and a potentially active volcano. It hosts 12 glaciers and is a popular destination for climbing and skiing."
  },
  {
    id: 4,
    name: "Cascade Pass",
    elevation: "1,644 m",
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&q=80&w=600",
    rarity: "uncommon" as const,
    obtained: false,
    location: "Washington, USA",
    description: "Cascade Pass offers spectacular views of peaks, glaciers, and valleys. It's a gateway to some of the most remote and pristine wilderness in the North Cascades."
  },
  {
    id: 5,
    name: "Mailbox Peak",
    elevation: "1,470 m",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
    rarity: "common" as const,
    obtained: true,
    location: "Washington, USA",
    description: "Famous for its steep trail and the mailbox at its summit, Mailbox Peak offers panoramic views of the surrounding Cascade mountains and forests."
  },
  {
    id: 6,
    name: "Mount St. Helens",
    elevation: "2,550 m",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=600",
    rarity: "rare" as const,
    obtained: false,
    location: "Washington, USA",
    description: "The active volcano that famously erupted in 1980, Mount St. Helens offers a unique landscape shaped by volcanic activity and ongoing recovery."
  },
];

const CardCollection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'obtained' | 'missing'>('all');
  const [rarityFilter, setRarityFilter] = useState<'all' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'>('all');
  
  const filteredCards = sampleCards.filter(card => {
    if (activeFilter === 'obtained' && !card.obtained) return false;
    if (activeFilter === 'missing' && card.obtained) return false;
    if (rarityFilter !== 'all' && card.rarity !== rarityFilter) return false;
    return true;
  });
  
  const stats = {
    obtained: sampleCards.filter(card => card.obtained).length,
    total: sampleCards.length,
    percentage: Math.round((sampleCards.filter(card => card.obtained).length / sampleCards.length) * 100)
  };
  
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <ScrollArea className="flex-grow">
        <div className="space-y-6 p-4">
          <h1 className="text-2xl font-bold">Summit Collection</h1>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Collection Progress</h2>
              <span className="text-lg font-bold">{stats.percentage}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-peakly-success h-3 rounded-full" 
                style={{ width: `${stats.percentage}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>{stats.obtained} obtained</span>
              <span>{stats.total - stats.obtained} remaining</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('all')}
              >
                All
              </Button>
              <Button 
                size="sm" 
                variant={activeFilter === 'obtained' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('obtained')}
              >
                Obtained
              </Button>
              <Button 
                size="sm" 
                variant={activeFilter === 'missing' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('missing')}
              >
                Missing
              </Button>
            </div>
            
            <select 
              className="text-sm border rounded-md p-1"
              value={rarityFilter}
              onChange={(e) => setRarityFilter(e.target.value as any)}
            >
              <option value="all">All Rarities</option>
              <option value="common">Common</option>
              <option value="uncommon">Uncommon</option>
              <option value="rare">Rare</option>
              <option value="epic">Epic</option>
              <option value="legendary">Legendary</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pb-20">
            {filteredCards.map(card => (
              <SummitCard
                key={card.id}
                name={card.name}
                elevation={card.elevation}
                image={card.image}
                rarity={card.rarity}
                obtained={card.obtained}
                location={card.location}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default CardCollection;
