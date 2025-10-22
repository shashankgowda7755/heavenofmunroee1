import SimpleHeader from "../components/SimpleHeader";
import Hero from "../components/Hero";
import MunroeIslandDescription from "../components/MunroeIslandDescription";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import BoatingPackages from "../components/BoatingPackages";
import Testimonials from "../components/Testimonials";
import PhotoGallery from "../components/PhotoGallery";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import BottomNavigation from "../components/BottomNavigation";

export default function Home() {
  return (
    <div 
      className="min-h-screen bg-gray-50 pb-20" 
      style={{
        backgroundImage: 'url(/images/homebg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <SimpleHeader />
      <Hero />
      <MunroeIslandDescription />
      <Services />
      <BoatingPackages />
      <Testimonials />
      <PhotoGallery />
      <AboutUs />
      <ContactSection />
      <Footer />
      <BottomNavigation />
    </div>
  );
}
