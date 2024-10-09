const express = require('express');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensures Express knows where to look for views

// Function to hash and truncate key
function hashKey(key) {
    return crypto
        .createHash('sha256')
        .update(key)
        .digest('hex')
        .substring(0, 16); // 16-byte key for AES-128
}

function encrypt(text, key) {
    const iv = crypto.randomBytes(16); // Initialization vector
    const hashedKey = hashKey(key); // Hash and truncate the key
    const cipher = crypto.createCipheriv(
        'aes-128-cbc',
        Buffer.from(hashedKey),
        iv
    );
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted; // Return iv with encrypted text
}

function decrypt(text, key) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = textParts.join(':');
    const hashedKey = hashKey(key); // Hash and truncate the key
    const decipher = crypto.createDecipheriv(
        'aes-128-cbc',
        Buffer.from(hashedKey),
        iv
    );
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

app.get('/', (req, res) => {
    res.render('index', { encryptedText: '', decryptedText: '' });
});

app.post('/encrypt', (req, res) => {
    const { textToEncrypt, encryptionKey } = req.body;
    if (encryptionKey.length < 8) {
        res.render('index', {
            encryptedText: 'Error: Key must be at least 8 characters',
            decryptedText: '',
        });
        return;
    }
    const encrypted = encrypt(textToEncrypt, encryptionKey);
    res.render('index', { encryptedText: encrypted, decryptedText: '' });
});

app.post('/decrypt', (req, res) => {
    const { textToDecrypt, decryptionKey } = req.body;
    if (decryptionKey.length < 8) {
        res.render('index', {
            encryptedText: '',
            decryptedText: 'Error: Key must be at least 8 characters',
        });
        return;
    }
    try {
        const decrypted = decrypt(textToDecrypt, decryptionKey);
        res.render('index', { encryptedText: '', decryptedText: decrypted });
    } catch (error) {
        res.render('index', {
            encryptedText: '',
            decryptedText: 'Invalid encryption or key',
        });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
