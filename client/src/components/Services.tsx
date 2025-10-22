import { useLocation } from "wouter";

export default function Services() {
  const [, setLocation] = useLocation();

  const openDirectBooking = (serviceId: string) => {
    setLocation(`/inquiry?package=${serviceId}`);
  };

  // All services removed as requested
  const services: Array<{
    id: string;
    title: string;
    description: string;
    price: string;
    icon: string;
    whatsapp: string;
    image: string;
  }> = [];

  return (
    <section id="services" className="py-16 bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="text-reveal mb-4">
            <h2 className="text-reveal-inner font-serif text-3xl md:text-4xl font-bold gradient-shift">
              Munroe Island Experiences
            </h2>
          </div>
          <div className="text-reveal">
            <p className="text-reveal-inner text-lg text-gray-600 max-w-2xl mx-auto">
              Immerse yourself in authentic Kerala backwater adventures
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="relative bg-white rounded-3xl overflow-hidden morphing-shadow card-3d water-ripple group fade-in-stagger cursor-pointer transform-gpu"
              style={{ 
                animationDelay: `${index * 200}ms`,
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                willChange: 'transform'
              }}
            >
              {/* Premium image section with multi-layer animations */}
              <div className="relative overflow-hidden h-56">
                {/* Main background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    filter: 'brightness(1.1) contrast(1.3)',
                  }}
                ></div>
                
                {/* Light bottom gradient for text readability only */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Dynamic gradient overlay with shimmer effect - only on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-green-600/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                
                {/* Floating icon with premium animation */}
                <div className="absolute top-6 right-6 transform transition-all duration-700 group-hover:scale-125 group-hover:-rotate-12 group-hover:-translate-y-2">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl w-14 h-14 flex items-center justify-center shadow-xl cursor-glow">
                    <i className={`${service.icon} text-blue-600 text-2xl animate-float`}></i>
                  </div>
                </div>
                
                {/* Reveal content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                  <h4 className="text-white font-bold text-lg mb-2 drop-shadow-lg">
                    {service.title}
                  </h4>
                  <p className="text-white/90 text-sm leading-relaxed drop-shadow-md">
                    {service.description}
                  </p>
                </div>
                
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-1000">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
              
              {/* Enhanced content section */}
              <div className="p-6 relative">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 25px 25px, #3b82f6 2px, transparent 2px)',
                    backgroundSize: '50px 50px'
                  }}></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="font-serif text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-all duration-500 transform group-hover:scale-105">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed opacity-100 group-hover:opacity-0 transition-all duration-500">
                    {service.description}
                  </p>
                  
                  {/* Enhanced pricing section */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-2xl font-bold text-lg shadow-lg transform group-hover:scale-110 group-hover:-rotate-1 transition-all duration-500 cursor-glow">
                      {service.price}
                    </div>
                  </div>
                  
                  {/* Premium booking buttons */}
                  <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-200">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openDirectBooking(service.id);
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 active:scale-95 water-ripple cursor-glow"
                      data-testid={`button-book-direct-${service.id}`}
                    >
                      <i className="fas fa-calendar-plus mr-2 animate-bounce-gentle"></i>
                      Book Direct
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(service.whatsapp, '_blank');
                      }}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 active:scale-95 water-ripple cursor-glow"
                      data-testid={`button-whatsapp-${service.id}`}
                    >
                      <i className="fab fa-whatsapp mr-2 animate-wiggle"></i>
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 animate-fade-in-up delay-500">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto water-ripple morphing-shadow">
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold gradient-shift mb-3">
                Need Personalized Guidance?
              </h3>
              <p className="text-gray-600">
                Let our local experts help you choose the perfect journey for your Kerala adventure
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open("https://api.whatsapp.com/send?phone=919633836839&text=Hi! I need help choosing the right package for my Kerala backwater journey", '_blank')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-700 transform hover:scale-110 hover:shadow-2xl hover:-translate-y-2 active:scale-95 water-ripple cursor-glow breathing-scale"
                data-testid="button-get-help"
              >
                <i className="fas fa-user-friends mr-3 animate-bounce-gentle"></i>
                Get Expert Advice
              </button>
              
              <button 
                onClick={() => window.open("tel:+919633836839", '_self')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-700 transform hover:scale-110 hover:shadow-2xl hover:-translate-y-2 active:scale-95 water-ripple cursor-glow breathing-scale"
                data-testid="button-call-now"
              >
                <i className="fas fa-phone mr-3 animate-wiggle"></i>
                Call Now
              </button>
            </div>
            
            <div className="mt-6 flex justify-center items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <i className="fas fa-clock text-blue-500"></i>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-map-marker-alt text-green-500"></i>
                <span>Local Experts</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-star text-yellow-500"></i>
                <span>5.0 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
