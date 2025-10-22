import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes";
import "./config"; // Import config to load environment variables

// Fix for import.meta.dirname compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Production configuration validation
if (process.env.NODE_ENV === 'production') {
  const requiredConfig = [];
  
  if (!process.env.ADMIN_TOKEN) {
    requiredConfig.push('ADMIN_TOKEN is required in production to secure admin endpoints');
  }
  
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
    requiredConfig.push('SENDGRID_API_KEY and SENDGRID_FROM_EMAIL are required in production for email notifications');
  }
  
  if (requiredConfig.length > 0) {
    console.error('❌ Production configuration errors:');
    requiredConfig.forEach(error => console.error(`  - ${error}`));
    console.error('Please set the required environment variables before deploying to production.');
    process.exit(1);
  }
}

const app = express();
const PORT = parseInt(process.env.PORT || "5000", 10);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS middleware for development
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

// Serve static files from the dist directory
const staticPath = path.resolve(__dirname, "../dist/public");
app.use(express.static(staticPath));

// Register API routes
registerRoutes(app);

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Global error:", err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ success: false, message });
});

// Start server
// Always start the server in development mode
if (true) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
    console.log(`📁 Static files served from: ${staticPath}`);
    console.log(`🏠 Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

export default app;