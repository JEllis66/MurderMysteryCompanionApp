from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app.models import storyitems, characters, journalnotes, helprequests, news, characterhasjournalnotes, characterhasstoryitem, characterhashelprequest, topsecret, votes, appinstances, faqs, characterhastopsecret

class TopSecret:
    db_name = 'lancasters_schema'

    def __init__(self, db_data):
        self.idtopsecret = db_data['idtopsecret']
        self.secret_story_title = db_data['secret_story_title']
        self.secret_story_description = db_data['secret_story_description']
        self.other_content = db_data['other_content']
        self.activated = db_data['activated']
        self.created_at = db_data['created_at']
        self.updated_at = db_data['updated_at']
        self.app_id = db_data['app_id']

    # CREATE
    @classmethod
    def create(cls, data):
        query = """
        INSERT INTO topsecret 
            (secret_story_title, secret_story_description, other_content, activated, app_id) 
        VALUES 
            (%(secret_story_title)s, %(secret_story_description)s, %(other_content)s, %(activated)s, %(app_id)s);
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    # READ
    @classmethod
    def get_all(cls):
        query = """
        SELECT * 
        FROM topsecret;
        """
        results = connectToMySQL(cls.db_name).query_db(query)
        all_topsecrets = [cls(row) for row in results]
        return all_topsecrets
    
    @classmethod
    def get_by_id(cls, data):
        query = """
        SELECT *
        FROM topsecret
        WHERE idtopsecret = %(idtopsecret)s;
        """
        results = connectToMySQL(cls.db_name).query_db(query, data)
        return cls(results[0]) if results else None

    # UPDATE
    @classmethod
    def update(cls, data):
        query = """
        UPDATE topsecret
        SET secret_story_title = %(secret_story_title)s,
            secret_story_description = %(secret_story_description)s,
            other_content = %(other_content)s,
            activated = %(activated)s,
            app_id = %(app_id)s
        WHERE idtopsecret = %(idtopsecret)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    # DELETE
    @classmethod
    def delete(cls, data):
        query = """
        DELETE FROM topsecret 
        WHERE idtopsecret = %(idtopsecret)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)
