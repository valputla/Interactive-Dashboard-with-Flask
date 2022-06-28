![COVID-19 Interactive Web Visualizations READ ME image](https://user-images.githubusercontent.com/93561950/174914811-9fd243e2-fadd-46a0-92c1-398e36e387b6.png)
# COVID-19 Interactive Web Page 
Interactive dashboard built to explore COVID-19 death rate statistics in the United States.


## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Featured Notebooks and Files](#featured-notebooks-and-files)
* [Screenshots](#screenshots)
* [Data Source](#data-source)
* [Conclusions](#conclusions)


## General Information
This project examines COVID-19 statistics from the United States through an interactive dashboard. Data is visualized in a choropleth map to view states with the high death toll from COVID, allowing the user to click on a state for more information. Additionally, COVID dashboards created a barchart to view deaths by age and filtered by state as well as comparative linegraphs using COVID, Influenza and Pneumonia data from 2020-2022. 

## Technologies Used
- d3.js
- chart.js
- Leaflet.js
- Plotly.js
- Flask
- Python
- MongoDB
- HTML
- CSS
- Javascript
 
 ## Featured Notebooks and Files


The structure of the project includes the following folders/files: 

* templates - including all the main html files: index, dashboard, home, contact, index-scraped, map, barchart and linegraph html files
* static - including CSS folder and JS folder 
* blog - including all the supportmental html files
* Resources - including covid-19 deaths by sex and age and population csv files
* images - including all the screenshots and pictures used for project 
* app.py - main Flask app
* covid_data.py -  scraped app

 
## Screenshots

DashBoard

![Screen Shot 2022-06-28 at 6 32 00 PM](https://user-images.githubusercontent.com/93561950/176321477-f08fa176-513a-4645-a702-8a6bbccc80f1.png)


Choropleth Map 

![Screen Shot 2022-06-20 at 8 30 23 PM](https://user-images.githubusercontent.com/93561950/174915529-52528684-5669-4bf9-97db-8d84429ed2ba.png)


Barchart

![barchart](images/barchart.png)


Linegraph

![linegraph.png](images/linegraph.png)


## Data Source


. cdc.gov

. kaggle.com

JSON data accessed from:

MongoDB uri="mongodb://localhost:27017/covid_app"


## Conclusions and Considerations for Further Analysis
Our work seeks to provide insights into the spread of COVID-19 across age groups, gender, and location in the United States. Analysis of the death rate pre/post vaccine roll out, comparing Covid deaths, Influenza deaths and Pneumonia deaths to find out relationship in similar diseases, and potential for machine learning models to predict COVID death risk based on an individual's demographics are all areas for potential exploration.
