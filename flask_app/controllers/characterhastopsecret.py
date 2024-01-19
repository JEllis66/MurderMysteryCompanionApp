# controller.py
from flask import Flask, jsonify, request
from flask_app import app
from flask_app.models import CharacterHasTopSecret

@app.route('/api/characters_has_topsecret', methods=['GET'])
def get_all_characters_has_topsecret():
    characters_has_topsecret = CharacterHasTopSecret.get_all()
    return jsonify(characters_has_topsecret)

@app.route('/api/characters_has_topsecret/character/<int:character_id>', methods=['GET'])
def get_characters_has_topsecret_by_character_id(character_id):
    data = {'characters_idcharacters': character_id}
    characters_has_topsecret = CharacterHasTopSecret.get_by_character_id(data)
    return jsonify(characters_has_topsecret)

@app.route('/api/characters_has_topsecret/topsecret/<int:topsecret_id>', methods=['GET'])
def get_characters_has_topsecret_by_topsecret_id(topsecret_id):
    data = {'topsecret_idtopsecret': topsecret_id}
    characters_has_topsecret = CharacterHasTopSecret.get_by_topsecret_id(data)
    return jsonify(characters_has_topsecret)

@app.route('/api/characters_has_topsecret', methods=['POST'])
def create_characters_has_topsecret():
    data = request.json
    result = CharacterHasTopSecret.create(data)
    return jsonify({'message': 'CharactersHasTopSecret created successfully'})

@app.route('/api/characters_has_topsecret', methods=['PUT'])
def update_characters_has_topsecret():
    data = request.json
    result = CharacterHasTopSecret.update(data)
    return jsonify({'message': 'CharactersHasTopSecret updated successfully'})

@app.route('/api/characters_has_topsecret', methods=['DELETE'])
def delete_characters_has_topsecret():
    data = request.json
    result = CharacterHasTopSecret.delete(data)
    return jsonify({'message': 'CharactersHasTopSecret deleted successfully'})
