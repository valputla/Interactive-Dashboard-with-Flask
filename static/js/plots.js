
// function init(){
    // Fetch the JSON data and console log it
    console.log("Hello");
    var myChart = undefined;

        d3.json("/home/api/v1.0/covid-data/visualization/linegraph").then(function(data) {
            console.log(data);    
            var year = data.map(x => x.Year);
            console.log(year)
            let unique = year.filter((item, i, ar) => ar.indexOf(item) === i);
            console.log(unique);
        
    
            for(let i=0; i<unique.length; i++){
                let option_sel = d3.select("#selDataset")
                option_sel.append("option").text(unique[i]).attr("value",unique[i]);
            }       

            createLineGraph("2020");
        
    })

    function optionChanged(newID){
        // code that updates graphics
        // one way is to recall each function
        createLineGraph(newID);
        console.log(newID)
    }

    function createLineGraph(id){

        d3.json("/home/api/v1.0/covid-data/visualization/linegraph").then(function(data1) {
        console.log(data1);

        data = data1.filter(row => row.Year == id);

        

    var x_axis= data.map(x => x.Month);
    console.log(x_axis)
    var xaxis=x_axis
    // .slice(0,12);
    console.log(xaxis)

    var covid_deaths= data.map(x => x["COVID-19 Deaths"]);
    console.log(covid_deaths);
    var influenza_deaths= data.map(x => x["Influenza Deaths"]);
    console.log(influenza_deaths);
    var pna_deaths= data.map(x => x["Pneumonia Deaths"]);
    console.log(pna_deaths);

    const totalDuration = 3000;
    const delayBetweenPoints = totalDuration / data.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
    x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN, // the point is initially skipped
        delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
            return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
        }
    },
    y: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
            return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
        }
    }
    };



    const labels = xaxis;
      const data_1 = {
        labels: labels,
        datasets: [{
          label: 'Covid Deaths',
          backgroundColor: 'rgb(255, 26, 104,1)',
          borderColor: 'rgb(255, 26, 104,1)',
          data: covid_deaths,
        },{
          label: 'Influenza Deaths',
          backgroundColor: 'rgb(255, 160, 132)',
          borderColor: 'rgb(255, 160, 132)',
          data: influenza_deaths,
    
        },{
            label: 'Pneumonia Deaths',
            backgroundColor: 'rgb(0, 0, 0, 1)',
            borderColor: 'rgb(0, 0, 0,1)',
            data: pna_deaths,
      
          }]
      };
    
    
      const config = {
        type: 'line',
        data: data_1,
        options: {
            scales:{
                y:{
                    beginAtZero: true,
                    title: {
                        display:true,
                        text: "Number of Deaths"
                    }
                },
                x:{
                    beginAtZero:false,
                    title: {
                        display:true,
                        text: "Months"
                    },
                   
                }
            },
            animation,
            plugins:{
                title:{
                    display:true,
                    text: "Number of Deaths Based on Disease Type and Year",
                    padding: {
                        top:10,
                        bottom:50
                    },
                    font:{
                        size:25
                    }

                },
                legend:{
                    display:true
                }
            }
        }
      };
    
      if( !myChart ) // not created
      {
          // create new graph
        myChart = new Chart(
            document.getElementById('myChart'),
            config
          );
      }
      else {
          // update data for creawted graph
          myChart.data = data_1;
          myChart.update();
      }
     
    
    
})




}