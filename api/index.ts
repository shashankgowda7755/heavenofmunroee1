import express, { type Request, Response, NextFunction } from "express";

// Import routes for Vercel serverless deployment  
let registerRoutes: any;

try {
  // Try to import from server directory
  const routesModule = require("../server/routes");
  registerRoutes = routesModule.registerRoutes;
} catch (error) {
  console.log("Failed to import server routes:", error);
  // Fallback route registration for Vercel
  registerRoutes = (app: express.Express) => {
    app.get("/api/health", (req, res) => {
      res.json({ status: "ok", message: "API is running" });
    });
    
    app.all("/api/*", (req, res) => {
      res.status(503).json({ 
        message: "Service temporarily unavailable - routes not loaded properly" 
      });
    });
  };
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// Initialize routes
registerRoutes(app);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Export handler for Vercel
export default app;
