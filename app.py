import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd
from flask import Flask, jsonify
import sqlite3


#

conn = sqlite3.connect('Airbnb.sqlite')

engine = create_engine("sqlite:///Airbnb.sqlite")

Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)
Base.classes.keys()
pd.read_sql("Select * from Airbnb", con = conn)
# conn.close()
################################################
# Database Setup
#################################################

Airbnb = Base.classes.airbnb
# Save reference to the table
# Property = Base.classes.property
#################################################
# Flask Setup
#################################################
app = Flask(__name__)
@app.route("/")
def welcome():
    # List all available api routes.
    return (
 
    )