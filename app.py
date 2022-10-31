from flask import Flask, send_from_directory, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from pymongo import MongoClient  # comment this on deployment
import urllib.parse

app = Flask(__name__, static_url_path='', static_folder='client/build')
CORS(app)  # comment this on deployment
api = Api(app)

password = "qx4BnukGCF7NMvGY"
connection_string = f"mongodb+srv://dlee1828:{password}@cluster0.ah7ruoj.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(connection_string)

db = client['ece461l-database']
users_collection = db['users']
projects_collection = db['projects']


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/signIn')
def sign_in():
    args = request.args
    username = urllib.parse.unquote(args['username'])
    password = urllib.parse.unquote(args['password'])

    potential_user = {
        'username': username,
        'password': password
    }

    res = users_collection.find_one(potential_user)
    if res == None:
        return "user not found"
    else:
        id = res.get('_id')
        return f"success {id}"


@app.route('/signUp')
def sign_up():
    args = request.args
    username = urllib.parse.unquote(args['username'])
    password = urllib.parse.unquote(args['password'])

    user = {
        "username": username,
        "password": password
    }

    # Check if username is taken
    taken = users_collection.count_documents({'username': username})
    if taken > 0:
        return "username taken"
    else:
        users_collection.insert_one(user)
        user = users_collection.find_one(user)
        id = user.get('_id')
        return f"success {id}"


@app.route("/createProject")
def create_project():
    args = request.args
    name = urllib.parse.unquote(args['name'])
    description = urllib.parse.unquote(args['description'])
    project = {
        'name': name,
        'description': description,
        'users': []
    }
    projects_collection.insert_one(project)
    return 'success'


@app.route('/getProjects')
def get_projects():
    for x in projects_collection:
        print(x)

# Maybe this? ? a change
