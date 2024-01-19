# controller.py
from flask import Flask, jsonify, request
from flask_app import app
from flask_app.models import Story_Item

@app.route('/api/storyitems', methods=['GET'])
def get_all_storyitems():
    all_storyitems = Story_Item.get_all_storyitems()
    return jsonify(all_storyitems)

@app.route('/api/storyitems/<int:storyitem_id>', methods=['GET'])
def get_storyitem_by_id(storyitem_id):
    storyitem = Story_Item.get_storyitem_by_id({'idstoryitems': storyitem_id})
    if not storyitem:
        return jsonify({'error': 'Story Item not found'}), 404
    return jsonify(storyitem.__dict__)

@app.route('/api/storyitems', methods=['POST'])
def create_storyitem():
    data = request.json
    storyitem_id = Story_Item.save(data)
    return jsonify({'id': storyitem_id})

@app.route('/api/storyitems/shared/<int:character_id>', methods=['GET'])
def get_storyitems_shared_by_character(character_id):
    shared_storyitems = Story_Item.get_storyitems_shared_by_character(character_id)
    return jsonify(shared_storyitems)

@app.route('/api/storyitems/search', methods=['GET'])
def get_storyitems_by_search_word():
    search_word = request.args.get('search_word')
    storyitems = Story_Item.get_by_search_word(search_word)
    return jsonify(storyitems)

@app.route('/api/storyitems/<int:storyitem_id>', methods=['PUT'])
def update_storyitem(storyitem_id):
    data = request.json
    data['idstoryitems'] = storyitem_id
    result = Story_Item.update_si(data)
    if not result:
        return jsonify({'error': 'Story Item not found'}), 404
    return jsonify({'message': 'Story Item updated successfully'})

@app.route('/api/storyitems/<int:storyitem_id>/toggle-like', methods=['PUT'])
def toggle_item_like(storyitem_id):
    data = {'idstoryitems': storyitem_id}
    Story_Item.toggle_item_like(data)
    return jsonify({'message': 'Like status toggled successfully'})

@app.route('/api/storyitems/<int:storyitem_id>', methods=['DELETE'])
def delete_storyitem(storyitem_id):
    result = Story_Item.delete_one_si({'idstoryitems': storyitem_id})
    if not result:
        return jsonify({'error': 'Story Item not found'}), 404
    return jsonify({'message': 'Story Item deleted successfully'})

@app.route('/api/storyitems/delete-all', methods=['DELETE'])
def delete_all_storyitems():
    Story_Item.postal()
    return jsonify({'message': 'All Story Items deleted successfully'})
