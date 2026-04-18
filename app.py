import json
import random
from flask import Flask, render_template, request, jsonify, redirect, url_for

app = Flask(__name__)
DATA_FILE = 'data.json'

def load_data():
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/categories')
def categories():
    data = load_data()
    return render_template('categories.html', categories=data['categories'])

@app.route('/challenge/<category_id>')
def challenge(category_id):
    data = load_data()
    category_challenges = [c for c in data['challenges'] if c['category'] == category_id]
    
    if not category_challenges:
        return redirect(url_for('categories'))
        
    # Pick a random challenge from the category
    challenge = random.choice(category_challenges)
    
    return render_template('challenge.html', challenge=challenge, category_id=category_id)

@app.route('/saved')
def saved():
    data = load_data()
    saved_ids = data['user_progress']['saved_challenges']
    completed_ids = data['user_progress']['completed_challenges']
    
    saved = [c for c in data['challenges'] if c['id'] in saved_ids and c['id'] not in completed_ids]
    completed = [c for c in data['challenges'] if c['id'] in completed_ids]
    
    return render_template('saved.html', saved=saved, completed=completed)

@app.route('/parent')
def parent():
    data = load_data()
    saved_ids = data['user_progress']['saved_challenges']
    completed_ids = data['user_progress']['completed_challenges']
    
    saved = [c for c in data['challenges'] if c['id'] in saved_ids]
    completed = [c for c in data['challenges'] if c['id'] in completed_ids]
    
    return render_template('parent.html', saved=saved, completed=completed)

# API Endpoints
@app.route('/api/toggle_save', methods=['POST'])
def toggle_save():
    req_data = request.json
    challenge_id = req_data.get('id')
    
    data = load_data()
    saved_list = data['user_progress']['saved_challenges']
    
    if challenge_id in saved_list:
        saved_list.remove(challenge_id)
        status = 'removed'
    else:
        saved_list.append(challenge_id)
        status = 'saved'
        
    save_data(data)
    return jsonify({"status": status})

@app.route('/api/toggle_complete', methods=['POST'])
def toggle_complete():
    req_data = request.json
    challenge_id = req_data.get('id')
    
    data = load_data()
    completed_list = data['user_progress']['completed_challenges']
    
    if challenge_id in completed_list:
        completed_list.remove(challenge_id)
        status = 'incomplete'
    else:
        completed_list.append(challenge_id)
        status = 'completed'
        
    save_data(data)
    return jsonify({"status": status})

@app.route('/api/clear_data', methods=['POST'])
def clear_data():
    data = load_data()
    data['user_progress']['saved_challenges'] = []
    data['user_progress']['completed_challenges'] = []
    save_data(data)
    return jsonify({"status": "cleared"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
