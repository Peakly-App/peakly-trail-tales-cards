
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionStepProps {
  title: string;
  stepNumber: number;
  isOpen: boolean;
  isCompleted: boolean;
  isEnabled: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionStep: React.FC<AccordionStepProps> = ({ 
  title, 
  stepNumber, 
  isOpen, 
  isCompleted, 
  isEnabled, 
  onToggle, 
  children 
}) => {
  return (
    <div className={`accordion-card ${!isEnabled ? 'opacity-50' : ''}`}>
      <div 
        className="accordion-header" 
        onClick={isEnabled ? onToggle : undefined}
        style={{ cursor: isEnabled ? 'pointer' : 'not-allowed' }}
      >
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            isCompleted 
              ? 'bg-peakly-success text-white' 
              : 'bg-muted text-foreground'
          }`}>
            {isCompleted ? '✓' : stepNumber}
          </div>
          <span className="font-medium">{title}</span>
        </div>
        <div>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      
      {isOpen && (
        <div className="accordion-content animate-accordion-down">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionStep;
