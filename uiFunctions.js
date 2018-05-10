showChart = (buttonId) => {

	chartId = ''

	switch(buttonId){
		case "crimesBtn":
			chartId = "crimesChart"
			break;
		case "trafficBtn":
			chartId = "trafficChart"
			break;
		case "pollutionBtn":
			chartId = "pollutionChart"
			break;
	}

	chart = document.getElementById(chartId)

	chart.style.display==="none" ?
		chart.style.display = "block" : chart.style.display = "none"
}