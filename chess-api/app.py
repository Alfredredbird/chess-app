
import hashlib
import os
import random
import secrets
from flask import Flask, abort, request, make_response, jsonify
from werkzeug.utils import secure_filename
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
from flask_caching import Cache

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1BigRedBird@localhost/chess'
db = SQLAlchemy(app)
CORS(app)


# Define the folder where uploaded files will be saved
UPLOAD_FOLDER = '../chess-frontend/public/uploads/profilepick'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

###
# Database configurations
###
# Database for storing game information
class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player1 = db.Column(db.String(16), nullable=False)
    player2 = db.Column(db.String(16), nullable=False)
    winner = db.Column(db.String(16), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
   
    def __repr__(self):
        return f"Game {self.id}"

    def to_dict(self):
        return {
            "id": self.id,
            "player1": self.player1,
            "player2": self.player2,
            "winner": self.winner,
            "created_at": self.created_at
        }

# database for user passwords
class Auth(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    user_name = db.Column(db.String(16), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    loggedin = db.Column(db.String(6), nullable=False, default="False")  # Added loged in field
    cookie = db.Column(db.String(100), nullable=False, default="")

    def __init__(self, password, email, user_name, created_at, loggedin, cookie):
        self.password = password
        self.email = email
        self.user_name = user_name
        self.created_at = created_at
        self.loggedin = loggedin
        self.cookie = cookie

# database for user on going games
class Games(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(16), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    black = db.Column(db.String(160), nullable=False, default="")
    white = db.Column(db.String(160), nullable=False, default="")
    winner = db.Column(db.String(16), nullable=False, default="")
    def __init__(self, user_name, created_at, black, white, winner):
        self.user_name = user_name
        self.created_at = created_at
        self.black = black
        self.white = white
        self.winner = winner

# database for user info
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=True)
    user_name = db.Column(db.String(16), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    wins = db.Column(db.Integer, nullable=False, default=0)  # Added wins field
    profile_picture = db.Column(db.String(256), nullable=True)
    theme = db.Column(db.String(256), nullable=True)
    country = db.Column(db.String(10), nullable=False, default='')
    def __repr__(self):
        return f"user {self.description}"
    
    def __init__(self, description, id, user_name, created_at, wins, profile_picture,theme,country):
        self.id = id
        self.description = description
        self.user_name = user_name
        self.created_at = created_at
        self.wins = wins
        self.profile_picture = profile_picture
        self.theme = theme
        self.country = country

# Database for storing chess puzzles
class chess_puzzles(db.Model):
    puzzleid = db.Column(db.Integer, primary_key=True)
    fen = db.Column(db.String(100), nullable=False)  # FEN (Forsyth–Edwards Notation) for the board position
    moves = db.Column(db.String(500), nullable=False)  # Sequence of moves leading to the puzzle
    rating = db.Column(db.Float, nullable=False)  # Rating of the puzzle
    ratingdeviation = db.Column(db.Float, nullable=False)  # Rating deviation
    popularity = db.Column(db.Integer, nullable=False)  # Popularity score of the puzzle
    nbplays = db.Column(db.Integer, nullable=False)  # Number of plays
    themes = db.Column(db.String(200), nullable=True)  # Themes related to the puzzle
    gameurl = db.Column(db.String(255), nullable=True)  # URL to the game or puzzle source
    openingtags = db.Column(db.String(100), nullable=True)  # Opening tags

    def __repr__(self):
        return f"<Puzzle {self.id}>"

    def to_dict(self):
        return {
            "puzzleid": self.puzzleid,
            "fen": self.fen,
            "moves": self.moves,
            "rating": self.rating,
            "ratingdeviation": self.ratingdeviation,
            "popularity": self.popularity,
            "nbplays": self.nbplays,
            "themes": self.themes,
            "gameurl": self.gameurl,
            "openingtags": self.openingtags
        }
    def __init__(self, puzzleid, fen, moves, rating, ratingdeviation, popularity, nbplays, themes, gameurl, openingtags):
        self.puzzleid = puzzleid
        self.fen = fen
        self.moves = moves
        self.rating = rating
        self.ratingdeviation = ratingdeviation
        self.popularity = popularity
        self.nbplays = nbplays
        self.themes = themes
        self.gameurl = gameurl
        self.openingtags = openingtags
    


def format_user(user):
    return {
        "description": user.description,
        "id": user.id,
        "created_at": user.created_at
    }

@app.route('/')
def main():
    return "Hey"

# creates an user
@app.route('/api/post/', methods = ["POST"])
def create_user():
    description = request.json['description']
    user = User(description)
    db.session.add(user)
    db.session.commit()
    return format_user(user)

# get all users
@app.route('/api/post/', methods = ['GET'])
def get_users():
    users = User.query.order_by(User.id.asc()).all()
    user_list = []
    for user in users:
        user_list.append(format_user(user))
    return {'users': user_list}

# get single user
@app.route('/api/post/<id>', methods = ['GET'])
def get_user(id):
    user = User.query.filter_by(id=id).one()
    formatted_user = format_user(user)
    return {'user': formatted_user}

# deletes envent
@app.route('/api/delete/<id>', methods = ['DELETE'])
def delete_user(id):
    user = User.query.filter_by(id=id).one()
    db.session.delete(user)
    db.session.commit()
    return f'user (id: {id}) deleted successfully'

@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    # Modified SQL query to include profile_picture and country in GROUP BY
    results = db.session.query(User.user_name, 
                               db.func.count(Game.winner), 
                               User.profile_picture, 
                               User.country) \
        .join(Game, Game.winner == User.user_name) \
        .group_by(User.user_name, User.profile_picture, User.country) \
        .order_by(db.func.count(Game.winner).desc()).all()

    leaderboard = [
        {
            "user_name": row[0],
            "wins": row[1],
            "profile_picture": row[2],
            "country": row[3]  # Include the country information
        } for row in results
    ]
    
    return {"leaderboard": leaderboard}



@app.route('/api/recent_games', methods=['GET'])
def get_recent_games():
    games = Game.query.order_by(Game.created_at.desc()).limit(5).all()
    return {"recent_games": [game.to_dict() for game in games]}

# fetches games bassed on username
@app.route('/api/recent_games/<username>', methods=['GET'])
def get_user_recent_games(username):
    # Fetch recent games where either player1 or player2 matches the username
    games = Game.query.filter((Game.player1 == username) | (Game.player2 == username)).order_by(Game.created_at.desc()).limit(5).all()
    
    if games:
        return {"recent_games": [game.to_dict() for game in games]}, 200
    else:
        return {"message": "No recent games found for this user"}, 404


#edit user
@app.route('/api/member/edit', methods=['POST'])
def edit_member():
    auth_token = request.headers.get('Authorization')
    print(f'Received authToken: {auth_token}')  # Debugging line

    if not auth_token or not auth_token.startswith('Bearer '):
        return {"error": "Authentication required"}, 401

    # Remove 'Bearer' from token to get actual token value
    token_value = auth_token.split(' ')[1]

    # Verify the token in the Auth table
    auth_entry = Auth.query.filter_by(cookie=token_value).first()
    print(f'Auth entry: {auth_entry}')  # Debugging line

    if not auth_entry:
        return {"error": "Invalid token or not authorized"}, 403

    # Fetch user data using the user_name in the Auth entry
    user = User.query.filter_by(user_name=auth_entry.user_name).first()
    print(f'User from DB: {user}')  # Debugging line

    if not user:
        return {"error": "User not found"}, 404

    # Update the user information based on the request
    new_user_name = request.json.get('user_name', user.user_name)
    description = request.json.get('description', user.description)
    theme = request.json.get('theme', user.theme)

    user.user_name = new_user_name
    user.description = description
    user.theme = theme

    # Update the Auth table as well with the new username
    auth_entry.user_name = new_user_name

    db.session.commit()
    print('User profile updated successfully')  # Debugging line

    return {"message": "User profile updated successfully", "user": format_user(user)}, 200




###
# Game api logic
###

@app.route('/api/update_wins/<username>', methods=['PUT'])
def update_wins(username):
    user = User.query.filter_by(user_name=username).first()
    if user:
        user.wins += 1
        db.session.commit()
        return {"message": "Wins updated successfully", "user": format_user(user)}, 200
    else:
        return {"error": "User not found"}, 404

@app.route('/api/games/<int:id>', methods=['GET'])
def get_game_info(id):
    game = Games.query.filter_by(id=id).first()  # Use 'game' instead of 'id' to avoid confusion
    if game:
        game_data = {
            "id": game.id,
            "white": str(game.white),
            "black": str(game.black),
            "winner": game.winner,
            "created_at": str(game.created_at)
        }
        return {"game": game_data}, 200
    else:
        return {"error": "Game not found"}, 404


###
# Puzzle Logic
###

# create a new puzzle
@app.route('/api/chesspuzzle/', methods=["POST"])
def create_chess_puzzle():
    fen = request.json['fen']
    moves = request.json['moves']
    rating = request.json['rating']
    ratingdeviation = request.json['ratingdeviation']
    popularity = request.json['popularity']
    nbplays = request.json['nbplays']
    themes = request.json.get('themes')
    gameurl = request.json.get('gameurl')
    openingtags = request.json.get('openingtags')

    # Create a new ChessPuzzle entry
    puzzle = chess_puzzles(
        fen=fen,
        moves=moves,
        rating=rating,
        ratingdeviation=ratingdeviation,
        popularity=popularity,
        nbplays=nbplays,
        themes=themes,
        gameurl=gameurl,
        openingtags=openingtags
    )
    
    db.session.add(puzzle)
    db.session.commit()

    return puzzle.to_dict(), 201

# fetch all puzzles
@app.route('/api/chesspuzzle/', methods=['GET'])
def get_chess_puzzles():
    puzzles = chess_puzzles.query.order_by(chess_puzzles.puzzleid.asc()).all()
    puzzle_list = [puzzle.to_dict() for puzzle in puzzles]
    return {'chess_puzzles': puzzle_list}, 200

# fetch by id
@app.route('/api/chesspuzzle/<puzzleid>', methods=['GET'])
def get_chess_puzzle(puzzleid):
    puzzle = chess_puzzles.query.filter_by(puzzleid=puzzleid).one()
    return {'chess_puzzle': puzzle.to_dict()}, 200

# delete by id
@app.route('/api/chesspuzzle/<puzzleid>', methods=['DELETE'])
def delete_chess_puzzle(puzzleid):
    puzzle = chess_puzzles.query.filter_by(puzzleid=puzzleid).one()
    db.session.delete(puzzle)
    db.session.commit()
    return f'Puzzle (id: {puzzleid}) deleted successfully', 200

# edit puzzle
@app.route('/api/chesspuzzle/edit', methods=['POST'])
def edit_chess_puzzle():
    puzzle_id = request.json['puzzleid']
    puzzle = chess_puzzles.query.filter_by(id=puzzle_id).first()

    if puzzle:
        puzzle.fen = request.json.get('fen', puzzle.fen)
        puzzle.moves = request.json.get('moves', puzzle.moves)
        puzzle.rating = request.json.get('rating', puzzle.rating)
        puzzle.ratingdeviation = request.json.get('ratingdeviation', puzzle.ratingdeviation)
        puzzle.popularity = request.json.get('popularity', puzzle.popularity)
        puzzle.nbplays = request.json.get('nbplays', puzzle.nbplays)
        puzzle.themes = request.json.get('themes', puzzle.themes)
        puzzle.gameurl = request.json.get('gameurl', puzzle.gameurl)
        puzzle.openingtags = request.json.get('openingtags', puzzle.openingtags)

        db.session.commit()
        return puzzle.to_dict(), 200
    else:
        return {"error": "Puzzle not found"}, 404

@app.route('/api/chesspuzzle/daily', methods=['GET'])
def get_daily_chess_puzzle():
    today = datetime.today().date()
    daily_puzzle = chess_puzzles.query.filter(chess_puzzles.created_at >= today).first()
    if daily_puzzle:
        return {'chess_puzzle': daily_puzzle.to_dict()}, 200
    else:
        return {"error": "No daily puzzle found for today"}, 404


cache = Cache(config={'CACHE_TYPE': 'redis'})  # Use Redis for caching

@app.route('/api/chesspuzzle/random', methods=['GET'])
def get_chess_puzzle_by_rating():
    # Extract the query parameter for the number (rating in this case)
    number = request.args.get('number', type=int)
    
    if number is None:
        return {"error": "Please provide a valid number"}, 400

    # Fetch the puzzle based on the given number (rating)
    puzzle = chess_puzzles.query.filter_by(rating=number).first()
    
    if puzzle:
        return {'chess_puzzle': puzzle.to_dict()}, 200
    else:
        return {"error": f"No puzzle found with rating {number}"}, 404







### 
# Api for members
###
@app.route('/api/member/<username>', methods=['GET'])
def get_user_info(username):
    user = User.query.filter_by(user_name=username).first()
    if user:
        wins_count = db.session.query(db.func.count(Game.winner)).filter(Game.winner == username).scalar()
        user_data = {
            "user_name": username,
            "id": user.id,
            "description": user.description,
            "created_at": user.created_at,
            "wins": wins_count,  # Calculate the wins dynamically
            'user_pfp': user.profile_picture,
            'theme': user.theme,
            'country': user.country
        }
        return {"user": user_data}, 200
    else:
        return {"error": "User not found"}, 404

###
# Auth
###

def sha256_encrypt(text):
    # Create a new sha256 hash object
    sha256_hash = hashlib.sha256()
    
    # Update the hash object with the bytes of the input text
    sha256_hash.update(text.encode('utf-8'))
    
    # Get the hexadecimal representation of the digest
    return sha256_hash.hexdigest()

# Route to push user_name, password, email, and created_at to the Auth table
@app.route('/api/auth/', methods=["POST"])
def create_auth():
    try:
        user_name = request.json['user_name']
        password = request.json['password']
        confirmPassword = request.json['confirmPassword']
        email = request.json['email']
        country = request.json['country']
        created_at = datetime.utcnow()  # Automatically set the current timestamp

        # Check if passwords match
        if password != confirmPassword:
            return {"error": "Passwords do not match"}, 400

        # Encrypt the password
        hashed_password = sha256_encrypt(password)

        # Check if the user already exists in the database
        existing_user = Auth.query.filter((Auth.email == email) | (Auth.user_name == user_name)).first()
        if existing_user:
            return {"error": "User already exists"}, 409  # 409 Conflict

        secure_cookie = secrets.token_hex(16)

        auth_entry = Auth(
            password=hashed_password,
            email=email,
            user_name=user_name,
            created_at=created_at,
            loggedin="True",
            cookie=secure_cookie
        )
        
        # sends data to the user database
        user_entry = User(
            id=auth_entry.id,
            description='',
            user_name=user_name,
            created_at=created_at,
            wins=0,
            theme = 'default',
            profile_picture = None,
            country= country
        )
        db.session.add(auth_entry)
        db.session.commit()
        db.session.add(user_entry)
        db.session.commit()
        
        # Prepare response with the cookie
        response_data = {
            "id": auth_entry.id,
            "user_name": auth_entry.user_name,
            "email": auth_entry.email,
            "created_at": auth_entry.created_at.isoformat(),
            "cookie": auth_entry.cookie
        }

        # Set the cookie in the response
        response = make_response(response_data)
        response.set_cookie('auth_cookie', secure_cookie, httponly=True, samesite='Strict')

        return response, 201
    except KeyError as e:
        return {"error": f"Missing key: {str(e)}"}, 400


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return {"message": "Username and password are required"}, 400

    user = Auth.query.filter_by(user_name=username).first()
    if user:
        # Verify the password
        hashed_password = sha256_encrypt(password)  # Ensure this matches your hashing mechanism
        if user.password == hashed_password:
            # Generate a unique session token (you can use `secrets.token_hex` or similar)
            token = secrets.token_hex(16)
            user.loggedin = "True"
            user.cookie = token
            db.session.commit()
            return {"message": "Login successful", "token": token}, 200
        else:
            return {"message": "Invalid credentials"}, 401
    else:
        return {"message": "User not found"}, 404

@app.route('/api/logout', methods=['POST'])
def logout():
    response = make_response(jsonify({"success": True}))
    response.delete_cookie('authToken')  # Remove the authToken cookie
    return response

@app.route('/api/verify_cookie', methods=['POST'])
def verify_cookie():
    data = request.json
    cookie = data.get('cookie')
    
    if not cookie:
        return {"success": False, "error": "Cookie not provided"}, 400

    user = Auth.query.filter_by(cookie=cookie, loggedin="True").first()
    if user:
        return {"success": True, "user": {"user_name": user.user_name, "email": user.email}}, 200
    else:
        return {"success": False, "error": "Invalid cookie"}, 401

###
# Uploads
###
# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'profile_picture' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['profile_picture']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        return jsonify({"success": True, "message": "File uploaded successfully", "filename": filename}), 200

###
# Lessons
###

@app.route('/api/lesson/<string:name>', methods=['GET'])
def get_json(name):
    # Construct the file path
    file_path = f"lessons/{name}.json"
    
    # Check if the file exists
    if not os.path.exists(file_path):
        abort(404, description="File not found")
    
    # Read the file contents
    try:
        with open(file_path, 'r') as file:
            data = file.read()
    except Exception as e:
        abort(500, description=f"Error reading the file: {str(e)}")
    
    # Return the JSON data
    try:
        json_data = jsonify(eval(data))
        return json_data
    except Exception as e:
        abort(500, description=f"Error parsing JSON: {str(e)}")


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host="192.168.12.32", debug=True)