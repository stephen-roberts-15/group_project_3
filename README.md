# group_project_3

Project Members:

1.Nikita Jain
2.Jessica Clewis
3.Stephens Robert

Tools Used:

We used FLASK framework to bring together Python,SQL Alchemy(Postgres),HTML,CSS and Java Script to create dynamic visulaisation in D3,Plotly,Leaflet(map).

Analysis of Dataset:

In AirBnB project , we covered the NYC area with most of our dataset reflecting Brooklyn (42%),Manhattan(42%)and other (15%) Boroughs.
We found out that people preferred to book entire home (52%) or Private Room(46%)over shared room with just(2%).Mostly customers preferred to stay for 1-2 min nights or less than a weeks or sometime a months time on the property with maximum of 300 days in our dataset.These properties were available from zero days to all year round. Surprisingly, we found a property that was listed for just $10 a night to $10000.And we concluded that most of the properties average price was around $150.

To reflect the coordinates on map using Leaflet, we formatted our csv file to geojson data. We created a button feature on our main page to navigate us to the map page .In the Map_Page , we can visulaize the available properties in the boroughs of New York City.When we will hover around the properties , it will give us property details with its pricing and days available with its reviews. We catagorised the color of available properties based on its Price.Also we added Legends based on Property Prices ranging from under $50 to above $450.
