import { useState } from "react";
import { Home, Ship, Images, MapPin, User } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function BottomNavigation() {
  const [activeSection, setActiveSection] = useState<string>("");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Heaven of Munroe services", "_blank");
  };

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("home");
      }
    },
    {
      id: "services",
      label: "Services",
      icon: Ship,
      action: () => scrollToSection("services")
    },
    {
      id: "about-us",
      label: "About",
      icon: User,
      action: () => scrollToSection("about-us")
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: Images,
      action: () => scrollToSection("gallery")
    },
    {
      id: "contact",
      label: "Contact",
      icon: MapPin,
      action: () => scrollToSection("contact")
    },
    {
      id: "book",
      label: "Book Now",
      icon: SiWhatsapp,
      action: openWhatsApp,
      special: true
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 min-w-[60px] ${
                  item.special
                    ? "bg-green-600 hover:bg-green-700 text-white transform hover:scale-110 hover:-translate-y-1"
                    : activeSection === item.id
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
                data-testid={`bottom-nav-${item.id}`}
              >
                <IconComponent size={20} className={`mb-1 ${item.special ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}