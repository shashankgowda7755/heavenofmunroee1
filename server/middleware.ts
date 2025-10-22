import { Request, Response, NextFunction } from 'express';

// Simple admin authentication middleware
export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const adminToken = process.env.ADMIN_TOKEN;
  
  // If no admin token is set in environment, allow access (for development)
  if (!adminToken) {
    console.warn('Warning: ADMIN_TOKEN not set. Admin endpoints are unprotected.');
    return next();
  }

  // Check for authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      message: 'Admin access required. Please provide valid authorization.' 
    });
  }

  // Extract and verify token
  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  if (token !== adminToken) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid admin token.' 
    });
  }

  // Token is valid, allow access
  next();
}