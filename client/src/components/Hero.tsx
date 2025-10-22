import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { HeroContent } from "@shared/schema";

export default function Hero() {
  const [, setLocation] = useLocation();
  
  // Fetch hero content from database
  const { data: heroContent, isLoading } = useQuery<HeroContent | null>({
    queryKey: ['/api/hero-content'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: 1
  });

  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openInquiryForm = () => {
    setLocation("/inquiry");
  };

  // Default values as fallback
  const title = heroContent?.title || "Heaven of Munroe";
  const subtitle = heroContent?.subtitle || "Room Stay & Food Boating Service";  
  const description = heroContent?.description || "Authentic Kerala Backwaters";
  const backgroundImage = heroContent?.backgroundImage || "/images/backwater-boat-silhouette.jpg";
  const primaryButtonText = heroContent?.primaryButtonText || "Discover Paradise";
  const secondaryButtonText = heroContent?.secondaryButtonText || "Book Your Journey";
  const scrollHintText = heroContent?.scrollHintText || "✨ Scroll down to explore our services";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden floating-particles">
      {/* Light overlay for text readability while keeping background visible */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in-up">
          {/* Enhanced typography with better contrast and animations */}
          <div className="text-reveal mb-6">
            <h1 className="text-reveal-inner font-serif text-4xl md:text-6xl lg:text-8xl font-bold leading-tight gradient-shift drop-shadow-2xl">
              {title}
            </h1>
          </div>
          
          {/* Better contrast for subtitle text */}
          <div className="text-reveal">
            <p className="text-reveal-inner text-xl md:text-2xl mb-3 font-medium text-white drop-shadow-lg animate-slide-in-left delay-200">
              {subtitle}
            </p>
          </div>
          
          <div className="text-reveal">
            <p className="text-reveal-inner text-lg md:text-xl mb-12 text-gray-100 drop-shadow-md animate-slide-in-right delay-300">
              {description}
            </p>
          </div>
        </div>
        
        {/* Enhanced buttons with sophisticated animations */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-zoom-in delay-400">
          <button 
            onClick={scrollToServices}
            className="water-ripple morphing-shadow cursor-glow breathing-scale bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-700 transform hover:scale-110 hover:-translate-y-3 active:scale-95 min-w-[220px] shadow-2xl"
            data-testid="button-discover-services"
          >
            <i className="fas fa-compass mr-3 animate-rotate-slow text-xl"></i>
            {primaryButtonText}
          </button>
          
          <button 
            onClick={openInquiryForm}
            className="water-ripple morphing-shadow cursor-glow card-3d bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-700 transform hover:scale-110 hover:-translate-y-3 active:scale-95 min-w-[220px] shadow-2xl"
            data-testid="button-book-inquiry"
          >
            <i className="fas fa-calendar-plus mr-3 animate-bounce-gentle text-xl"></i>
            {secondaryButtonText}
          </button>
        </div>
        
        {/* Enhanced floating action hint */}
        <div className="mt-16 animate-fade-in-up delay-500">
          <p className="text-white/80 text-sm mb-4 drop-shadow-md">
            {scrollHintText}
          </p>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-glow">
        <button 
          onClick={scrollToServices} 
          className="text-white/70 hover:text-white transition-all duration-500 hover:scale-125 animate-bounce"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
            </div>
            <i className="fas fa-chevron-down text-xl animate-bounce-gentle"></i>
          </div>
        </button>
      </div>
    </section>
  );
}
