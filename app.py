import numpy as np

import pandas as pd
from flask import Flask, jsonify, render_template ,url_for
import sqlite3
import json


#Setting connection and reading json file

conn = sqlite3.connect('Airbnb.sqlite')
with open ("Resources/Airbnb_NYC.geojson")as NYC_Geo:
    map_data = json.load(NYC_Geo)

#################################################
# Flask Setup
#################################################
app = Flask(__name__, static_url_path = '/static')
@app.route("/")
def welcome():
    # List all available api routes.
    return render_template('index.html')

@app.route("/map_page")
def mappage():
   
    return render_template('map.html')

@app.route("/data")
def get_data():
    conn = sqlite3.connect('Airbnb.sqlite')
    df = pd.read_sql("Select * from Airbnb", con = conn)
    return jsonify(df.to_json(orient="records"))

@app.route("/map")
def get_data1():
   return map_data

if __name__ == "__main__": 

    app.run(debug = False)
