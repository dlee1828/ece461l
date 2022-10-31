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
        return "successful sign in"


@app.route('/signUp')
def sign_up():
    args = request.args
    username = urllib.parse.unquote(args['username'])
    password = urllib.parse.unquote(args['password'])

    user = {
        "username": username,
        "password": password
    }

    users_collection.insert_one(user)

    return "yeah"

# Maybe this? ? a change
