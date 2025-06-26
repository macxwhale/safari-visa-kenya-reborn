
export const MODAL_PROGRESS_STEPS = [
  { label: "Passport Information", completed: false, current: false },
  { label: "Selfie Verification", completed: false, current: false },
  { label: "Contact Information", completed: false, current: false },
  { label: "Trip Information", completed: false, current: false },
  { label: "Traveler Information", completed: false, current: false },
  { label: "Documents & Review", completed: false, current: false },
  { label: "Payment", completed: false, current: false }
];

export const getProgressSteps = (currentStep: number) => {
  return MODAL_PROGRESS_STEPS.map((step, index) => ({
    ...step,
    completed: index < currentStep,
    current: index === currentStep
  }));
};
