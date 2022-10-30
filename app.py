from flask import Flask, send_from_directory, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS  # comment this on deployment

app = Flask(__name__, static_url_path='', static_folder='client/build')
CORS(app)  # comment this on deployment
api = Api(app)


# @app.route('/')
# def index():
#     return app.send_static_file('index.html')

@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/test')
def handle_checkOut_hardware():
    return "this works"

# Maybe this? ?
