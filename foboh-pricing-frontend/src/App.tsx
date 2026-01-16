import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { PricingProfileSetup } from "./components/PricingProfileSetup";
import { PricingProfileProvider } from "./contexts/PricingProfileContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <PricingProfileProvider>
      <ToastContainer />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 ml-60 mt-8 p-8 min-h-[calc(100vh-4rem)] overflow-y-auto max-lg:ml-0 max-lg:mt-0">
          <PricingProfileSetup />
        </main>
      </div>
    </PricingProfileProvider>
  );
}

export default App;
