interface NavigationFooterProps {
  currentStep: number;
  isSaving: boolean;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function NavigationFooter({
  currentStep,
  isSaving,
  canProceed,
  onBack,
  onNext,
}: NavigationFooterProps) {
  return (
    <div className="flex justify-between items-center pt-4 mt-6 border-t border-gray-200">
      <p className="text-sm text-gray-500 m-0">
        Your entries are saved automatically
      </p>
      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={currentStep === 1}
          className="px-5 py-2.5 bg-white border border-gray-300 rounded-md text-gray-800 text-sm font-medium cursor-pointer transition-all hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={isSaving || !canProceed}
          className="px-5 py-2.5 bg-primary border border-primary rounded-md text-white text-sm font-medium cursor-pointer transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving
            ? "Saving..."
            : currentStep >= 2
            ? "Save & Publish Profile"
            : "Next"}
        </button>
      </div>
    </div>
  );
}
