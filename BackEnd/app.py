# Backend for Chat Application

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import openai
import os

# Initialize Flask app
app = Flask(__name__)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/chat_history.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
with app.app_context():
    db = SQLAlchemy(app)

# OpenAI API key from environment variable
openai.api_key = os.getenv('OPENAI_API_KEY')

# Chat history model
class ChatHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.Text, nullable=False)
    ai_response = db.Column(db.Text, nullable=False)

# Create database tables
with app.app_context():
    db.create_all()

# Route to handle chat messages
@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')

        if not user_message:
            return jsonify({"error": "Message is required"}), 400

        # Get AI response from OpenAI
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"You are a helpful assistant. {user_message}",
            max_tokens=150,
            temperature=0.7
        )
        ai_response = response.choices[0].text.strip()

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
    try:
        history = ChatHistory.query.all()
        return jsonify([{"user_message": entry.user_message, "ai_response": entry.ai_response} for entry in history])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)