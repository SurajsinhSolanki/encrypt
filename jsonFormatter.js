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

// Function to format JSON
function formatJson() {
    const jsonInput = document.getElementById('jsonInput').value;
    try {
        const formattedJson = JSON.stringify(JSON.parse(jsonInput), null, 4);
        document.getElementById('formattedOutput').value = formattedJson;
    } catch (error) {
        alert('Invalid JSON format.');
    }
}

// Function to copy formatted JSON to clipboard
function copyFormattedJson() {
    const formattedJson = document.getElementById('formattedOutput').value;
    if (formattedJson) {
        navigator.clipboard.writeText(formattedJson).then(() => {
            alert('Formatted JSON copied to clipboard!');
        });
    } else {
        alert('No formatted JSON to copy!');
    }
}

// Function to minify JSON
function minifyJson() {
    const jsonToMinify = document.getElementById('jsonToMinify').value;
    try {
        const minifiedJson = JSON.stringify(JSON.parse(jsonToMinify));
        document.getElementById('minifiedOutput').value = minifiedJson;
    } catch (error) {
        alert('Invalid JSON format.');
    }
}

// Function to copy minified JSON to clipboard
function copyMinifiedJson() {
    const minifiedJson = document.getElementById('minifiedOutput').value;
    if (minifiedJson) {
        navigator.clipboard.writeText(minifiedJson).then(() => {
            alert('Minified JSON copied to clipboard!');
        });
    } else {
        alert('No minified JSON to copy!');
    }
}
