# controller.py
from flask import Flask, jsonify, request
from flask_app import app
from flask_app.models import Character

@app.route('/api/characters', methods=['GET'])
def get_characters():
    characters = Character.get_all()
    return jsonify(characters)

@app.route('/api/characters', methods=['POST'])
def create_character():
    data = request.json
    character_id = Character.save(data)
    return jsonify({'id': character_id})

@app.route('/api/characters/<int:character_id>', methods=['GET'])
def get_character_by_id(character_id):
    character = Character.get_by_id({'idcharacters': character_id})
    if not character:
        return jsonify({'error': 'Character not found'}), 404
    return jsonify(character.__dict__)

@app.route('/api/characters/<username>', methods=['GET'])
def get_character_by_username(username):
    character = Character.get_by_username({'login_username': username})
    if not character:
        return jsonify({'error': 'Character not found'}), 404
    return jsonify(character.__dict__)

@app.route('/api/characters/app/<app_id>', methods=['GET'])
def get_characters_by_app_id(app_id):
    characters = Character.get_by_app_id({'app_id': app_id})
    return jsonify(characters)

@app.route('/api/characters/active', methods=['GET'])
def get_active_characters():
    active_characters = Character.get_active()
    return jsonify(active_characters)

@app.route('/api/characters/<int:character_id>', methods=['PUT'])
def update_character(character_id):
    data = request.json
    data['idcharacters'] = character_id
    result = Character.update(data)
    if not result:
        return jsonify({'error': 'Character not found'}), 404
    return jsonify({'message': 'Character updated successfully'})

@app.route('/api/characters/<int:character_id>', methods=['DELETE'])
def delete_character(character_id):
    result = Character.delete_one({'id': character_id})
    if not result:
        return jsonify({'error': 'Character not found'}), 404
    return jsonify({'message': 'Character deleted successfully'})
