# Heaven of Munroe - Tourism Website

## Overview

Heaven of Munroe is a tourism website for a kayaking and homestay service located on Munroe Island, Kerala. The platform focuses on promoting authentic backwater experiences including kayaking adventures, traditional homestay accommodations, canal boating, houseboat rides, and local cuisine. The website is designed to be conversion-focused and SEO-optimized to attract both domestic and international tourists.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **UI Components**: Radix UI primitives for accessible component foundation

### Backend Architecture
- **Server**: Express.js with TypeScript for API endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema Validation**: Zod schemas shared between frontend and backend
- **Storage**: PostgreSQL database with Drizzle migrations
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Data Storage Solutions
- **Primary Database**: PostgreSQL (Neon Database serverless)
- **Database Configuration**: Neon Database serverless for production deployment
- **Schema Management**: Drizzle migrations with schema definition in shared directory
- **Data Models**: Booking inquiries and contact messages with proper validation

### Authentication and Authorization
- **Session-based**: Express sessions with PostgreSQL store
- **No user authentication**: Public-facing tourism website with inquiry forms only
- **Rate Limiting**: Not implemented but can be added for form submissions

### API Design
- **RESTful Endpoints**: 
  - POST `/api/booking-inquiry` for tourism booking requests
  - POST `/api/contact-message` for general contact forms
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Validation**: Server-side validation using Zod schemas
- **Response Format**: Consistent JSON responses with success/error indicators

### SEO and Performance Optimizations
- **Meta Tags**: Comprehensive SEO meta tags focused on Munroe Island keywords
- **Font Optimization**: Google Fonts with preconnect for performance
- **Image Optimization**: Unsplash images with responsive sizing and alt text
- **Code Splitting**: Vite's automatic code splitting for optimal loading

## External Dependencies

### Core Technologies
- **React 18**: Frontend framework with TypeScript support
- **Express.js**: Backend server framework
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL support
- **Neon Database**: Serverless PostgreSQL database provider

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library for consistent iconography

### Form and Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for type safety
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the application
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer

### Third-party Services
- **SendGrid**: Email service for contact form notifications (configured but not implemented)
- **WhatsApp Business API**: Direct booking integration via WhatsApp links
- **Google Maps**: Location services for directions and mapping
- **Font Awesome**: Icon library for UI elements

### Deployment and Hosting
- **Replit**: Development and hosting platform
- **Node.js**: Runtime environment for server-side execution
- **Environment Variables**: Configuration management for database and API keys