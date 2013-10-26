var googleMap = function () {
    var map,
        setMarkers = function (locations) {
            debugger;
            var infowindow = new google.maps.InfoWindow();
            for (var i = 0; i < locations.length; i++) {
                var beach = locations[i];
                var myLatLng = new google.maps.LatLng(parseFloat(beach.lat), parseFloat(beach.lng));
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: beach.title,
                    zIndex: i
                });
                google.maps.event.addListener(marker, 'click', (function (marker, content) {
                    return function () {
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    }
                })(marker, beach.description));
            }
        },
            init = function () {
                function initialize() {
                    google.maps.visualRefresh = true;
                    var mapOptions = {
                        zoom: 10,
                        center: new google.maps.LatLng(-33.9, 151.2),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }
                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                }

                google.maps.event.addDomListener(window, 'load', initialize);
            }



    return {
        map: map,
        setMarkers: setMarkers,
        init: init
    }
}();




