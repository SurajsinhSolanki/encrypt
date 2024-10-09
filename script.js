// script.js

// Simple XOR encryption/decryption for demonstration (not secure for real use cases)
function xorEncryptDecrypt(input, key) {
    let result = '';
    for (let i = 0; i < input.length; i++) {
        result += String.fromCharCode(
            input.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }
    return result;
}

function encryptText() {
    const textToEncrypt = document.getElementById('textToEncrypt').value;
    const encryptionKey = document.getElementById('encryptionKey').value;

    if (encryptionKey.length < 8) {
        alert('Encryption key must be at least 8 characters.');
        return;
    }

    const encryptedText = btoa(xorEncryptDecrypt(textToEncrypt, encryptionKey)); // Convert to Base64 for readability
    document.getElementById('encryptedText').value = encryptedText;
}

function decryptText() {
    const textToDecrypt = document.getElementById('textToDecrypt').value;
    const decryptionKey = document.getElementById('decryptionKey').value;

    if (decryptionKey.length < 8) {
        alert('Decryption key must be at least 8 characters.');
        return;
    }

    try {
        const decryptedText = xorEncryptDecrypt(
            atob(textToDecrypt),
            decryptionKey
        ); // Decode from Base64
        document.getElementById('decryptedText').value = decryptedText;
    } catch (error) {
        alert('Invalid encrypted text or key.');
        document.getElementById('decryptedText').value = '';
    }
}
