// Import libraries
const jwt = require('jsonwebtoken');

// Define secret key
const secretKey = 'my-secret-key';

// Function to generate a JWT
function issueJWT(user) {
  const payload = {
    sub: user.id,
    iat: Date.now(),
    exp: Date.now() + (60 * 60 * 24 * 7) // token expires in 7 days
  };
  const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });
  return token;
}

// Function to verify a JWT
function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
    return decoded;
  } catch (err) {
    return null;
  }
}

// Example usage
const user = {
  id: 123,
  username: 'johndoe'
};

// Generate a JWT
const token = issueJWT(user);
console.log('Generated token:', token);

// Verify the JWT
const decoded = verifyJWT(token);
console.log('Decoded token:', decoded);

console.log('Is token valid?', decoded !== null);
