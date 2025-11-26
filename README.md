# 🚀 Chat Summarizer

> A sleek, production-ready web application powered by a fine-tuned T5 model that transforms long, multi-turn chats into clean, concise summaries.
> Designed for customer support, automation pipelines, and GenAI assistants.

## 📋 Tech Stack

| Component | Technology |
|-----------|-----------|
| 🌐 Frontend | HTML · CSS · JavaScript |
| 🧠 Model | Fine-tuned T5 (HuggingFace Transformers) |
| ⚙️ Backend | Python · Flask |
| 🔧 Framework | PyTorch |
| ⚡ Acceleration | GPU (CUDA) + CPU Fallback |

## 🎥 Live Demo

▶ **Watch the full UI demo & summarization workflow:**  
[Google Drive Link](https://drive.google.com/file/d/1pM-ir9_qf6cGBvw2IQcFUXLywdIyesSd/view?usp=sharing)

## ✨ Key Features

- 🎨 Modern, responsive Web UI
- 🧠 Fine-tuned T5 summarizer for multi-turn conversations
- 🔧 Smart dynamic output-length control
- 🧵 Beam search → smoother summaries
- 🚀 GPU acceleration when available
- 📁 Paste or upload conversations
- 📋 Copy-to-clipboard summary output
- 🛡️ Minimal hallucination (prompt tuning + strict decoding)

## 🧩 How the Project Was Built

### 1️⃣ Dataset Creation

- Designed multiple chat–summary pairs
- Short, medium, and long conversations
- Low hallucination handling
- High semantic accuracy

### 2️⃣ Fine-Tuning T5

- HuggingFace Transformers + PyTorch
- AMP + AdamW optimizer
- Tuned decoding parameters
- Length-adaptive summarization logic

### 3️⃣ Web Application Development

- REST API using Flask
- Responsive HTML/CSS/JS UI
- Live summarization
- Clean UX (upload, paste, copy)

### 4️⃣ Packaging & Deployment

- Production-ready project structure
- CPU/GPU compatible
- Easy to run locally
- Simple for deployment

## ⚡ Quick Start

### Installation

```bash
pip install -r requirements.txt
```

### Running the Application

```bash
python app.py
```

Then open your browser and navigate to:
```
http://localhost:5000
```

## 📁 Project Structure

```
chat-summarizer/
├── app.py                    # Flask backend + API
├── requirements.txt          # Python dependencies
├── README.md                 # Documentation
├── LICENSE                   # MIT License
│
├── templates/
│   └── index.html            # Web UI
│
├── static/
│   ├── style.css             # UI styling
│   └── script.js             # Frontend JS logic
│
├── t5_summarizer/            # Fine-tuned T5 model + tokenizer
│   ├── model.safetensors
│   ├── tokenizer_config.json
│   ├── config.json
│   ├── generation_config.json
│   ├── special_tokens_map.json
│   ├── spiece.model
│   └── added_tokens.json
│
├── data/                     # Datasets & processed files
│   ├── samsum-train.csv
│   ├── samsum-validation.csv
│   ├── samsum-test.csv
│   └── samsum_dataset/       # HuggingFace Dataset format
│
└── .gitignore
```

## 🧪 Example Output

### Input Chat

```
User: My phone isn't charging.
Agent: Try using another cable.
User: Same issue.
Agent: Clean the charging port; it may be dusty.
```

### Generated Summary

```
User's phone isn't charging. The agent recommends trying another cable and cleaning the dusty charging port.
```

## 📬 Contact

Feel free to connect or collaborate:

- 📧 **Email:** [chayan07ghosh@gmail.com](mailto:chayan07ghosh@gmail.com)
- 🌐 **Portfolio:** [chayanghosh.com](https://www.chayanghosh.com)
- 💼 **LinkedIn:** [linkedin.com/in/chayan-ghosh07](https://www.linkedin.com/in/chayan-ghosh07/)

## 📜 License

Released under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.

## ⭐ Support the Project

- 🌟 Star the repository
- 🐛 Open an issue for bugs
- 🔧 Suggest new features
- 🎉 Share your feedback

---

**Built with ❤️ by [Chayan Ghosh](https://www.chayanghosh.com)**
