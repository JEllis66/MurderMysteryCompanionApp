from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app.models import storyitems, characters, journalnotes, helprequests, news, characterhasjournalnotes, characterhasstoryitem, characterhashelprequest, topsecret, votes, appinstances, faqs, characterhastopsecret

class CharacterHasStoryItem:
    db_name = 'lancasters_schema'

    def __init__(self, db_data):
        self.characters_idcharacters = db_data['characters_idcharacters']
        self.storyitems_idstoryitems = db_data['storyitems_idstoryitems']
        self.isFavorite = db_data['isFavorite']

    # CREATE
    @classmethod
    def create(cls, data):
        query = """
        INSERT INTO characters_has_storyitems 
            (characters_idcharacters, storyitems_idstoryitems, isFavorite) 
        VALUES 
            (%(characters_idcharacters)s, %(storyitems_idstoryitems)s, %(isFavorite)s);
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    # READ
    @classmethod
    def get_all(cls):
        query = """
        SELECT * 
        FROM characters_has_storyitems;
        """
        results = connectToMySQL(cls.db_name).query_db(query)
        all_characters_has_storyitems = [cls(row) for row in results]
        return all_characters_has_storyitems
    
    @classmethod
    def get_by_character_id(cls, data):
        query = """
        SELECT *
        FROM characters_has_storyitems
        WHERE characters_idcharacters = %(characters_idcharacters)s;
        """
        results = connectToMySQL(cls.db_name).query_db(query, data)
        return [cls(row) for row in results]

    @classmethod
    def get_by_storyitem_id(cls, data):
        query = """
        SELECT *
        FROM characters_has_storyitems
        WHERE storyitems_idstoryitems = %(storyitems_idstoryitems)s;
        """
        results = connectToMySQL(cls.db_name).query_db(query, data)
        return [cls(row) for row in results]

    # UPDATE
    @classmethod
    def update(cls, data):
        query = """
        UPDATE characters_has_storyitems
        SET isFavorite = %(isFavorite)s
        WHERE characters_idcharacters = %(characters_idcharacters)s
        AND storyitems_idstoryitems = %(storyitems_idstoryitems)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    # DELETE
    @classmethod
    def delete(cls, data):
        query = """
        DELETE FROM characters_has_storyitems 
        WHERE characters_idcharacters = %(characters_idcharacters)s
        AND storyitems_idstoryitems = %(storyitems_idstoryitems)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

