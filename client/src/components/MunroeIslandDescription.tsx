import { Leaf, Home, Ship, CheckCircle, Droplet } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { ContentSection } from "@shared/schema";

export default function MunroeIslandDescription() {
  // Fetch content sections from database
  const { data: mainContent } = useQuery<ContentSection | null>({
    queryKey: ['/api/content-sections', 'munroe-island-main'],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });
  
  const { data: featuresContent } = useQuery<ContentSection | null>({
    queryKey: ['/api/content-sections', 'munroe-island-features'],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  // Use database content with fallbacks
  const title = mainContent?.title || "Discover Munroe Island";
  const subtitle = mainContent?.content || "A cluster of eight pristine islands where the Kallada River meets Ashtamudi Lake — Kerala's hidden gem";
  const heroImage = mainContent?.imageUrl || "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  return (
    <section className="py-20 bg-white/80 backdrop-blur-sm" data-testid="section-munroe-description">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="heading-munroe-discover">
              {title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                A Paradise Shaped by Nature
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Munroe Island is a breathtaking cluster of eight small islands formed where the 
                Kallada River meets Ashtamudi Lake. This pristine delta, 
                located in Kollam district, Kerala, remains one of South India's best-kept secrets.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Named after Colonel John Munroe, the former British Resident of Travancore, 
                this ecological wonderland spans across narrow canals, lush coconut groves, 
                and traditional fishing villages that have remained unchanged for centuries.
              </p>
            </div>
            <div className="relative">
              <img 
                src={heroImage}
                alt="Aerial view of Munroe Island's intricate waterways"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                loading="lazy"
                data-testid="munroe-island-hero-image"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Droplet className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">8 Island Cluster</p>
                    <p className="text-xs text-muted-foreground">Ashtamudi Lake</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" data-testid="ecosystem-feature-card">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-green-600" size={32} />
              </div>
              <h4 className="font-serif text-xl font-bold mb-3">Pristine Ecosystem</h4>
              <p className="text-muted-foreground">
                Home to rare migratory birds, mangrove forests, and diverse marine life in crystal-clear backwaters.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" data-testid="villages-feature-card">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="text-orange-600" size={32} />
              </div>
              <h4 className="font-serif text-xl font-bold mb-3">Traditional Villages</h4>
              <p className="text-muted-foreground">
                Discover authentic Kerala village life with traditional fishing, coir making, and local hospitality.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" data-testid="canoe-feature-card">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ship className="text-blue-600" size={32} />
              </div>
              <h4 className="font-serif text-xl font-bold mb-3">Canoe Adventures</h4>
              <p className="text-muted-foreground">
                Navigate through narrow canals lined with coconut palms and discover hidden lagoons.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-6">
                Why Munroe Island is Special
              </h3>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-yellow-400 mt-1" size={20} />
                    <p>Untouched by mass tourism - peaceful and serene</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-yellow-400 mt-1" size={20} />
                    <p>Rich biodiversity with over 100 species of birds</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-yellow-400 mt-1" size={20} />
                    <p>Ancient spice trade routes and historical significance</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-yellow-400 mt-1" size={20} />
                    <p>Traditional Kerala cuisine with fresh seafood</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-yellow-400 mt-1" size={20} />
                    <p>Authentic cultural activities and local crafts</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-yellow-400 mt-1" size={20} />
                    <p>Perfect blend of adventure and relaxation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}