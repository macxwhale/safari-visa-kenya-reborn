
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import ModalWrapper from "./ModalWrapper";

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
    <ModalWrapper onClose={onClose} className="max-w-4xl max-h-[90vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b flex-shrink-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">How to Apply</h1>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClose}
          className="text-gray-600"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Content - scrollable */}
      <div className="p-4 sm:p-6 overflow-y-auto flex-1">
        <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
          All visitors including infants and children who intend to travel to the Republic of Kenya must have an approved Electronic Travel Authorisation (eTA) before the start of their journey.
        </p>

        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          Persons who are exempt from obtaining the Electronic Travel Authorisation (eTA)
        </h3>

        <ol className="space-y-3">
          {exemptionsList.map((exemption, index) => (
            <li key={index} className="flex gap-3 text-gray-700 text-xs sm:text-sm leading-relaxed">
              <span className="text-gray-400 font-medium min-w-[20px]">{index + 1}.</span>
              <span>{exemption}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-4 sm:p-6 border-t bg-gray-50 flex-shrink-0 gap-3 sm:gap-0">
        <Button variant="outline" onClick={onClose} className="order-1 sm:order-none">
          Close
        </Button>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={onBack} className="w-full sm:w-auto">
            Back
          </Button>
          <Button 
            onClick={onContinue}
            className="bg-brand-green hover:bg-brand-green/90 text-white w-full sm:w-auto"
          >
            Continue
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
