from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app.models import storyitems, characters, journalnotes, helprequests, news, characterhasjournalnotes, characterhasstoryitem, characterhashelprequest, topsecret, votes, appinstances, faqs, characterhastopsecret

class CharacterHasTopSecret:
    db_name = 'lancasters_schema'

    def __init__(self, db_data):
        self.characters_idcharacters = db_data['characters_idcharacters']
        self.topsecret_idtopsecret = db_data['topsecret_idtopsecret']
        self.isFavorite = db_data['isFavorite']

    # CREATE
    @classmethod
    def create(cls, data):
        query = """
        INSERT INTO characters_has_topsecret 
            (characters_idcharacters, topsecret_idtopsecret, isFavorite) 
        VALUES 
            (%(characters_idcharacters)s, %(topsecret_idtopsecret)s, %(isFavorite)s);
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    # READ
    @classmethod
    def get_all(cls):
        query = """
        SELECT * 
        FROM characters_has_topsecret;
        """
        results = connectToMySQL(cls.db_name).query_db(query)
        all_characters_has_topsecret = [cls(row) for row in results]
        return all_characters_has_topsecret
    
    @classmethod
    def get_by_character_id(cls, data):
        query = """
        SELECT *
        FROM characters_has_topsecret
        WHERE characters_idcharacters = %(characters_idcharacters)s;
        """
        results = connectToMySQL(cls.db_name).query_db(query, data)
        return [cls(row) for row in results]

    @classmethod
    def get_by_topsecret_id(cls, data):
        query = """
        SELECT *
        FROM characters_has_topsecret
        WHERE topsecret_idtopsecret = %(topsecret_idtopsecret)s;
        """
        results = connectToMySQL(cls.db_name).query_db(query, data)
        return [cls(row) for row in results]

    # UPDATE
    @classmethod
    def update(cls, data):
        query = """
        UPDATE characters_has_topsecret
        SET isFavorite = %(isFavorite)s
        WHERE characters_idcharacters = %(characters_idcharacters)s
        AND topsecret_idtopsecret = %(topsecret_idtopsecret)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    # DELETE
    @classmethod
    def delete(cls, data):
        query = """
        DELETE FROM characters_has_topsecret 
        WHERE characters_idcharacters = %(characters_idcharacters)s
        AND topsecret_idtopsecret = %(topsecret_idtopsecret)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)
