from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_bcrypt import Bcrypt
from flask_app.models import storyitems, characters, journalnotes, helprequests, news, characterhasjournalnotes, characterhasstoryitem, characterhashelprequest, topsecret, votes, appinstances, faqs, characterhastopsecret

bcrypt = Bcrypt()

class Character:
    db_name = "lancasters_schema"
    
    def __init__(self, data):
        self.idcharacters = data['idcharacters']
        self.login_username = data['login_username']
        self.login_password = data['login_password']
        self.email = data['email']
        self.role = data['role']
        self.relationship = data['relationship']
        self.potential_motive = data['potential_motive']
        self.method_1 = data['method_1']
        self.method_2 = data['method_2']
        self.method_3 = data['method_3']
        self.linked_item_1 = data['linked_item_1']
        self.linked_item_2 = data['linked_item_2']
        self.linked_item_3 = data['linked_item_3']
        self.priv = data['priv']
        self.alert_active = data['alert_active']
        self.alert_message = data['alert_active']
        self.backstory = data['backstory']  
        self.app_id = data['app_id']  
        self.is_active = data['is_active']  
        self.is_killer = data['is_killer']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

# CREATE

    @classmethod
    def save(cls, data):
        # Hash the password before saving it to the database
        data['login_password'] = bcrypt.generate_password_hash(data['login_password']).decode('utf-8')

        query = """
            INSERT INTO characters (login_username, login_password, email, role, relationship, potential_motive, method_1, method_2, method_3, linked_item_1, linked_item_2, linked_item_3, priv, alert_active, alert_message, backstory, app_id, is_active, is_killer) 
            VALUES (%(login_username)s, %(login_password)s, %(email)s, %(role)s, %(relationship)s, %(potential_motive)s, %(method_1)s, %(method_2)s, %(method_3)s, %(linked_item_1)s, %(linked_item_2)s, %(linked_item_3)s, %(priv)s, %(alert_active)s, %(alert_message)s, %(backstory)s, %(app_id)s, %(is_active)s, %(is_killer)s)
        ;"""
        return connectToMySQL(cls.db_name).query_db(query, data)

# READ

    @classmethod
    def authenticate(cls, username, password):
        query = """
            SELECT * 
            FROM characters
            WHERE login_username = %(username)s;
        """
        data = {'username': username}
        user = connectToMySQL(cls.db_name).query_db(query, data, one=True)

        if user and user['login_password'] == password:
            return cls(user)
        else:
            return None

    @classmethod
    def check_password(cls, candidate_password, hashed_password):
        # Check if the candidate password matches the hashed password
        return bcrypt.check_password_hash(hashed_password, candidate_password)

    @classmethod
    def get_all(cls):
        query = """
            SELECT * 
            FROM characters;
        """
        results = connectToMySQL(cls.db_name).query_db(query)
        characters = [cls(row) for row in results]
        return characters

    @classmethod
    def get_by_username(cls, data):
        query = """
            SELECT * 
            FROM characters
            WHERE login_username = %(login_username)s;
        """
        results = connectToMySQL(cls.db_name).query_db(query, data)
        return cls(results[0]) if results else None

    @classmethod
    def get_by_id(cls, data):
        query = """
            SELECT * 
            FROM characters 
            WHERE idcharacters = %(idcharacters)s;
        """
        results = connectToMySQL(cls.db_name).query_db(query, data)
        return cls(results[0]) if results else None
    
    @classmethod
    def get_by_app_id(cls, data):
        query = """
            SELECT * 
            FROM characters
            WHERE app_id = %(app_id)s;
        """
        results = connectToMySQL(cls.db_name).query_db(query, data)
        characters = [cls(row) for row in results]
        return characters
    
    @classmethod
    def get_alert_message_by_id(cls, character_id):
        query = """
            SELECT alert_message
            FROM characters
            WHERE idcharacters = %(character_id)s;
        """
        data = {'character_id': character_id}
        result = connectToMySQL(cls.db_name).query_db(query, data)
        return result[0]['alert_message'] if result else None

