from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app.models import storyitems, characters, journalnotes, helprequests, news, characterhasjournalnotes, characterhasstoryitem, characterhashelprequest, topsecret, votes, appinstances, faqs, characterhastopsecret


class Story_Item:
    db_name = 'lancasters_schema'

    def __init__(self, db_data):
        self.idstoryitems = db_data['idstoryitems']
        self.story_title = db_data['title']
        self.description = db_data['description']
        self.lookup_key = db_data['lookup_key']
        self.item_content = db_data['item_content']
        self.search_word_one = db_data['search_word_one']
        self.search_word_two = db_data['search_word_two']
        self.search_word_three = db_data['search_word_three']
        self.created_at = db_data['created_at']
        self.updated_at = db_data['updated_at']

    # CREATE
    @classmethod
    def save(cls, data):
        query = """
        INSERT INTO storyitems 
            (title, description, lookup_key, item_content, search_word_one, search_word_two, search_word_three) 
        VALUES 
            (%(story_title)s, %(description)s, %(lookup_key)s, %(item_content)s, %(search_word_one)s, %(search_word_two)s, %(search_word_three)s);
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    # READ
    @classmethod
    def get_all_storyitems(cls):
        query = """
        SELECT * 
        FROM storyitems;
        """
        results = connectToMySQL(cls.db_name).query_db(query)
        all_storyitems = [cls(row) for row in results]
        return all_storyitems
    
    @classmethod
    def get_storyitem_by_id(cls, data):
        query = """
        SELECT *
        FROM storyitems
        WHERE idstoryitems = %(idstoryitems)s;
        """
        results = connectToMySQL(cls.db_name).query_db(query, data)
        return cls(results[0]) if results else None

    @classmethod
    def get_storyitems_shared_by_character(cls, character_id):
        query = """
        SELECT si.*
        FROM storyitems si
        JOIN characters_has_storyitems chs
        ON si.idstoryitems = chs.storyitems_idstoryitems
        WHERE chs.characters_idcharacters = %(character_id)s
        ORDER BY si.liked DESC, si.updated_at DESC;
        """
        data = {'character_id': character_id}
        results = connectToMySQL(cls.db_name).query_db(query, data)
        shared_story_items = [cls(row) for row in results]
        return shared_story_items
    
    @classmethod
    def get_by_search_word(cls, search_word):
        query = """
        SELECT *
        FROM storyitems
        WHERE search_word_one LIKE %(search_word)s
            OR search_word_two LIKE %(search_word)s
            OR search_word_three LIKE %(search_word)s;
        """
        data = {'search_word': f"%{search_word}%"}
        results = connectToMySQL(cls.db_name).query_db(query, data)
        story_items = [cls(row) for row in results]
        return story_items

    # UPDATE
    @classmethod
    def update_si(cls, data):
        query = """
        UPDATE storyitems
        SET title = %(story_title)s, 
            description = %(description)s,
            lookup_key = %(lookup_key)s,
            item_content = %(item_content)s,
            search_word_one = %(search_word_one)s,
            search_word_two = %(search_word_two)s,
            search_word_three = %(search_word_three)s
        WHERE idstoryitems = %(idstoryitems)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    @classmethod
    def toggle_item_like(cls, data):
        query = """
        UPDATE storyitems
        SET liked = CASE WHEN liked = 1 THEN 0 ELSE 1 END
        WHERE idstoryitems = %(idstoryitems)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    # DELETE
    @classmethod
    def delete_one_si(cls, data):
        query = """
        DELETE FROM storyitems 
        WHERE idstoryitems = %(idstoryitems)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    @classmethod
    def postal(cls):
        query = """
        DELETE * FROM storyitems;
        """
        return connectToMySQL(cls.db_name).query_db(query)
