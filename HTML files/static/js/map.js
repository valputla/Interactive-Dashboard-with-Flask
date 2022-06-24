// Inital map set up //
var map = L.map('map').setView([37.8, -96], 4);

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.geoJson(statesData).addTo(map);


function popUpMsg(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.name +
      "</h3><hr>COVID-19 Deaths: " + feature.properties.density * 1000);
  }


// Color palette for map //
function getColor(d) {
    return d > 300.0 ? '#d73027' :
           d > 250.0 ? '#f46d43' :
           d > 200.0 ? '#fdae61' :
           d > 150.0 ? '#fee090' :
           d > 100.0 ? '#e0f3f8' :
           d > 75.0 ? '#abd9e9' :
           d > 50.0  ? '#74add1' :
                      '#4575b4';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '2',
        fillOpacity: 0.7
    };
}

L.geoJson(statesData, {style: style}).addTo(map);


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    
    geojson.resetStyle(e.target);
}

// var geojson;
// // ... our listeners
// geojson = L.geoJson(...);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

// function onEachFeature(feature, layer) {
//     layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//         click: zoomToFeature
//     });
// }

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: popUpMsg
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (statesData) {
    this._div.innerHTML = '<h4>COVID-19 Deaths (thousands)</h4><hr>' +  (statesData ?
        '<b>' + statesData.name + '</b><br />' + statesData.density + ' people / mi<sup>2</sup>'
        : 'Click on a state for more information');
};

info.addTo(map);

function highlightFeature(e) {
    
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    
    info.update();
}

// Create Legend //
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 50, 75, 100, 150, 200, 250, 300],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);