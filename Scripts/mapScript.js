  $( document ).ready(function() {
    initialize();
    // setRoutes();
  });
    var map = null;
    var marker = null;
    var directionDisplay;
    var directionsService;
    var stepDisplay;
   
    var position;
    var marker = [];
    var polyline = [];
    var poly2 = [];
    var poly = null;
    var startLocation = [];
    var endLocation = [];
    var timerHandle = [];
      
    
    //var speed = 0.000007, wait = 1;
    var speed = 0.01, wait = 5;

    var infowindow = null;
    
    var myPano;   
    var panoClient;
    var nextPanoId;
    
    //var startLoc = new Array();
    ////startLoc[0] = 'Strada Agricultorilor 8, Cluj-Napoca';
    ////startLoc[1] = 'Piata Garii, Cluj-Napoca';
    ////startLoc[2] = 'Strada Ciprian Porumbescu 5, Cluj-Napoca';
    ////startLoc[3] = '46.769859, 23.580823';

    //var endLoc = new Array();
    ////endLoc[0] = 'Strada Hermann Oberth 5, Cluj-Napoca';
    //endLoc[1] = 'Strada Hermann Oberth 5, Cluj-Napoca';
    ////endLoc[2] = 'Strada Hermann Oberth 5, Cluj-Napoca';
    ////endLoc[3] = 'Strada Hermann Oberth 5, Cluj-Napoca';


    var Colors = ["#FF0000", "#00FF00", "#0000FF"];


    var markerPosition;
    // function placeMarker(location) {
    //   var marker1 = new google.maps.Marker({
    //     position: location, 
    //     map: map
    //   });
    //   startLoc.push(marker1.position);
    //   // for (var i=0; i<startLoc.length; i++) {
    //   //   alert(startLoc[i]);
    //   // }
    // //   for (var i=0; i<1; i++) {
    // //     startLoc.pop();
    // // }
    //   for (var i=0; i<startLoc.length; i++) {
    //     alert(startLoc[i]);
    // }
    // }
     
  var infowindow = new google.maps.InfoWindow(
  { 
    size: new google.maps.Size(150,50)
  });

  function initialize() {  

      var marker = null;
    infowindow = new google.maps.InfoWindow(
      { 
        size: new google.maps.Size(150,50)
      });

      var myOptions = {
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

      address = 'Strada Hermann Oberth 5, Cluj-Napoca'
      geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': address}, function(results, status) {
       map.fitBounds(results[0].geometry.viewport);

      }); 

      google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
      });

      google.maps.event.addListener(map, 'click', function(event) {
  //call function to create marker
         if (marker) {
            marker.setMap(map);
            marker = null;
         }
      //marker = createMarker(event.latLng, "name", "<b>Location</b><br>"+event.latLng);
      startLoc.push(event.latLng);
       //  for (var j=0; j<startLoc.length; j++) {
       //   alert(startLoc[j]);
       // }
       alert(startLoc[startLoc.length-1]);
       console.info(startLoc.length);
       setRoutes(startLoc[startLoc.length-1], endLoc[1], startLoc.length);

      });

      for (var i=0; i< startLoc.length; i++){
        setRoutes(startLoc[i], endLoc[i], i);
      }

    // setRoutes();
    } 


  // function createMarker(latlng, label, html) {
  // // alert("createMarker("+latlng+","+label+","+html+","+color+")");
  //     var contentString = '<b>'+label+'</b><br>'+html;
  //     var marker = new google.maps.Marker({
  //         position: latlng,
  //         map: map,
  //         title: label,
  //         zIndex: Math.round(latlng.lat()*-100000)<<5
  //         });
  //         marker.myname = label;


  //     google.maps.event.addListener(marker, 'click', function() {
  //         infowindow.setContent(contentString); 
  //         infowindow.open(map,marker);
  //         });

  //       google.maps.event.addListener(map, 'click', function(event) {
  //         placeMarker(event.latLng);
  //       });
      
  //     return marker;
  // }

  function createMarker(latlng, name, html) {
    var contentString = html;
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
        });
    google.maps.event.trigger(marker, 'click');    
    return marker;
}  

  function setRoutes(startPoint, endPoint, i){   

      var directionsDisplay = new Array();

      //for (var i=0; i< startLoc.length; i++){

      var rendererOptions = {
          map: map,
          suppressMarkers : true,
          preserveViewport: true
      }
      directionsService = new google.maps.DirectionsService();

      var travelMode = google.maps.DirectionsTravelMode.DRIVING;  

      var request = {
          origin: startPoint,
          destination: endPoint,
          travelMode: travelMode
      };  

          directionsService.route(request,makeRouteCallback(i,directionsDisplay[i]));

      //}   


      function makeRouteCallback(routeNum,disp){
          if (polyline[routeNum] && (polyline[routeNum].getMap() != null)) {
           startAnimation(routeNum);
           return;
          }
          return function(response, status){
            
            if (status == google.maps.DirectionsStatus.OK){

              var bounds = new google.maps.LatLngBounds();
              var route = response.routes[0];
              startLocation[routeNum] = new Object();
              endLocation[routeNum] = new Object();


              polyline[routeNum] = new google.maps.Polyline({
              path: [],
              strokeColor: '#FFFF00',
              strokeWeight: 3
              });

              poly2[routeNum] = new google.maps.Polyline({
              path: [],
              strokeColor: '#FFFF00',
              strokeWeight: 3
              });     


              // For each route, display summary information.
              var path = response.routes[0].overview_path;
              var legs = response.routes[0].legs;


              disp = new google.maps.DirectionsRenderer(rendererOptions);     
              disp.setMap(map);
              disp.setDirections(response);


              //Markers               
              for (i=0;i<legs.length;i++) {
                if (i == 0) { 
                  startLocation[routeNum].latlng = legs[i].start_location;
                  startLocation[routeNum].address = legs[i].start_address;
                  // marker = google.maps.Marker({map:map,position: startLocation.latlng});
                  marker[routeNum] = createMarker(legs[i].start_location,"start",legs[i].start_address,"green");
                }
                endLocation[routeNum].latlng = legs[i].end_location;
                endLocation[routeNum].address = legs[i].end_address;
                var steps = legs[i].steps;

                for (j=0;j<steps.length;j++) {
                  var nextSegment = steps[j].path;                
                  var nextSegment = steps[j].path;

                  for (k=0;k<nextSegment.length;k++) {
                      polyline[routeNum].getPath().push(nextSegment[k]);
                      //bounds.extend(nextSegment[k]);
                  }

                }
              }

           }       

           //polyline[routeNum].setMap(map);
           //map.fitBounds(bounds);
           startAnimation(routeNum);  

      } // else alert("Directions request failed: "+status);

    }

  }

      var lastVertex = 1;
      var stepnum=0;
      var step = 5; // 5; // metres
      var tick = 150; // milliseconds
      var eol= [];
  //----------------------------------------------------------------------                
   function updatePoly(i,d) {
   // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
      if (poly2[i].getPath().getLength() > 20) {
            poly2[i]=new google.maps.Polyline([polyline[i].getPath().getAt(lastVertex-1)]);
            // map.addOverlay(poly2)
          }

      if (polyline[i].GetIndexAtDistance(d) < lastVertex+2) {
          if (poly2[i].getPath().getLength()>1) {
              poly2[i].getPath().removeAt(poly2[i].getPath().getLength()-1)
          }
              poly2[i].getPath().insertAt(poly2[i].getPath().getLength(),polyline[i].GetPointAtDistance(d));
      } else {
          poly2[i].getPath().insertAt(poly2[i].getPath().getLength(),endLocation[i].latlng);
      }
   }
  //----------------------------------------------------------------------------

  function animate(index,d) {
     if (d>eol[index]) {

        marker[index].setPosition(endLocation[index].latlng);
        return;
     }
      var p = polyline[index].GetPointAtDistance(d);

      //map.panTo(p);
      marker[index].setPosition(p);
      //updatePoly(index,d);
      timerHandle[index] = setTimeout("animate("+index+","+(d+step)+")", tick);
  }

  //-------------------------------------------------------------------------

  function startAnimation(index) {
          if (timerHandle[index]) clearTimeout(timerHandle[index]);
          eol[index]=polyline[index].Distance();
          map.setCenter(polyline[index].getPath().getAt(0));

          poly2[index] = new google.maps.Polyline({path: [polyline[index].getPath().getAt(0)], strokeColor:"#FFFF00", strokeWeight:3});

          timerHandle[index] = setTimeout("animate("+index+",50)",2000);  // Allow time for the initial map display
  }

  //----------------------------------------------------------------------------    
  // google.maps.event.addDomListener(window,'load',initialize);
