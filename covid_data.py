import matplotlib.pyplot as plt
import pandas as pd
from scipy.stats import linregress
import seaborn as sns
import numpy as np
from scipy.stats import sem
import pandas as pd
from sqlalchemy import create_engine


def scrape():
    health_df = pd.read_csv("Resources/Provisional_COVID-19_Deaths_by_Sex_and_Age.csv")
    health_df = health_df.drop(columns = ["Data As Of", "Start Date", "End Date", "Footnote"])

    age_adjusted_df = health_df.loc[(health_df["Age Group"] != "40-49 years") &
                                (health_df["Age Group"] != "30-39 years") &
                                (health_df["Age Group"] != "18-29 years") &
                                (health_df["Age Group"] != "0-17 years") &
                                (health_df["Age Group"] != "50-64 years"), :]
    age_adjusted_df = age_adjusted_df.drop(columns = ["Total Deaths", "Pneumonia and COVID-19 Deaths",
                                                 "Pneumonia, Influenza, or COVID-19 Deaths"])
    age_adjusted_df["Year"] = age_adjusted_df["Year"].astype(str).str.slice(stop=4)
    age_adjusted_df

    population_df = pd.read_csv("Resources/population.csv")

    final_df = age_adjusted_df.merge(population_df, on ="State")
    final_df.index = final_df.index.astype(str)

    return final_df


    


