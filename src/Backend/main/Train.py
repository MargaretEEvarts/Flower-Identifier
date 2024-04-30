from pathlib import Path
import keras
import pickle
from keras import layers, models, applications
from tensorflow.keras.preprocessing.image import ImageDataGenerator # type: ignore

SAVE_PATH_MODEL = '../Backend/saving_models/final_flower_model.h5'
SAVE_PATH_LABELS = '../Backend/saving_models/labels.pickle'
BATCH_SIZE = 32
IMAGE_HEIGHT = 224
IMAGE_WIDTH = 224

def train_new_data(flower_directory):
    base_model = applications.VGG16(weights='imagenet', include_top=False, input_shape=(IMAGE_WIDTH, IMAGE_HEIGHT, 3))

    for layer in base_model.layers:
        layer.trainable = False

    model = models.Sequential([
        base_model,
        layers.Flatten(),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(5, activation='softmax')
    ])

    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    datagen = ImageDataGenerator(
        rescale=1./255,
        shear_range=0.2,
        zoom_range=0.2,
        validation_split=0.2,
        horizontal_flip=True
    )

    val_datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)

    train_gen = datagen.flow_from_directory(
        directory=flower_directory,
        target_size=(IMAGE_HEIGHT, IMAGE_WIDTH),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='training'
    )

    val_gen = val_datagen.flow_from_directory(
        directory=flower_directory,
        target_size=(IMAGE_HEIGHT, IMAGE_WIDTH),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='validation'
    )

    model.fit(
        train_gen,
        epochs=3,
        validation_data=val_gen
    )

    model.evaluate(val_gen)

    f = open(SAVE_PATH_LABELS, "wb")
    f.write(pickle.dumps(list(train_gen.class_indices.keys())))
    f.close()

    model.save(SAVE_PATH_MODEL)

def training_data():
    dataset_url = "https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos.tgz"
    archive = keras.utils.get_file(origin=dataset_url, extract=True)
    data_dir = Path(archive).with_suffix('')
    train_new_data(data_dir)

training_data()