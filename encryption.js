async function aesGcmEncrypt(text, key) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encodedKey = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(key.padEnd(32, '0').slice(0, 32)),
        { name: 'AES-GCM' },
        false,
        ['encrypt']
    );
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        encodedKey,
        new TextEncoder().encode(text)
    );
    return `${btoa(String.fromCharCode(...iv))}:${btoa(
        String.fromCharCode(...new Uint8Array(encrypted))
    )}`;
}

async function aesGcmDecrypt(encryptedData, key) {
    const [ivStr, encryptedStr] = encryptedData.split(':');
    const iv = Uint8Array.from(atob(ivStr), (c) => c.charCodeAt(0));
    const encrypted = Uint8Array.from(atob(encryptedStr), (c) =>
        c.charCodeAt(0)
    );
    const encodedKey = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(key.padEnd(32, '0').slice(0, 32)),
        { name: 'AES-GCM' },
        false,
        ['decrypt']
    );
    const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        encodedKey,
        encrypted
    );
    return new TextDecoder().decode(decrypted);
}

async function encryptText() {
    const text = document.getElementById('textToEncrypt').value;
    const key = document.getElementById('encryptionKey').value;
    document.getElementById('encryptedText').value = await aesGcmEncrypt(
        text,
        key
    );
}

async function decryptText() {
    const text = document.getElementById('textToDecrypt').value;
    const key = document.getElementById('decryptionKey').value;
    document.getElementById('decryptedText').value = await aesGcmDecrypt(
        text,
        key
    );
}

// Copy functions for Encrypted and Decrypted text
function copyEncryptedText() {
    const encryptedText = document.getElementById('encryptedText');
    encryptedText.select();
    encryptedText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    alert('Encrypted text copied to clipboard!');
}

function copyDecryptedText() {
    const decryptedText = document.getElementById('decryptedText');
    decryptedText.select();
    decryptedText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    alert('Decrypted text copied to clipboard!');
}
