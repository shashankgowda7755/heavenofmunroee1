import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Images, ChevronUp, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@shared/schema";

export default function PhotoGallery() {
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);

  const { data: galleryImages = [], isLoading, isError } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery-images'],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  // Generate gallery images from all photos in the pics folder
  const generateLocalImages = (): GalleryImage[] => {
    const localImages: GalleryImage[] = [];
    
    // Categories and descriptions for diverse content (culture and wildlife categories removed)
    const imageData = [
      { category: "kayaking", title: "Traditional Kayak Adventure", description: "Gliding through serene backwaters in traditional wooden kayaks" },
      { category: "nature", title: "Coconut Palm Reflections", description: "Towering coconut palms mirrored in crystal-clear waters" },
      { category: "nature", title: "Kingfisher Spotting", description: "Colorful kingfishers perched along the waterways" },
      { category: "kayaking", title: "Peaceful Morning Paddle", description: "Early morning kayaking through misty backwater channels" },
      { category: "landscape", title: "Backwater Sunset", description: "Golden hour painting the sky over tranquil waters" },
      { category: "landscape", title: "Local Fishing Boats", description: "Traditional fishing boats anchored in village waters" },
      { category: "nature", title: "Mangrove Exploration", description: "Navigating through dense mangrove forests" },
      { category: "kayaking", title: "Group Kayaking Fun", description: "Friends enjoying a guided kayaking expedition" },
      { category: "nature", title: "Heron in Shallow Waters", description: "Graceful herons hunting in the shallow backwaters" },
      { category: "landscape", title: "Village Waterfront", description: "Charming village homes along the water's edge" },
      { category: "landscape", title: "Coir Making Tradition", description: "Local artisans crafting coir products from coconut fiber" },
      { category: "nature", title: "Lotus Blooms", description: "Beautiful lotus flowers floating on calm waters" },
      { category: "kayaking", title: "Solo Kayak Journey", description: "Peaceful solo paddling through narrow channels" },
      { category: "nature", title: "Monitor Lizard Basking", description: "Large monitor lizards sunbathing on fallen logs" },
      { category: "landscape", title: "Aerial Backwater View", description: "Bird's eye view of the intricate waterway network" },
      { category: "landscape", title: "Traditional House Boat", description: "Authentic Kerala houseboats moored in backwaters" },
      { category: "nature", title: "Bamboo Grove Passage", description: "Kayaking through tunnels of overhanging bamboo" },
      { category: "kayaking", title: "Family Kayaking Trip", description: "Multi-generational family enjoying water adventures" },
      { category: "nature", title: "Cormorant Fishing", description: "Cormorants diving for fish in the clear waters" },
      { category: "landscape", title: "Monsoon Backwaters", description: "Lush green landscape during the monsoon season" },
      { category: "landscape", title: "Spice Garden Visit", description: "Exploring aromatic spice gardens near the waterways" },
      { category: "nature", title: "Water Hyacinth Blooms", description: "Purple water hyacinth flowers carpeting the surface" },
      { category: "kayaking", title: "Sunset Kayak Tour", description: "Evening kayaking as the sun sets over the horizon" },
      { category: "nature", title: "Otter Family Play", description: "Playful otters swimming alongside kayaks" },
      { category: "landscape", title: "Narrow Channel Navigation", description: "Maneuvering through tight waterway passages" },
      { category: "landscape", title: "Coconut Harvesting", description: "Local workers harvesting coconuts from tall palms" },
      { category: "nature", title: "Butterfly Garden", description: "Colorful butterflies fluttering around flowering plants" },
      { category: "kayaking", title: "Beginner's First Paddle", description: "First-time kayakers learning the basics" },
      { category: "nature", title: "Eagle Soaring Above", description: "Majestic eagles circling over the backwater ecosystem" },
      { category: "landscape", title: "Tidal Creek Exploration", description: "Discovering hidden tidal creeks and inlets" },
      { category: "landscape", title: "Village Market Scene", description: "Bustling local market near the waterfront" },
      { category: "nature", title: "Fern Covered Banks", description: "Lush ferns creating green walls along the water" },
      { category: "kayaking", title: "Advanced Paddling Techniques", description: "Skilled kayakers demonstrating proper form" },
      { category: "nature", title: "Turtle Sanctuary Visit", description: "Protected turtles in their natural habitat" },
      { category: "landscape", title: "Estuary Meeting Point", description: "Where freshwater meets the Arabian Sea" },
      { category: "landscape", title: "Traditional Fishing Nets", description: "Chinese fishing nets silhouetted against the sky" },
      { category: "nature", title: "Medicinal Plant Garden", description: "Ayurvedic herbs growing along the waterways" },
      { category: "kayaking", title: "Night Kayaking Adventure", description: "Moonlit paddling under starry skies" },
      { category: "nature", title: "Migratory Bird Watching", description: "Seasonal visitors resting in the wetlands" },
      { category: "landscape", title: "Backwater Island Hopping", description: "Exploring small islands scattered throughout" },
      { category: "landscape", title: "Toddy Tapping Tradition", description: "Traditional palm wine collection methods" },
      { category: "nature", title: "Monsoon Forest Trail", description: "Hiking trails through rain-soaked forests" },
      { category: "kayaking", title: "Photography Kayak Tour", description: "Capturing perfect shots from water level" },
      { category: "nature", title: "Mudskipper Colonies", description: "Unique fish that live both in water and on land" },
      { category: "landscape", title: "Backwater Confluence", description: "Multiple waterways converging into larger channels" },
      { category: "landscape", title: "Boat Building Craft", description: "Skilled craftsmen constructing traditional boats" },
      { category: "nature", title: "Seasonal Flower Blooms", description: "Spectacular flowering trees reflecting in water" },
      { category: "kayaking", title: "Eco-Tourism Showcase", description: "Sustainable tourism practices in action" },
      { category: "nature", title: "Prawn Farming Ponds", description: "Sustainable aquaculture in backwater regions" },
      { category: "landscape", title: "Backwater Sunrise", description: "Dawn breaking over the peaceful waterscape" },
      { category: "landscape", title: "Local Guide Stories", description: "Knowledgeable guides sharing local knowledge" },
      { category: "nature", title: "Pristine Ecosystem", description: "Untouched natural beauty of Munroe Island" },
      { category: "kayaking", title: "Perfect Paddle Day", description: "Ideal conditions for an unforgettable kayaking adventure" },
      { category: "nature", title: "Backwater Biodiversity", description: "Rich variety of flora and fauna in harmony" },
      { category: "landscape", title: "Munroe Island Paradise", description: "The ultimate backwater destination in Kerala" },
      { category: "landscape", title: "Community Tourism", description: "Local communities welcoming visitors with warmth" }
    ];
    
    // Sunset images data (images 36-39) - keep descriptions for these
    const sunsetImages = {
      36: { category: "sunsets", title: "Golden Hour Backwaters", description: "Spectacular golden sunset reflecting on calm backwater channels" },
      37: { category: "sunsets", title: "Evening Glow Paradise", description: "Warm evening light painting the sky in vibrant orange and pink hues" },
      38: { category: "sunsets", title: "Sunset Kayak Silhouette", description: "Kayakers silhouetted against the dramatic sunset sky" },
      39: { category: "sunsets", title: "Twilight Serenity", description: "Peaceful twilight moments as day transitions to night" }
    };

    // Generate 55 unique images with diverse content (skip deleted image 16)
    for (let i = 1; i <= 55; i++) {
      // Skip image 16 as it has been permanently deleted
      if (i === 16) continue;
      
      const data = imageData[i - 1] || imageData[i % imageData.length];
      
      // Check if this is a sunset image (36-39) to keep description
      const isSunsetImage = sunsetImages[i as keyof typeof sunsetImages];
      const imageData_final = isSunsetImage || data;
      
      localImages.push({
        id: `local-${i}`,
        title: "",
        description: "",
        imageUrl: `/images/1 (${i}).jpg`,
        altText: "",
        category: imageData_final.category,
        sortOrder: i,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    
    return localImages;
  };

  const defaultImages = generateLocalImages();

  // Combine database images with local images
  const displayImages = [...(Array.isArray(galleryImages) ? galleryImages : []), ...defaultImages];


  // Get unique categories for filtering
  const categories = ["all", ...Array.from(new Set(displayImages.map(img => img.category || "general")))];

  // Filter images by category
  const filteredImages = selectedCategory === "all" 
    ? displayImages 
    : displayImages.filter(img => img.category === selectedCategory);

  // Show limited images initially, or all if "View All" is clicked
  const imagesToShow = showAllImages ? filteredImages : filteredImages.slice(0, 6);

  // Handle opening lightbox
  const openLightbox = (imageIndex: number) => {
    // Always use all filtered images for navigation (not just displayed subset)
    setLightboxImages(filteredImages);
    
    // Find the clicked image from the displayed subset
    const clickedImage = imagesToShow[imageIndex];
    // Find its index in the full filtered set
    const fullSetIndex = filteredImages.findIndex(img => img.id === clickedImage.id);
    
    // Defensive fallback if image not found (should not happen but safety first)
    setCurrentImageIndex(fullSetIndex !== -1 ? fullSetIndex : imageIndex);
    setLightboxOpen(true);
  };

  // Handle closing lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Navigate to next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === lightboxImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigate to previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? lightboxImages.length - 1 : prevIndex - 1
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      } else if (event.key === 'ArrowLeft') {
        prevImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxImages.length]);

  return (
    <section id="gallery" className="py-16 bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Gallery
          </h2>
          <p className="text-lg text-gray-600">
            Discover Munroe Island through beautiful moments
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setShowAllImages(false); // Reset view all state when changing category
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              data-testid={`category-filter-${category}`}
            >
              {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>



        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imagesToShow.map((image, index) => (
              <div 
                key={image.id}
                className="aspect-square rounded-xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => openLightbox(index)}
                data-testid={`gallery-image-${image.id}`}
              >
                <img 
                  src={image.imageUrl} 
                  alt={image.altText} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          {!showAllImages && filteredImages.length > 6 && (
            <button 
              onClick={() => setShowAllImages(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
              data-testid="button-view-all-gallery"
            >
              <Images size={20} />
              View All Gallery ({filteredImages.length} photos)
            </button>
          )}
          {showAllImages && (
            <button 
              onClick={() => setShowAllImages(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
              data-testid="button-show-less-gallery"
            >
              <ChevronUp size={20} />
              Show Less
            </button>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          data-testid="lightbox-overlay"
        >
          <div 
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
              data-testid="lightbox-close"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            {lightboxImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
                  data-testid="lightbox-prev"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
                  data-testid="lightbox-next"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Main Image */}
            <img
              src={lightboxImages[currentImageIndex]?.imageUrl}
              alt={lightboxImages[currentImageIndex]?.altText}
              className="max-w-full max-h-screen object-contain"
              data-testid="lightbox-image"
            />

            {/* Image Counter Only */}
            {lightboxImages.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 text-center text-white bg-black bg-opacity-50 p-2 rounded-lg">
                <p className="text-xs opacity-75">
                  {currentImageIndex + 1} of {lightboxImages.length}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
