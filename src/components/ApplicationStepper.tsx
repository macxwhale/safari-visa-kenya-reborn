
interface Step {
  label: string;
  completed: boolean;
  active: boolean;
}

export default function ApplicationStepper({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: string[];
}) {
  return (
    <div className="w-full flex items-center justify-center gap-0">
      {steps.map((label, i) => (
        <div className="flex items-center" key={label}>
          <div
            className={
              "flex flex-col items-center w-32"
            }
          >
            <span
              className={
                [
                  "rounded-full border-2 w-8 h-8 flex items-center justify-center font-semibold transition-colors",
                  i < currentStep
                    ? "bg-[#19a594]/80 border-[#19a594] text-white"
                    : i === currentStep
                    ? "bg-[#19a594] border-[#19a594] text-white"
                    : "bg-white border-gray-300 text-gray-400"
                ].join(" ")
              }
            >
              {i + 1}
            </span>
            <span
              className={[
                "text-xs mt-2 text-center transition-colors select-none leading-tight",
                i <= currentStep
                  ? "font-semibold text-[#19a594]"
                  : "text-gray-400"
              ].join(" ")}
            >
              {label}
            </span>
          </div>
          {i !== steps.length - 1 && (
            <div className="w-12 h-1 bg-gray-200 mx-0" />
          )}
        </div>
      ))}
    </div>
  );
}
