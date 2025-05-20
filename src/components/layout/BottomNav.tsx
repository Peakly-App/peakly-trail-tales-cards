
import React from 'react';
import { Home, MapPin, BookOpen, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'plan' | 'collection' | 'profile';
  setActiveTab: (tab: 'home' | 'plan' | 'collection' | 'profile') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bottom-nav">
      <button 
        onClick={() => setActiveTab('home')} 
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
      >
        <Home size={20} />
        <span>Map</span>
      </button>
      
      <button 
        onClick={() => setActiveTab('plan')} 
        className={`nav-item ${activeTab === 'plan' ? 'active' : ''}`}
      >
        <MapPin size={20} />
        <span>Plan</span>
      </button>
      
      <button 
        onClick={() => setActiveTab('collection')} 
        className={`nav-item ${activeTab === 'collection' ? 'active' : ''}`}
      >
        <BookOpen size={20} />
        <span>Collection</span>
      </button>
      
      <button 
        onClick={() => setActiveTab('profile')} 
        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
      >
        <User size={20} />
        <span>Profile</span>
      </button>
    </nav>
  );
};

export default BottomNav;
