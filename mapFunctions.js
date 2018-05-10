initMap = () => {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: SCHOOL_COORDS,
		styles: style3
	})

	var marker = new google.maps.Marker({
    position: SCHOOL_COORDS,
    map: map,
    title: 'NYU Stern School of Business'
  });
}

drawPolygon = (paths, map, boroughID) => {

  var colors = {
    '1': 'green',
    '2': 'orange',
    '3': 'red',
    '4': 'yellow',
    '5': 'purple'
  }

  var fillColor = colors[boroughID.toString().charAt(0)]

  new google.maps.Polygon({
    paths,
    strokeColor: 'lightpink',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor,
    fillOpacity: 0.3
  }).setMap(map)
}

drawDistrictGeoshapes = (districtGeoshapes) => {
  for(var i=0; i<districtGeoshapes.length; i++) {
    var paths = []
    
    var boroughID = districtGeoshapes[i].properties.BoroCD

    if(districtGeoshapes[i].geometry.type==="Polygon") {
      for(var j=0; j<districtGeoshapes[i].geometry.coordinates[0].length; j++) {
        paths.push({
          lat: districtGeoshapes[i].geometry.coordinates[0][j][1],
          lng: districtGeoshapes[i].geometry.coordinates[0][j][0]
        })
      }
      
      drawPolygon(paths, map, boroughID)
    }

    if(districtGeoshapes[i].geometry.type==="MultiPolygon") {
      for(var j=0; j<districtGeoshapes[i].geometry.coordinates.length; j++) {
        paths = []
        for(var k=0; k<districtGeoshapes[i].geometry.coordinates[j][0].length; k++) {
          paths.push({
            lat: districtGeoshapes[i].geometry.coordinates[j][0][k][1],
            lng: districtGeoshapes[i].geometry.coordinates[j][0][k][0]
          })
        }
        drawPolygon(paths, map, boroughID)
      }   
    }
  }
}

createMarker = (position, title, icon, id) => {
  var marker = new google.maps.Marker({       
    position, 
    map,
    title,
    icon      
  }); 
  google.maps.event.addListener(marker, 'click', function() {
    getInfoWindow(id).open(map, marker); 
  });

  return marker;
}

drawHouseIcons = (housingData) => {
  var icon = 'https://i.imgur.com/HajNVvb.png'

  for(var i=0; i<housingData.length; i++) {

    var id = housingData[i][1]
    var lat = parseFloat(housingData[i][23])
    var lng = parseFloat(housingData[i][24])
    var title = housingData[i][9]
      
    createMarker({lat, lng}, title, icon, id)

    housingDataById[id] = {
      lat,
      lng,
      title,
      desc: housingData[i][28] + " - " + housingData[i][30],
      street: housingData[i][9],
      number: housingData[i][13],
      startDate: housingData[i][10],
      completionDate: housingData[i][11],     
      borough: housingData[i][15],
      zipCode: housingData[i][8],
    }

  }
}

getInfoWindow = (id) => {

  data = housingDataById[id]
  var contentString =
    '<div>'+
    '<h1>'+data.title+'</h1>'+
    '<p>'+data.desc+'</p>'+
    '<p><b>Street:</b> '+data.street+'</p>'+
    '<p><b>Borough:</b> '+data.borough+'</p>'+
    '<p><b>ZIP Code:</b> '+data.zipCode+'</p>'+
    "<p><b>Project's start date:</b> " +data.startDate+"</p>"+
    "<p><b>Project's completion date:</b> " +data.completionDate+"</p>"+
    '</div>'

  return new google.maps.InfoWindow({ content: contentString })
}







