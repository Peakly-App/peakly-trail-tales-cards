
import React from 'react';
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
    <div className={`rounded-lg border ${isOpen ? 'border-primary/40 shadow-sm' : 'border-gray-200'} ${!isEnabled ? 'opacity-50' : ''}`}>
      <div 
        className="p-4 flex justify-between items-center"
        onClick={isEnabled ? onToggle : undefined}
        style={{ cursor: isEnabled ? 'pointer' : 'not-allowed' }}
      >
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors ${
            isCompleted 
              ? 'bg-primary text-white' 
              : isOpen 
                ? 'bg-primary/10 text-primary border-2 border-primary/30' 
                : 'bg-gray-100 text-gray-500 border border-gray-300'
          }`}>
            {isCompleted ? '✓' : stepNumber}
          </div>
          <span className={`font-medium ${isOpen ? 'text-primary' : ''}`}>{title}</span>
        </div>
        <div className={`${isOpen ? 'text-primary' : 'text-gray-400'}`}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 pt-0 animate-accordion-down border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionStep;
