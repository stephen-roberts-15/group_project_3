import numpy as np

import pandas as pd
from flask import Flask, jsonify
import sqlite3



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

# @app.route("")
    


if __name__ == "__main__": 

    app.run(debug = False)