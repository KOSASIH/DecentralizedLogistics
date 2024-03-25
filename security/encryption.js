const crypto = require('crypto');

// Encrypt a string
function encrypt(text) {
  const algorithm = 'aes-256-ctr';
  const password = 'my secret password';
  const cipher = crypto.createCipher(algorithm, password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

// Decrypt a string
function decrypt(text) {
  const algorithm = 'aes-256-ctr';
  const password = 'my secret password';
  const decipher = crypto.createDecipher(algorithm, password);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

// Example usage
const encryptedText = encrypt('Hello, world!');
console.log('Encrypted text:', encryptedText);

const decryptedText = decrypt(encryptedText);
console.log('Decrypted text:', decryptedText);

console.log('Are encrypted and decrypted texts equal?', encryptedText === decryptedText);
