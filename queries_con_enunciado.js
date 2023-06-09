//1. Escribe una consulta para mostrar todos los documentos en la colección Restaurantes.
	
	db.restaurants.find()

//2. Escribe una consulta para mostrar el restaurant_id, name, borough y cuisine por todos los documentos en la colección Restaurantes.
	
	db.restaurants.find({},{"restaurant_id":1,"name":1,"borough":1,"cuisine":1})
	
//3. Escribe una consulta para mostrar el restaurant_id, name, borough y cuisine, pero excluye el campo _id por todos los documentos en la colección Restaurantes.
	
	db.restaurants.find({},{"_id":0,"restaurant_id":1,"name":1,"borough":1,"cuisine":1})

//4. Escribe una consulta para mostrar restaurant_id, name, borough y zip code, pero excluye el campo _id por todos los documentos en la colección Restaurants.
	
	db.restaurants.findOne({},{"_id":0,"restaurant_id":1,"name":1,"borough":1,"address.zipcode":1})

//5. Escribe una consulta para mostrar todos los restaurantes que están en el Bronx.
	
	db.restaurants.find({"borough":"Bronx"})
	
//6. Escribe una consulta para mostrar los primeros 5 restaurantes que están en el Bronx.
	
	db.restaurants.find({"borough":"Bronx"}).limit(5)

//7. Escribe una consulta para mostrar el próximo 5 restaurantes después de saltar los primeros 5 del Bronx.

	db.restaurants.find({"borough":"Bronx"}).skip(5).limit(5)	

//8. Escribe una consulta para encontrar los restaurantes que tienen un score de más de 90.
	
	db.restaurants.find({"grades.score":{$gt:90}})
	
//9. Escribe una consulta para encontrar los restaurantes que tienen un score de más de 80 pero menos que 100.

	db.restaurants.find({"grades.score":{$gt:80,$lt:100}})

//10. Escribe una consulta para encontrar los restaurantes que se localizan en valor de latitud menos de -95.754168.

	 db.restaurants.find({"address.coord.0":{$gt:-95.754168}})

//11. Escribe una consulta de MongoDB para encontrar los restaurantes que no preparan ningún cuisine de 'American'
//	  y su calificación es superior a 70 y longitud inferior a -65.754168.

	db.restaurants.find({$and: [{"grades.score":{$gt:70}},{"address.coord.1":{$lt:-65.754168}}]})

//12. Escribe una consulta para encontrar los restaurantes que no preparan ningún cuisine de 'American' y
//	  consiguieron un marcador más de 70 y localizado en la longitud menos que -65.754168. Nota: Haz esta
//	  consulta sin utilizar $and operador.

	db.restaurants.find({"cuisine":{$ne:{$eq:"American "}},"grades.score":{$gt:70},"address.coord.1":{$lt:-65.754168}})

//13. Escribe una consulta para encontrar los restaurantes que no preparan ningún cuisine de 'American' y 
//    obtuvieron un punto de grado 'A' no pertenece a Brooklyn. Se debe mostrar el documento según la cuisine 
//	  en orden descendente.

	db.restaurants.find({$and: [{"cuisine":{$ne:{$eq:"American"}}},{"grades.grade":{$ne:"A"}},{"borough":{$ne:{$eq:"Brooklyn"}}}]})

//14. Escribe una consulta para encontrar el restaurant_id, name, borough y cuisine para aquellos restaurantes 
//    que contienen 'Wil' como las tres primeras letras en su nombre.

	db.restaurants.find({"name":/^Wil/},{"restaurant_id":1,"name":1,"borough":1,"cuisine":1})
	
//15. Escribe una consulta para encontrar el restaurant_id, name, borough y cuisine para aquellos restaurantes 
//	  que contienen 'ces' como las últimas tres letras en su nombre.

	db.restaurants.find({"name":/ces$/},{"restaurant_id":1,"name":1,"borough":1,"cuisine":1})

//16. Escribe una consulta para encontrar el restaurant_id, name, borough y cuisine para aquellos restaurantes 
//	  que contienen 'Reg' como tres letras en algún lugar en su nombre.

	db.restaurants.find({"name":/reg/},{"restaurant_id":1,"name":1,"borough":1,"cuisine":1})

//17. Escribe una consulta para encontrar los restaurantes que pertenecen al Bronx y prepararon cualquier plato
//    americano o chino.

	db.restaurants.find({$and: [{"borough":{$eq:"Bronx"}},{"cuisine":{$in:["American ", "Chinese"]}}]})

