drawDonutChart = (data, bindto) => {

  var title = ''

  switch(bindto){
    case '#crimesChart':
      title = 'CRIMES'
      break;
    case '#trafficChart':
      title = 'TRAFFIC'
      break;
    case '#pollutionChart':
      title = 'POLLUTION'
      break;
  }

  c3.generate({
    bindto,
    size: {
        height: 280,
        width: 280
    },
    data: {
      columns: data,
      type : 'donut',
      onclick: function (d, i) { console.log("onclick", d, i); },
      onmouseover: function (d, i) { console.log("onmouseover", d, i); },
      onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    donut: {
      title
    }
  })
}


