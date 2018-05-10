fetchNeighborhoods = () => {
	return fetch(NEIBORHOOD_NAMES_URL)
	.then(response => response.json())
	.then(json => json.data)
	.then(data => {
    //console.log(data)
		for(var i=0; i<data.length; i++) {

			var latLng = data[i][9]

			latLng = latLng.substring(7)
			latLng = latLng.substring(0, latLng.length-1)

			var latArr = latLng.split(' ')
			lat = latArr[0]
			lng = latArr[1]

			neighborhoods.push({
				name: data[i][10],
				lat,
				lng,
				borough: data[i][16]
			})
		}
	})
	//.then(() => { console.log(neighborhoods) })
}

fetchDistrictGeoshapes = () => {
	return fetch(DISTRICT_GEOSHAPES_URL)
	.then(response => response.json())
	.then(json => json.features)
	.then(features => {
    //console.log(features)
		for(var i=0; i<features.length; i++) {
			districtGeoshapes.push({
				properties: features[i].properties,
				geometry: features[i].geometry
			})
		}
	})
	//.then(() => { console.log(districtGeoshapes) })
	.then(() => { drawDistrictGeoshapes(districtGeoshapes) })
}

fetchCrimes = () => {
	return $.ajax({
    url: "https://data.cityofnewyork.us/resource/9s4h-37hy.json",
    type: "GET",
    data: {
      "$limit" : 5000
      //"$$app_token" : "YOURAPPTOKENHERE"
    }
	}).done((data) => {
		for(var i=0; i<data.length; i++)
			crimes.push(data[i])
		return Promise.resolve(crimes)
	})
	//.then(() => { console.log(crimes) })
}

fetchHousingData = () => {
	return fetch(HOUSING_URL)
	.then(response => response.json())
	.then(json => json.data)
	.then(data => {
    //console.log(data)
		for(var i=0; i<data.length; i++) {
      if(data[i][23]!==null && data[i][24]!==null)
        housingData.push(data[i])
    }
  })
	//.then(() => {	console.log(housingData) })
	.then(() => { drawHouseIcons(housingData) })
}

fetchPollution = () => {
	return fetch(POLLUTION_URL)
	.then(response => response.json())
	.then(json => json.data)
	.then(data => {
		//console.log(data)
		benzeneGlobalProp = 'Air Toxics Concentrations- Average Benzene Concentrations'
		formaldehydeGlobalProp = 'Air Toxics Concentrations- Average Formaldehyde Concentrations'
		trafficGlobalProp = 'Traffic Density- Annual Vehicle Miles Traveled (VMT)'

		for (var i = 0; i < data.length; i++) {
			tenthProp = data[i][10]
			if(tenthProp == benzeneGlobalProp || tenthProp == formaldehydeGlobalProp)
				pollution.push(data[i])
			if(tenthProp == trafficGlobalProp)
				traffic.push(data[i])
		}

	})
}


fetchCrimes().then(() => treatCrimes(crimes)).then(crimesPerBorough => drawDonutChart(crimesPerBorough, '#crimesChart'))
fetchPollution().then(() => treatPollution(pollution)).then(pollutionPerBorough => drawDonutChart(pollutionPerBorough, "#pollutionChart"))
fetchPollution().then(() => treatTraffic(traffic)).then(trafficPerBorough => drawDonutChart(trafficPerBorough, "#trafficChart"))

fetchNeighborhoods()
fetchHousingData()
fetchDistrictGeoshapes()


