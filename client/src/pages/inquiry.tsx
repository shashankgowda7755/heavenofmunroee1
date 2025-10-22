import { useEffect, useState } from "react";
import InquiryForm from "../components/InquiryForm";
import SimpleHeader from "../components/SimpleHeader";
import Footer from "../components/Footer";

export default function InquiryPage() {
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const packageParam = params.get("package") || "";
    setSelectedPackage(packageParam);

    // Ensure the booking form is immediately visible when page loads
    const scrollToForm = () => {
      const formElement = document.getElementById('booking-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback to scroll to top if form not found yet
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(scrollToForm, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SimpleHeader />
      
      {/* Hero Section for Booking */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Book Your Heaven of Munroe Journey
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Fill out the form below to begin your booking process. We'll get back to you quickly to confirm your reservation.
          </p>
        </div>
      </section>
      
      <main className="container mx-auto px-4 py-8 -mt-6" id="booking-form">
        <InquiryForm 
          selectedPackage={selectedPackage}
          onSuccess={(inquiryId) => {
            // Inquiry submitted successfully
          }}
        />
      </main>
      
      <Footer />
    </div>
  );
}