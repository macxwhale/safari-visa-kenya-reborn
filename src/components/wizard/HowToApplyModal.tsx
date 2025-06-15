
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface HowToApplyModalProps {
  onClose: () => void;
  onContinue: () => void;
  onBack: () => void;
}

const exemptionsList = [
  "Holders of valid Kenya Passports or one-way Emergency Certificate issued by Kenya Missions abroad.",
  "Holders of Kenya Permanent Residence, valid Work Permits and Passes.",
  "Holders of valid Kenya eVISAs",
  "Holders of valid United Nation Conventional Travel Document issued by the Government of Kenya.",
  "Members of the Diplomatic Missions and International Organisations Accredited to Kenya.",
  "Citizens of the East African Partner States; These countries include Burundi, Democratic Republic of Congo, Rwanda, South Sudan, Tanzania and Uganda. (Exempted for Six (6) months)",
  "All passengers in transit through Kenya arriving and leaving by the same aircraft or transferring to another aircraft and who do not leave the precincts of Airports in Kenya.",
  "All passengers arriving and leaving by the same ship, and who do not leave the ship.",
  "Members of crew of any ship, aircraft, train, vehicle or carrier; whose name and particulars are included in the crew manifest of the ship, aircraft, train, vehicle or carrier; and who is proceeding in such ship, aircraft, train, vehicle or carrier to a destination outside Kenya.",
  "Owners of private aircraft stopping over for refuelling in Kenya and who do not leave the precincts of the airport."
];

export default function HowToApplyModal({ onClose, onContinue, onBack }: HowToApplyModalProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/50 z-40"></div>
      
      {/* Modal content */}
      <div className="relative z-50 bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">How to Apply</h1>
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <p className="text-gray-700 mb-6 leading-relaxed">
            All visitors including infants and children who intend to travel to the Republic of Kenya must have an approved Electronic Travel Authorisation (eTA) before the start of their journey.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Persons who are exempt from obtaining the Electronic Travel Authorisation (eTA)
          </h3>

          <ol className="space-y-3">
            {exemptionsList.map((exemption, index) => (
              <li key={index} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                <span className="text-gray-400 font-medium min-w-[20px]">{index + 1}.</span>
                <span>{exemption}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button 
              onClick={onContinue}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
