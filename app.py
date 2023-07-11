# Middleman between data and hmtl 

import numpy as np

import pandas as pd
from flask import Flask, jsonify, render_template 
import sqlite3



conn = sqlite3.connect('Airbnb.sqlite')
df = pd.read_sql('SELECT * FROM Airbnb', con=conn )

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
# @app.route("/")
# def welcome():
#     # List all available api routes.
#     return (
#     f"Welcome to the Airbnb API!"
#     f"Available Routes:<br/>"
#     )

@app.route("/home") 
def home():
    conn = sqlite3.connect('Airbnb.sqlite')
    df = pd.read_sql('SELECT * FROM Airbnb', con=conn )
    return render_template("index.html")

@app.route("/data") 
def home():
    conn = sqlite3.connect('Airbnb.sqlite')
    df = pd.read_sql('SELECT * FROM Airbnb', con=conn )
    return jsonify(df.to_json())



if __name__ == "__main__": 

    app.run(debug = False)

