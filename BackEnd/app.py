# Backend for Chat Application

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import openai
from dotenv import load_dotenv
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/chat_history.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define ChatHistory model
class ChatHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.String(500), nullable=False)
    ai_response = db.Column(db.String(500), nullable=False)

# Initialize database
with app.app_context():
    db.create_all()

# Route to handle chat messages
@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    try:
        # Get AI response from OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=150,
            temperature=0.7
        )
        ai_response = response['choices'][0]['message']['content'].strip()

        # Save to database
        chat_entry = ChatHistory(user_message=user_message, ai_response=ai_response)
        db.session.add(chat_entry)
        db.session.commit()

        return jsonify({"user_message": user_message, "ai_response": ai_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to fetch chat history
@app.route('/history', methods=['GET'])
def history():
    history = ChatHistory.query.all()
    return jsonify([{"user_message": entry.user_message, "ai_response": entry.ai_response} for entry in history])

# Route to check API key
@app.route('/check_api_key', methods=['GET'])
def check_api_key():
    if openai.api_key:
        return jsonify({"status": "success", "message": "API key is set."})
    else:
        return jsonify({"status": "error", "message": "API key is not set."}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)