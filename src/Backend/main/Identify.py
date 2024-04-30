import numpy as np
import pickle
from keras import saving, preprocessing
from PIL import Image

SAVE_PATH_MODEL = '../Backend/saving_models/final_flower_model.h5'
SAVE_PATH_LABELS = '../Backend/saving_models/labels.pickle'

def identify_image(image_data, class_dict, index):
    model = saving.load_model(SAVE_PATH_MODEL, compile=True)

    CLASS_NAMES = pickle.loads(open(SAVE_PATH_LABELS, "rb").read())
    
    the_image = Image.open(image_data)

    the_image = the_image.convert('RGB')
    the_image = the_image.resize((224,224))

    img_array = preprocessing.image.img_to_array(the_image)
    img_array = np.expand_dims(img_array, axis=0)

    img_array = img_array / 255.0

    classification = model.predict(img_array)
    result = CLASS_NAMES[classification.argmax(axis=1)[0]]
    
    class_dict[index] = result