from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app.models import storyitems, characters, journalnotes, helprequests, news, characterhasjournalnotes, characterhasstoryitem, characterhashelprequest, topsecret, votes, appinstances, faqs, characterhastopsecret

class Votes:
    db_name = 'lancasters_schema'

    def __init__(self, db_data):
        self.idvotes = db_data['idvotes']
        self.votedFor = db_data['votedFor']
        self.votedBy = db_data['votedBy']
        self.created_at = db_data['created_at']
        self.updated_at = db_data['updated_at']

    # CREATE
    @classmethod
    def create(cls, data):
        query = """
        INSERT INTO votes 
            (votedFor, votedBy) 
        VALUES 
            (%(votedFor)s, %(votedBy)s);
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    # READ
    @classmethod
    def get_all(cls):
        query = """
        SELECT * 
        FROM votes;
        """
        results = connectToMySQL(cls.db_name).query_db(query)
        all_votes = [cls(row) for row in results]
        return all_votes
    
    @classmethod
    def get_by_id(cls, data):
        query = """
        SELECT *
        FROM votes
        WHERE idvotes = %(idvotes)s;
        """
        results = connectToMySQL(cls.db_name).query_db(query, data)
        return cls(results[0]) if results else None

    # UPDATE
    @classmethod
    def update(cls, data):
        query = """
        UPDATE votes
        SET votedFor = %(votedFor)s,
            votedBy = %(votedBy)s
        WHERE idvotes = %(idvotes)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    # DELETE
    @classmethod
    def delete(cls, data):
        query = """
        DELETE FROM votes 
        WHERE idvotes = %(idvotes)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)
