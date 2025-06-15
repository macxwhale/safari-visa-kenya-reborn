import { Button } from "@/components/ui/button";
import { X, User, Users } from "lucide-react";

interface ApplicationTypeModalProps {
  onClose: () => void;
  onTypeSelect: (type: 'individual' | 'group') => void;
  onBack: () => void;
}

export default function ApplicationTypeModal({ onClose, onTypeSelect, onBack }: ApplicationTypeModalProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"></div>
      
      {/* Modal content */}
      <div className="relative z-50 bg-white rounded-lg shadow-xl max-w-3xl w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">Select Application Type</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-gray-700 mb-8 leading-relaxed">
            Choose the type of application that best suits your travel needs to Kenya.
          </p>

          {/* Application Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div
              onClick={() => onTypeSelect('individual')}
              className="bg-blue-600 text-white rounded-lg p-6 cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Individual Application</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Apply for a single traveler. This option is for individuals traveling alone or applying separately.
              </p>
              <div className="mt-4 text-sm font-medium">
                Processing fee applies per application
              </div>
            </div>

            <div
              onClick={() => onTypeSelect('group')}
              className="bg-green-600 text-white rounded-lg p-6 cursor-pointer hover:bg-green-700 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Group Application</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Apply for multiple travelers (2-30 people) traveling together. Convenient for families, friends, or business groups.
              </p>
              <div className="mt-4 text-sm font-medium">
                Discounted rates for group applications
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Note</h4>
            <p className="text-sm text-yellow-700">
              For group applications, all travelers must have the same itinerary and travel dates. The primary applicant will be responsible for all group members.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
