
import React from 'react';
import AccordionStep from './AccordionStep';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users } from 'lucide-react';
import useTripPlanner from '@/hooks/useTripPlanner';

const TrailCard = ({ 
  name, 
  distance, 
  elevation, 
  time, 
  terrain, 
  gearCompatible, 
  rarity 
}: {
  name: string;
  distance: string;
  elevation: string;
  time: string;
  terrain: 'T1' | 'T2' | 'T3' | 'T4' | 'T5';
  gearCompatible: boolean;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}) => (
  <div className="trip-card p-4">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{name}</h3>
        <div className="flex gap-4 mt-1 text-sm text-gray-600">
          <span>{distance}</span>
          <span>{elevation} gain</span>
          <span>{time}</span>
        </div>
      </div>
      <div className={`terrain-badge terrain-${terrain.toLowerCase()} ${gearCompatible ? 'gear-compatible' : 'gear-incompatible'}`}>
        {terrain} {gearCompatible ? '✓' : '✗'}
      </div>
    </div>
    <div className="mt-3 flex justify-between items-center">
      <div className="text-xs">
        <span className={`px-2 py-1 rounded bg-rarity-${rarity} text-white`}>
          {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
        </span>
        <span className="ml-2">Cards: {rarity === 'legendary' ? '1' : rarity === 'epic' ? '2' : rarity === 'rare' ? '3-4' : '5+'}</span>
      </div>
      <Button size="sm">See Details</Button>
    </div>
  </div>
);

const TripPlanner: React.FC = () => {
  const {
    openStep,
    setOpenStep,
    isStepCompleted,
    isStepEnabled,
    completeStep
  } = useTripPlanner();

  const handleStepToggle = (step: 'basics' | 'startPoint' | 'team' | 'search') => {
    if (openStep === step) {
      setOpenStep('basics'); // Default to first step if closing current
    } else {
      setOpenStep(step);
    }
  };

  const isSearchCompleted = isStepCompleted('search');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Plan Your Adventure</h1>
      
      <div className="space-y-4">
        <AccordionStep
          title="Dates & Difficulty"
          stepNumber={1}
          isOpen={openStep === 'basics'}
          isCompleted={isStepCompleted('basics')}
          isEnabled={isStepEnabled('basics')}
          onToggle={() => handleStepToggle('basics')}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <div className="flex w-full border rounded-md overflow-hidden">
                  <div className="flex items-center justify-center bg-muted px-2">
                    <Calendar size={16} />
                  </div>
                  <input 
                    type="date" 
                    className="w-full p-2 focus:outline-none" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <div className="flex w-full border rounded-md overflow-hidden">
                  <div className="flex items-center justify-center bg-muted px-2">
                    <Calendar size={16} />
                  </div>
                  <input 
                    type="date" 
                    className="w-full p-2 focus:outline-none" 
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Difficulty Level</label>
              <select className="w-full p-2 border rounded-md">
                <option value="easy">Easy (T1-T2)</option>
                <option value="moderate">Moderate (T3)</option>
                <option value="hard">Hard (T4)</option>
                <option value="expert">Expert (T5+)</option>
              </select>
            </div>
            
            <Button 
              onClick={() => completeStep('basics')}
              className="w-full"
            >
              Next Step
            </Button>
          </div>
        </AccordionStep>
        
        <AccordionStep
          title="Starting Point"
          stepNumber={2}
          isOpen={openStep === 'startPoint'}
          isCompleted={isStepCompleted('startPoint')}
          isEnabled={isStepEnabled('startPoint')}
          onToggle={() => handleStepToggle('startPoint')}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input 
                type="text" 
                placeholder="Enter city, park, or coordinates" 
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div className="bg-muted/30 p-3 rounded-md">
              <p className="text-sm">
                <strong>Tip:</strong> Choose a starting point within 150 miles for a weekend trip
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => setOpenStep('basics')}
              >
                Back
              </Button>
              <Button 
                onClick={() => completeStep('startPoint')}
                className="w-full"
              >
                Next Step
              </Button>
            </div>
          </div>
        </AccordionStep>
        
        <AccordionStep
          title="Team Members"
          stepNumber={3}
          isOpen={openStep === 'team'}
          isCompleted={isStepCompleted('team')}
          isEnabled={isStepEnabled('team')}
          onToggle={() => handleStepToggle('team')}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Add Hikers</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Enter name or email" 
                  className="flex-1 p-2 border rounded-md" 
                />
                <Button variant="outline" size="sm">
                  <Users size={16} className="mr-1" />
                  Add
                </Button>
              </div>
            </div>
            
            <div className="bg-white border rounded-md p-3">
              <p className="text-sm font-medium mb-2">Current Team</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">
                      YS
                    </div>
                    <span>You (Solo)</span>
                  </div>
                  <div className="text-xs font-medium px-2 py-0.5 bg-green-100 text-green-800 rounded">
                    Owner
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => setOpenStep('startPoint')}
              >
                Back
              </Button>
              <Button 
                onClick={() => completeStep('team')}
                className="w-full"
              >
                Next Step
              </Button>
            </div>
          </div>
        </AccordionStep>
        
        <AccordionStep
          title="Find Trails"
          stepNumber={4}
          isOpen={openStep === 'search'}
          isCompleted={isStepCompleted('search')}
          isEnabled={isStepEnabled('search')}
          onToggle={() => handleStepToggle('search')}
        >
          <div className="space-y-4">
            <Button 
              className="w-full"
            >
              Find Perfect Trails
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              AI will recommend trails based on your preferences
            </p>
          </div>
        </AccordionStep>
      </div>
      
      {isSearchCompleted && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Step 2/5 – Choose your trail</h2>
            <div className="text-sm text-muted-foreground">5 results</div>
          </div>
          
          <div className="space-y-4">
            <TrailCard
              name="Eagle Ridge Trail"
              distance="4.2 miles"
              elevation="870 ft"
              time="2h 15m"
              terrain="T2"
              gearCompatible={true}
              rarity="common"
            />
            
            <TrailCard
              name="Lake Serene"
              distance="8.2 miles"
              elevation="2,000 ft"
              time="5h 30m"
              terrain="T3"
              gearCompatible={true}
              rarity="uncommon"
            />
            
            <TrailCard
              name="Cascade Pass"
              distance="7.4 miles"
              elevation="1,800 ft"
              time="4h 45m"
              terrain="T3"
              gearCompatible={false}
              rarity="rare"
            />
            
            <TrailCard
              name="Gothic Basin"
              distance="9.2 miles"
              elevation="2,840 ft"
              time="7h"
              terrain="T4"
              gearCompatible={false}
              rarity="epic"
            />
            
            <TrailCard
              name="Mount Rainier Summit"
              distance="16 miles"
              elevation="9,000 ft"
              time="2 days"
              terrain="T5"
              gearCompatible={false}
              rarity="legendary"
            />
          </div>
        </div>
      )}
      
      <div>
        <h2 className="text-lg font-semibold mb-2">My Future Trips</h2>
        <div className="trip-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Mount Baker</h3>
              <p className="text-xs text-gray-500">June 15 - June 17, 2025</p>
            </div>
            <div className="terrain-badge terrain-t4">T4</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
