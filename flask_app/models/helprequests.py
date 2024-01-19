from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app.models import storyitems, characters, journalnotes, helprequests, news, characterhasjournalnotes, characterhasstoryitem, characterhashelprequest, topsecret, votes, appinstances, faqs, characterhastopsecret

class HelpRequest:
    db_name = 'lancasters_schema' 
    
    def __init__(self, db_data):
        self.idhelprequests = db_data['idhelprequests']
        self.is_resolved = db_data['is_resolved']
        self.subject = db_data['subject']
        self.description = db_data['description']
        self.app_id = db_data['app_id']  
        self.created_id = db_data['created_id']  
        self.created_at = db_data['created_at']
        self.updated_at = db_data['updated_at']

    # CREATE
    @classmethod
    def create_help_request(cls, data):
        query = """
            INSERT INTO helprequests (is_resolved, subject, description, app_id, created_id)
            VALUES (%(is_resolved)s, %(subject)s, %(description)s, %(app_id)s, %(created_id)s);
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    # READ
    @classmethod
    def get_all_help_requests(cls, app_id):
        query = """
            SELECT *
            FROM helprequests
            WHERE app_id = %(app_id)s;
        """
        data = {'app_id': app_id}
        results = connectToMySQL(cls.db_name).query_db(query, data)
        all_help_requests = [cls(row) for row in results]
        return all_help_requests

    @classmethod
    def get_help_request_by_id(cls, help_request_id):
        query = """
            SELECT *
            FROM helprequests
            WHERE idhelprequests = %(help_request_id)s;
        """
        data = {'help_request_id': help_request_id}
        result = connectToMySQL(cls.db_name).query_db(query, data)
        return cls(result[0]) if result else None
    
    @classmethod
    def get_resolved_help_requests(cls, app_id):
        query = """
            SELECT *
            FROM helprequests
            WHERE app_id = %(app_id)s AND is_resolved = 1;
        """
        data = {'app_id': app_id}
        results = connectToMySQL(cls.db_name).query_db(query, data)
        resolved_help_requests = [cls(row) for row in results]
        return resolved_help_requests

    # UPDATE
    @classmethod
    def update_help_request(cls, data):
        query = """
            UPDATE helprequests
            SET subject = %(subject)s, description = %(description)s
            WHERE idhelprequests = %(idhelprequests)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)
    
    @classmethod
    def update_status_help_request(cls, data):
        query = """
            UPDATE helprequests
            SET status = %(status)s
            WHERE idhelprequests = %(idhelprequests)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    # DELETE
    @classmethod
    def delete_help_request(cls, help_request_id):
        query = """
            DELETE FROM helprequests
            WHERE idhelprequests = %(help_request_id)s;
        """
        data = {'help_request_id': help_request_id}
        return connectToMySQL(cls.db_name).query_db(query, data)
    
    @classmethod
    def delete_all_help_request(cls, app_id):
        query = """
            DELETE FROM helprequests
            WHERE app_id = %(app_id)s;
        """
        data = {'app_id': app_id}
        return connectToMySQL(cls.db_name).query_db(query, data)
