🚀 Chat Summarizer (Web UI) — Fine-Tuned T5 Model

A sleek, production-ready web application powered by a fine-tuned T5 model that transforms long, multi-turn chats into clean, concise summaries.
Designed for customer support, automation pipelines, and GenAI assistants.

<table> <tr><td><strong>🌐 Frontend</strong></td><td>HTML · CSS · JavaScript (Flask Web UI)</td></tr> <tr><td><strong>🧠 Model</strong></td><td>Fine-tuned T5 (HuggingFace Transformers)</td></tr> <tr><td><strong>⚙️ Backend</strong></td><td>Python · PyTorch · Flask</td></tr> <tr><td><strong>⚡ Acceleration</strong></td><td>GPU (CUDA) + CPU Fallback</td></tr> </table>
🎥 Live Demo Video

▶ Watch the full UI demo & summarization workflow:
https://drive.google.com/file/d/1pM-ir9_qf6cGBvw2IQcFUXLywdIyesSd/view?usp=sharing

✨ Key Features

🎨 Modern, responsive Web UI

🧠 Fine-tuned T5 summarizer for multi-turn conversations

🔧 Smart dynamic output-length control

🧵 Beam search → smoother summaries

🚀 GPU acceleration when available

📁 Paste or upload conversations

📋 Copy-to-clipboard summary output

🛡️ Minimal hallucination (prompt tuning + strict decoding)

🧩 How the Project Was Built
1️⃣ Dataset Creation

Designed multiple chat–summary pairs

Short, medium, and long conversations

Low hallucination handling

High semantic accuracy

2️⃣ Fine-Tuning T5

HuggingFace Transformers + PyTorch

AMP + AdamW optimizer

Tuned decoding parameters

Length-adaptive summarization logic

3️⃣ Web Application Development

REST API using Flask

Responsive HTML/CSS/JS UI

Live summarization

Clean UX (upload, paste, copy)

4️⃣ Packaging & Deployment

Production-ready project structure

CPU/GPU compatible

Easy to run locally

Simple for deployment

⚡ Quick Start — Web App
1️⃣ Install dependencies
pip install -r requirements.txt

2️⃣ Run the server
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
│   ├── style.css            # UI styling
│   └── script.js            # Frontend JS logic
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

User’s phone isn’t charging. The agent recommends trying another cable and cleaning the dusty charging port.

📬 Contact

Feel free to connect or collaborate:

📧 Email: chayan07ghosh@gmail.com

🌐 Portfolio: https://www.chayanghosh.com

💼 LinkedIn: https://www.linkedin.com/in/chayan-ghosh07/recent-activity/all

🧾 License

Released under the MIT License.
See the LICENSE file for details.

⭐ Support the Project

🌟 Star the repository

🐛 Open an issue

🔧 Suggest new features

🎉 Built with ❤️ by Chayan Ghosh
