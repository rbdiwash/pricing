interface AssignCustomersSectionProps {
  currentStep: number;
}

export function AssignCustomersSection({
  currentStep,
}: AssignCustomersSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 m-0 mb-1">
            Assign Customers to Pricing Profile
          </h3>
          <p className="text-gray-600 text-sm m-0">
            Choose which customers this profile will be applied to.
          </p>
        </div>
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-medium ${
            currentStep >= 2
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {currentStep >= 2 ? "• In Progress" : "• Not Started"}
        </span>
      </div>
      {currentStep >= 2 ? (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-4">
            Customer assignment functionality will be implemented here.
          </p>
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500 italic">
              This section is ready for customer assignment implementation.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-sm text-gray-500 italic">
            Complete product selection and pricing setup to proceed to customer
            assignment.
          </p>
        </div>
      )}
    </div>
  );
}
