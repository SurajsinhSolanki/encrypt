// script.js

// Convert a string to an ArrayBuffer
function strToArrayBuffer(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}

// Convert an ArrayBuffer to a Base64 string
function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
    return btoa(binary);
}

// Convert a Base64 string to an ArrayBuffer
function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

// AES-GCM Encryption
async function aesGcmEncrypt(text, key) {
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector for AES-GCM
    const encodedKey = await crypto.subtle.importKey(
        'raw',
        strToArrayBuffer(key.padEnd(32, '0').slice(0, 32)), // Pad and slice key to 256 bits
        { name: 'AES-GCM' },
        false,
        ['encrypt']
    );
    const encrypted = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv,
        },
        encodedKey,
        strToArrayBuffer(text)
    );
    return `${arrayBufferToBase64(iv)}:${arrayBufferToBase64(encrypted)}`;
}

// AES-GCM Decryption
async function aesGcmDecrypt(encryptedData, key) {
    const [ivBase64, encryptedBase64] = encryptedData.split(':');
    const iv = base64ToArrayBuffer(ivBase64);
    const encrypted = base64ToArrayBuffer(encryptedBase64);

    const encodedKey = await crypto.subtle.importKey(
        'raw',
        strToArrayBuffer(key.padEnd(32, '0').slice(0, 32)), // Pad and slice key to 256 bits
        { name: 'AES-GCM' },
        false,
        ['decrypt']
    );

    const decrypted = await crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv,
        },
        encodedKey,
        encrypted
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
}

async function encryptText() {
    const textToEncrypt = document.getElementById('textToEncrypt').value;
    const encryptionKey = document.getElementById('encryptionKey').value;

    if (encryptionKey.length < 8) {
        alert('Encryption key must be at least 8 characters.');
        return;
    }

    try {
        const encryptedText = await aesGcmEncrypt(textToEncrypt, encryptionKey);
        document.getElementById('encryptedText').value = encryptedText;
    } catch (error) {
        alert('Encryption failed.');
    }
}

async function decryptText() {
    const textToDecrypt = document.getElementById('textToDecrypt').value;
    const decryptionKey = document.getElementById('decryptionKey').value;

    if (decryptionKey.length < 8) {
        alert('Decryption key must be at least 8 characters.');
        return;
    }

    try {
        const decryptedText = await aesGcmDecrypt(textToDecrypt, decryptionKey);
        document.getElementById('decryptedText').value = decryptedText;
    } catch (error) {
        alert('Invalid encrypted text or key.');
        document.getElementById('decryptedText').value = '';
    }
}
