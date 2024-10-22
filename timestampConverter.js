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

// Convert timestamp to date
function convertTimestampToDate() {
    const timestampInput = document
        .getElementById('timestampInput')
        .value.trim();
    const dateOutput = document.getElementById('dateOutput');

    let timestamp = parseInt(timestampInput, 10);

    if (timestamp.toString().length === 10) {
        timestamp *= 1000; // Convert seconds to milliseconds
    }

    if (isNaN(timestamp)) {
        dateOutput.value = 'Invalid timestamp format.';
        return;
    }

    const date = new Date(timestamp);
    const utcString = date.toUTCString();
    const localString = date.toLocaleString();

    dateOutput.value = `UTC: ${utcString}\nLocal: ${localString}`;
}

// Convert date and time to timestamp
function convertDateToTimestamp() {
    const year = parseInt(document.getElementById('yearInput').value || 1970);
    const month =
        parseInt(document.getElementById('monthInput').value || 1) - 1; // Months are zero-indexed
    const day = parseInt(document.getElementById('dayInput').value || 1);
    const hour = parseInt(document.getElementById('hourInput').value || 0);
    const minute = parseInt(document.getElementById('minuteInput').value || 0);
    const second = parseInt(document.getElementById('secondInput').value || 0);

    if (
        isNaN(year) ||
        isNaN(month) ||
        isNaN(day) ||
        isNaN(hour) ||
        isNaN(minute) ||
        isNaN(second)
    ) {
        document.getElementById('timestampOutput').value =
            'Invalid date format.';
        return;
    }

    console.log(year, month, day, hour, minute, second);

    const date = new Date(Date.UTC(year, month, day, hour, minute, second));

    const timestamp = date.getTime();
    document.getElementById(
        'timestampOutput'
    ).value = `Timestamp: ${timestamp}`;
}

// Copy the date output
function copyDateOutput() {
    const dateOutput = document.getElementById('dateOutput');
    navigator.clipboard.writeText(dateOutput.value).then(() => {
        alert('Date output copied to clipboard!');
    });
}

// Copy the timestamp output
function copyTimestampOutput() {
    const timestampOutput = document.getElementById('timestampOutput');
    navigator.clipboard.writeText(timestampOutput.value).then(() => {
        alert('Timestamp copied to clipboard!');
    });
}
