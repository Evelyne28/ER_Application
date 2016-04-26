$(document).ready(function () {
    initialize();
    // setRoutes();
    var marker;

    function placeMarker(location) {
        if (marker) {
            marker.setPosition(location);
        } else {
            marker = new google.maps.Marker({
                position: location,
                map: map
            });
        }
    }

    google.maps.event.addListener(map, 'click', function (event) {
        placeMarker(event.latLng);
        alert(event.latLng);
        var chat = $.connection.chatHub;
        $.connection.hub.start().done(function () {
                // Call the Send method on the hub.
            chat.server.send("amb1", event.latLng);
                // Clear text box and reset focus for next comment.
                //$('#patientState').val('').focus();
            });
    });
});

function initialize() {

    var marker = null;
    infowindow = new google.maps.InfoWindow(
      {
          size: new google.maps.Size(150, 50)
      });

    var myOptions = {
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    address = 'Strada Hermann Oberth 5, Cluj-Napoca'
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        map.fitBounds(results[0].geometry.viewport);
    });

    google.maps.event.addListener(map, 'click', function () {
        infowindow.close();
    });

//    google.maps.event.addListener(map, 'click', function (event) {
//        //call function to create marker
//        if (marker) {
//            marker.setMap(map);
//            marker = null;
//        }
//        //marker = createMarker(event.latLng, "name", "<b>Location</b><br>"+event.latLng);
//        //startLoc.push(event.latLng);
//        //  for (var j=0; j<startLoc.length; j++) {
//        //   alert(startLoc[j]);
//        // }
//        //alert(startLoc[startLoc.length - 1]);
//        //console.info(startLoc.length);
//        //setRoutes(startLoc[startLoc.length - 1], endLoc[1], startLoc.length);
//        alert(event.latLng);

//    });

//    //for (var i = 0; i < startLoc.length; i++) {
//    //    setRoutes(startLoc[i], endLoc[i], i);
//    //}

//    // setRoutes();

//    function createMarker(latlng, name, html) {
//        var contentString = html;
//        var marker = new google.maps.Marker({
//            position: latlng,
//            map: map,
//            zIndex: Math.round(latlng.lat() * -100000) << 5
//        });

//        google.maps.event.addListener(marker, 'click', function () {
//            infowindow.setContent(contentString);
//            infowindow.open(map, marker);
//        });
//        google.maps.event.trigger(marker, 'click');
//        return marker;
    //    }

   
}