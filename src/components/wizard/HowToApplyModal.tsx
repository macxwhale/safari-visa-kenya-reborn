
import { Button } from "@/components/ui/button";
import { X, HelpCircle } from "lucide-react";
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
    <ModalWrapper onClose={onClose} className="sm:max-w-5xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gray-100 flex-shrink-0">
        <div className="flex-1 pr-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">How to Apply</h1>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700 flex items-center gap-2 px-3 py-2 hidden sm:flex"
          >
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

      {/* Content - scrollable */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 pb-48 sm:pb-8">
        <div className="max-w-4xl space-y-8">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
              All visitors including infants and children who intend to travel to the Republic of Kenya must have an approved Electronic Travel Authorisation (eTA) before the start of their journey.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Persons who are exempt from obtaining the Electronic Travel Authorisation (eTA)
            </h3>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
              <ol className="space-y-4">
                {exemptionsList.map((exemption, index) => (
                  <li key={index} className="flex gap-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                    <span className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-600 font-semibold rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <span className="pt-1">{exemption}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-6 sm:p-8 border-t border-gray-100 bg-white flex-shrink-0 gap-4 sm:gap-6 pb-safe">
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
            onClick={onContinue}
            className="bg-brand-green hover:bg-brand-green/90 text-white w-full sm:w-auto px-8 py-3 font-semibold"
          >
            Continue
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