# UPDATE

    @classmethod
    def update(cls, data):
        query = """
            UPDATE characters SET
                login_username = %(login_username)s,
                role = %(role)s,
                relationship = %(relationship)s,
                potential_motive = %(potential_motive)s,
                priv = %(priv)s,
                method_1 = %(method_1)s,
                method_2 = %(method_2)s,
                method_3 = %(method_3)s,
                backstory = %(backstory)s,  
                app_id = %(app_id)s,  
                isActive = %(isActive)s  
            WHERE idcharacters = %(idcharacters)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    @classmethod
    def toggle_alert_active_on_for_ids(cls, character_ids):
        query = """
            UPDATE characters
            SET alert_active = 1
            WHERE idcharacters IN %(character_ids)s;
        """
        data = {'character_ids': character_ids}
        return connectToMySQL(cls.db_name).query_db(query, data)

    @classmethod
    def toggle_alert_active_on_for_all(cls):
        query = """
            UPDATE characters
            SET alert_active = 1;
        """
        return connectToMySQL(cls.db_name).query_db(query)
    
    @classmethod
    def toggle_alert_active_off_for_ids(cls, character_ids):
        query = """
            UPDATE characters
            SET alert_active = 0
            WHERE idcharacters IN %(character_ids)s;
        """
        data = {'character_ids': character_ids}
        return connectToMySQL(cls.db_name).query_db(query, data)
    
    @classmethod
    def toggle_alert_active_off_for_all(cls):
        query = """
            UPDATE characters
            SET alert_active = 0;
        """
        return connectToMySQL(cls.db_name).query_db(query)
    
    @classmethod
    def update_alert_message(cls, data):
        query = """
            UPDATE characters
            SET alert_message = %(alert_message)s
            WHERE idcharacters = %(idcharacters)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

# DELETE

    @classmethod
    def delete_one(cls, data):
        query = """
            DELETE FROM characters
            WHERE idcharacters = %(id)s;
        """
        return connectToMySQL(cls.db_name).query_db(query, data)

    @classmethod
    def nuke(cls):
        query = """
            DELETE FROM characters;
        """
        return connectToMySQL(cls.db_name).query_db(query)

#MISC

    @staticmethod
    def generate_reset_code(length=30):
        return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

    # Add a method to initiate the password reset process
    @classmethod
    def initiate_password_reset(cls, email):
        # Generate a reset code
        reset_code = cls.generate_reset_code()

        # Store the reset code and its expiration time in the database
        expiration_time = datetime.now() + timedelta(hours=1)  # Adjust as needed
        query = """
            UPDATE characters
            SET reset_code = %(reset_code)s, reset_code_expiration = %(expiration_time)s
            WHERE email = %(email)s;
        """
        data = {'reset_code': reset_code, 'expiration_time': expiration_time, 'email': email}
        connectToMySQL(cls.db_name).query_db(query, data)

        # Send an email to the user with a link containing the reset code
        # Include the reset code in the link (e.g., /reset-password?code=ABC123)
        # SendEmailFunction(email, f"Password Reset for {your_app_name}", f"Click here to reset your password: https://example.com/reset-password?code={reset_code}")

    # Add a method to verify the reset code
    @classmethod
    def verify_reset_code(cls, email, reset_code):
        query = """
            SELECT reset_code, reset_code_expiration
            FROM characters
            WHERE email = %(email)s;
        """
        data = {'email': email}
        result = connectToMySQL(cls.db_name).query_db(query, data, one=True)

        if result and result['reset_code'] == reset_code and result['reset_code_expiration'] > datetime.now():
            return True
        else:
            return False

    # Add a method to reset the password after verifying the code
    @classmethod
    def reset_password(cls, email, new_password):
        # Hash the new password before saving it to the database
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')

        # Update the password and clear the reset code fields
        query = """
            UPDATE characters
            SET login_password = %(hashed_password)s, reset_code = NULL, reset_code_expiration = NULL
            WHERE email = %(email)s;
        """
        data = {'hashed_password': hashed_password, 'email': email}
        connectToMySQL(cls.db_name).query_db(query, data)