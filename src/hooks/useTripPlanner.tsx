
import { useState } from 'react';

type Step = 'basics' | 'startPoint' | 'team' | 'search';

export interface TeamMember {
  id: string;
  name: string;
  isOwner: boolean;
  avatarInitials: string;
}

export interface PlannerState {
  dates: {
    start: string;
    end: string;
  };
  difficulty: string;
  startPoint: string;
  team: TeamMember[];
}

export const useTripPlanner = () => {
  const [currentStep, setCurrentStep] = useState<Step>('basics');
  const [openStep, setOpenStep] = useState<Step>('basics');
  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);
  
  // Initialize with the current user as owner
  const [plannerState, setPlannerState] = useState<PlannerState>({
    dates: {
      start: '',
      end: ''
    },
    difficulty: 'moderate',
    startPoint: '',
    team: [
      {
        id: 'current-user',
        name: 'You (Solo)',
        isOwner: true,
        avatarInitials: 'YS'
      }
    ]
  });

  const isStepCompleted = (step: Step) => completedSteps.includes(step);
  
  const isStepEnabled = (step: Step) => {
    if (step === 'basics') return true;
    if (step === 'startPoint') return isStepCompleted('basics');
    if (step === 'team') return isStepCompleted('startPoint');
    if (step === 'search') return isStepCompleted('team');
    return false;
  };

  const completeStep = (step: Step) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }

    // Advance to next step
    if (step === 'basics') {
      setOpenStep('startPoint');
      setCurrentStep('startPoint');
    }
    else if (step === 'startPoint') {
      setOpenStep('team');
      setCurrentStep('team');
    }
    else if (step === 'team') {
      setOpenStep('search');
      setCurrentStep('search');
    }
  };

  const updatePlannerState = <K extends keyof PlannerState>(field: K, value: PlannerState[K]) => {
    setPlannerState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTeamMember = (name: string) => {
    if (!name.trim()) return;
    
    // Generate initials from name
    const initials = name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
      
    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: name,
      isOwner: false,
      avatarInitials: initials || 'XX'
    };
    
    setPlannerState(prev => ({
      ...prev,
      team: [...prev.team, newMember]
    }));
  };
  
  const removeTeamMember = (id: string) => {
    setPlannerState(prev => ({
      ...prev,
      team: prev.team.filter(member => member.id !== id)
    }));
  };

  return {
    currentStep,
    openStep, 
    setOpenStep,
    completedSteps,
    plannerState,
    isStepCompleted,
    isStepEnabled,
    completeStep,
    updatePlannerState,
    addTeamMember,
    removeTeamMember
  };
};

export default useTripPlanner;
