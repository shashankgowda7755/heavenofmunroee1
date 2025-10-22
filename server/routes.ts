import express, { type Request, Response } from "express";
import { eq, and } from "drizzle-orm";
import { db } from "./db";
import {
  bookingInquiries,
  contactMessages,
  heroContent,
  aboutContent,
  galleryImages,
  boatingPackages,
  testimonials,
  contentSections,
  insertBookingInquirySchema,
  insertContactMessageSchema,
  insertHeroContentSchema,
  insertAboutContentSchema,
  insertGalleryImageSchema,
  insertBoatingPackageSchema,
  insertTestimonialSchema,
  insertContentSectionSchema,
} from "../shared/schema";
import { z } from "zod";
import { sendEmail, formatBookingNotification, formatContactNotification } from "./email";
import { adminAuth } from "./middleware";

export function registerRoutes(app: express.Express) {
  // Booking inquiry endpoint
  app.post("/api/booking-inquiry", async (req: Request, res: Response) => {
    try {
      const validatedData = insertBookingInquirySchema.parse(req.body);
      
      const result = await db
        .insert(bookingInquiries)
        .values({
          ...validatedData,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      // Send email notification if configured
      if (process.env.SENDGRID_FROM_EMAIL) {
        const emailContent = formatBookingNotification(validatedData);
        await sendEmail({
          to: process.env.SENDGRID_FROM_EMAIL,
          from: process.env.SENDGRID_FROM_EMAIL,
          subject: emailContent.subject,
          text: emailContent.text,
          html: emailContent.html
        });
      }

      res.json({ success: true, data: result[0] });
    } catch (error) {
      console.error("Booking inquiry error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit booking inquiry" 
        });
      }
    }
  });

  // Contact message endpoint
  app.post("/api/contact-message", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      const result = await db
        .insert(contactMessages)
        .values({
          ...validatedData,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      // Send email notification if configured
      if (process.env.SENDGRID_FROM_EMAIL) {
        const emailContent = formatContactNotification(validatedData);
        await sendEmail({
          to: process.env.SENDGRID_FROM_EMAIL,
          from: process.env.SENDGRID_FROM_EMAIL,
          subject: emailContent.subject,
          text: emailContent.text,
          html: emailContent.html
        });
      }

      res.json({ success: true, data: result[0] });
    } catch (error) {
      console.error("Contact message error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact message" 
        });
      }
    }
  });

  // Get hero content (frontend expects /api/hero-content)
  app.get("/api/hero-content", async (req: Request, res: Response) => {
    try {
      const result = await db
        .select()
        .from(heroContent)
        .where(eq(heroContent.isActive, true))
        .limit(1);

      res.json(result[0] || null);
    } catch (error) {
      console.error("Hero content error:", error);
      // Return null to let frontend use static fallback data
      res.json(null);
    }
  });

  // Get about content (frontend expects /api/about-content)
  app.get("/api/about-content", async (req: Request, res: Response) => {
    try {
      const result = await db
        .select()
        .from(aboutContent)
        .where(eq(aboutContent.isActive, true))
        .limit(1);

      res.json(result[0] || null);
    } catch (error) {
      console.error("About content error:", error);
      // Return null to let frontend use static fallback data
      res.json(null);
    }
  });

  // Get gallery images (frontend expects /api/gallery-images)
  app.get("/api/gallery-images", async (req: Request, res: Response) => {
    try {
      const result = await db
        .select()
        .from(galleryImages)
        .where(eq(galleryImages.isActive, true))
        .orderBy(galleryImages.sortOrder);

      res.json(result);
    } catch (error) {
      console.error("Gallery images error:", error);
      // Return empty array to let frontend use static fallback data
      res.json([]);
    }
  });

  // Get boating packages (new endpoint)
  app.get("/api/boating-packages", async (req: Request, res: Response) => {
    try {
      const result = await db
        .select()
        .from(boatingPackages)
        .where(eq(boatingPackages.isActive, true))
        .orderBy(boatingPackages.sortOrder);

      res.json(result);
    } catch (error) {
      console.error("Boating packages error:", error);
      // Return empty array to let frontend use static fallback data
      res.json([]);
    }
  });

  // Get testimonials (new endpoint)
  app.get("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const result = await db
        .select()
        .from(testimonials)
        .where(eq(testimonials.isActive, true))
        .orderBy(testimonials.sortOrder);

      res.json(result);
    } catch (error) {
      console.error("Testimonials error:", error);
      // Return empty array to let frontend use static fallback data
      res.json([]);
    }
  });

  // Get content sections (new endpoint)
  app.get("/api/content-sections/:sectionKey", async (req: Request, res: Response) => {
    try {
      const { sectionKey } = req.params;
      const result = await db
        .select()
        .from(contentSections)
        .where(and(eq(contentSections.sectionKey, sectionKey), eq(contentSections.isActive, true)))
        .limit(1);

      res.json(result[0] || null);
    } catch (error) {
      console.error("Content sections error:", error);
      // Return null to let frontend use static fallback data
      res.json(null);
    }
  });

  // Admin endpoints for content management
  app.post("/api/admin/hero", adminAuth, async (req: Request, res: Response) => {
    try {
      const validatedData = insertHeroContentSchema.parse(req.body);
      
      // Deactivate existing hero content
      await db
        .update(heroContent)
        .set({ isActive: false })
        .where(eq(heroContent.isActive, true));

      const result = await db
        .insert(heroContent)
        .values({
          ...validatedData,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      res.json({ success: true, data: result[0] });
    } catch (error) {
      console.error("Admin hero content error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to update hero content" 
        });
      }
    }
  });

  app.post("/api/admin/gallery", adminAuth, async (req: Request, res: Response) => {
    try {
      const validatedData = insertGalleryImageSchema.parse(req.body);
      
      const result = await db
        .insert(galleryImages)
        .values({
          ...validatedData,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      res.json({ success: true, data: result[0] });
    } catch (error) {
      console.error("Admin gallery error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to add gallery image" 
        });
      }
    }
  });

  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ success: true, message: "API is running" });
  });

  // Catch-all for client-side routing - serve index.html for non-API routes
  app.get("*", (req: Request, res: Response) => {
    // Only serve static files for non-API routes
    if (!req.path.startsWith("/api")) {
      res.sendFile("index.html", { root: "dist/public" });
    } else {
      res.status(404).json({ success: false, message: "API endpoint not found" });
    }
  });
}