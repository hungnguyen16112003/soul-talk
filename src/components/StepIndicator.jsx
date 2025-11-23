// Component hiển thị step indicator
function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step <= currentStep
                ? "bg-purple-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {step}
          </div>
          {step < totalSteps && (
            <div
              className={`w-20 h-1 ${
                step < currentStep ? "bg-purple-600" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default StepIndicator;


