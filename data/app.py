from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
# app.config["MONGO_URI"] = "mongodb://localhost:27017/phone_app"
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

# set our path to /scrape
@app.route("/scrape")
def scraper():
    # call the scrape function in our scrape_phone file. This will scrape and save to mongo.
    covid_data = scrape_mars.scrape()
    # update our listings with the data that is being scraped or create&insert if collection doesn't exist
    covid_collection.insert_one(covid_data.to_dict('index'))
    # return a message to our page so we know it was successful.
    return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)
