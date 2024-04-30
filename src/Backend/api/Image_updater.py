from flask import Flask, request
from flask_restful import Resource
import threading
import io

import main.Train as train
import main.Identify as Identify
app = Flask(__name__)

class ImageUploader(Resource):
    def post(self):
        predict_images = []
        classification_results = {}
        files = request.files

        for index, key in enumerate(files):
            file = files[key]
            file_stream = file.stream
            
            buf = io.BytesIO(file_stream.read())

            classification_results[index] = ''

            predict_thread = threading.Thread(target=lambda: Identify.identify_image(buf, classification_results, index))
            predict_images.append(predict_thread)
            predict_thread.start()

        for thread in predict_images:
            thread.join()

        print(list(classification_results.values()))
        return list(classification_results.values())