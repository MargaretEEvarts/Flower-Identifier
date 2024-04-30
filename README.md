# Flower Identifier

Flower Identifier aims to develop a system capable of recognizing and categorizing 5 different species of flowers based on input images. Utilizing the TensorFlow flower_photos dataset and the pre-existing VGG16 model, Flower Identifier trains the model through 3 consecutive epochs with an additional evaluation for future identification.

## Prerequisites

- Python 3.11
- Node.JS
- Flower image files part of the following categories: <br>
    [Roses, Tulips, Sunflowers, Dandelion, Daisy]

## How to run it

### Setup

1. Clone the repository.
2. Open the Terminal window (Powershell)
3. Route to the root directory (Flower-Identifier)
4. Create a virtual environment using the following command:
    ```
    python -m venv flowerenvironment
    ```
5. Execute:
    ```
    ./flowerenvironment/Scripts/activate
    ```
6. Execute: 
    ```
    pip install -r requirements.txt
    ```
7. Open the file:
    `/flowerenvironment/Lib/site-packages/flask_cors/__init__.py`
8. Under the `import collections` (line 13), add:
    ```
    collections.Iterable = collections.abc.Iterable
    ```
9. Split Terminal windows (Powershell) and activate virtual evironment on second window
10. Terminal 1 (Backend): Route to Backend directory <br>
    -> from root directory : `cd src/Backend`
11. Terminal 2 (Frontend): Route to Frontend directory <br>
    -> from root directory : `cd src/Frontend/frontend`
12. Terminal 2 (Frontend): Download needed dependencies for React:
    ```
    npm i
    ```

### Start Program

13. Terminal 1 (Backend): Execute `python server.py`
14. Terminal 2 (Frontend): Execute: `npm start`
15. Open in your browser `http://localhost:3000/`

## Authors

- Margaret Evarts
- Kevin Sakowicz
