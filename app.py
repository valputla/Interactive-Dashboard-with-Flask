from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
from covid_data import *
import json
import numpy as np
import pandas as pd
from bson import json_util

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
# app.fconfig["MONGO_URI"] = "mongodb://localhost:27017/phone_app"
# mongo = PyMongo(app)

# Or set inline
mongo = PyMongo(app, uri="mongodb://localhost:27017/covid_app")

# create a listings collection, lazy loading
covid_collection = mongo.db.covid

@app.route("/")
def index():
    # find one document from our mongo db and return it.
    covid_results = covid_collection.find_one()
    # pass that listing to render_template
    return render_template("index.html")

@app.route("/barchart")
def barchart():
    return render_template("index-barchart.html")

@app.route("/map")
def map():
    return render_template("index-map.html")

@app.route("/linegraph")
def linegraph():
    return render_template("index-linegraph.html")


# set our path to /scrape
@app.route("/scrape")
def scraper():
    covid_collection.delete_many({})
    # call the scrape function in our scrape_phone file. This will scrape and save to mongo.
    covid_dataset = scrape()
    # update our listings with the data that is being scraped or create&insert if collection doesn't exist
    covid_collection.insert_many(covid_dataset.to_dict('records'))
    # return a message to our page so we know it was successful.
    return redirect("/", code=302)


@app.route("/home")
def homepage():
    return(
        f"COVID Data API <br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/dashboard<br>"
        f"/api/v1.0/covid-data/visualization/map<br>"
        f"/api/v1.0/covid-data/visualization/barchart<br>"
        f"/api/v1.0/covid-data/visualization/linegraph"
    )


@app.route('/home/api/v1.0/covid-data/visualization/barchart')
def bar_data():
    bar_data = list(covid_collection.find({"Group": "By Year", "COVID-19 Deaths": {"$ne": np.nan}}, {'Month': 0, "Pneumonia Deaths": 0, "Influenza Deaths": 0, "Population": 0, "Group": 0, "_id": 0}))
    return json.dumps(bar_data, default=json_util.default)
    

@app.route("/home/api/v1.0/covid-data/visualization/map")
def map_data():
    with open(map_file_path, 'r') as j:
        contents = json.loads(j.read())
    return jsonify(contents)

@app.route('/home/api/v1.0/covid-data/visualization/linegraph')
def line_data():
    line_data = list(covid_collection.find({"State": "United States", "Age Group": "All Ages", "Sex": "All Sexes", "COVID-19 Deaths": {"$ne": np.nan}, "Pneumonia 19 Deaths": {"$ne": np.nan}, "Influenza Deaths": {"$ne": np.nan}, "Group": "By Month"}, {"Population": 0, "Group": 0}))
    return json.dumps(line_data, default=json_util.default)

if __name__ == "__main__":
    app.run(debug=True)
