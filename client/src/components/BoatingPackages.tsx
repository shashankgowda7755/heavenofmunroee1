import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { BoatingPackage } from "@shared/schema";

export default function BoatingPackages() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  // Fetch boating packages from database
  const { data: packages, isLoading } = useQuery<BoatingPackage[]>({
    queryKey: ['/api/boating-packages'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: 1
  });

  const openDirectBooking = (packageId: string) => {
    setLocation(`/inquiry?package=${packageId}`);
  };

  const staticPackages = [
    {
      id: "boat-tours",
      packageId: "boat-tours",
      title: "Shikara boat tours",
      duration: "",
      price: "₹1200 - 3000",
      originalPrice: "",
      description: "Authentic Kerala boathouse journey through pristine backwaters with expert local guides astamidi river",
      features: [
        "Traditional Kerala boathouse ride",
        "Experienced local boat captain",
        "Scenic backwater exploration", 
        "Bird watching opportunities",
        "7 people to 14 people based on boat"
      ],
      image: "/images/boathouse.jpg",
      isPopular: true,
      whatsappLink: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Traditional Boat Tours package",
      sortOrder: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "lake-foods",
      packageId: "lake-foods",
      title: "Lake Foods Package",
      duration: "",
      price: "₹600 - 1500",
      originalPrice: "",
      description: "Savor authentic Kerala cuisine freshly prepared on the lake with traditional cooking methods",
      features: [
        "Freshly prepared Kerala meals",
        "Traditional cooking demonstration",
        "Local spices and ingredients",
        "Waterfront dining experience",
        "Cultural food stories",
        "Vegetarian and non-veg options"
      ],
      image: "/images/food.jpg",
      isPopular: true,
      whatsappLink: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Lake Foods Package",
      sortOrder: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "canal-boating",
      packageId: "canal-boating",
      title: "Canal Boating Adventure",
      duration: "1 hour",
      price: "₹600 - 1200",
      originalPrice: "",
      description: "Navigate through narrow canals and hidden waterways discovering untouched natural beauty",
      features: [
        "Narrow canal exploration",
        "Hidden waterway discovery",
        "Traditional rowing boat",
        "Local village glimpses",
        "Peaceful nature experience"
      ],
      image: "/images/canal.jpg",
      isPopular: false,
      whatsappLink: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Canal Boating Adventure package",
      sortOrder: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "kayaking-adventure",
      packageId: "kayaking-adventure",
      title: "Kayaking Adventure",
      duration: "1 hour",
      price: "₹250",
      originalPrice: "",
      description: "Paddle through serene waters at your own pace, perfect for adventure enthusiasts and nature lovers",
      features: [
        "Single or double kayaks available",
        "Safety equipment provided",
        "Basic paddling instruction",
        "Rest stops at scenic points",
        "Photography opportunities"
      ],
      image: "/images/kayak.jpg",
      isPopular: false,
      whatsappLink: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Kayaking Adventure package",
      sortOrder: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "homestay-rooms",
      packageId: "homestay-rooms",
      title: "Homestay Rooms",
      duration: "Per Night",
      price: "₹1800 - 3000",
      originalPrice: "",
      description: "Comfortable overnight stay in traditional Kerala homes with warm hospitality and authentic activities",
      features: [
        "Clean, comfortable rooms",
        "Traditional Kerala architecture",
        "Cultural interaction with hosts",
        "Wi-Fi and basic amenities"
      ],
      image: "/images/stay.jpg",
      isPopular: true,
      whatsappLink: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Homestay Rooms package",
      sortOrder: 5,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Always use the new local image packages as requested
  const packagesData = staticPackages;

  // If loading, show loading state
  if (isLoading) {
    return (
      <section id="packages" className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (packagesData.length === 0) {
    return (
      <section id="packages" className="py-16 bg-gradient-to-b from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Premium Boating Packages
            </h2>
            <p className="text-lg text-gray-600">No packages available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }


  return (
    <section id="packages" className="py-16 bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4 gradient-text">
            Premium Boating Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our carefully crafted adventures designed to showcase the best of Munroe Island
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {packagesData.map((pkg, index) => (
            <div 
              key={pkg.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 transform hover-lift hover:scale-105 hover:-translate-y-4 hover:rotate-1 animate-fade-in-up group relative ${
                selectedPackage === pkg.id ? 'ring-4 ring-blue-400' : ''
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-blue-400/20 to-green-400/20 blur-xl -z-10"></div>
              <div className="relative">
                {pkg.isPopular && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse-slow">
                      🔥 Most Popular
                    </span>
                  </div>
                )}
                
                <div className="relative overflow-hidden group">
                  <div 
                    className="h-80 bg-cover bg-center transition-all duration-1000 ease-in-out transform group-hover:scale-125 group-hover:rotate-2 filter brightness-100 contrast-100 saturate-100 group-hover:brightness-110 group-hover:contrast-125 group-hover:saturate-125"
                    style={{ backgroundImage: `url(${pkg.image})` }}
                  ></div>
                  
                  {/* Animated overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-700 group-hover:from-black/40 group-hover:via-blue-500/10 group-hover:to-transparent"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out"></div>
                  </div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                    <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-green-400 rounded-full animate-bounce delay-300"></div>
                    <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce delay-500"></div>
                  </div>
                  
                  {/* Color tint overlay */}
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-700"></div>
                  
                  <div className="absolute bottom-4 left-4 text-white">
                    {pkg.duration && (
                      <div className="flex items-center space-x-2 mb-2">
                        <i className="fas fa-clock text-blue-300"></i>
                        <span className="text-sm font-medium">{pkg.duration}</span>
                      </div>
                    )}
                    <h3 className="font-serif text-2xl font-bold">{pkg.title}</h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">{pkg.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <i className="fas fa-star text-yellow-500 mr-2"></i>
                    What's Included:
                  </h4>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <i className="fas fa-check text-green-500 mt-1 mr-2 flex-shrink-0"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-green-600">{pkg.price}</span>
                      {pkg.originalPrice && <span className="text-lg text-gray-400 line-through">{pkg.originalPrice}</span>}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <button 
                      onClick={() => setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                      data-testid={`button-details-${pkg.id}`}
                    >
                      <i className="fas fa-info-circle mr-1"></i>
                      {selectedPackage === pkg.id ? 'Hide Details' : 'View Details'}
                    </button>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openDirectBooking(pkg.id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1"
                        data-testid={`button-book-direct-${pkg.id}`}
                      >
                        <i className="fas fa-calendar-plus mr-1"></i>
                        Book Direct
                      </button>
                      
                      <button 
                        onClick={() => window.open(pkg.whatsappLink, '_blank', 'noopener,noreferrer')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1"
                        data-testid={`button-whatsapp-${pkg.id}`}
                      >
                        <i className="fab fa-whatsapp mr-1"></i>
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up delay-500">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4">
              Need a Custom Package?
            </h3>
            <p className="text-gray-600 mb-6">
              We can create personalized journeys based on your preferences, group size, and special requirements.
            </p>
            <button 
              onClick={() => window.open("https://api.whatsapp.com/send?phone=919633836839&text=Hi! I need a custom boating package", '_blank', 'noopener,noreferrer')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              data-testid="button-custom-package"
            >
              <i className="fas fa-magic mr-2"></i>
              Create Custom Package
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}