import { useLocation } from "wouter";

export default function Header() {
  const [, setLocation] = useLocation();


  const openInquiryForm = () => {
    setLocation("/inquiry#booking-form");
  };

  const navigateToHome = () => {
    setLocation("/");
  };

  return (
    <header className="bg-orange-100/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={navigateToHome}
            className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105"
            data-testid="button-logo-home"
          >
            <img 
              src="/images/logo.png" 
              alt="Heaven of Munroe Logo" 
              className="h-16 w-auto object-contain"
            />
          </button>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={openInquiryForm}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium text-sm"
              data-testid="button-inquiry-header"
            >
              <i className="fas fa-calendar-plus mr-1"></i>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
