
import React, { useState } from 'react';
import BottomNav from './BottomNav';
import MapView from '../map/MapView';
import TripPlanner from '../planner/TripPlanner';
import CardCollection from '../cards/CardCollection';
import ProfileView from '../profile/ProfileView';

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'plan' | 'collection' | 'profile'>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <MapView />;
      case 'plan':
        return <TripPlanner />;
      case 'collection':
        return <CardCollection />;
      case 'profile':
        return <ProfileView />;
      default:
        return <MapView />;
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="h-[calc(100vh-4rem)]">
        {renderContent()}
      </div>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default AppLayout;
