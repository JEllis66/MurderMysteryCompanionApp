from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app.models import storyitems, characters, journalnotes, helprequests, news, characterhasjournalnotes, characterhasstoryitem, characterhashelprequest, topsecret, votes, appinstances, faqs, characterhastopsecret

class FAQs:
    db_name = 'lancasters_schema'

    def __init__(self, db_data):
        self.idfaqs = db_data['idfaqs']
        self.question = db_data['question']
        self.answer = db_data['answer']
        self.app_id = db_data['app_id']
        self.created_at = db_data['created_at']
        self.updated_at = db_data['updated_at']

# CREATE
    @classmethod
    def create(cls, data):
        query = """
        INSERT INTO faqs 
            (question, answer) 
        VALUES 
            (%(question)s, %(answer)s);
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

# READ
    @classmethod
    def get_all(cls):
        query = """
        SELECT * 
        FROM faqs;
        """
        results = connectToMySQL(cls.db_name).query_db(query)
        all_faqs = [cls(row) for row in results]
        return all_faqs
    
    @classmethod
    def get_by_id(cls, data):
        query = """
        SELECT *
        FROM faqs
        WHERE idfaqs = %(idfaqs)s;
        """
        results = connectToMySQL(cls.db_name).query_db(query, data)
        return cls(results[0]) if results else None
    
    @classmethod
    def get_by_app_id(cls, data):
        query = """
        SELECT *
        FROM faqs
        WHERE app_id = %(app_id)s;
        """
        results = connectToMySQL(cls.db_name).query_db(query)
        all_app_faqs = [cls(row) for row in results]
        return all_app_faqs

# UPDATE
    @classmethod
    def update(cls, data):
        query = """
        UPDATE faqs
        SET question = %(question)s,
            answer = %(answer)s
        WHERE idfaqs = %(idfaqs)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    # DELETE
    @classmethod
    def delete(cls, data):
        query = """
        DELETE FROM faqs 
        WHERE idfaqs = %(idfaqs)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)
