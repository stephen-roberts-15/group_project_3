import numpy as np

import pandas as pd
from flask import Flask, jsonify, render_template
import sqlite3
import json



conn = sqlite3.connect('Airbnb.sqlite')


#################################################
# Flask Setup
#################################################
app = Flask(__name__)
@app.route("/")
def welcome():
    # List all available api routes.
    return (
    f"Welcome to the Airbnb API!"
    f"Available Routes:<br/>"
    
    )

@app.route("/data")
def get_data():
    conn = sqlite3.connect('Airbnb.sqlite')
    df = pd.read_sql("Select * from Airbnb", con = conn)
    return jsonify(df.to_json())
    
    


if __name__ == "__main__": 

    app.run(debug = False)