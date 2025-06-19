
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
      <span className="flex items-center gap-3 text-emerald-600">
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
      <span className="flex items-center gap-3 text-emerald-600">
        <Users className="w-8 h-8 sm:w-10 sm:h-10" />
        <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />
      </span>
    ),
    title: "Group Application",
    subtitle: "I am applying for a group application",
    extra: (
      <span className="text-sm text-gray-600 leading-relaxed">
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
      <div className="relative z-50 bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full h-full sm:h-auto sm:max-w-3xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-gray-100 flex-shrink-0">
          <div className="flex-1 pr-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">Select Application Type</h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              All foreign visitors except citizens of EAC member States planning to travel to the Republic of Kenya are required to submit Immigration forms in compliance with Section 48 of the Kenya Citizenship &amp; Immigration Act (No. 12 of 2011).
              Failure to comply may lead to denied boarding and/or deportation upon arrival.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hidden sm:flex items-center gap-2 px-3 py-2">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm">Help</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content: Select cards */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 pb-24 sm:pb-8">
          <div className="space-y-4 sm:space-y-6">
            {cards.map(card => {
              const selectedStyle = selected === card.value
                ? "bg-emerald-50 border-emerald-500 shadow-lg ring-2 ring-emerald-200"
                : "bg-white border-gray-200 hover:border-emerald-300 hover:shadow-md";
              return (
                <button
                  type="button"
                  key={card.value}
                  className={`w-full border-2 rounded-2xl p-6 sm:p-8 flex items-start gap-6 transition-all duration-200 text-left touch-manipulation ${selectedStyle}`}
                  onClick={() => setSelected(card.value as 'individual' | 'group')}
                  aria-pressed={selected === card.value}
                >
                  <div className="flex-shrink-0 mt-1">{card.icon}</div>
                  <div className="flex flex-col space-y-3">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">{card.title}</span>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{card.subtitle}</span>
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
        <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-6 sm:p-8 border-t border-gray-100 bg-white gap-4 sm:gap-6">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="order-2 sm:order-1 w-full sm:w-auto px-6 py-3 font-medium border-gray-300 hover:bg-gray-50"
          >
            Close
          </Button>
          <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
            <Button 
              variant="outline" 
              onClick={onBack} 
              className="w-full sm:w-auto px-6 py-3 font-medium border-gray-300 hover:bg-gray-50"
            >
              Back
            </Button>
            <Button
              className="bg-brand-green hover:bg-brand-green/90 text-white w-full sm:w-auto px-8 py-3 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              disabled={!selected}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
