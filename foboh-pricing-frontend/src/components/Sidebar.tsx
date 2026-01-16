import { useEffect } from "react";

interface NavItem {
  label: string;
  icon?: string;
  active?: boolean;
  badge?: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems: NavItem[] = [
  { label: "Dashboard" },
  { label: "Orders" },
  { label: "Customers" },
  { label: "Products" },
  { label: "Pricing", active: true },
  { label: "Freight", badge: "NEW" },
  { label: "Integrations" },
  { label: "Settings" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  // Close sidebar when clicking on a nav item on mobile
  const handleNavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[99] lg:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-60 bg-gray-900 flex flex-col z-[100] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Close button for mobile */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 lg:hidden">
          <div className="text-gray-500 font-semibold text-sm tracking-wider">
            FOBOH
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 transition-colors"
            aria-label="Close sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin">
          <ul className="list-none m-0 p-0">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  className={`flex items-center justify-between px-6 py-3 text-gray-400 no-underline transition-colors duration-200 text-sm ${
                    item.active
                      ? "bg-gray-800 text-green-500 border-l-4 border-green-500"
                      : "hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={handleNavClick}
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
        <div className="p-6 border-t border-gray-800 hidden lg:block">
          <div className="text-gray-500 font-semibold text-sm tracking-wider">
            FOBOH
          </div>
        </div>
      </aside>
    </>
  );
}
