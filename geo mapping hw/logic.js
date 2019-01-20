// L.TimeDimension.Layer.GeoJson.GeometryCollection = L.TimeDimension.Layer.GeoJson.extend({

//     // Do not modify features. Just return the feature if it intersects
  
//     // the time interval    
  
//     _getFeatureBetweenDates: function(feature, minTime, maxTime) {
//       console.log(feature); 
//       var time = new Date(feature.properties.time);
//       console.log(time);
  
//         if (time > maxTime || time < minTime) {
  
//             return null;
  
//         }
  
//         return feature;
  
//     }
       
//   });
//   L.timeDimension.layer.geoJson.geometryCollection = function(layer, options) {
//     console.log(layer);
  
//     return new L.TimeDimension.Layer.GeoJson.GeometryCollection(layer, options);
    
//   };
  

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Perform a GET request to the query URL
// d3.json(queryUrl, function(data) {
//   // Once we get a response, send the data.features object to the createFeatures function
//   createFeatures(data.features);
// });

// function createFeatures(earthquakeData) {

//   // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//   }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
//   var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
//   });

//   // Sending our earthquakes layer to the createMap function
//   createMap(earthquakes);
// }

// // function createMap(earthquakes) {

//   // Define streetmap and darkmap layers
//   var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?" +

//   "access_token=pk.eyJ1IjoibmFnYWxha3NobWkiLCJhIjoiY2phazl6Mm1mMmdmdzMzcXU4enF0NGZpNyJ9.tkaoOp3_u-cpQNelsuC6RA", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets"
   
//   });

//   var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +

//   "access_token=pk.eyJ1IjoibmFnYWxha3NobWkiLCJhIjoiY2phazl6Mm1mMmdmdzMzcXU4enF0NGZpNyJ9.tkaoOp3_u-cpQNelsuC6RA", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.dark"
   
//   });

//   // Define a baseMaps object to hold our base layers
//   var baseMaps = {
//     "Street Map": streetmap,
//     "Dark Map": darkmap
//   };

//   // Create overlay object to hold our overlay layervar 
  

//   var quake = L.geoJSON([], {

//           pointToLayer: function(feature, latlng) {
          
//             console.log(feature);

//           return L.circle(latlng, { 
//           fillOpacity: 0.75,
//           color: "white",
//           weight: 0.5,
//           fillColor: "red",

//           radius: feature.properties.mag * 15000
//         });
    
//   }
    
// }).bindPopup(function (layer) {
//     return ("<h1>" + feature.properties.mag +  "</h1> <hr> <h3> Points: " + feature.properties.place + "</h1>");
// });


// console.log(quake)

//   // Create our map, giving it the streetmap and earthquakes layers to display on load
//   var myMap = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 5,
//     timeDimension: true,
//     layers: [streetmap]
//   });
//   var overlayMaps = {
//     Earthquakes: quake
//   };

//   // Create a layer control
//   // Pass in our baseMaps and overlayMaps
//   // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);


// d3.json(queryUrl, function(data) {

//     // Once we get a response, send the data.features object to the createFeatures function

//     // console.log(data)

//     quake.addData(data.features);



//     var geoJsonTimeLayer = L.timeDimension.layer.geoJson.geometryCollection(quake, {

//       //waitForReady	:true

//     }).addTo(myMap);



// });



// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>Magnitude: " + feature.properties.mag +
      "</h3><hr><p>Place: " + feature.properties.place + "</p>");
  }

  function chooseColor(mag) {
    switch(true) {
      case mag > 5:
        return "#f06b6b";
      case mag > 4:
        return "#f0a76b";
      case mag > 3:
        return "#f3ba4d";
      case mag > 2:
        return "#f3db4d";
      case mag > 1:
        return "#e1f34d";
      default:
        return "#b7f34d";
    }

  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: function(feature) {
      return {
        color: "black",
        fillColor: chooseColor(feature.properties.mag),
        fillOpacity: 0.9,
        opacity: 0.9,
        weight: 1,
        radius: feature.properties.mag * 4
      }
    },
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = [0,1,2,3,4,5]
    var colors = ["#b7f34d",
                  "#e1f34d",
                  "#f3db4d",
                  "#f3ba4d",
                  "#f0a76b",
                  "#f06b6b"]
    var labels = [];

    // Add min & max
    var legendInfo = "<h3>Magnitude</h3>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });
    for (var i = 0; i<limits.length; i++) {
      div.innerHTML += "<ul> " + limits[i] + "-" +limits[i+1] + "\t" + labels[i] + "</ul>";
  }
    
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);
};
