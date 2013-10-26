var googleMap = function (q,_) {
    var map,
        markers,
        circle,
        clearMarkers = function () {
            _.each(markers, function (m) {
                m.setMap(null)
            });
        },
        setMarkersWithPolylines = function (locations) {
            for (var i = 0; i < locations.length; i++) {
                var pointsToConnect = [new google.maps.LatLng(37.772323, -122.214897),
                                              new google.maps.LatLng(21.291982, -157.821856),
                                              new google.maps.LatLng(-18.142599, 178.431),
                                              new google.maps.LatLng(-27.46758, 153.027892)];

                var flightPath = new google.maps.Polyline({
                    path: pointsToConnect,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });

                flightPath.setMap(map);
            }
        },
        setRadius = function (center, radius) {
            if (this.circle != undefined)  this.circle.setMap(null);
            var km = 100;
            var center = new google.maps.LatLng(center.lb, center.mb);
            var circleOptions = {
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: center,
                radius: parseInt(radius, 10) * km
            };
            this.circle = new google.maps.Circle(circleOptions);
        },
        setMarkers = function (locations) {
            clearMarkers();
            this.markers = [];

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
               this.markers.push(marker);
            }
        },
            init = function () {
                var deferred = q.defer();
                function initialize() {
                    google.maps.visualRefresh = true;
                    var mapOptions = {
                        zoom: 10,
                        center: new google.maps.LatLng(-33.9, 151.2),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }
                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                    deferred.resolve(map);
                }

                google.maps.event.addDomListener(window, 'load', initialize);
                return deferred.promise;
            }



    return {
        setMarkers: setMarkers,
        setRadius: setRadius,
        setMarkersWithPolylines: setMarkersWithPolylines,
        init: init
    }
}(Q, _);




