
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, MapPin, Settings } from 'lucide-react';

interface GearItemProps {
  name: string;
  isOwned: boolean;
}

const GearItem: React.FC<GearItemProps> = ({ name, isOwned }) => (
  <div className="flex justify-between items-center p-3 border-b last:border-b-0">
    <span>{name}</span>
    <div className={isOwned ? "text-peakly-success" : "text-gray-400"}>
      {isOwned ? "✓" : "–"}
    </div>
  </div>
);

const ProfileView: React.FC = () => {
  // Sample data for demonstration
  const userStats = {
    summitsClimbed: 12,
    milesHiked: 87.5,
    elevationGained: 24600,
    cardsCollected: 15
  };
  
  const gear = [
    { id: 1, name: "Hiking Boots", isOwned: true },
    { id: 2, name: "Trekking Poles", isOwned: true },
    { id: 3, name: "Rain Jacket", isOwned: true },
    { id: 4, name: "Climbing Harness", isOwned: false },
    { id: 5, name: "Crampons", isOwned: false },
    { id: 6, name: "Ice Axe", isOwned: false }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button>
      </div>
      
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
        <div className="w-16 h-16 rounded-full bg-peakly-forest text-white flex items-center justify-center text-2xl">
          <User size={32} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Mountain Explorer</h2>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-1" />
            <span>Seattle, WA</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">Summits Climbed</h3>
          <p className="text-2xl font-bold text-peakly-forest">{userStats.summitsClimbed}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">Cards Collected</h3>
          <p className="text-2xl font-bold text-peakly-forest">{userStats.cardsCollected}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">Miles Hiked</h3>
          <p className="text-2xl font-bold text-peakly-forest">{userStats.milesHiked}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">Elevation (ft)</h3>
          <p className="text-2xl font-bold text-peakly-forest">{userStats.elevationGained.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4">My Gear</h3>
        <div className="divide-y">
          {gear.map(item => (
            <GearItem key={item.id} name={item.name} isOwned={item.isOwned} />
          ))}
        </div>
        <Button className="w-full mt-4">
          Update Gear
        </Button>
      </div>
    </div>
  );
};

export default ProfileView;
