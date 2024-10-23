// Function to switch tabs
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach((content) => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach((btn) => {
        btn.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    document
        .querySelector(`[onclick="showTab('${tabId}')"]`)
        .classList.add('active');
}

// Function to generate a hash
async function generateHash() {
    const textToHash = document.getElementById('textToHash').value;
    const algorithm = document.getElementById('algorithmSelect').value;
    const encoding = document.getElementById('encodingSelect').value;

    if (textToHash) {
        const encoder = new TextEncoder();
        const data = encoder.encode(textToHash);

        let hashBuffer;
        if (algorithm.startsWith('SHA')) {
            hashBuffer = await crypto.subtle.digest(algorithm, data);
        } else if (algorithm === 'MD5') {
            hashBuffer = md5(textToHash); // For simplicity, using an MD5 function
        }

        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashOutput =
            encoding === 'hex'
                ? hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
                : btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));

        document.getElementById('hashOutput').value = hashOutput;
    } else {
        alert('Please enter some text to hash.');
    }
}

// Function to copy hash output
function copyHash() {
    const hashOutput = document.getElementById('hashOutput').value;
    if (hashOutput) {
        navigator.clipboard.writeText(hashOutput).then(() => {
            alert('Hash copied to clipboard!');
        });
    } else {
        alert('No hash to copy!');
    }
}

// Function to compare hashes
async function compareHash() {
    const textToCompare = document.getElementById('textToCompare').value;
    const algorithm = document.getElementById('compareHashAlgorithm').value;
    const encoding = document.getElementById('compareEncoding').value;
    const hashToCompare = document.getElementById('hashToCompare').value;

    if (textToCompare && hashToCompare) {
        const encoder = new TextEncoder();
        const data = encoder.encode(textToCompare);

        let hashBuffer;
        if (algorithm.startsWith('SHA')) {
            hashBuffer = await crypto.subtle.digest(algorithm, data);
        } else if (algorithm === 'MD5') {
            hashBuffer = md5(textToCompare); // For simplicity, using an MD5 function
        }

        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const generatedHash =
            encoding === 'hex'
                ? hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
                : btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));

        const result = generatedHash === hashToCompare ? 'Match' : 'No Match';
        document.getElementById('comparisonResult').value = result;
    } else {
        alert('Please provide both text and hash for comparison.');
    }
}

// Simple MD5 hash function (for demonstration purposes)
function md5(string) {
    // Implementation of MD5 is omitted here for brevity, use an MD5 library if needed.
    return new TextEncoder().encode(string); // Simulating MD5 output
}
