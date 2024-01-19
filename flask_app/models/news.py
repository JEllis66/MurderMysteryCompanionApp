from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app.models import storyitems, characters, journalnotes, helprequests, news, characterhasjournalnotes, characterhasstoryitem, characterhashelprequest, topsecret, votes, appinstances, faqs, characterhastopsecret

class News:
    db_name = 'lancasters_schema' 
    
    def __init__(self, db_data):
        self.idnews = db_data['idnews']
        self.column_one_image = db_data['column_one_image']
        self.column_one_headline = db_data['column_one_headline']
        self.column_one_text = db_data['column_one_text']
        self.column_two_image = db_data['column_two_image']
        self.column_two_headline = db_data['column_two_headline']
        self.column_two_text = db_data['column_two_text']
        self.column_three_image = db_data['column_three_image']
        self.column_three_headline = db_data['column_three_headline']
        self.column_three_text = db_data['column_three_text']
        self.paper_date = db_data['paper_date']
        self.priority_number = db_data['priority_number']

# CREATE
    
    @classmethod
    def create_news(cls, data):
        query = """
            INSERT INTO news 
                (column_one_image, column_one_headline, column_one_text, 
                column_two_image, column_two_headline, column_two_text, 
                column_three_image, column_three_headline, column_three_text, 
                paper_date, priority_number)
            VALUES (
                %(column_one_image)s, %(column_one_headline)s, %(column_one_text)s, 
                %(column_two_image)s, %(column_two_headline)s, %(column_two_text)s, 
                %(column_three_image)s, %(column_three_headline)s, %(column_three_text)s, 
                %(paper_date)s, %(priority_number)s);
        """
        return connectToMySQL(cls.db_name).query_db(query, data)
    
# READ

    @classmethod
    def get_all_news(cls):
        query = """
            SELECT *
            FROM news;
        """
        results = connectToMySQL(cls.db_name).query_db(query)
        all_news = [cls(row) for row in results]
        return all_news

    @classmethod
    def get_news_by_id(cls, news_id):
        query = """
            SELECT *
            FROM news
            WHERE idnews = %(news_id)s;
        """
        data = {'news_id': news_id}
        result = connectToMySQL(cls.db_name).query_db(query, data)
        return cls(result[0]) if result else None
    
# UPDATE

    @classmethod
    def update_news(cls, data):
        query = """
            UPDATE news
            SET 
                column_one_image = %(column_one_image)s,
                column_one_headline = %(column_one_headline)s,
                column_one_text = %(column_one_text)s,
                column_two_image = %(column_two_image)s,
                column_two_headline = %(column_two_headline)s,
                column_two_text = %(column_two_text)s,
                column_three_image = %(column_three_image)s,
                column_three_headline = %(column_three_headline)s,
                column_three_text = %(column_three_text)s,
                paper_date = %(paper_date)s,
                priority_number = %(priority_number)s
            WHERE idnews = %(idnews)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)
    
# DELETE

    @classmethod
    def delete_news(cls, news_id):
        query = """
            DELETE FROM news
            WHERE idnews = %(news_id)s;
        """
        data = {'news_id': news_id}
        return connectToMySQL(cls.db_name).query_db(query, data)
    
    @classmethod
    def delete_all_news(cls):
        query = """
            DELETE * FROM news;
        """
        return connectToMySQL(cls.db_name).query_db(query)
