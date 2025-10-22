export default function ContactSection() {
  const handleDirections = () => {
    window.open("https://www.google.com/maps/dir/?api=1&destination=8.988001654095571,76.61763934803777", "_blank");
  };

  const scrollToMap = () => {
    const mapSection = document.querySelector('[data-testid="map-section"]');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Your Way to Paradise
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Located in the heart of Munroe Island, we're here to welcome you to an unforgettable Kerala backwater journey
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-card rounded-2xl p-8 shadow-lg mb-8">
              <h4 className="font-serif text-2xl font-bold mb-6 flex items-center">
                <i className="fas fa-map-marker-alt text-primary mr-3"></i>
                Contact Information
              </h4>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <i className="fas fa-home text-primary text-xl mt-1"></i>
                  <div>
                    <h5 className="font-semibold mb-1">Address</h5>
                    <button 
                      onClick={scrollToMap}
                      className="text-left text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      data-testid="address-click-to-map"
                    >
                      Heaven of Munroe<br />
                      Munroe Island, Kollam District<br />
                      Kerala 691502, India
                    </button>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      <i className="fas fa-mouse-pointer mr-1"></i>Click to view on map
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <i className="fas fa-phone text-secondary text-xl mt-1"></i>
                  <div>
                    <h5 className="font-semibold mb-1">Phone & WhatsApp</h5>
                    <p className="text-muted-foreground">
                      <a href="tel:+919633836839" className="hover:text-secondary transition-colors">+91 96338 36839</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <i className="fas fa-envelope text-accent text-xl mt-1"></i>
                  <div>
                    <h5 className="font-semibold mb-1">Email</h5>
                    <p className="text-muted-foreground">
                      <a href="mailto:info@heavenofmunroe.com" className="hover:text-accent transition-colors">info@heavenofmunroe.com</a><br />
                      <a href="mailto:bookings@heavenofmunroe.com" className="hover:text-accent transition-colors">bookings@heavenofmunroe.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <i className="fas fa-clock text-primary text-xl mt-1"></i>
                  <div>
                    <h5 className="font-semibold mb-1">Operating Hours</h5>
                    <p className="text-muted-foreground">
                      Daily: 6:00 AM - 8:00 PM<br />
                      24/7 Guest Support Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
              <h4 className="font-serif text-2xl font-bold mb-4 flex items-center">
                <i className="fas fa-route mr-3"></i>
                Getting to Munroe Island
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-plane mt-1"></i>
                  <div>
                    <h5 className="font-semibold mb-1">By Air</h5>
                    <p className="text-sm opacity-90">Trivandrum Airport (90 km). Cochin Airport (160 km) also available.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <i className="fas fa-train mt-1"></i>
                  <div>
                    <h5 className="font-semibold mb-1">By Train</h5>
                    <p className="text-sm opacity-90">Kollam Railway Station (25 km) - Direct connections from major cities.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <i className="fas fa-car mt-1"></i>
                  <div>
                    <h5 className="font-semibold mb-1">By Road</h5>
                    <p className="text-sm opacity-90">Well-connected by NH66. Parking available on-site.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-primary-foreground/20">
                <p className="text-sm opacity-90">
                  <i className="fas fa-info-circle mr-2"></i>
                  Need detailed directions? Call us and we'll guide you step by step to ensure a smooth journey.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <div 
              className="bg-card rounded-2xl overflow-hidden shadow-lg h-[600px] flex items-center justify-center relative"
              data-testid="map-section"
            >
              <img 
                src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Aerial view of Munroe Island location" 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <i className="fas fa-map-marker-alt text-2xl text-primary-foreground"></i>
                  </div>
                  <h5 className="font-serif text-2xl font-bold mb-2">Heaven of Munroe</h5>
                  <p className="text-lg opacity-90">Munroe Island, Kerala</p>
                  <button 
                    onClick={handleDirections}
                    className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    data-testid="button-get-directions"
                  >
                    <i className="fas fa-directions mr-2"></i>
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
