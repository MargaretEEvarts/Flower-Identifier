from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from api.Image_updater import *

app = Flask(__name__)

CORS(app)

api = Api(app)

api.add_resource(ImageUploader, '/upload') #POST

if __name__ == '__main__':
    app.run(debug=True, port=4999)