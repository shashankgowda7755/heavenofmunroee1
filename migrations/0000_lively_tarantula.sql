CREATE TABLE "about_content" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text DEFAULT 'Meet Evan - Your Local Host' NOT NULL,
	"host_name" text DEFAULT 'Evan' NOT NULL,
	"host_image" text DEFAULT 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' NOT NULL,
	"intro_text" text DEFAULT 'Born and raised on the pristine waters of Munroe Island, Evan has spent over two decades mastering the art of backwater navigation and hospitality.' NOT NULL,
	"description_1" text DEFAULT 'His deep connection with the local ecosystem and authentic Kerala culture makes every journey a unique experience filled with stories, local wisdom, and genuine warmth.' NOT NULL,
	"description_2" text DEFAULT 'When you book with Heaven of Munroe, you''re not just getting a service - you''re becoming part of Evan''s extended family.' NOT NULL,
	"expanded_text_1" text DEFAULT 'Evan''s expertise extends beyond boating - he''s also a certified local guide, traditional chef, and cultural ambassador for Munroe Island. His multilingual abilities ensure comfortable communication with guests from around the world.',
	"expanded_text_2" text DEFAULT 'The business started as a family tradition, passed down through generations of fishermen and boat builders. Today, Evan combines this heritage with modern hospitality standards to create unforgettable experiences.',
	"languages" text DEFAULT 'English, Hindi, Malayalam' NOT NULL,
	"certifications" text DEFAULT 'First Aid Certified, Eco-Tourism Trained' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "boating_packages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"package_id" text NOT NULL,
	"title" text NOT NULL,
	"duration" text NOT NULL,
	"price" text NOT NULL,
	"original_price" text,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"features" text[] NOT NULL,
	"is_popular" boolean DEFAULT false NOT NULL,
	"whatsapp_link" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "boating_packages_package_id_unique" UNIQUE("package_id")
);
--> statement-breakpoint
CREATE TABLE "booking_inquiries" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"number_of_guests" integer NOT NULL,
	"check_in_date" text DEFAULT '',
	"check_out_date" text DEFAULT '',
	"experiences" text[] DEFAULT '{}',
	"special_requests" text DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_info" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"business_name" text DEFAULT 'Heaven of Munroe' NOT NULL,
	"phone" text DEFAULT '+91 96338 36839' NOT NULL,
	"email" text DEFAULT 'heavenofmunroe@gmail.com' NOT NULL,
	"address" text DEFAULT 'Munroe Island, Kollam District, Kerala, India' NOT NULL,
	"whatsapp_number" text DEFAULT '919633836839' NOT NULL,
	"facebook" text,
	"instagram" text,
	"google_maps" text,
	"description" text DEFAULT 'Get in touch with us for bookings, inquiries, or any questions about our services.' NOT NULL,
	"business_hours" text DEFAULT 'Available 24/7 for bookings and inquiries' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_sections" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"section_key" text NOT NULL,
	"title" text,
	"content" text NOT NULL,
	"image_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "content_sections_section_key_unique" UNIQUE("section_key")
);
--> statement-breakpoint
CREATE TABLE "gallery_images" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"image_url" text NOT NULL,
	"alt_text" text NOT NULL,
	"category" text DEFAULT 'general',
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero_content" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text DEFAULT 'Heaven of Munroe' NOT NULL,
	"subtitle" text DEFAULT 'Room Stay & Food Boating Service' NOT NULL,
	"description" text DEFAULT 'Experience Authentic Kerala Backwaters' NOT NULL,
	"background_image" text DEFAULT 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' NOT NULL,
	"primary_button_text" text DEFAULT 'Discover Paradise' NOT NULL,
	"secondary_button_text" text DEFAULT 'Book Your Journey' NOT NULL,
	"scroll_hint_text" text DEFAULT '✨ Scroll down to explore our services' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"platform" text NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"review" text NOT NULL,
	"user_image" text NOT NULL,
	"review_date" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
