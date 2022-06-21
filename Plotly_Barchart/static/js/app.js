// Create Bar Chart 

function buildCharts(year_dropdown, state_dropdown) {

    // bring data 
    d3.json("covid.json").then((data => {


        // define bar data
        var sex1 = "Male"
        var sex2 = "Female"
        let age_groups = ['Under 1 year', '1-4 years', '5-14 years',
        '15-24 years', '25-34 years', '35-44 years', '45-54 years',
        '55-64 years', '65-74 years', '75-84 years', '85 years and over'];


    //    filter by year and state

        var filteredBarinfo = data.filter(barinfo => barinfo.state == state_dropdown)
                                .filter(barinfo => barinfo.year == year_dropdown)
                                

        console.log(filteredBarinfo[0])

          // filters out the gender from all the records, then takes those records and puts only deaths into a list
          var deaths_male = filteredBarinfo.filter(i => i.sex=='Male').map(i => i.deaths)
          var deaths_female = filteredBarinfo.filter(i => i.sex=='Female').map(i => i.deaths)

        // https://plotly.com/javascript/bar-charts/ - bar formatt 

            console.log(deaths_male)

            var male = {
            x: age_groups,
            y: deaths_male,
            name: sex1,
            type: 'bar'
        };

            var female = {
            x: age_groups,
            y: deaths_female,
            name: sex2,
            type: 'bar'
        };

        var bar_data = [male, female];

        var bar_layout = {
            title: "COVID Deaths by Age Group",
            xaxis: { title: "Age Group" },
            yaxis: { title: "Deaths Count" },
            barmode: 'group',
            height: 370,
            width: 950,
            margin : {t:50, l:90, b:100, r:20}

        
        };

        Plotly.newPlot('bar', bar_data, bar_layout);


    }))


};

function populateDemoInfo(year, state) {

    // bring in data
    d3.json("covid.json").then(data => {


        // filter data - chain filters
        var filteredData = data.filter(stateinfo => stateinfo.state == state)
            .filter(stateinfo => stateinfo.year == year)
            .filter(stateinfo => stateinfo['age group'] == "All Ages")
            .filter(stateinfo => stateinfo['sex'] == "All Sexes");
        // check filter results
        console.log("demo info filteredDate results", filteredData[0])

        // select the demographics infobox
        var demographicInfoBox = d3.select("#sample-metadata");

        // clear any existing data from the div
        demographicInfoBox.html("")

        // add filteredData to demographics section
        Object.entries(filteredData[0]).forEach(([key, value]) => {
            demographicInfoBox.append("p").text(`${key}: ${value}`)
        })


    })
}


function optionChanged() {

    // grab values from dropdown box
    let state_dropdown = d3.select('#selstate').node().value
    let year_dropdown = d3.select('#selyear').node().value

    // check to see what values grabbed
    console.log('optionchange test', state_dropdown, year_dropdown);

    // send dropdown selections to chart code
    buildCharts(year_dropdown, state_dropdown);
    populateDemoInfo(year_dropdown, state_dropdown);
}



function initDashboard() {
    var dropdown = d3.select("#selyear");
    var dropdown2 = d3.select("#selstate");

    d3.json("covid.json").then(data => {

        var years = new Set();
        data.forEach(data => {
            years.add(data.year)
        });
        years = Array.from(years);

        var states = new Set();
        data.forEach(data => {
            states.add(data.state)
        });
        states = Array.from(states);

        years.forEach(year => {
            dropdown.append("option").text(year).property("value", year);
        });


        states.forEach(state => {
            dropdown2.append("option").text(state).property("value", state);
        });

        buildCharts(years[0], states[0]);
        populateDemoInfo(years[0], states[0]);
    });
};

initDashboard();