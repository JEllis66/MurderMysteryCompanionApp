# controller.py
from flask import Flask, jsonify, request
from flask_app import app
from flask_app.models import JournalNote

@app.route('/api/journalnotes', methods=['GET'])
def get_all_journal_notes():
    journal_notes = JournalNote.get_all()
    return jsonify(journal_notes)

@app.route('/api/journalnotes/<int:journal_note_id>', methods=['GET'])
def get_journal_note_by_id(journal_note_id):
    journal_note = JournalNote.get_by_id({'idjournal_notes': journal_note_id})
    if not journal_note:
        return jsonify({'error': 'Journal note not found'}), 404
    return jsonify(journal_note.__dict__)

@app.route('/api/journalnotes', methods=['POST'])
def create_journal_note():
    data = request.json
    result = JournalNote.create(data)
    return jsonify({'message': 'Journal note created successfully'})

@app.route('/api/journalnotes/<int:journal_note_id>', methods=['PUT'])
def update_journal_note(journal_note_id):
    data = request.json
    data['idjournal_notes'] = journal_note_id
    result = JournalNote.update(data)
    if not result:
        return jsonify({'error': 'Journal note not found'}), 404
    return jsonify({'message': 'Journal note updated successfully'})

@app.route('/api/journalnotes/<int:journal_note_id>/like', methods=['PUT'])
def toggle_like(journal_note_id):
    data = {'idjournal_notes': journal_note_id}
    result = JournalNote.toggle_like(data)
    if not result:
        return jsonify({'error': 'Journal note not found'}), 404
    return jsonify({'message': 'Like status toggled successfully'})

@app.route('/api/journalnotes/<int:journal_note_id>/resolve', methods=['PUT'])
def resolve_request(journal_note_id):
    data = {'idjournal_notes': journal_note_id}
    result = JournalNote.resolve_request(data)
    if not result:
        return jsonify({'error': 'Journal note not found'}), 404
    return jsonify({'message': 'Request resolved successfully'})

@app.route('/api/journalnotes/<int:journal_note_id>', methods=['DELETE'])
def delete_journal_note(journal_note_id):
    result = JournalNote.delete({'idjournal_notes': journal_note_id})
    if not result:
        return jsonify({'error': 'Journal note not found'}), 404
    return jsonify({'message': 'Journal note deleted successfully'})

@app.route('/api/journalnotes', methods=['DELETE'])
def delete_all_journal_notes():
    result = JournalNote.delete_all_journalnotes()
    return jsonify({'message': 'All journal notes deleted successfully'})
