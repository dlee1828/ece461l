from flask import Flask, send_from_directory, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from pymongo import MongoClient  # comment this on deployment
import urllib.parse
import json
import bson.json_util as json_util
from bson.objectid import ObjectId

app = Flask(__name__, static_url_path='', static_folder='client/build')
cors = CORS(app)  # comment this on deployment
api = Api(app)

password = "qx4BnukGCF7NMvGY"
connection_string = f"mongodb+srv://dlee1828:{password}@cluster0.ah7ruoj.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(connection_string)

db = client['ece461l-database']
users_collection = db['users']
projects_collection = db['projects']
resources_collection = db['resources']
total_resources_collection = db['total-resources']


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/signIn')
def sign_in():
    print("got here")
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
    users = json.loads(urllib.parse.unquote(args['ids']))
    project = {
        'name': name,
        'description': description,
        'users': users
    }
    projectId = projects_collection.insert_one(project).inserted_id

    # Create resources for project
    # Assuming all capacities = 100
    resources_dict = {
        'projectId': projectId,
        'usage': 0,
    }

    resources_collection.insert_one(resources_dict)

    return 'success'


def parse_json(data):
    return json.loads(json_util.dumps(data))


@app.route('/getProjects')
def get_projects():
    args = request.args
    userId = urllib.parse.unquote(args['userId'])
    num_projects = projects_collection.count_documents(
        {'users': userId})
    if num_projects == 0:
        print("NO PROJECTS FOUND")
        print("USERID: ", userId)
        return "no projects"
    projects_list = []
    for x in projects_collection.find({'users': userId}):
        projects_list.append(x)
    projects_list_string = parse_json(projects_list)
    return projects_list_string


@app.route('/joinProject')
def join_project():
    args = request.args
    userId = urllib.parse.unquote(args['userId'])
    projectId = urllib.parse.unquote(args['projectId'])
    doc = projects_collection.find_one({'_id': ObjectId(projectId)})
    if userId not in doc['users']:
        doc['users'].append(userId)
    projects_collection.update_one({'_id': ObjectId(projectId)}, {'$set': doc})
    return "success"


@app.route('/leaveProject')
def leave_project():
    args = request.args
    userId = urllib.parse.unquote(args['userId'])
    projectId = urllib.parse.unquote(args['projectId'])
    doc = projects_collection.find_one({'_id': ObjectId(projectId)})
    if userId in doc['users']:
        doc['users'].remove(userId)
    projects_collection.update_one({'_id': ObjectId(projectId)}, {'$set': doc})
    return "success"


@app.route('/getUsernamesFromIds')
def get_usernames_from_ids():
    args = request.args
    string = urllib.parse.unquote(args['ids'])
    ids = json.loads(string)
    usernames = []
    count = users_collection.count_documents(
        {"_id": {"$in": [ObjectId(id) for id in ids]}})
    if count > 0:
        docs = users_collection.find(
            {"_id": {"$in": [ObjectId(id) for id in ids]}})
        for doc in docs:
            username = doc['username']
            usernames.append(username)
    return json.dumps(usernames)


@app.route('/getProjectResources')
def get_project_resources():
    args = request.args
    projectId = urllib.parse.unquote(args['projectId'])
    resources = resources_collection.find_one(
        {'projectId': ObjectId(projectId)})
    to_return = resources['usage']
    return json.dumps(to_return)


@app.route('/updateResources')
def update_resources():
    args = request.args
    projectId = urllib.parse.unquote(args['projectId'])
    hwset = urllib.parse.unquote(args['hwset'])
    change = int(urllib.parse.unquote(args['change']))
    resources_collection.update_one({'projectId': ObjectId(projectId)}, {
                                    '$inc': {'usage': -1 * change}})

    if hwset == 'hwset1':
        total_resources_collection.update_one({}, {'$inc': {'hwset1': change}})
    elif hwset == 'hwset2':
        total_resources_collection.update_one({}, {'$inc': {'hwset2': change}})

    return 'success'


@app.route('/getAllUsers')
def get_all_users():
    users_list = []
    for x in users_collection.find({}):
        users_list.append(
            {'id': str(x['_id']), 'username': x['username']})
    return json.dumps(users_list)


@app.route('/getResources')
def get_resources():
    res = total_resources_collection.find_one({})
    return json.dumps({'hwset1': res['hwset1'], 'hwset2': res['hwset2']})


total_resources_collection.insert_one({'hwset1': 100, 'hwset2': 100})
