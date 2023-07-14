// Store our API endpoint as queryUrl.
let queryUrl = "http://127.0.0.1:5000/map";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  console.log(data)

  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features
);
});

function createFeatures(PropertyData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the property type and Review Count of the properties.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${"Property Type : "+feature.properties.Prop_Type}</h3><hr><p>${"Boroughs: "+feature.properties.Boroughs}</p><hr><p>${"Price: "+"$"+feature.properties.Price}</p><hr><p>${"Reviews: "+feature.properties.Review_Cnt}</p><hr><p>${"Days Available: "+feature.properties.Days_Available}</p>`)
;
  }

 // Determine the style of markers based on properties
        function createCircleMarker(feature,latlng){
        var options = {
          radius: 1.5,
          fillColor: chooseColor(feature.properties.Price),
          color:chooseColor(feature.properties.Price),
          fillOpacity: 0.8,
          stroke: false,
          weight: 0.5,
          opacity:.75
        }
        return L.circleMarker(latlng,options);
      }
    
      // Create a GeoJSON layer that contains the features array on the Airbnb object.
  // Run the onEachFeature function once for each piece of data in the array.
  let Nyc_prop  = L.geoJSON(PropertyData, {
    onEachFeature: onEachFeature,
    pointToLayer: createCircleMarker
  });


  // Send our properties layer to the createMap function/
  createMap(Nyc_prop);
}

//Color circle based on price
function chooseColor(Price){
  if (Price < 50) return "#00cc00";
  else if (Price < 50) return "#FB5607";
  else if (Price < 150) return "#FF006E";
  else if (Price < 250) return "#8338EC";
  else if (Price < 350) return "#38A6FF";
  else if (Price < 450) return "#00F5D4"
  else return "#ffcc00";

}

function createMap(Nyc_prop) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

   // Create a baseMaps object.
   let baseMaps = {
    "Street Map": street,
    
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    NYC_Props: Nyc_prop
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      40.7128, -74.0060
    ],
    zoom: 12,
    layers: [street, Nyc_prop]
  }); 
  
// Add legend
var legend = L.control({position: "bottomright"});
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend"),
  Price = [-50, 50, 150, 250, 350, 450];
  
  div.innerHTML += "<h3 style='text-align: center'>Price</h3>"

  for (var i =0; i < Price.length; i++) {
    div.innerHTML += 
    '<i style="background:' + chooseColor(Price[i] + 1) + '"></i> ' +
        Price[i] + (Price[i + 1] ? '&ndash;' + Price[i + 1] + '<br>' : '+');
    }
    return div;
  };
  legend.addTo(myMap);
};

