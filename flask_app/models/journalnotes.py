from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app.models import storyitems, characters, journalnotes, helprequests, news, characterhasjournalnotes, characterhasstoryitem, characterhashelprequest, topsecret, votes, appinstances, faqs, characterhastopsecret

class JournalNote:
    db_name = "lancasters_schema"
    
    def __init__(self, data):
        self.idjournal_notes = data['idjournal_notes']
        self.linked_item = data['linked_item']
        self.note = data['note']
        self.liked = data['liked']
        self.user_id = data['user_id'] 
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

# CREATE

    @classmethod
    def create(cls, data):
        query = """
            INSERT INTO journalnotes (linked_item, note, liked, user)
            VALUES (%(linked_item)s, %(note)s, %(liked)s, %(user_id)s);
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

# READ

    @classmethod
    def get_all(cls):
        query = """
            SELECT * 
            FROM journalnotes;
        """
        results = connectToMySQL(cls.db_name).query_db(query)
        journal_notes = [cls(row) for row in results]
        return journal_notes

    @classmethod
    def get_by_id(cls, data):
        query = """
            SELECT * 
            FROM journalnotes 
            WHERE idjournal_notes = %(idjournal_notes)s;
        """
        results = connectToMySQL(cls.db_name).query_db(query, data)
        return cls(results[0]) if results else None

# UPDATE

    @classmethod
    def update(cls, data):
        query = """
            UPDATE journalnotes
            SET linked_item = %(linked_item)s, note = %(note)s
            WHERE idjournal_notes = %(idjournal_notes)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)
    
    @classmethod
    def toggle_like(cls, data):
        query = """
            UPDATE journalnotes
            SET liked = CASE WHEN liked = 1 THEN 0 ELSE 1 END
            WHERE idjournal_notes = %(idjournal_notes)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)
    
    @classmethod
    def resolve_request(cls, data):
        query = """
            UPDATE journalnotes
            SET is_resolved = 1
            WHERE idjournal_notes = %(idjournal_notes)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

# DELETE

    @classmethod
    def delete(cls, data):
        query = """
            DELETE FROM journalnotes 
            WHERE idjournal_notes = %(idjournal_notes)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)
    
    @classmethod
    def delete_all_journalnotes(cls):
        query = """
            DELETE FROM journalnotes;
        """
        return connectToMySQL(cls.db_name).query_db(query)
