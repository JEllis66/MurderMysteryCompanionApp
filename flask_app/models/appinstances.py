from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app.models import storyitems, characters, journalnotes, helprequests, news, characterhasjournalnotes, characterhasstoryitem, characterhashelprequest, topsecret, votes, appinstances, faqs, characterhastopsecret

class AppInstances:
    db_name = 'lancasters_schema'

    def __init__(self, db_data):
        self.idappinstances = db_data['idappinstances']
        self.app_title = db_data['app_title']
        self.selected_motive = db_data['selected_motive']
        self.killer = db_data['killer']
        self.admin_login_name = db_data['admin_login_name']
        self.admin_login_password = db_data['admin_login_password']
        self.default_app_color = db_data['default_app_color']
        self.default_app_background = db_data['default_app_background']
        self.app_theme_darker = db_data['app_theme_darker']
        self.app_theme_lighter = db_data['app_theme_lighter']
        self.primary_font_color = db_data['primary_font_color']
        self.primary_button_color = db_data['primary_button_color']
        self.theme_nav_font_color = db_data['theme_nav_font_color']
        self.primary_button_font_color = db_data['primary_button_font_color']
        self.app_logo = db_data['app_logo']
        self.newspaper_name = db_data['newspaper_name']
        self.user_messaging = db_data['user_messaging']
        self.app_keycode = db_data['app_keycode']
        self.created_at = db_data['created_at']
        self.updated_at = db_data['updated_at']

# CREATE
    @classmethod
    def create(cls, data):
        query = """
        INSERT INTO appinstances 
            (app_title, selected_motive, killer, admin_login_name, 
            admin_login_password, default_app_color, default_app_background, 
            app_theme_darker, app_theme_lighter, primary_font_color, 
            primary_button_color, theme_nav_font_color, primary_button_font_color, 
            app_logo, newspaper_name, user_messaging, app_keycode) 
        VALUES 
            (%(app_title)s, %(selected_motive)s, %(killer)s, %(admin_login_name)s, 
            %(admin_login_password)s, %(default_app_color)s, %(default_app_background)s, 
            %(app_theme_darker)s, %(app_theme_lighter)s, %(primary_font_color)s, 
            %(primary_button_color)s, %(theme_nav_font_color)s, %(primary_button_font_color)s, 
            %(app_logo)s, %(newspaper_name)s, %(user_messaging)s, %(app_keycode)s);
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

# READ
    @classmethod
    def get_all(cls):
        query = """
        SELECT * 
        FROM appinstances;
        """
        results = connectToMySQL(cls.db_name).query_db(query)
        all_appinstances = [cls(row) for row in results]
        return all_appinstances
    
    @classmethod
    def get_by_id(cls, data):
        query = """
        SELECT *
        FROM appinstances
        WHERE idappinstances = %(idappinstances)s;
        """
        results = connectToMySQL(cls.db_name).query_db(query, data)
        return cls(results[0]) if results else None
    
    @classmethod
    def get_colors_by_id(cls, app_instance_id):
        query = """
            SELECT default_app_color, default_app_background, app_theme_darker, app_theme_lighter,
                primary_font_color, primary_button_color, theme_nav_font_color, primary_button_font_color
            FROM appinstances
            WHERE idappinstances = %s;
        """
        data = {'idappinstances': app_instance_id}
        return connectToMySQL(cls.db_name).query_db(query, data)

# UPDATE
    @classmethod
    def update(cls, data):
        query = """
        UPDATE appinstances
        SET app_title = %(app_title)s,
            selected_motive = %(selected_motive)s,
            killer = %(killer)s,
            admin_login_name = %(admin_login_name)s,
            admin_login_password = %(admin_login_password)s,
            default_app_color = %(default_app_color)s,
            default_app_background = %(default_app_background)s,
            app_theme_darker = %(app_theme_darker)s,
            app_theme_lighter = %(app_theme_lighter)s,
            primary_font_color = %(primary_font_color)s,
            primary_button_color = %(primary_button_color)s,
            theme_nav_font_color = %(theme_nav_font_color)s,
            primary_button_font_color = %(primary_button_font_color)s,
            app_logo = %(app_logo)s,
            newspaper_name = %(newspaper_name)s,
            user_messaging = %(user_messaging)s,
            app_keycode = %(app_keycode)s
        WHERE idappinstances = %(idappinstances)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

# DELETE
    @classmethod
    def delete(cls, data):
        query = """
        DELETE FROM appinstances 
        WHERE idappinstances = %(idappinstances)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

