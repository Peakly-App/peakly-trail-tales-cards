
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import AccordionStep from './AccordionStep';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Navigation, Users, X, ArrowLeft } from 'lucide-react';
import useTripPlanner from '@/hooks/useTripPlanner';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const TrailCard = ({ 
  name, 
  distance, 
  elevation, 
  time, 
  terrain, 
  gearCompatible, 
  rarity,
  gearDetails
}: {
  name: string;
  distance: string;
  elevation: string;
  time: string;
  terrain: 'T1' | 'T2' | 'T3' | 'T4' | 'T5';
  gearCompatible: boolean;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  gearDetails: {
    compatible: boolean;
    missing?: string[];
  };
}) => (
  <div className="trip-card p-4 border rounded-lg bg-white shadow-sm mb-4">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{name}</h3>
        <div className="flex gap-4 mt-1 text-sm text-gray-600">
          <span>{distance}</span>
          <span>{elevation} elevation</span>
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
        <span className="ml-2">Maps: {rarity === 'legendary' ? '1' : rarity === 'epic' ? '2' : rarity === 'rare' ? '3-4' : '5+'}</span>
      </div>
      <div className="flex gap-2">
        <span className={`flex items-center text-xs ${gearDetails.compatible ? 'text-green-600' : 'text-red-600'}`}>
          <span className={`inline-block w-2 h-2 rounded-full ${gearDetails.compatible ? 'bg-green-500' : 'bg-red-500'} mr-1`}></span>
          Equipment: {gearDetails.compatible ? 'Compatible' : 'Incompatible'}
        </span>
        <Button size="sm">View details</Button>
      </div>
    </div>
    
    {!gearDetails.compatible && gearDetails.missing && gearDetails.missing.length > 0 && (
      <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-700">
        <strong>Missing equipment:</strong> {gearDetails.missing.join(', ')}
      </div>
    )}
  </div>
);

const FutureTrip = ({ name, date, terrain }: { name: string; date: string; terrain: string }) => (
  <Card className="mb-2">
    <CardContent className="p-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
        <div className="text-xs font-medium px-2 py-0.5 bg-gray-100 rounded-full">{terrain}</div>
      </div>
    </CardContent>
  </Card>
);

