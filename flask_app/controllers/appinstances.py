from flask import Flask, jsonify, request
from flask_app import app
from flask_app.models import AppInstances

@app.route('/api/appinstances', methods=['GET'])
def get_all_appinstances():
    all_appinstances = AppInstances.get_all()
    return jsonify(all_appinstances)

@app.route('/api/appinstances/<int:appinstance_id>', methods=['GET'])
def get_appinstance_by_id(appinstance_id):
    appinstance = AppInstances.get_by_id({'idappinstances': appinstance_id})
    return jsonify(appinstance)

@app.route('/api/appinstances', methods=['POST'])
def create_appinstance():
    data = request.get_json()
    new_appinstance_id = AppInstances.create(data)
    return jsonify({'id': new_appinstance_id})

@app.route('/api/appinstances/<int:appinstance_id>', methods=['PUT'])
def update_appinstance(appinstance_id):
    data = request.get_json()
    data['idappinstances'] = appinstance_id
    AppInstances.update(data)
    return jsonify({'message': 'AppInstance updated successfully'})

@app.route('/api/appinstances/<int:appinstance_id>', methods=['DELETE'])
def delete_appinstance(appinstance_id):
    data = {'idappinstances': appinstance_id}
    AppInstances.delete(data)
    return jsonify({'message': 'AppInstance deleted successfully'})