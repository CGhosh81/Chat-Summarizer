🚀 Chat Summarizer (Web UI) — Fine-Tuned T5 Model

A sleek, production-ready web application powered by a fine-tuned T5 model that transforms long multi-turn chats into clean, concise summaries.
Designed for customer support teams, automation pipelines, and GenAI assistants.

<table> <tr><td><strong>🌐 Frontend:</strong></td><td>HTML + CSS + JS (Flask Web UI)</td></tr> <tr><td><strong>🧠 Model:</strong></td><td>Fine-tuned T5 (HuggingFace)</td></tr> <tr><td><strong>⚙️ Backend:</strong></td><td>Python · PyTorch · Transformers</td></tr> <tr><td><strong>⚡ Acceleration:</strong></td><td>GPU (CUDA) + CPU fallback</td></tr> </table>
🎥 Live Demo Video
▶ Watch the demo on Google Drive

👉 https://drive.google.com/file/d/1pM-ir9_qf6cGBvw2IQcFUXLywdIyesSd/view?usp=sharing

A short video showing the full workflow, UI, and summarization performance.

✨ Key Features

🎨 Beautiful, clean, responsive Web UI

🧠 Fine-tuned T5 chat summarizer for accurate multi-turn conversation summaries

🔧 Smart dynamic output-length control

🧵 Beam search → smoother, more fluent summaries

🚀 GPU acceleration when available

📁 Upload conversation files, paste text, and copy summary

🛡️ Minimal hallucinations (tuned prompts + strict decoding)

🧩 How This Project Was Built
1️⃣ Dataset Creation

Designed multiple chat-summary pairs

Included short, medium, long conversations

Ensured low hallucination & high semantic relevance

2️⃣ Fine-Tuning T5

Used HuggingFace Transformers

PyTorch training loop with AMP & AdamW

Tuned max_length, beam search, repetition penalties

Implemented adaptive summary-length logic

3️⃣ Building the Web UI

Flask backend (REST API)

HTML + CSS + JS responsive interface

Real-time summarization

Clean UI interactions (paste, upload, copy output)

4️⃣ Packaging & Deployment

Optimized folder structure

GPU/CPU compatible

Ready for local use or server deployment

⚡ Quick Start — Web Version
1️⃣ Install dependencies
pip install -r requirements.txt

2️⃣ Run the Flask server
python app.py

3️⃣ Open the app
http://localhost:5000

📁 Project Structure
📦 chat-summarizer
│
├── app.py                   # Flask backend + API
├── requirements.txt         # Dependencies
│
├── templates/
│   └── index.html           # Web UI
│
├── static/
│   ├── style.css            # Frontend styling
│   └── script.js            # UI interactivity
│
├── t5_summarizer/           # Fine-tuned T5 model + tokenizer
│
└── README.md                # Documentation

🧪 Example Output
Input Chat
User: My phone isn’t charging.
Agent: Try using another cable.
User: Same issue.
Agent: Clean the charging port; it may be dusty.

Generated Summary

User’s phone isn’t charging. The agent suggests trying a different cable and cleaning the dusty charging port.

📬 Contact

If you'd like to connect or collaborate:

📧 Email: chayan07ghosh@gmail.com

🌐 Portfolio: https://www.chayanghosh.com

💼 LinkedIn: https://www.linkedin.com/in/chayan-ghosh07/recent-activity/all

🧾 License

Released under the MIT License. See LICENSE for details.

🌟 Star the repository

🐛 Open an issue

🔧 Suggest a feature

🎉 Built with ❤️ by Chayan Ghosh


