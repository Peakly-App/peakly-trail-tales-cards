
import { useState } from 'react';

type Step = 'basics' | 'startPoint' | 'team' | 'search';

export interface PlannerState {
  dates: {
    start: string;
    end: string;
  };
  difficulty: string;
  startPoint: string;
  team: string[];
}

export const useTripPlanner = () => {
  const [currentStep, setCurrentStep] = useState<Step>('basics');
  const [openStep, setOpenStep] = useState<Step>('basics');
  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);
  
  const [plannerState, setPlannerState] = useState<PlannerState>({
    dates: {
      start: '',
      end: ''
    },
    difficulty: '',
    startPoint: '',
    team: []
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
    if (step === 'basics') setCurrentStep('startPoint');
    else if (step === 'startPoint') setCurrentStep('team');
    else if (step === 'team') setCurrentStep('search');
  };

  const updatePlannerState = (field: keyof PlannerState, value: any) => {
    setPlannerState({
      ...plannerState,
      [field]: value
    });
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
    updatePlannerState
  };
};

export default useTripPlanner;
