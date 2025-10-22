# 🚣‍♂️ Munroe Island Kayaking & Tourism Website

A modern, responsive Progressive Web App (PWA) for promoting authentic backwater experiences at Munroe Island, Kerala. Features kayaking adventures, traditional homestay accommodations, canal boating, houseboat rides, and local cuisine experiences.

![Munroe Island](client/public/images/backwater-boat-silhouette.jpg)

## ✨ Features

### 🌐 Progressive Web App (PWA)
- **Installable** on mobile and desktop devices
- **Offline functionality** with service worker
- **App-like experience** with automatic install prompts
- **Fast loading** with optimized caching strategies

### 🎨 Modern Design
- **Responsive design** optimized for all device sizes
- **Dark/Light mode** support with system preference detection
- **Smooth animations** and transitions
- **Accessibility-first** design with proper ARIA labels

### 🏞️ Content Management
- **Dynamic content** powered by NEON PostgreSQL database
- **Image gallery** showcasing 55+ local photos
- **Service packages** with detailed descriptions and pricing
- **Customer testimonials** and reviews
- **Interactive contact forms** with validation

### 📱 User Experience
- **WhatsApp integration** for direct booking inquiries
- **Real-time form validation** with user-friendly error messages
- **Fast navigation** with client-side routing
- **SEO optimized** for better search engine visibility

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd munroe-island-kayaking
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Required: Database connection
   DATABASE_URL=your_neon_database_url
   
   # Optional: Add SendGrid for email functionality
   SENDGRID_API_KEY=your_sendgrid_key
   FROM_EMAIL=your_email@domain.com
   ```

3. **Initialize the database:**
   ```bash
   npm run db:push
   tsx seed.ts
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Visit `http://localhost:5000`

## 🖼️ Customizing Images

All images are stored locally in `client/public/images/` for optimal performance. Here's how to customize key images:

### 🎯 Main Images to Change

| Image Purpose | Location | Current File | Description |
|---------------|----------|--------------|-------------|
| **Hero Background** | `seed.ts` → `heroContent.backgroundImage` | `/images/backwater-boat-silhouette.jpg` | Main header background |
| **Munroe Island Photo** | `seed.ts` → `munroe-island-main.imageUrl` | `/images/canal.jpg` | Primary island showcase |
| **About Host Photo** | `seed.ts` → `aboutContent.hostImage` | `/images/1 (15).jpg` | Host profile picture |

### 📁 Image Directory Structure
```
client/public/images/
├── backwater-boat-silhouette.jpg  # Hero background
├── canal.jpg                      # Main Munroe Island photo  
├── boathouse.jpg                  # Additional content
├── 1 (1).jpg through 1 (55).jpg  # Gallery and package photos
```

### 🔄 How to Change Images

1. **Replace files directly:**
   - Add your new images to `client/public/images/`
   - Keep the same filenames for automatic updates

2. **Update database records:**
   - Edit `seed.ts` to change image paths
   - Run `tsx seed.ts` to update the database
   - Or edit directly in the database interface

3. **Add new images:**
   - Place files in `client/public/images/`
   - Update the corresponding entries in `seed.ts`
   - Reference as `/images/your-image.jpg`

## 🗄️ Database Management

### NEON PostgreSQL Integration
- **Automatic connection** to NEON serverless database
- **Schema management** with Drizzle ORM
- **Type-safe operations** with full TypeScript support

### Managing Content

#### Through Database Interface
1. Access your NEON database dashboard
2. Edit tables directly: `hero_content`, `about_content`, `gallery_images`, etc.
3. Changes appear immediately in the app

#### Through Code
1. Edit `seed.ts` for default content
2. Run `tsx seed.ts` to update database
3. Use `npm run db:push` to sync schema changes

### Content Tables
- `hero_content` - Homepage hero section
- `about_content` - About page information
- `boating_packages` - Service packages and pricing
- `gallery_images` - Photo gallery with descriptions
- `testimonials` - Customer reviews
- `content_sections` - Flexible content blocks
- `booking_inquiries` - Customer inquiry forms

## 📱 PWA Installation

### Mobile Devices
1. Open the website in mobile browser
2. Look for "Add to Home Screen" prompt
3. Or tap browser menu → "Add to Home Screen"
4. App icon appears on home screen

### Desktop/PC
1. Visit the website in Chrome/Edge
2. Look for install icon in address bar
3. Click install button when prompted
4. App opens in standalone window

### Features When Installed
- ✅ App-like experience with native feel
- ✅ Offline browsing capability
- ✅ Push notifications ready (can be enabled)
- ✅ Faster loading with cached resources

## 🛠️ Development

### Project Structure
```
munroe-island-kayaking/
├── client/              # React frontend application
│   ├── src/            # Source code
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   └── lib/        # Utilities and configurations
│   └── public/         # Static assets
│       └── images/     # Local image storage
├── server/             # Express backend API
│   ├── routes.ts       # API endpoints
│   └── storage.ts      # Database interface
├── shared/             # Shared types and schemas
│   └── schema.ts       # Database schema definitions
└── seed.ts             # Database seeding script
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
tsx seed.ts          # Seed database with content
npm run db:push      # Sync database schema
npm run check        # Type checking
```

### Technology Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **Backend:** Express.js, Node.js
- **Database:** PostgreSQL (NEON), Drizzle ORM
- **UI Library:** shadcn/ui, Radix UI
- **Forms:** React Hook Form, Zod validation
- **Icons:** Lucide React
- **Deployment:** Vercel, Railway ready

## 🚀 Deployment

Ready-to-deploy configurations included for multiple platforms:

### Quick Deploy Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel login
npm run deploy:vercel
```

#### Railway
```bash
npm install -g @railway/cli
railway login
npm run deploy:railway
```

#### GitHub Actions
Push to GitHub with proper environment variables set up.

### Environment Setup
- Database connection automatically configured
- Environment variables managed securely
- Static assets optimized for production

**For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

## 📞 Support & Customization

### Common Customizations
1. **Change color scheme:** Edit `client/src/index.css`
2. **Update contact information:** Edit content in database or `seed.ts`
3. **Add new services:** Create entries in `boating_packages` table
4. **Modify layout:** Edit React components in `client/src/components/`

### Getting Help
- Check logs: `npm run dev` and check browser console
- Database issues: Verify NEON connection and schema
- Image problems: Ensure files are in `client/public/images/`
- PWA issues: Check service worker registration in DevTools

## 📄 License

This project is ready for commercial use. Customize and deploy for your tourism business.

---

**🌴 Ready to showcase the beauty of Munroe Island to the world! 🚣‍♂️**

*Built with modern web technologies for optimal performance and user experience.*