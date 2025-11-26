from flask import Flask, render_template, request, jsonify
import torch
from transformers import T5Tokenizer, T5ForConditionalGeneration
import os
from datetime import datetime

app = Flask(__name__)

# Configuration
MODEL_DIR = "t5_summarizer/"
MAX_SUMMARY_LENGTH = 130
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# Global variables for model
model = None
tokenizer = None
model_loaded = False
load_error = None


def load_model():
    """Load the T5 model and tokenizer"""
    global model, tokenizer, model_loaded, load_error
    
    try:
        if not os.path.exists(MODEL_DIR):
            load_error = f"Model directory '{MODEL_DIR}' not found!"
            model_loaded = False
            return False
        
        print(f"Loading model from {MODEL_DIR} on device: {DEVICE}")
        
        tokenizer = T5Tokenizer.from_pretrained(MODEL_DIR)
        model = T5ForConditionalGeneration.from_pretrained(MODEL_DIR)
        model = model.to(DEVICE)
        model.eval()
        
        model_loaded = True
        load_error = None
        print(f"Model loaded successfully on {DEVICE}")
        return True
    
    except Exception as e:
        load_error = str(e)
        model_loaded = False
        print(f"Error loading model: {load_error}")
        return False


def summarize_text(text, max_length=130, num_beams=4):
    """Perform text summarization"""
    
    if not model_loaded or model is None:
        raise Exception("Model not loaded. Please load the model first.")
    
    if not text.strip():
        raise Exception("Input text is empty.")
    
    # Measure input length
    input_len = len(tokenizer.encode(text))
    
   
    if input_len < 80:
        out_len = min(30, max_length)
    elif input_len < 150:
        out_len = min(40, max_length)
    elif input_len < 250:
        out_len = min(70, max_length)
    elif input_len < 350:
        out_len = min(110, max_length)
    else:
        out_len = max_length
    
    # Minimum length
    min_len = max(20, out_len // 3)
    
    # Tokenize input
    inputs = tokenizer(
        "summarize: " + text,
        return_tensors="pt",
        truncation=True,
        max_length=512
    ).to(DEVICE)

    with torch.no_grad():
        summary_ids = model.generate(
            **inputs,
            max_new_tokens=out_len,
            min_length=min_len,
            num_beams=num_beams,
            no_repeat_ngram_size=2,
            repetition_penalty=1.3,
            length_penalty=0.8,
            early_stopping=False,
        )
    
    return tokenizer.decode(summary_ids[0], skip_special_tokens=True)


@app.route('/')
def index():
   
    return render_template('index.html', 
                         model_loaded=model_loaded,
                         device=DEVICE,
                         load_error=load_error)


@app.route('/api/status')
def status():
    
    return jsonify({
        'model_loaded': model_loaded,
        'device': DEVICE,
        'error': load_error,
        'model_dir': MODEL_DIR
    })


@app.route('/api/summarize', methods=['POST'])
def summarize():
   
    try:
        data = request.json
        text = data.get('text', '').strip()
        max_length = int(data.get('max_length', MAX_SUMMARY_LENGTH))
        num_beams = int(data.get('num_beams', 4))
        
        # Validation
        if not text:
            return jsonify({'error': 'Input text is empty'}), 400
        
        if not model_loaded:
            return jsonify({'error': 'Model not loaded. Please reload the model.'}), 503
        
        if num_beams < 1 or num_beams > 6:
            num_beams = 4
        
        if max_length < 20 or max_length > 200:
            max_length = MAX_SUMMARY_LENGTH
        
        # Generate summary
        summary = summarize_text(text, max_length, num_beams)
        
        return jsonify({
            'success': True,
            'summary': summary,
            'input_length': len(text),
            'output_length': len(summary)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/load-model', methods=['POST'])
def load_model_endpoint():
   
    success = load_model()
    return jsonify({
        'success': success,
        'model_loaded': model_loaded,
        'device': DEVICE,
        'error': load_error
    })


if __name__ == '__main__':
    print("=" * 60)
    print("Chat Summarizer - Web Interface")
    print("=" * 60)
    print(f"Device: {DEVICE}")
    print(f"Model Directory: {MODEL_DIR}")
    print()
    
    # Load model on startup
    print("Loading model on startup...")
    load_model()
    
    if model_loaded:
        print("✓ Model loaded successfully!")
    else:
        print(f"✗ Failed to load model: {load_error}")
    
    print()
    print("Starting Flask application...")
    print("Open http://localhost:5000 in your browser")
    print("=" * 60)
    
    app.run(debug=False, host='0.0.0.0', port=5000)
