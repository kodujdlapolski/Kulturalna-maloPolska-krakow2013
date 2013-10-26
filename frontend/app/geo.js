function showLocation() 
{
	navigator.geolocation.getCurrentPosition(callback);
}
 
function callback(position) 
{
	var lat = position.coords.latitude;
	var lng = position.coords.longitude
	codeLatLng(lat, lng).then(function(data){
		document.getElementById('location-a').value = data; 
	});
	
	var mapOptions = {
		zoom: 8,
		center: new google.maps.LatLng(lat,lng),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);
	
}

function codeLatLng(lat, lng) 
{
	var address = "test";
    var latlng = new google.maps.LatLng(lat, lng);
    var defer = Q.defer();
    
    geocoder.geocode({'latLng': latlng}, function(results, status) 
    {
		if (status == google.maps.GeocoderStatus.OK) 
		{
			console.log(results)
			if (results[1]) 
			{	
				defer.resolve(results[0].formatted_address)
			} 
			else 
			{
				alert("No results found");
			}
		} 
		else 
		{
        alert("Geocoder failed due to: " + status);
		}
	});

	return defer.promise;
}
