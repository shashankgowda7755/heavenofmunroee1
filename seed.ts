import { storage } from "./server/storage";

async function seed() {
  console.log("Starting database seeding...");

  try {
    // Seed Hero Content
    const heroData = {
      title: "Heaven of Munroe",
      subtitle: "Room Stay & Food Boating Service",
      description: "Experience Authentic Kerala Backwaters",
      backgroundImage: "/images/backwater-boat-silhouette.jpg",
      primaryButtonText: "Discover Paradise",
      secondaryButtonText: "Book Your Journey",
      scrollHintText: "✨ Scroll down to explore our services"
    };
    await storage.updateHeroContent(heroData);
    console.log("✓ Hero content seeded");

    // Seed About Content
    const aboutData = {
      title: "Meet Evan - Your Local Host",
      hostName: "Evan",
      hostImage: "/images/1 (15).jpg",
      introText: "Born and raised on the pristine waters of Munroe Island, Evan has spent over two decades mastering the art of backwater navigation and hospitality.",
      description1: "His deep connection with the local ecosystem and authentic Kerala culture makes every journey a unique experience filled with stories, local wisdom, and genuine warmth.",
      description2: "When you book with Heaven of Munroe, you're not just getting a service - you're becoming part of Evan's extended family.",
      expandedText1: "Evan's expertise extends beyond boating - he's also a certified local guide, traditional chef, and cultural ambassador for Munroe Island. His multilingual abilities ensure comfortable communication with guests from around the world.",
      expandedText2: "The business started as a family tradition, passed down through generations of fishermen and boat builders. Today, Evan combines this heritage with modern hospitality standards to create unforgettable experiences.",
      languages: "English, Hindi, Malayalam",
      certifications: "First Aid Certified, Eco-Tourism Trained",
    };
    await storage.updateAboutContent(aboutData);
    console.log("✓ About content seeded");

    // Seed Boating Packages
    const packages = [
      {
        packageId: "sunrise-special",
        title: "Sunrise Special",
        duration: "2 Hours",
        price: "₹800",
        originalPrice: "₹1000",
        description: "Experience the magical sunrise over Munroe Island backwaters with traditional breakfast",
        features: [
          "Early morning boat ride (5:30 AM - 7:30 AM)",
          "Traditional Kerala breakfast on boat",
          "Bird watching opportunities",
          "Photography sessions",
          "Local guide and stories"
        ],
        image: "/images/1 (1).jpg",
        isPopular: true,
        whatsappLink: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Sunrise Special package",
        isActive: true,
        sortOrder: 1
      },
      {
        packageId: "family-adventure",
        title: "Family Adventure",
        duration: "4 Hours",
        price: "₹1,500",
        originalPrice: "₹1,800",
        description: "Perfect family experience with fishing, traditional lunch, and backwater exploration",
        features: [
          "Family-friendly boat tour (9:00 AM - 1:00 PM)",
          "Traditional fishing experience",
          "Authentic Kerala lunch on boat",
          "Wildlife spotting",
          "Kids-friendly activities"
        ],
        image: "/images/1 (2).jpg",
        isPopular: false,
        whatsappLink: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Family Adventure package",
        isActive: true,
        sortOrder: 2
      },
      {
        packageId: "sunset-romance",
        title: "Romantic Sunset",
        duration: "3 Hours",
        price: "₹1,200",
        originalPrice: "₹1,500",
        description: "Intimate sunset cruise with candlelight dinner for couples",
        features: [
          "Private sunset cruise (4:30 PM - 7:30 PM)",
          "Candlelight dinner setup",
          "Romantic ambiance with music",
          "Photography session",
          "Complimentary welcome drink"
        ],
        image: "/images/1 (3).jpg",
        isPopular: true,
        whatsappLink: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Romantic Sunset package",
        isActive: true,
        sortOrder: 3
      }
    ];

    for (const pkg of packages) {
      await storage.createBoatingPackage(pkg);
    }
    console.log("✓ Boating packages seeded");

    // Seed Testimonials
    const testimonials = [
      {
        name: "Sarah Johnson",
        platform: "Google Maps",
        rating: 5,
        review: "Absolutely magical experience! The sunrise boat tour was breathtaking. The traditional breakfast on the boat was delicious and the hospitality was exceptional. Highly recommended!",
        userImage: "/images/1 (10).jpg",
        reviewDate: "2024-08-15",
        isActive: true,
        sortOrder: 1
      },
      {
        name: "Rajesh Kumar",
        platform: "TripAdvisor",
        rating: 5,
        review: "Best boating experience in Kerala! The family adventure package was perfect for our group. Kids loved the fishing experience and the traditional lunch was amazing.",
        userImage: "/images/1 (11).jpg",
        reviewDate: "2024-08-01",
        isActive: true,
        sortOrder: 2
      },
      {
        name: "Emily Chen",
        platform: "Google Reviews",
        rating: 5,
        review: "The romantic sunset cruise exceeded all expectations! The candlelight dinner on the boat was incredibly romantic. Perfect for our anniversary celebration.",
        userImage: "/images/1 (12).jpg",
        reviewDate: "2024-08-10",
        isActive: true,
        sortOrder: 3
      }
    ];

    for (const testimonial of testimonials) {
      await storage.createTestimonial(testimonial);
    }
    console.log("✓ Testimonials seeded");

    // Seed Gallery Images
    const galleryImages = [
      {
        title: "Golden Hour Backwaters",
        description: "Spectacular golden sunset reflecting on calm backwater channels",
        imageUrl: "/images/1 (20).jpg",
        altText: "Golden sunset over backwaters",
        category: "sunsets",
        isActive: true,
        sortOrder: 1
      },
      {
        title: "Traditional Boat Tour",
        description: "Authentic Kerala boat experience through narrow canals",
        imageUrl: "/images/1 (21).jpg",
        altText: "Traditional boat in backwaters",
        category: "boats",
        isActive: true,
        sortOrder: 2
      },
      {
        title: "Local Wildlife",
        description: "Discover diverse bird species and marine life",
        imageUrl: "/images/1 (22).jpg",
        altText: "Birds and wildlife in backwaters",
        category: "wildlife",
        isActive: true,
        sortOrder: 3
      }
    ];

    for (const image of galleryImages) {
      await storage.createGalleryImage(image);
    }
    console.log("✓ Gallery images seeded");

    // Seed Contact Info
    const contactInfo = {
      businessName: "Heaven of Munroe",
      email: "info@heavenofmunroe.com",
      phone: "+91 96338 36839",
      whatsappNumber: "+919633836839",
      address: "Munroe Island, Kollam, Kerala, India",
      description: "Your gateway to authentic Kerala backwater experiences",
      facebook: "https://facebook.com/heavenofmunroe",
      instagram: "https://instagram.com/heavenofmunroe",
      googleMaps: "https://www.google.com/maps/dir/?api=1&destination=8.988001654095571,76.61763934803777",
      businessHours: "6:00 AM - 8:00 PM (Daily)",
      isActive: true
    };
    await storage.updateContactInfo(contactInfo);
    console.log("✓ Contact info seeded");

    // Seed Content Sections
    const contentSections = [
      {
        sectionKey: "munroe-island-main",
        title: "Discover Munroe Island",
        content: "Experience the untouched beauty of Munroe Island, where emerald backwaters meet azure skies in perfect harmony.",
        imageUrl: "/images/canal.jpg",
        isActive: true
      },
      {
        sectionKey: "munroe-island-features",
        title: "Island Features",
        content: "Pristine canals, traditional fishing villages, coconut groves, and authentic Kerala hospitality await you.",
        imageUrl: "/images/boathouse.jpg",
        isActive: true
      }
    ];

    for (const section of contentSections) {
      await storage.updateContentSection(section.sectionKey, section);
    }
    console.log("✓ Content sections seeded");

    console.log("🎉 Database seeding completed successfully!");

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

// Run the seed function
seed().then(() => {
  console.log("Seeding finished. Exiting...");
  process.exit(0);
}).catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});