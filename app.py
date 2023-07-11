import numpy as np

import pandas as pd
from flask import Flask, jsonify, render_template
import sqlite3
import json



conn = sqlite3.connect('Airbnb.sqlite')


#################################################
# Flask Setup
#################################################
app = Flask(__name__, static_url_path = '/static')
@app.route("/")
def welcome():
    # List all available api routes.
    return render_template('index.html')

@app.route("/data")
def get_data():
    conn = sqlite3.connect('Airbnb.sqlite')
    df = pd.read_sql("Select * from Airbnb", con = conn)
    return jsonify(df.to_json())
    
# @app.route


if __name__ == "__main__": 

    app.run(debug = False)