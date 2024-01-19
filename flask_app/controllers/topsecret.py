# controller.py
from flask import Flask, jsonify, request
from flask_app import app
from flask_app.models import TopSecret

@app.route('/api/topsecrets', methods=['GET'])
def get_all_topsecrets():
    all_topsecrets = TopSecret.get_all()
    return jsonify(all_topsecrets)

@app.route('/api/topsecrets/<int:topsecret_id>', methods=['GET'])
def get_topsecret_by_id(topsecret_id):
    topsecret = TopSecret.get_by_id({'idtopsecret': topsecret_id})
    if not topsecret:
        return jsonify({'error': 'TopSecret not found'}), 404
    return jsonify(topsecret.__dict__)

@app.route('/api/topsecrets', methods=['POST'])
def create_topsecret():
    data = request.json
    topsecret_id = TopSecret.create(data)
    return jsonify({'id': topsecret_id})

@app.route('/api/topsecrets/<int:topsecret_id>', methods=['PUT'])
def update_topsecret(topsecret_id):
    data = request.json
    data['idtopsecret'] = topsecret_id
    result = TopSecret.update(data)
    if not result:
        return jsonify({'error': 'TopSecret not found'}), 404
    return jsonify({'message': 'TopSecret updated successfully'})

@app.route('/api/topsecrets/<int:topsecret_id>', methods=['DELETE'])
def delete_topsecret(topsecret_id):
    result = TopSecret.delete({'idtopsecret': topsecret_id})
    if not result:
        return jsonify({'error': 'TopSecret not found'}), 404
    return jsonify({'message': 'TopSecret deleted successfully'})
