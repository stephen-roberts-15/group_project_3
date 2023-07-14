CREATE TABLE Airbnb (
	index int unique primary key,
	boroughs varchar(15) not null,
	ycoord float not null,
	xcoord float not null,
	prop_type varchar(15) not null,
	min_nights int,
	Host_Listing_Cnt int,
	Days_Available int,
	Review_Cnt int,
	Reviews float,
	price float
);

select * from Airbnb;

delete from Airbnb
where not (Airbnb is not null);
