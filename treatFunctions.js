
treatCrimes = (crimes) => {

	crimesPerBorough = [ // used this awful structure for c3
		['BRONX', 0],
		['BROOKLYN', 0],
		['MANHATTAN', 0],
		['QUEENS', 0],
		['STATEN ISLAND', 0]
	]

	for(var i=0; i<crimes.length; i++) {
		var boroName = crimes[i].boro_nm
		for(var j=0; j<crimesPerBorough.length; j++) {
			if(crimesPerBorough[j][0]===boroName) {
				crimesPerBorough[j][1]++
			}
		}
	}

	// last transformation to make the graph look the same as the others
	crimesPerBorough[0] = ['Bronx', crimesPerBorough[0][1]]
	crimesPerBorough[1] = ['Brooklyn', crimesPerBorough[1][1]]
	crimesPerBorough[2] = ['Manhattan', crimesPerBorough[2][1]]
	crimesPerBorough[3] = ['Queens', crimesPerBorough[3][1]]
	crimesPerBorough[4] = ['Staten Island', crimesPerBorough[4][1]]

	return Promise.resolve(crimesPerBorough)
}

treatPollution = (pollution) => {

	pollutionPerBorough = [ // used this awful structure for c3
		['Bronx', 0.0],
		['Brooklyn', 0.0],
		['Manhattan', 0.0],
		['Queens', 0.0],
		['Staten Island', 0.0]
	]

	for(var i=0; i<pollution.length; i++) {
		var boroName = pollution[i][14]
		for(var j=0; j<pollutionPerBorough.length; j++) {
			if(pollutionPerBorough[j][0]===boroName) {
				pollutionPerBorough[j][1] += parseFloat(pollution[i][16])
			}
		}
	}
	return Promise.resolve(pollutionPerBorough)
}

treatTraffic = (traffic) => {

	trafficPerBorough = [ // used this awful structure for c3
		['Bronx', 0.0],
		['Brooklyn', 0.0],
		['Manhattan', 0.0],
		['Queens', 0.0],
		['Staten Island', 0.0]
	]

	for(var i=0; i<traffic.length; i++) {
		var boroName = traffic[i][14]
		for(var j=0; j<trafficPerBorough.length; j++) {
			if(trafficPerBorough[j][0]===boroName) {
				trafficPerBorough[j][1] += parseFloat(traffic[i][16])
			}
		}
	}
	return Promise.resolve(trafficPerBorough)
}