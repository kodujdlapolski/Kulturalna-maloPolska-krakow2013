function showLocationA() {
   navigator.geolocation.getCurrentPosition(callbackA);
}

function showLocationB() {
   navigator.geolocation.getCurrentPosition(callbackB);
}
 
function callbackA(position) {
   document.getElementById('location-a').value = position.coords.latitude +";"+ position.coords.longitude; 
}

function callbackB(position) {
   document.getElementById('location-b').value = position.coords.latitude +";"+ position.coords.longitude; 
}
