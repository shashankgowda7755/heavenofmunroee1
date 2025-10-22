import React from "react";
import { useInstallBanner } from "@/contexts/InstallBannerContext";

export default function SimpleHeader() {
  const { isInstallBannerVisible } = useInstallBanner();
  const navigateToHome = () => {
    window.location.href = "/";
  };

  const openInquiryForm = () => {
    window.location.href = "/inquiry#booking-form";
  };

  return (
    <header 
      className="bg-white shadow-sm sticky z-40" 
      style={{ 
        top: isInstallBannerVisible ? '80px' : '0',
        transition: 'top 0.3s ease-in-out'
      }}
    >
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
          
          <button
            onClick={openInquiryForm}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            data-testid="button-book-now"
          >
            Book Now
          </button>
        </div>
      </div>
    </header>
  );
}