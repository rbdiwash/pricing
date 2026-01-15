export function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="fixed top-0 left-60 right-0 h-16 bg-primary border-b border-gray-800 z-[99] flex items-center max-lg:left-0">
      <div className="w-full px-8 flex justify-between items-center">
        <h1 className="text-sm font-medium text-white m-0">
          PP / Setup (Pricing Profile for Multiple Products)
        </h1>
        <div className="flex items-center gap-4 text-white text-sm">
          <span>Hello, Divash</span>
          <span className="text-white">{currentDate}</span>
          <div className="flex gap-2">
            <button
              className="bg-transparent border-none text-white cursor-pointer p-1 text-base transition-colors hover:text-white"
              aria-label="Notifications"
            >
              🔔
            </button>
            <button
              className="bg-transparent border-none text-white cursor-pointer p-1 text-base transition-colors hover:text-white"
              aria-label="Help"
            >
              ?
            </button>
          </div>
          <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center text-white text-base">
            <img src="/assets/images/profile.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
