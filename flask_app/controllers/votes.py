# controller.py
from flask import Flask, jsonify, request
from flask_app import app
from flask_app.models import Votes

@app.route('/api/votes', methods=['GET'])
def get_all_votes():
    all_votes = Votes.get_all()
    return jsonify(all_votes)

@app.route('/api/votes/<int:votes_id>', methods=['GET'])
def get_votes_by_id(votes_id):
    votes = Votes.get_by_id({'idvotes': votes_id})
    if not votes:
        return jsonify({'error': 'Votes not found'}), 404
    return jsonify(votes.__dict__)

@app.route('/api/votes', methods=['POST'])
def create_votes():
    data = request.json
    votes_id = Votes.create(data)
    return jsonify({'id': votes_id})

@app.route('/api/votes/<int:votes_id>', methods=['PUT'])
def update_votes(votes_id):
    data = request.json
    data['idvotes'] = votes_id
    result = Votes.update(data)
    if not result:
        return jsonify({'error': 'Votes not found'}), 404
    return jsonify({'message': 'Votes updated successfully'})

@app.route('/api/votes/<int:votes_id>', methods=['DELETE'])
def delete_votes(votes_id):
    result = Votes.delete({'idvotes': votes_id})
    if not result:
        return jsonify({'error': 'Votes not found'}), 404
    return jsonify({'message': 'Votes deleted successfully'})
