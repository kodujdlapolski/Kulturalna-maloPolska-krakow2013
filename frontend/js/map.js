var googleMap = function (q,_) {
    var map,
        markers,
        circle,
        clearMarkers = function (markers) {
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
            if (this.circle != undefined) this.circle.setMap(null);
            var km = 1000;
            var center = new google.maps.LatLng(center.lb, center.mb);
            var circleOptions = {
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.1,
                map: map,
                center: center,
                radius: parseInt(radius, 10) * km
            };
            this.circle = new google.maps.Circle(circleOptions);
            map.setCenter(center);

        },
        setMarkers = function (locations) {
            clearMarkers(this.markers);
            this.markers = [];
            var self = this;

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
                google.maps.event.addListener(marker, 'click', (function (marker, content, view) {
                    return function () {

                        infowindow.setContent(view(content));
                        infowindow.open(map, marker);
                    }
                })(marker, beach, function (obj) {
                    return '<div><h4 >{{title}}</h4><span><b>Obiekt do zwiedzania: </b>{{availablity}} |<b> Autor:</b> {{author}}</span>        <div>            <br />        <span>{{description}}</span>            <br />        <span>{{guardian}}</span>        </div>        <span><b>Kontakt :</b> {{address}}, <b>tel: {{phone}}</b>, email: <a href="{{email}}">{{email}}</a></span>        <div>            <span>url: <a href="{{url}}" target="_blank">{{url}}</a></span>        </div>'
                    .replace("{{title}}", obj.title)
                                    .replace("{{author}}", obj.author)
                                    .replace(new RegExp("{{email}}", 'g'), obj.email||"")
                                    .replace("{{phone}}", obj.phone||"")
                                    .replace(new RegExp("{{url}}", 'g'), obj.url || "")
                                    .replace("{{address}}", obj.address)
                                    .replace("{{guardian}}", obj.guardian)
                                    .replace("{{description}}", obj.description)
                                    .replace("{{availablity}}", obj.availablity);

                }));
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
            };


    return {
        setMarkers: setMarkers,
        setRadius: setRadius,
        setMarkersWithPolylines: setMarkersWithPolylines,
        init: init
    }
}(Q, _);




