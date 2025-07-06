
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, HelpCircle, User, Users, Briefcase } from "lucide-react";

interface ApplicationTypeModalProps {
  onClose: () => void;
  onTypeSelect: (type: 'individual' | 'group') => void;
  onBack: () => void;
}

const cards = [
  {
    value: 'individual',
    icon: (
      <span className="flex items-center gap-3 text-brand-green">
        <User className="w-8 h-8 sm:w-10 sm:h-10" />
        <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />
      </span>
    ),
    title: "Individual Application",
    subtitle: "I am applying for an individual only"
  },
  {
    value: 'group',
    icon: (
      <span className="flex items-center gap-3 text-brand-green">
        <Users className="w-8 h-8 sm:w-10 sm:h-10" />
        <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />
      </span>
    ),
    title: "Group Application",
    subtitle: "I am applying for a group application",
    extra: (
      <span className="text-sm text-muted-foreground leading-relaxed">
        If you are a family, a couple, friends living together or a company submitting on behalf of your employees, you can save time by applying as a group. To apply as a group, you must meet certain eligibility requirements.
      </span>
    )
  }
];

export default function ApplicationTypeModal({ onBack, onClose, onTypeSelect }: ApplicationTypeModalProps) {
  const [selected, setSelected] = useState<'individual' | 'group' | null>(null);

  const handleContinue = () => {
    if (selected) onTypeSelect(selected);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300" onClick={onClose} />

      {/* Modal content */}
      <div className="relative z-50 bg-background rounded-t-2xl sm:rounded-2xl shadow-2xl w-full h-full sm:h-auto sm:max-w-3xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 lg:p-8 border-b border-border flex-shrink-0">
          <div className="flex-1 pr-4 sm:pr-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">Select Application Type</h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              All foreign visitors except citizens of EAC member States planning to travel to the Republic of Kenya are required to submit Immigration forms in compliance with Section 48 of the Kenya Citizenship &amp; Immigration Act (No. 12 of 2011).
              Failure to comply may lead to denied boarding and/or deportation upon arrival.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hidden sm:flex items-center gap-2 px-3 py-2 touch-target">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm">Help</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted transition-colors touch-target"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content: Select cards */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-32 sm:pb-8">
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            {cards.map(card => {
              const selectedStyle = selected === card.value
                ? "bg-brand-green-lighter border-brand-green shadow-lg ring-2 ring-brand-green/20"
                : "bg-background border-border hover:border-brand-green/30 hover:shadow-md";
              return (
                <button
                  type="button"
                  key={card.value}
                  className={`w-full border-2 rounded-2xl p-4 sm:p-6 lg:p-8 flex items-start gap-4 sm:gap-6 transition-all duration-200 text-left touch-target ${selectedStyle}`}
                  onClick={() => setSelected(card.value as 'individual' | 'group')}
                  aria-pressed={selected === card.value}
                >
                  <div className="flex-shrink-0 mt-1">{card.icon}</div>
                  <div className="flex flex-col space-y-2 sm:space-y-3">
                    <span className="text-lg sm:text-xl font-bold text-foreground">{card.title}</span>
                    <span className="text-sm sm:text-base text-muted-foreground font-medium">{card.subtitle}</span>
                    {card.extra && (
                      <div className="pt-2">{card.extra}</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-4 sm:p-6 lg:p-8 border-t border-border bg-background gap-3 sm:gap-4 lg:gap-6 pb-safe">
          <Button 
            variant="outline" 
            onClick={onClose} 
            size="lg"
            className="order-2 sm:order-1 w-full sm:w-auto"
          >
            Close
          </Button>
          <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
            <Button 
              variant="outline" 
              onClick={onBack} 
              size="lg"
              className="w-full sm:w-auto"
            >
              Back
            </Button>
            <Button
              variant="brand"
              disabled={!selected}
              onClick={handleContinue}
              size="lg"
              className="w-full sm:w-auto"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
