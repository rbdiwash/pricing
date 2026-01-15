import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { PricingProfileSetup } from "./components/PricingProfileSetup";
import { PricingProfileProvider } from "./contexts/PricingProfileContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <PricingProfileProvider>
      <ToastContainer />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <main className="flex-1 ml-60 mt-8 p-8 min-h-[calc(100vh-4rem)] overflow-y-auto max-lg:ml-0 max-lg:mt-0">
          <PricingProfileSetup />
        </main>
      </div>
    </PricingProfileProvider>
  );
}

export default App;
