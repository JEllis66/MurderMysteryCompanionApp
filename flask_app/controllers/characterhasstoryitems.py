# controller.py
from flask import Flask, jsonify, request
from flask_app import app
from flask_app.models import CharacterHasStoryItem

@app.route('/api/characters_has_storyitems', methods=['GET'])
def get_all_characters_has_storyitems():
    characters_has_storyitems = CharacterHasStoryItem.get_all()
    return jsonify(characters_has_storyitems)

@app.route('/api/characters_has_storyitems/character/<int:character_id>', methods=['GET'])
def get_characters_has_storyitems_by_character_id(character_id):
    data = {'characters_idcharacters': character_id}
    characters_has_storyitems = CharacterHasStoryItem.get_by_character_id(data)
    return jsonify(characters_has_storyitems)

@app.route('/api/characters_has_storyitems/storyitem/<int:storyitem_id>', methods=['GET'])
def get_characters_has_storyitems_by_storyitem_id(storyitem_id):
    data = {'storyitems_idstoryitems': storyitem_id}
    characters_has_storyitems = CharacterHasStoryItem.get_by_storyitem_id(data)
    return jsonify(characters_has_storyitems)

@app.route('/api/characters_has_storyitems', methods=['POST'])
def create_characters_has_storyitem():
    data = request.json
    result = CharacterHasStoryItem.create(data)
    return jsonify({'message': 'CharactersHasStoryItem created successfully'})

@app.route('/api/characters_has_storyitems', methods=['PUT'])
def update_characters_has_storyitem():
    data = request.json
    result = CharacterHasStoryItem.update(data)
    return jsonify({'message': 'CharactersHasStoryItem updated successfully'})

@app.route('/api/characters_has_storyitems', methods=['DELETE'])
def delete_characters_has_storyitem():
    data = request.json
    result = CharacterHasStoryItem.delete(data)
    return jsonify({'message': 'CharactersHasStoryItem deleted successfully'})
