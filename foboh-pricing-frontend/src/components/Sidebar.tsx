interface NavItem {
  label: string;
  icon?: string;
  active?: boolean;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard' },
  { label: 'Orders' },
  { label: 'Customers' },
  { label: 'Products' },
  { label: 'Pricing', active: true },
  { label: 'Freight', badge: 'NEW' },
  { label: 'Integrations' },
  { label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-gray-900 flex flex-col z-[100]">
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin">
        <ul className="list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`flex items-center justify-between px-6 py-3 text-gray-400 no-underline transition-colors duration-200 text-sm ${
                  item.active
                    ? 'bg-gray-800 text-green-500 border-l-4 border-green-500'
                    : 'hover:bg-gray-800 hover:text-white'
                }`}
                onClick={(e) => e.preventDefault()}
              >
                {item.label}
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                    {item.badge}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-6 border-t border-gray-800">
        <div className="text-gray-500 font-semibold text-sm tracking-wider">FOBOH</div>
      </div>
    </aside>
  );
}
