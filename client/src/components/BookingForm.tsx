import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertBookingInquirySchema, type InsertBookingInquiry } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function BookingForm() {
  const { toast } = useToast();
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);

  const form = useForm<InsertBookingInquiry>({
    resolver: zodResolver(insertBookingInquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      numberOfGuests: 1,
      checkInDate: "",
      checkOutDate: "",
      experiences: [],
      specialRequests: "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBookingInquiry) => {
      const response = await apiRequest("POST", "/api/booking-inquiry", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Booking Inquiry Sent!",
        description: data.message,
      });
      form.reset();
      setSelectedExperiences([]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send booking inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBookingInquiry) => {
    bookingMutation.mutate({
      ...data,
      experiences: selectedExperiences,
    });
  };

  const handleExperienceChange = (experience: string, checked: boolean) => {
    if (checked) {
      setSelectedExperiences([...selectedExperiences, experience]);
    } else {
      setSelectedExperiences(selectedExperiences.filter(exp => exp !== experience));
    }
  };

  const experiences = [
    { id: "kayaking", label: "Kayaking" },
    { id: "homestay", label: "Homestay" },
    { id: "houseboat", label: "Houseboat" },
    { id: "canal-tours", label: "Canal Tours" }
  ];

  return (
    <section id="booking" className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Plan Your Perfect Getaway
            </h3>
            <p className="text-xl text-primary-foreground/80">
              Let us create a personalized itinerary for your Munroe Island journey
            </p>
          </div>
          
          <div className="bg-card rounded-3xl p-8 shadow-2xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <i className="fas fa-user mr-2 text-primary"></i>
                        Full Name *
                      </FormLabel>
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <i className="fas fa-envelope mr-2 text-primary"></i>
                        Email Address *
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="your@email.com" 
                          {...field} 
                          data-testid="input-email"
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
                      <FormLabel className="flex items-center">
                        <i className="fas fa-phone mr-2 text-primary"></i>
                        Phone Number *
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="+91 98XXX XXXXX" 
                          {...field} 
                          data-testid="input-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numberOfGuests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <i className="fas fa-users mr-2 text-primary"></i>
                        Number of Guests
                      </FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(parseInt(value))} 
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-guests">
                            <SelectValue placeholder="Select number of guests" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3-4 Guests</SelectItem>
                          <SelectItem value="5">5+ Guests</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="checkInDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <i className="fas fa-calendar mr-2 text-primary"></i>
                        Check-in Date
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field}
                          value={field.value || ""}
                          data-testid="input-checkin-date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="checkOutDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <i className="fas fa-calendar-alt mr-2 text-primary"></i>
                        Check-out Date
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field}
                          value={field.value || ""}
                          data-testid="input-checkout-date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormLabel className="flex items-center mb-4">
                    <i className="fas fa-heart mr-2 text-primary"></i>
                    Preferred Experiences
                  </FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={exp.id}
                          checked={selectedExperiences.includes(exp.id)}
                          onCheckedChange={(checked) => handleExperienceChange(exp.id, checked as boolean)}
                          data-testid={`checkbox-${exp.id}`}
                        />
                        <label htmlFor={exp.id} className="text-sm font-medium">
                          {exp.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="flex items-center">
                        <i className="fas fa-comment mr-2 text-primary"></i>
                        Special Requests or Questions
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4} 
                          placeholder="Tell us about any special requirements, dietary preferences, or questions you have..."
                          {...field}
                          value={field.value || ""}
                          data-testid="textarea-special-requests"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground py-4 text-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
                    disabled={bookingMutation.isPending}
                    data-testid="button-submit-booking"
                  >
                    {bookingMutation.isPending ? (
                      <>
                        <i className="fas fa-spinner animate-spin mr-2"></i>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i>
                        Send Booking Inquiry
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    We'll respond within 2 hours during business hours
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
