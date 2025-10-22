import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  const menuItems = [
    { id: "services", label: "Services" },
    { id: "dining", label: "Dining" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
    { id: "booking", label: "Book Now" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-mountain text-primary-foreground text-sm"></i>
            </div>
            <span>Heaven of Munroe</span>
          </SheetTitle>
        </SheetHeader>
        
        <nav className="mt-8 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="block w-full text-left px-4 py-3 text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
              data-testid={`mobile-nav-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
