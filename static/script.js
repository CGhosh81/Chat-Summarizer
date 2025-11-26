// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', function() {
    updateCharCount();
    updateOutputCharCount();
    checkModelStatus();
});

// ===== Model Status Management =====
function checkModelStatus() {
    fetch('/api/status')
        .then(response => response.json())
        .then(data => {
            updateStatusDisplay(data);
        })
        .catch(error => {
            console.error('Error checking model status:', error);
            document.getElementById('modelStatus').textContent = 'Error';
            document.getElementById('modelStatus').className = 'status-badge error';
        });
}

function updateStatusDisplay(data) {
    const modelStatus = document.getElementById('modelStatus');
    const deviceStatus = document.getElementById('deviceStatus');
    const summarizeBtn = document.getElementById('summarizeBtn');

    if (data.model_loaded) {
        modelStatus.textContent = '✓ Ready';
        modelStatus.className = 'status-badge ready';
        summarizeBtn.disabled = false;
    } else {
        modelStatus.textContent = '✗ Not Loaded';
        modelStatus.className = 'status-badge error';
        summarizeBtn.disabled = true;
        
        if (data.error) {
            showError(`Model Error: ${data.error}`);
        }
    }

    // Update device status
    const deviceText = data.device === 'cuda' ? '🚀 GPU (CUDA)' : '💻 CPU';
    deviceStatus.textContent = deviceText;
    deviceStatus.className = 'status-badge ' + (data.device === 'cuda' ? 'gpu' : 'cpu');
}

function reloadModel() {
    const btn = document.getElementById('reloadBtn');
    const modelStatus = document.getElementById('modelStatus');
    
    btn.disabled = true;
    modelStatus.textContent = 'Loading...';
    modelStatus.className = 'status-badge loading';
    
    fetch('/api/load-model', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            updateStatusDisplay(data);
            
            if (data.success) {
                showSuccess('Model loaded successfully!');
            } else {
                showError(`Failed to load model: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Error reloading model:', error);
            showError('Error reloading model');
            modelStatus.textContent = 'Error';
            modelStatus.className = 'status-badge error';
        })
        .finally(() => {
            btn.disabled = false;
        });
}

// ===== Text Input Management =====
function updateCharCount() {
    const inputText = document.getElementById('inputText');
    const charCount = document.querySelector('#inputText').parentElement.querySelector('.char-count');
    const count = inputText.value.length;
    charCount.textContent = `${count} ${count === 1 ? 'character' : 'characters'}`;
}

function updateOutputCharCount() {
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('#outputText').parentElement.querySelector('.char-count');
    const count = outputText.value.length;
    charCount.textContent = `${count} ${count === 1 ? 'character' : 'characters'}`;
}

function clearInput() {
    if (confirm('Are you sure you want to clear the input?')) {
        document.getElementById('inputText').value = '';
        updateCharCount();
    }
}

function loadFromFile() {
    document.getElementById('fileInput').click();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('inputText').value = e.target.result;
        updateCharCount();
        showSuccess(`File "${file.name}" loaded successfully!`);
    };
    reader.onerror = function() {
        showError('Error reading file');
    };
    reader.readAsText(file);

    // Reset the input so the same file can be selected again
    event.target.value = '';
}

// ===== Summarization =====
function summarizeText() {
    const inputText = document.getElementById('inputText').value.trim();
    const maxLength = parseInt(document.getElementById('maxLength').value);
    const numBeams = parseInt(document.getElementById('numBeams').value);
    const summarizeBtn = document.getElementById('summarizeBtn');
    const progressContainer = document.getElementById('progressContainer');

    // Validation
    if (!inputText) {
        showError('Please enter some text to summarize');
        return;
    }

    // Disable button and show progress
    summarizeBtn.disabled = true;
    progressContainer.style.display = 'block';
    clearMessages();

    fetch('/api/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: inputText,
            max_length: maxLength,
            num_beams: numBeams
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.error || 'Summarization failed');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            document.getElementById('outputText').value = data.summary;
            updateOutputCharCount();
            showSuccess(`Summary generated! (Input: ${data.input_length} chars → Output: ${data.output_length} chars)`);
        } else {
            showError(data.error || 'Summarization failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showError(`Error: ${error.message}`);
    })
    .finally(() => {
        summarizeBtn.disabled = false;
        progressContainer.style.display = 'none';
    });
}

// ===== Output Management =====
function saveSummary() {
    const summary = document.getElementById('outputText').value.trim();

    if (!summary) {
        showError('No summary to save');
        return;
    }

    const element = document.createElement('a');
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    
    const timestamp = new Date().toISOString().slice(0, 10);
    element.download = `summary_${timestamp}.txt`;
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showSuccess('Summary downloaded successfully!');
}

function copyToClipboard() {
    const summary = document.getElementById('outputText').value.trim();

    if (!summary) {
        showError('No summary to copy');
        return;
    }

    navigator.clipboard.writeText(summary)
        .then(() => {
            showSuccess('Summary copied to clipboard!');
        })
        .catch(error => {
            console.error('Error copying to clipboard:', error);
            showError('Failed to copy to clipboard');
        });
}

// ===== Settings =====
function updateLengthLabel() {
    const value = document.getElementById('maxLength').value;
    document.getElementById('lengthLabel').textContent = `${value} tokens`;
}

// ===== Message Display =====
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showSuccess(message) {
    const successElement = document.getElementById('successMessage');
    successElement.textContent = message;
    successElement.style.display = 'block';
    successElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-hide after 5 seconds
    setTimeout(() => {
        successElement.style.display = 'none';
    }, 5000);
}

function clearMessages() {
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
}

// ===== Input Event Listeners =====
document.getElementById('inputText').addEventListener('input', updateCharCount);
document.getElementById('outputText').addEventListener('input', updateOutputCharCount);

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + Enter to summarize
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        const summarizeBtn = document.getElementById('summarizeBtn');
        if (!summarizeBtn.disabled) {
            summarizeText();
        }
    }
});
