export default function DiningSection() {
  const menuCategories = [
    {
      title: "Fresh Seafood Specialties",
      icon: "fas fa-fish",
      color: "primary",
      items: [
        {
          name: "Karimeen Fish Curry",
          description: "Pearl spot fish in coconut curry with traditional spices",
          price: "₹450"
        },
        {
          name: "Prawn Roast",
          description: "Local prawns with curry leaves and coconut oil",
          price: "₹380"
        },
        {
          name: "Fish Molee",
          description: "Light curry with coconut milk and ginger",
          price: "₹420"
        }
      ]
    },
    {
      title: "Traditional Vegetarian",
      icon: "fas fa-leaf",
      color: "secondary",
      items: [
        {
          name: "Sadhya Feast",
          description: "Complete traditional Kerala meal on banana leaf",
          price: "₹350"
        },
        {
          name: "Avial & Thoran",
          description: "Mixed vegetables with coconut and local greens",
          price: "₹280"
        },
        {
          name: "Kappa & Meen Curry",
          description: "Tapioca with fish curry - island favorite",
          price: "₹320"
        }
      ]
    }
  ];

  return (
    <section id="dining" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Authentic Munroe Island Cuisine
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Savor traditional Kerala flavors prepared with fresh, local ingredients and family recipes passed down through generations
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Traditional Kerala cuisine preparation" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="font-serif text-2xl font-bold mb-2">Fresh. Local. Authentic.</h4>
                <p className="text-lg opacity-90">Ingredients sourced from our island gardens</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-8">
              {menuCategories.map((category, index) => (
                <div key={index} className="bg-card rounded-2xl p-6 shadow-lg">
                  <h4 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center">
                    <i className={`${category.icon} text-${category.color} mr-3`}></i>
                    {category.title}
                  </h4>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-center border-b border-border pb-2 last:border-b-0">
                        <div>
                          <h5 className="font-semibold text-foreground">{item.name}</h5>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <span className={`font-bold text-${category.color}`}>{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="bg-accent/10 rounded-2xl p-6 border border-accent/20">
                <h4 className="font-serif text-xl font-bold text-foreground mb-3 flex items-center">
                  <i className="fas fa-star text-accent mr-3"></i>
                  <h3 className="text-2xl font-semibold">Chef's Dining</h3>
                </h4>
                <p className="text-muted-foreground mb-4">
                  Join our family for a complete culinary journey. Watch traditional cooking methods, learn family recipes, and enjoy a feast together.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-accent">₹800/person</span>
                  <button 
                    className="bg-accent text-accent-foreground px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
                    onClick={() => {
                      const element = document.getElementById("booking");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    data-testid="button-reserve-dining"
                  >
                    Reserve Experience
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
