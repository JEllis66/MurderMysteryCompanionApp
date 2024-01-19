# controller.py
from flask import Flask, jsonify, request
from flask_app import app
from flask_app.models import HelpRequest

@app.route('/api/helprequests', methods=['GET'])
def get_all_help_requests():
    app_id = request.args.get('app_id')
    help_requests = HelpRequest.get_all_help_requests(app_id)
    return jsonify(help_requests)

@app.route('/api/helprequests/<int:help_request_id>', methods=['GET'])
def get_help_request_by_id(help_request_id):
    help_request = HelpRequest.get_help_request_by_id(help_request_id)
    if not help_request:
        return jsonify({'error': 'Help request not found'}), 404
    return jsonify(help_request.__dict__)

@app.route('/api/helprequests/resolved', methods=['GET'])
def get_resolved_help_requests():
    app_id = request.args.get('app_id')
    resolved_help_requests = HelpRequest.get_resolved_help_requests(app_id)
    return jsonify(resolved_help_requests)

@app.route('/api/helprequests', methods=['POST'])
def create_help_request():
    data = request.json
    result = HelpRequest.create_help_request(data)
    return jsonify({'message': 'Help request created successfully'})

@app.route('/api/helprequests/<int:help_request_id>', methods=['PUT'])
def update_help_request(help_request_id):
    data = request.json
    data['idhelprequests'] = help_request_id
    result = HelpRequest.update_help_request(data)
    if not result:
        return jsonify({'error': 'Help request not found'}), 404
    return jsonify({'message': 'Help request updated successfully'})

@app.route('/api/helprequests/<int:help_request_id>', methods=['DELETE'])
def delete_help_request(help_request_id):
    result = HelpRequest.delete_help_request(help_request_id)
    if not result:
        return jsonify({'error': 'Help request not found'}), 404
    return jsonify({'message': 'Help request deleted successfully'})
