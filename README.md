# group_project_3

Project Members:

1. Nikita Jain
2. Jessica Clewis
3. Stephen Roberts

Tools Used:

We used FLASK framework to bring together Python, SQL Alchemy(Postgres), HTML, CSS and JavaScript to create dynamic visualization in D3,Chart.js
Plotly, Leaflet(map).

Analysis of Dataset:

In the AirBnB project, we covered the NYC area with most of our dataset reflecting Brooklyn (42%), Manhattan(42%), and other (15%) Boroughs.
We found out that people preferred to book the entire home (52%) or Private Room(46%)over a shared room with just(2%). Most customers
preferred to stay for 1-2 min nights or less than a week or sometime a months time on the property with a maximum of 300 days in our
dataset. These properties were available from zero days to all year round. Surprisingly, we found a property that was listed for just
$10 a night to $10000. We concluded that most of the properties average price was around $150.

Map Page:
To reflect the coordinates on the map using Leaflet, we formatted our CSV file to geojson data. We created a button feature on our
main page to navigate us to the map page. In the Map_Page, we can visualize the available properties in the boroughs of New York City.
When we hover around the properties, it will give us property details with its pricing and days available with its reviews. We
categorized the color of available properties based on their Price. Also, we added Legends based on Property Prices ranging from under $50
to above $450.

Chart.js 
The new javascript library that we chose to incorporate was chart.js to create the bar chart. We used the information that was filtered from our dataset. The bar chart shows the total number of properties in each borough. We enjoyed using this library because it was beginner friendly. You have the option to code everything in an HTML script with the source code or use a javascript file linked to the index.html. The library doesn't require any downloads to be able to use it. 
