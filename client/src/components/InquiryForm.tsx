import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const inquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  numberOfGuests: z.number().min(1, "At least 1 guest required").max(20, "Maximum 20 guests allowed"),
  selectedPackage: z.string().min(1, "Please select a package"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  specialRequests: z.string().optional(),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface InquiryFormProps {
  selectedPackage?: string;
  onClose?: () => void;
  onSuccess?: (inquiryId: string) => void;
}

export default function InquiryForm({ selectedPackage, onClose, onSuccess }: InquiryFormProps) {
  const [showPaymentOption, setShowPaymentOption] = useState(false);
  const [inquiryId, setInquiryId] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const packages = [
    { id: "sunrise-special", name: "Sunrise Special - ₹800", price: 800 },
    { id: "family-adventure", name: "Family Adventure - ₹1200", price: 1200 },
    { id: "romantic-sunset", name: "Romantic Sunset - ₹1500", price: 1500 },
    { id: "full-day-explorer", name: "Full Day Explorer - ₹2500", price: 2500 },
    { id: "canal-boating", name: "Canal Boating - ₹600/hour", price: 600 },
    { id: "mini-houseboat", name: "Mini House Boat - ₹1200/day", price: 1200 },
    { id: "homestay-rooms", name: "Home Stay Rooms - ₹1800/night", price: 1800 },
    { id: "lake-foods", name: "Lake Foods - ₹600/meal", price: 600 }
  ];

  const timeSlots = [
    "6:00 AM - 8:00 AM",
    "8:00 AM - 10:00 AM", 
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM"
  ];

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      numberOfGuests: 1,
      selectedPackage: selectedPackage || "",
      preferredDate: "",
      preferredTime: "",
      specialRequests: "",
    },
  });

  // Auto-focus the first field for better user experience
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const firstInput = document.querySelector('[data-testid="input-full-name"]') as HTMLInputElement;
      if (firstInput) {
        firstInput.focus();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  const createInquiry = useMutation({
    mutationFn: async (data: InquiryFormData) => {
      const response = await apiRequest("POST", "/api/booking-inquiry", data);
      return await response.json();
    },
    onSuccess: (data: any) => {
      const newInquiryId = data.id || "temp-id";
      setInquiryId(newInquiryId);
      setShowPaymentOption(true);
      queryClient.invalidateQueries({ queryKey: ["/api/booking-inquiries"] });
      toast({
        title: "Inquiry Submitted Successfully!",
        description: "Thank you for your interest. You can now proceed with payment to confirm your booking.",
      });
      if (onSuccess) {
        onSuccess(newInquiryId);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InquiryFormData) => {
    createInquiry.mutate(data);
  };

  const handlePayment = () => {
    const selectedPkg = packages.find(pkg => pkg.id === form.getValues("selectedPackage"));
    const totalAmount = selectedPkg ? selectedPkg.price * form.getValues("numberOfGuests") : 0;
    
    // This will be replaced with PhonePe integration
    toast({
      title: "Payment Integration Coming Soon",
      description: `Total amount: ₹${totalAmount}. PhonePe payment gateway will be integrated soon.`,
    });
  };

  if (showPaymentOption) {
    const selectedPkg = packages.find(pkg => pkg.id === form.getValues("selectedPackage"));
    const totalAmount = selectedPkg ? selectedPkg.price * form.getValues("numberOfGuests") : 0;

    return (
      <Card className="w-full max-w-md mx-auto animate-fade-in-up">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif text-green-600">
            <i className="fas fa-check-circle mr-2"></i>
            Inquiry Submitted!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Your booking inquiry has been received. Complete your payment to confirm your reservation.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Booking Summary</h3>
              <p className="text-sm text-gray-600">Package: {selectedPkg?.name}</p>
              <p className="text-sm text-gray-600">Guests: {form.getValues("numberOfGuests")}</p>
              <p className="text-sm text-gray-600">Date: {form.getValues("preferredDate")}</p>
              <p className="text-sm text-gray-600">Time: {form.getValues("preferredTime")}</p>
              <div className="border-t pt-2 mt-2">
                <p className="font-bold text-lg text-green-600">
                  Total: ₹{totalAmount}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Button 
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              data-testid="button-proceed-payment"
            >
              <i className="fas fa-credit-card mr-2"></i>
              Proceed to Payment
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setShowPaymentOption(false)}
              className="w-full"
              data-testid="button-modify-booking"
            >
              <i className="fas fa-edit mr-2"></i>
              Modify Booking
            </Button>
            
            {onClose && (
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="w-full"
                data-testid="button-close-form"
              >
                Close
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in-up shadow-xl border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
        <CardTitle className="text-2xl font-serif text-center text-blue-600">
          <i className="fas fa-ship mr-2"></i>
          <h2 className="text-3xl font-bold">Book Your Journey</h2>
        </CardTitle>
        <p className="text-center text-gray-600">
          Fill in your details to make a booking inquiry
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field} 
                        data-testid="input-full-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your phone number" 
                        {...field} 
                        data-testid="input-phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="Enter your email address" 
                      {...field} 
                      data-testid="input-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="selectedPackage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Package *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-package">
                          <SelectValue placeholder="Choose a package" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id}>
                            {pkg.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfGuests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        min="1"
                        max="20"
                        placeholder="Number of guests" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        data-testid="input-guests"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Date *</FormLabel>
                    <FormControl>
                      <Input 
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        {...field} 
                        data-testid="input-date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-time">
                          <SelectValue placeholder="Choose time slot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any special requirements or requests..."
                      rows={3}
                      {...field} 
                      data-testid="input-special-requests"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={createInquiry.isPending}
                data-testid="button-submit-inquiry"
              >
                {createInquiry.isPending ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Submit Inquiry
                  </>
                )}
              </Button>
              
              {onClose && (
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={onClose}
                  className="sm:w-auto"
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}