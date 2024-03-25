// Import libraries
const jwt = require('jsonwebtoken');

// Define secret key
const secretKey = 'my-secret-key';

// Function to extract token from header
function extractTokenFromHeader(req) {
  if (req.headers && req.headers.authorization) {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader.startsWith('Bearer ')) {
      return authorizationHeader.substring(7);
    }
  }
  return null;
}

// Function to check if a user has access to a resource
function checkResourceAccess(req, allowedRoles) {
  const token = extractTokenFromHeader(req);
  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
    const userRole = decoded.role;
    return allowedRoles.includes(userRole);
  } catch (err) {
    return false;
  }
}

// Example usage
const allowedRoles = ['admin', 'moderator'];

// Generate a JWT with a role
const user = {
  id: 123,
  username: 'johndoe',
  role: 'moderator'
};
const token = issueJWT(user);

// Set the token in the request header
const req = {
  headers: {
    authorization: `Bearer ${token}`
  }
};

// Check if the user has access to a resource
const hasAccess = checkResourceAccess(req, allowedRoles);
console.log('Has access:', hasAccess);
