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

// Function to encode text to Base64
function encodeText() {
    const textToEncode = document.getElementById('textToEncode').value;
    const encodedText = btoa(textToEncode); // Convert text to Base64
    document.getElementById('base64Output').value = encodedText;
}

// Function to copy encoded Base64 text to clipboard
function copyBase64Output() {
    const base64Output = document.getElementById('base64Output').value;
    if (base64Output) {
        navigator.clipboard.writeText(base64Output).then(() => {
            alert('Base64 text copied to clipboard!');
        });
    } else {
        alert('No Base64 text to copy!');
    }
}

// Function to decode Base64 to text
function decodeText() {
    const base64Input = document.getElementById('base64Input').value;
    try {
        const decodedText = atob(base64Input); // Convert Base64 to text
        document.getElementById('decodedText').value = decodedText;
    } catch (error) {
        alert('Invalid Base64 string.');
    }
}

// Function to copy decoded text to clipboard
function copyDecodedText() {
    const decodedText = document.getElementById('decodedText').value;
    if (decodedText) {
        navigator.clipboard.writeText(decodedText).then(() => {
            alert('Decoded text copied to clipboard!');
        });
    } else {
        alert('No decoded text to copy!');
    }
}

// Function to encode image to Base64
function encodeImageToBase64() {
    const file = document.getElementById('imageToEncode').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64String = e.target.result.split(',')[1];
            document.getElementById('imageBase64Output').value = base64String;
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file');
    }
}

// Function to copy image Base64 text to clipboard
function copyImageBase64Output() {
    const imageBase64Output =
        document.getElementById('imageBase64Output').value;
    if (imageBase64Output) {
        navigator.clipboard.writeText(imageBase64Output).then(() => {
            alert('Image Base64 copied to clipboard!');
        });
    } else {
        alert('No Base64 text to copy!');
    }
}

// Function to decode Base64 to image
function decodeBase64ToImage() {
    const base64ImageInput = document.getElementById('base64ImageInput').value;
    const img = document.getElementById('decodedImage');
    if (base64ImageInput) {
        img.src = `data:image/jpeg;base64,${base64ImageInput}`;
        img.style.display = 'block';
        document.getElementById('downloadButton').style.display = 'block';
    } else {
        alert('Please enter a Base64 string');
    }
}

// Function to download the decoded image
function downloadImage() {
    const img = document.getElementById('decodedImage');
    const link = document.createElement('a');
    link.href = img.src;
    link.download = 'decoded-image.jpg';
    link.click();
}
