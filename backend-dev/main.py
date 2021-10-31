# encoding: utf-8
import json
from flask import Flask
from flask import request, abort, redirect
from dotenv import load_dotenv
from flask_cors import CORS
import requests, os

load_dotenv()
app = Flask(__name__)
cors = CORS(app, resources={r"/food/*": {"origins": "*"}})

app_id = os.getenv("app_id") # api id
app_key = os.getenv("app_key") # api key
debug = os.getenv("debug") # boolean
port = os.getenv("port") # int

@app.route('/food/', methods=['GET'])
def food():
    foodName = request.args.get('food')
    if foodName == None:
        abort(400, "missing args: food")
    try:
        site = f"https://api.edamam.com/api/nutrition-data?app_id={app_id}&app_key={app_key}&nutrition-type=logging&ingr={foodName}&limit=1"
        data = requests.get(site)
    except Exception as error:
        abort(500, str("The server encountered an internal error and was unable to complete your request. Either the server is overloaded or there is an error in the application.\n ->" + str(error)))
    return data.content


if __name__ == '__main__':
    assert os.path.exists('.env')
    os.environ['FLASK_ENV'] = 'production'
    app.run(debug=bool(debug), port=int(port), ssl_context='adhoc')