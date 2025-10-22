import { pgTable, serial, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Booking Inquiries Table
export const bookingInquiries = pgTable("booking_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  checkInDate: text("check_in_date"),
  checkOutDate: text("check_out_date"),
  numberOfGuests: text("number_of_guests"),
  packageType: text("package_type"),
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Contact Messages Table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Content Management Tables
export const heroContent = pgTable("hero_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description"),
  backgroundImage: text("background_image"),
  primaryButtonText: text("primary_button_text"),
  secondaryButtonText: text("secondary_button_text"),
  scrollHintText: text("scroll_hint_text"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const aboutContent = pgTable("about_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  highlights: jsonb("highlights").$type<string[]>(),
  image: text("image"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  category: text("category"),
  isActive: boolean("is_active").default(true),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Boating Packages Table
export const boatingPackages = pgTable("boating_packages", {
  id: serial("id").primaryKey(),
  packageId: text("package_id").notNull(),
  title: text("title").notNull(),
  duration: text("duration"),
  price: text("price").notNull(),
  originalPrice: text("original_price"),
  description: text("description").notNull(),
  features: jsonb("features").$type<string[]>(),
  image: text("image").notNull(),
  isPopular: boolean("is_popular").default(false),
  whatsappLink: text("whatsapp_link"),
  sortOrder: serial("sort_order"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Testimonials Table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  platform: text("platform").notNull(),
  rating: serial("rating").notNull(),
  review: text("review").notNull(),
  reviewDate: text("review_date"),
  isActive: boolean("is_active").default(true),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Content Sections Table
export const contentSections = pgTable("content_sections", {
  id: serial("id").primaryKey(),
  sectionKey: text("section_key").notNull(),
  title: text("title").notNull(),
  content: text("content"),
  imageUrl: text("image_url"),
  metadata: jsonb("metadata"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Zod Schemas for validation
export const insertBookingInquirySchema = createInsertSchema(bookingInquiries);
export const selectBookingInquirySchema = createSelectSchema(bookingInquiries);
export const insertContactMessageSchema = createInsertSchema(contactMessages);
export const selectContactMessageSchema = createSelectSchema(contactMessages);
export const insertHeroContentSchema = createInsertSchema(heroContent);
export const selectHeroContentSchema = createSelectSchema(heroContent);
export const insertAboutContentSchema = createInsertSchema(aboutContent);
export const selectAboutContentSchema = createSelectSchema(aboutContent);
export const insertGalleryImageSchema = createInsertSchema(galleryImages);
export const selectGalleryImageSchema = createSelectSchema(galleryImages);
export const insertBoatingPackageSchema = createInsertSchema(boatingPackages);
export const selectBoatingPackageSchema = createSelectSchema(boatingPackages);
export const insertTestimonialSchema = createInsertSchema(testimonials);
export const selectTestimonialSchema = createSelectSchema(testimonials);
export const insertContentSectionSchema = createInsertSchema(contentSections);
export const selectContentSectionSchema = createSelectSchema(contentSections);

// Type exports
export type BookingInquiry = typeof bookingInquiries.$inferSelect;
export type InsertBookingInquiry = typeof bookingInquiries.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;
export type HeroContent = typeof heroContent.$inferSelect;
export type InsertHeroContent = typeof heroContent.$inferInsert;
export type AboutContent = typeof aboutContent.$inferSelect;
export type InsertAboutContent = typeof aboutContent.$inferInsert;
export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = typeof galleryImages.$inferInsert;
export type BoatingPackage = typeof boatingPackages.$inferSelect;
export type InsertBoatingPackage = typeof boatingPackages.$inferInsert;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;
export type ContentSection = typeof contentSections.$inferSelect;
export type InsertContentSection = typeof contentSections.$inferInsert;