//18. Escribe una consulta para encontrar el restaurant_id, name, borough y cuisine para aquellos restaurantes
//	  que pertenecen a Staten Island o Queens o Bronx o Brooklyn.

	db.restaurants.find({borough: {$in:["Staten Island","Queens","Bronx","Brooklyn"]}},{"restaurant_id":1,"name":1,"borough":1,"cuisine":1})
//19. Escribe una consulta para encontrar el restaurant_id, name, borough y cuisine para aquellos restaurantes 
//	  que no pertenecen a Staten Island o Queens o Bronx o Brooklyn.

	db.restaurants.find({borough:{$nor:["Staten Island","Queens","Bronx","Brooklyn"]}},{"restaurant_id":1,"name":1,"borough":1,"cuisine":1})

//20. Escribe una consulta para encontrar el restaurant_id, name, borough y cuisine para aquellos restaurantes
//    que consigan un marcador que no es más de 10.

	db.restaurants.find({"grades.score":{$not:{$gte:10}}},{"restaurant_id":1,"name":1,"borough":1,"cuisine":1})
	
//21.Escribe una consulta para encontrar el restaurant_id, name, borough y cuisine para aquellos restaurantes 
//   que preparan pescado excepto 'American' y 'Chinese' o el name del restaurante empieza con letras 'Wil'.

	db.restaurants.find({$or:[{"name":/^Wil/},{$and:[{"cuisine":{$nin:[/American/ ,/Chinese/]}},{"cuisine":"Seafood"}]}]},{"restaurant_id":1,"name":1,"borough":1,"cuisine":1})
//22.Escribe una consulta para encontrar el restaurant_id, name, y gradas para aquellos restaurantes que 
//	 consigan un grado "A" y un score 11 en datos de estudio ISODate "2014-08-11T00:00:00Z".

	db.restaurants.find({"grades": {$elemMatch: {"grade": "A", "score": 11, "date": ISODate("2014-08-11T00:00:00Z")}}},{"restaurant_id":1, "name":1, "grades":1});


//23.Escribe una consulta para encontrar el restaurant_id, name y gradas para aquellos restaurantes
//   donde el 2º elemento de variedad de grados contiene un grado de "A" y marcador 9 sobre un ISODate "2014-08-11T00:00:00Z".

	db.restaurants.find({$and: [{"grades.1.grade": "A"}, {"grades.1.score": 9}, {"grades.1.date": ISODate("2014-08-11T00:00:00Z")}]},{"restaurant_id":1, "name":1, "grades":1});


//24.Escribe una consulta para encontrar el restaurant_id, name, dirección y ubicación geográfica para aquellos restaurantes donde el segundo elemento del array coord contiene un valor que es más de 42 y hasta 52.

	db.restaurants.find({$and: [{"address.coord.1": {$gt: 42}}, {"address.coord.1": {$lte: 52}}]},{"restaurant_id":1, "name":1, "address":1});


//25.Escribe una consulta para organizar el nombre de los restaurantes en orden ascendente junto con todas las columnas.

	db.restaurants.find({}).sort({"name":1});


//26.Escribe una consulta para organizar el nombre de los restaurantes en orden descendente junto con todas las columnas.

	db.restaurants.find({}).sort({"name":-1});


//27.Escribe una consulta para organizar el nombre de la cuisine en orden ascendente y por el mismo barrio de cuisine. Orden descendente.

	db.restaurants.find({}).sort({"cuisine":1, "borough":-1});


//28.Escribe una consulta para saber todas las direcciones que no contienen la calle.

	db.restaurants.find({"address.street": null});


//29.Escribe una consulta que seleccionará todos los documentos en la colección de restaurantes donde el valor del campo coord es Double.

	db.restaurants.find({$and: [{"address.coord.0": {$type: "double"}}, {"address.coord.1": {$type: "double"}}]});


//30.Escribe una consulta que seleccionará el restaurant_id, name y grade para aquellos restaurantes que retornen 0 como resto después de dividir el marcador por 7.

	db.restaurants.find({ "grades.score": {$mod: [7, 0]}},{"restaurant_id":1,"name":1,"grades.grade":1});

//31.Escribe una consulta para encontrar el name de restaurante, borough, longitud y altitud y cuisine para aquellos restaurantes que contienen 'mon' como tres letras en algún lugar de su nombre.

	db.restaurants.find({"name": /mon/},{"name":1,"borough":1,"address.coord":1,"cuisine":1});

//32.Escribe una consulta para encontrar el name de restaurante, borough, longitud y latitud y cuisine para aquellos restaurantes que contienen 'Mad' como primeras tres letras de su nombre.

	db.restaurants.find({"name": /^Mad/},{"name":1,"borough":1,"address.coord":1,"cuisine":1});
