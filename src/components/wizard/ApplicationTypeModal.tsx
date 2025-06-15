
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
      <span className="flex items-center gap-2">
        <User className="w-10 h-10" />
        <Briefcase className="w-8 h-8 ml-2" />
      </span>
    ),
    title: "Individual Application",
    subtitle: "I am applying for an individual only"
  },
  {
    value: 'group',
    icon: (
      <span className="flex items-center gap-2">
        <Users className="w-10 h-10" />
        <Briefcase className="w-8 h-8 ml-2" />
      </span>
    ),
    title: "Group Application",
    subtitle: "I am applying for a group application",
    extra: (
      <span>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal content */}
      <div className="relative z-50 bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-auto flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Select type</h1>
            <p className="text-sm text-gray-700 leading-relaxed max-w-3xl">
              All foreign visitors except citizens of EAC member States planning to travel to the Republic of Kenya are required to submit Immigration forms in compliance with Section 48 of the Kenya Citizenship &amp; Immigration Act (No. 12 of 2011).
              Failure to comply may lead to denied boarding and/or deportation upon arrival.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <HelpCircle className="w-5 h-5 mr-1" />
              Help
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-600 self-end"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content: Select cards */}
        <div className="p-6 flex flex-col gap-4">
          {cards.map(card => {
            const selectedStyle = selected === card.value
              ? "bg-emerald-50 border-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.25)]"
              : "bg-white border-gray-300";
            return (
              <button
                type="button"
                key={card.value}
                className={`w-full border rounded-xl px-5 py-6 flex items-start gap-6 transition-colors text-left ${selectedStyle} hover:border-emerald-400`}
                onClick={() => setSelected(card.value as 'individual' | 'group')}
                aria-pressed={selected === card.value}
              >
                <div className="flex-shrink-0 text-emerald-700">{card.icon}</div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold mb-1">{card.title}</span>
                  <span className="text-sm mb-1">{card.subtitle}</span>
                  {card.extra && (
                    <span className="text-xs text-gray-700">{card.extra}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t bg-gray-50 gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button
              className="bg-brand-green hover:bg-brand-green/90 text-white"
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
