# controller.py
from flask import Flask, jsonify, request
from flask_app import app
from flask_app.models import News

@app.route('/api/news', methods=['GET'])
def get_all_news():
    all_news = News.get_all_news()
    return jsonify(all_news)

@app.route('/api/news/<int:news_id>', methods=['GET'])
def get_news_by_id(news_id):
    news = News.get_news_by_id(news_id)
    if not news:
        return jsonify({'error': 'News not found'}), 404
    return jsonify(news.__dict__)

@app.route('/api/news', methods=['POST'])
def create_news():
    data = request.json
    News.create_news(data)
    return jsonify({'message': 'News created successfully'})

@app.route('/api/news/<int:news_id>', methods=['PUT'])
def update_news(news_id):
    data = request.json
    data['idnews'] = news_id
    result = News.update_news(data)
    if not result:
        return jsonify({'error': 'News not found'}), 404
    return jsonify({'message': 'News updated successfully'})

@app.route('/api/news/<int:news_id>', methods=['DELETE'])
def delete_news(news_id):
    result = News.delete_news(news_id)
    if not result:
        return jsonify({'error': 'News not found'}), 404
    return jsonify({'message': 'News deleted successfully'})

@app.route('/api/news', methods=['DELETE'])
def delete_all_news():
    News.delete_all_news()
    return jsonify({'message': 'All news deleted successfully'})
