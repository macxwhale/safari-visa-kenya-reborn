
export interface TravelerTypeSelectionProps {
  onTravelerTypeSelect: (type: string, applicationType?: string, country?: string) => void;
  onClose: () => void;
}

export interface TravelerType {
  id: string;
  title: string;
  description: string;
  color: string;
  icon?: React.ReactNode;
  flags?: string[];
}

export type ModalState = "main" | "howToApply" | "declaration" | "applicationType" | "countryResidence" | "complete";

export interface ApplicationData {
  travelerType: string;
  applicationType: string;
  country: string;
}
