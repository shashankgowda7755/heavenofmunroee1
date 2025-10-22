export default function TouristInfo() {
  const attractions = [
    {
      title: "Secret Canals",
      description: "Navigate through narrow waterways known only to locals, perfect for peaceful kayaking and bird watching.",
      icon: "fas fa-water",
      color: "primary",
      tag: "45 mins by kayak",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Fishing Villages",
      description: "Visit authentic fishing communities and learn traditional methods passed down through generations.",
      icon: "fas fa-anchor",
      color: "secondary",
      tag: "Cultural Experience",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Coconut Groves",
      description: "Walk through lush coconut plantations and learn about traditional farming methods unique to the region.",
      icon: "fas fa-tree",
      color: "accent",
      tag: "Nature Walk",
      image: "https://pixabay.com/get/gf45824251118aac69be8e65f65737209326ec96b398fa944c68e66d24692a5143f40555ab9acb8dc227d98080fc8162ec916972f5e91a45b622bfb0ae56ad37e_1280.jpg"
    },
    {
      title: "Sunset Points",
      description: "Discover the most beautiful sunset viewing spots across the island's pristine waterways.",
      icon: "fas fa-sun",
      color: "accent",
      tag: "Photography Spot",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const travelTips = [
    {
      icon: "fas fa-plane",
      color: "primary",
      title: "Getting Here",
      description: "Nearest airport: Trivandrum (1.5 hrs drive). We provide pickup services from major transport hubs."
    },
    {
      icon: "fas fa-calendar",
      color: "secondary",
      title: "Best Time to Visit",
      description: "October to March for pleasant weather. Monsoon season (June-September) offers unique beauty but limited water activities."
    },
    {
      icon: "fas fa-luggage-cart",
      color: "accent",
      title: "What to Pack",
      description: "Light cotton clothes, sunscreen, hat, mosquito repellent, waterproof bag for kayaking, and comfortable walking shoes."
    },
    {
      icon: "fas fa-language",
      color: "primary",
      title: "Languages",
      description: "Malayalam (local), English widely spoken. Our team is multilingual and happy to assist international guests."
    },
    {
      icon: "fas fa-wifi",
      color: "secondary",
      title: "Connectivity",
      description: "Good mobile network coverage. WiFi available at homestay. Perfect opportunity for a digital detox!"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Munroe Island
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover hidden gems, local attractions, and insider tips for an unforgettable Kerala backwater experience
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {attractions.map((attraction, index) => (
                <div key={index} className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                  <div 
                    className="h-48"
                    style={{
                      backgroundImage: `url(${attraction.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="p-6">
                    <h4 className="font-serif text-xl font-bold mb-2 flex items-center">
                      <i className={`${attraction.icon} text-${attraction.color} mr-2`}></i>
                      {attraction.title}
                    </h4>
                    <p className="text-muted-foreground mb-3">
                      {attraction.description}
                    </p>
                    <span className={`inline-block bg-${attraction.color}/10 text-${attraction.color} px-3 py-1 rounded-full text-sm font-medium`}>
                      {attraction.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <h4 className="font-serif text-2xl font-bold mb-6 flex items-center">
                <i className="fas fa-info-circle text-primary mr-3"></i>
                Travel Tips
              </h4>
              
              <div className="space-y-6">
                {travelTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <i className={`${tip.icon} text-${tip.color} mt-1`}></i>
                    <div>
                      <h5 className="font-semibold mb-1">{tip.title}</h5>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-accent/10 rounded-xl border border-accent/20">
                <h5 className="font-semibold text-accent mb-2 flex items-center">
                  <i className="fas fa-phone mr-2"></i>
                  24/7 Guest Support
                </h5>
                <p className="text-sm text-muted-foreground">
                  Our local team is always available to help with any questions or emergencies during your stay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
