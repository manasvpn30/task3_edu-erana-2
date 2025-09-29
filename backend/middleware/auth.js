import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

export const requireAdmin = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (apiKey === process.env.ADMIN_API_KEY) {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};