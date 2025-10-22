import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Fetch testimonials from database
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: 1
  });

  const staticTestimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      platform: "Google Maps",
      rating: 5,
      review: "Absolutely magical experience! The sunrise boat tour was breathtaking. The traditional breakfast on the boat was delicious and the hospitality was exceptional. Highly recommended!",
      reviewDate: "2 weeks ago"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      platform: "TripAdvisor",
      rating: 5,
      review: "Best boating experience in Kerala! The family adventure package was perfect for our group. Kids loved the fishing experience and the traditional lunch was amazing.",
      reviewDate: "1 month ago"
    },
    {
      id: 3,
      name: "Emily Chen",
      platform: "Google Reviews",
      rating: 5,
      review: "The romantic sunset cruise exceeded all expectations! The candlelight dinner on the boat was incredibly romantic. Perfect for our anniversary celebration.",
      reviewDate: "3 weeks ago"
    },
    {
      id: 4,
      name: "David Wilson",
      platform: "TripAdvisor",
      rating: 5,
      review: "Authentic Kerala experience! The homestay was comfortable and the hosts were incredibly welcoming. The traditional food was the highlight of our trip.",
      reviewDate: "2 months ago"
    },
    {
      id: 5,
      name: "Priya Sharma",
      platform: "Google Maps",
      rating: 5,
      review: "Heaven of Munroe truly lives up to its name! The full-day explorer package was incredible. Every moment was well-planned and the guides were knowledgeable.",
      reviewDate: "1 week ago"
    },
    {
      id: 6,
      name: "Michael Brown",
      platform: "TripAdvisor",
      rating: 5,
      review: "Outstanding service and unforgettable memories! The canal boating through the backwaters was peaceful and rejuvenating. Will definitely return!",
      reviewDate: "3 weeks ago"
    }
  ];

  // Combine database testimonials with static testimonials as fallback
  const testimonialsData = testimonials && testimonials.length > 0 ? testimonials : staticTestimonials;

  useEffect(() => {
    if (testimonialsData.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonialsData.length]);

  const handleTestimonialChange = (index: number) => {
    setCurrentTestimonial(index);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'google maps':
      case 'google reviews':
        return 'fab fa-google';
      case 'tripadvisor':
        return 'fab fa-tripadvisor';
      default:
        return 'fas fa-star';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'google maps':
      case 'google reviews':
        return 'text-red-500';
      case 'tripadvisor':
        return 'text-green-600';
      default:
        return 'text-yellow-500';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-white/70 backdrop-blur-sm relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
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

  // Empty state
  if (testimonialsData.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-slate-50 via-blue-50 to-green-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold gradient-shift mb-4">
              What Our Guests Say
            </h2>
            <p className="text-lg text-gray-600">No testimonials available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white/70 backdrop-blur-sm relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-400 rounded-full blur-3xl animate-float delay-500"></div>
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-orange-400 rounded-full blur-3xl animate-float delay-300"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="text-reveal mb-4">
            <h2 className="text-reveal-inner font-serif text-4xl md:text-5xl font-bold gradient-shift">
              What Our Guests Say
            </h2>
          </div>
          <div className="text-reveal">
            <p className="text-reveal-inner text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from travelers who discovered the magic of Munroe Island with us
            </p>
          </div>
          
          {/* Platform badges */}
          <div className="flex justify-center items-center space-x-6 mt-8 animate-scale-in delay-300">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg hover-bounce">
              <i className="fab fa-google text-red-500 text-lg"></i>
              <span className="text-sm font-medium text-gray-700">Google Reviews</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg hover-bounce delay-100">
              <i className="fab fa-tripadvisor text-green-600 text-lg"></i>
              <span className="text-sm font-medium text-gray-700">TripAdvisor</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg hover-bounce delay-200">
              <i className="fas fa-star text-yellow-500 text-lg"></i>
              <span className="text-sm font-medium text-gray-700">5.0 Rating</span>
            </div>
          </div>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 card-3d morphing-shadow water-ripple hover-lift transition-all duration-700 transform">
            <div className="text-center">
              {/* Star Rating */}
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(testimonialsData[currentTestimonial]?.rating || 5)].map((_, i) => (
                  <i 
                    key={i} 
                    className="fas fa-star text-yellow-400 text-xl animate-scale-in cursor-glow" 
                    style={{ animationDelay: `${i * 100}ms` }}
                  ></i>
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-8 animate-fade-in-up">
                "{testimonialsData[currentTestimonial]?.review || 'No testimonials available'}"
              </blockquote>

              {/* Reviewer Info */}
              <div className="text-center animate-slide-up">
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-blue-100 rounded-full p-2 mr-2">
                    <i className={`${getPlatformIcon(testimonialsData[currentTestimonial]?.platform || 'default')} ${getPlatformColor(testimonialsData[currentTestimonial]?.platform || 'default')} text-lg`}></i>
                  </div>
                </div>
                
                <div>
                  <p className="font-bold text-gray-800 text-lg">{testimonialsData[currentTestimonial]?.name || 'Anonymous'}</p>
                  <p className="text-gray-600 text-sm flex items-center justify-center space-x-2">
                    <span>via {testimonialsData[currentTestimonial]?.platform || 'Review Platform'}</span>
                    <span>•</span>
                    <span>{testimonialsData[currentTestimonial]?.reviewDate || 'Recently'}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center space-x-3 mb-8">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTestimonialChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 hover-bounce ${
                index === currentTestimonial 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              data-testid={`testimonial-dot-${index}`}
            />
          ))}
        </div>

        {/* Grid of All Testimonials (smaller cards) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-stagger">
          {testimonialsData.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover-lift cursor-pointer water-ripple morphing-shadow hover:scale-105 ${
                index === currentTestimonial ? 'ring-2 ring-blue-400 scale-105' : ''
              }`}
              onClick={() => handleTestimonialChange(index)}
              data-testid={`testimonial-card-${testimonial.id}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <div className="flex items-center space-x-1">
                    <i className={`${getPlatformIcon(testimonial.platform)} ${getPlatformColor(testimonial.platform)} text-sm`}></i>
                    <span className="text-xs text-gray-600">{testimonial.platform}</span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400 text-xs"></i>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                "{testimonial.review}"
              </p>
              
              <p className="text-xs text-gray-500 mt-3">{testimonial.reviewDate}</p>
            </div>
          ))}
        </div>

        {/* Add Your Review CTA */}
        <div className="text-center mt-16 animate-fade-in-up delay-500">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl max-w-2xl mx-auto water-ripple">
            <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4">
              Share Your Experience
            </h3>
            <p className="text-gray-600 mb-6">
              Had an amazing time with us? We'd love to hear about your experience!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open("https://www.google.com/maps/dir/?api=1&destination=8.988001654095571,76.61763934803777", '_blank')}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover-glow"
                data-testid="button-google-review"
              >
                <i className="fab fa-google mr-2"></i>
                Review on Google
              </button>
              <button 
                onClick={() => window.open("https://tripadvisor.com", '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover-glow"
                data-testid="button-tripadvisor-review"
              >
                <i className="fab fa-tripadvisor mr-2"></i>
                Review on TripAdvisor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}