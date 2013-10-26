var geo = function () {

    var map,
        geocoder,
        showLocation = function () {
                 navigator.geolocation.getCurrentPosition(callback);
        },
        init = function (mp) {
            map = mp;
            geocoder = new google.maps.Geocoder();

        },
    callback = function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude
        codeLatLng(lat, lng).then(function (data) {
            document.getElementById('location-a').value = data;
        });
        map.setZoom(14);
        map.setCenter(new google.maps.LatLng(lat, lng));

    }

,
codeLatLng = function (lat, lng) {
    var address = "test";
    var latlng = new google.maps.LatLng(lat, lng);
    var defer = Q.defer();

    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results)
            if (results[1]) {
                defer.resolve(results[0].formatted_address)
            }
            else {
                alert("No results found");
            }
        }
        else {
            alert("Geocoder failed due to: " + status);
        }
    });

    return defer.promise;
}

    return {
        showLocation: showLocation,
        init:init
    }
}();
