interface BasicPricingProfileSectionProps {
  profileName: string;
  onProfileNameChange: (name: string) => void;
}

export function BasicPricingProfileSection({
  profileName,
  onProfileNameChange,
}: BasicPricingProfileSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 m-0 mb-1">
            Basic Pricing Profile
          </h3>
          <p className="text-gray-600 text-sm m-0">
            Cheeky little description goes in here.
          </p>
        </div>
        <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
          Completed
        </span>
      </div>
      <div className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Name
          </label>
          <input
            type="text"
            value={profileName}
            onChange={(e) => onProfileNameChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-primary w-full max-w-md"
            placeholder="Enter profile name"
          />
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          This profile will be marked as Default and expires in 16 Days{" "}
          {new Date().toLocaleDateString()}.
        </p>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-800 text-sm cursor-pointer inline-flex items-center gap-2 transition-all hover:bg-gray-50 hover:border-gray-400">
          <span>✏️</span> Make Changes
        </button>
      </div>
    </div>
  );
}