// Progress indicator component for the trail results page
const ProgressSteps = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-full flex items-center justify-center ${
            index < currentStep ? 'bg-primary' : index === currentStep ? 'bg-white ring-2 ring-primary' : 'bg-gray-200'
          }`}
        >
          {index <= currentStep && (
            <span className={`text-xs font-medium ${index === currentStep ? 'text-primary' : 'text-white'}`}>{index + 1}</span>
          )}
        </div>
      ))}
    </div>
  );
};

const TripPlanner: React.FC = () => {
  const {
    openStep,
    setOpenStep,
    isStepCompleted,
    isStepEnabled,
    completeStep,
    plannerState,
    addTeamMember,
    removeTeamMember
  } = useTripPlanner();

  const [teamMemberName, setTeamMemberName] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [activeView, setActiveView] = useState<'plan' | 'future'>('plan');

  const handleStepToggle = (step: 'basics' | 'startPoint' | 'team' | 'search') => {
    if (openStep === step) {
      setOpenStep('basics'); // Default to first step if closing current
    } else {
      setOpenStep(step);
    }
  };

  const handleAddTeamMember = () => {
    if (teamMemberName.trim()) {
      addTeamMember(teamMemberName);
      setTeamMemberName('');
      toast({
        title: "Member added",
        description: `${teamMemberName} has been added to your trip.`,
      });
    }
  };

  const handleFindTrails = () => {
    completeStep('search');
    setShowSearchResults(true);
    toast({
      title: "Trails found",
      description: "We found 5 trails matching your criteria.",
    });
  };

  // Sample future trips data
  const futureTrips = [
    { id: 1, name: "Mount Baker", date: "June 15 - June 17, 2025", terrain: "T4" },
    { id: 2, name: "Alpine Lakes Loop", date: "July 20 - July 22, 2025", terrain: "T3" }
  ];

  // Trail recommendations with gear compatibility 
  const trailRecommendations = [
    {
      name: "Eagle Ridge Trail",
      distance: "6.8 km",
      elevation: "265 m",
      time: "2h 15m",
      terrain: "T2" as const,
      gearCompatible: true,
      rarity: "common" as const,
      gearDetails: { compatible: true }
    },
    {
      name: "Serene Lake",
      distance: "13.2 km",
      elevation: "609 m",
      time: "5h 30m",
      terrain: "T3" as const,
      gearCompatible: true,
      rarity: "uncommon" as const,
      gearDetails: { compatible: true }
    },
    {
      name: "Cascade Pass",
      distance: "11.9 km",
      elevation: "549 m",
      time: "4h 45m",
      terrain: "T3" as const,
      gearCompatible: false,
      rarity: "rare" as const,
      gearDetails: { compatible: false, missing: ["Hiking poles", "Water filter"] }
    },
    {
      name: "Gothic Basin",
      distance: "14.8 km",
      elevation: "866 m",
      time: "7h",
      terrain: "T4" as const,
      gearCompatible: false,
      rarity: "epic" as const,
      gearDetails: { compatible: false, missing: ["Ice axe", "Light crampons", "Navigation device"] }
    },
    {
      name: "Mount Rainier Summit",
      distance: "25.7 km",
      elevation: "2743 m",
      time: "2 days",
      terrain: "T5" as const,
      gearCompatible: false,
      rarity: "legendary" as const,
      gearDetails: { compatible: false, missing: ["Crampons", "Ice axe", "Mountaineering boots", "Ropes", "Harness"] }
    }
  ];

  if (showSearchResults) {
    return (
      <div className="space-y-6 p-4 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={() => setShowSearchResults(false)} className="flex items-center gap-1">
            <ArrowLeft size={16} />
            Back
          </Button>
          <h1 className="text-lg font-bold">Trail Results</h1>
        </div>

        <div className="text-center mb-6">
          <ProgressSteps currentStep={1} totalSteps={5} />
          <p className="text-sm text-muted-foreground">Choose your trail</p>
        </div>
          
        <div className="space-y-4">
          {trailRecommendations.map((trail, index) => (
            <TrailCard 
              key={index}
              name={trail.name}
              distance={trail.distance}
              elevation={trail.elevation}
              time={trail.time}
              terrain={trail.terrain}
              gearCompatible={trail.gearCompatible}
              rarity={trail.rarity}
              gearDetails={trail.gearDetails}
            />
          ))}
        </div>
          
        {/* Recommended Gear Section */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <h3 className="text-md font-semibold mb-3">Your Gear Inventory</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded border">
              <h4 className="font-medium text-sm">Essential</h4>
              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                <li className="flex items-center gap-1">
                  <span className="text-green-500">✓</span> Hiking boots
                </li>
                <li className="flex items-center gap-1">
                  <span className="text-green-500">✓</span> Water bottle (1L)
                </li>
                <li className="flex items-center gap-1">
                  <span className="text-green-500">✓</span> First aid kit
                </li>
              </ul>
            </div>
              
            <div className="bg-white p-3 rounded border">
              <h4 className="font-medium text-sm">Weather Protection</h4>
              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                <li className="flex items-center gap-1">
                  <span className="text-green-500">✓</span> Waterproof jacket
                </li>
                <li className="flex items-center gap-1">
                  <span className="text-green-500">✓</span> Hat / Sun protection
                </li>
                <li className="flex items-center gap-1">
                  <span className="text-red-500">✗</span> Crampons (T4+ only)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Plan Your Adventure</h1>
        
        {/* Toggle between Plan and Future Trips */}
        <div className="mb-6">
          <ToggleGroup type="single" value={activeView} onValueChange={(value) => value && setActiveView(value as 'plan' | 'future')} className="border rounded-lg p-1 w-full">
            <ToggleGroupItem value="plan" className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-white">
              Plan A Trip
            </ToggleGroupItem>
            <ToggleGroupItem value="future" className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-white">
              My Future Trips
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        {activeView === 'plan' ? (
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
                    <label className="block text-sm font-medium mb-1">Start date</label>
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
                    <label className="block text-sm font-medium mb-1">End date</label>
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
                  <label className="block text-sm font-medium mb-1">Difficulty level</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="easy">Easy (T1-T2)</option>
                    <option value="moderate">Moderate (T3)</option>
                    <option value="hard">Difficult (T4)</option>
                    <option value="expert">Expert (T5+)</option>
                  </select>
                </div>
                
                <Button 
                  onClick={() => completeStep('basics')}
                  className="w-full"
                >
                  Next step
                </Button>
              </div>
            </AccordionStep>
            
            <AccordionStep
              title="Starting point"
              stepNumber={2}
              isOpen={openStep === 'startPoint'}
              isCompleted={isStepCompleted('startPoint')}
              isEnabled={isStepEnabled('startPoint')}
              onToggle={() => handleStepToggle('startPoint')}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <div className="flex w-full border rounded-md overflow-hidden">
                    <div className="flex items-center justify-center bg-muted px-2">
                      <Navigation size={16} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Enter a city, park or coordinates" 
                      className="w-full p-2 focus:outline-none" 
                    />
                  </div>
                </div>
                
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="text-sm">
                    <strong>Tip:</strong> Choose a starting point within 240 km for a weekend trip
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
                    Next step
                  </Button>
                </div>
              </div>
            </AccordionStep>
            
            <AccordionStep
              title="Group members"
              stepNumber={3}
              isOpen={openStep === 'team'}
              isCompleted={isStepCompleted('team')}
              isEnabled={isStepEnabled('team')}
              onToggle={() => handleStepToggle('team')}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Add hikers</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={teamMemberName}
                      onChange={(e) => setTeamMemberName(e.target.value)}
                      placeholder="Enter a name or email" 
                      className="flex-1 p-2 border rounded-md" 
                    />
                    <Button variant="outline" size="sm" onClick={handleAddTeamMember}>
                      <Users size={16} className="mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white border rounded-md p-3">
                  <p className="text-sm font-medium mb-2">Current team ({plannerState.team.length})</p>
                  <div className="space-y-2">
                    {plannerState.team.map((member) => (
                      <div key={member.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 ${member.isOwner ? 'bg-primary' : 'bg-gray-500'} text-white rounded-full flex items-center justify-center text-xs`}>
                            {member.avatarInitials}
                          </div>
                          <span>{member.name}</span>
                        </div>
                        <div className="flex items-center">
                          {member.isOwner ? (
                            <div className="text-xs font-medium px-2 py-0.5 bg-green-100 text-green-800 rounded">
                              Organizer
                            </div>
                          ) : (
                            <button 
                              onClick={() => removeTeamMember(member.id)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {plannerState.team.length === 0 && (
                      <div className="text-sm text-gray-500 text-center py-2">
                        No team members yet. Add someone to join your adventure!
                      </div>
                    )}
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
                    Next step
                  </Button>
                </div>
              </div>
            </AccordionStep>
            
            <AccordionStep
              title="Find trails"
              stepNumber={4}
              isOpen={openStep === 'search'}
              isCompleted={isStepCompleted('search')}
              isEnabled={isStepEnabled('search')}
              onToggle={() => handleStepToggle('search')}
            >
              <div className="space-y-4">
                <Button 
                  className="w-full"
                  onClick={handleFindTrails}
                >
                  Find perfect trails
                </Button>
                
                <p className="text-center text-sm text-muted-foreground">
                  AI will recommend trails based on your preferences
                </p>
              </div>
            </AccordionStep>
          </div>
        ) : (
          <div className="space-y-4">
            {futureTrips.length > 0 ? (
              <div className="space-y-3">
                {futureTrips.map(trip => (
                  <FutureTrip 
                    key={trip.id} 
                    name={trip.name} 
                    date={trip.date} 
                    terrain={trip.terrain} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center p-6 bg-gray-50 rounded-lg border border-dashed">
                <p className="text-gray-500">No upcoming trips yet</p>
                <p className="text-sm text-gray-400 mt-1">Plan your first adventure!</p>
                <Button 
                  className="mt-4"
                  onClick={() => setActiveView('plan')}
                >
                  Plan a trip now
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default TripPlanner;
