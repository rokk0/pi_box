var chart;
var time;

$(document).ready(function(){
  init_chart();
  setInterval('update_data();', 10000);
});

function get_data() {
  $.get('/get_data', function(data){
    reports = prepare_data(data);

    chart.series[0].setData(reports.temp, false);
    chart.series[1].setData(reports.hum, false);

    chart.redraw();
    chart.xAxis[0].setExtremes(chart.xAxis[0].min, chart.xAxis[0].max, true, true);

    chart.rangeSelector.clickButton(0,{count: 60, type: 'minute'}, true);
  });
}

function update_data() {
  $.get('/update_data', { start: time }, function(data){
    reports = prepare_data(data);

    for (i=0; i < reports.temp.length; i++) {
      if (chart.xAxis[0].max < reports.temp[i][0]) {
        chart.series[0].addPoint(reports.temp[i], false);
        chart.series[1].addPoint(reports.hum[i], false);

        chart.redraw();
        chart.xAxis[0].setExtremes(chart.xAxis[0].min, chart.xAxis[0].max, true, true);
      }
    }
  });
}

function prepare_data(data) {
  time = data['time']
  temp = data['reports']['temp']
  hum = data['reports']['hum']

  date = new Date(temp[temp.length-1][0]);
  $('#time').text(date.toLocaleString());
  $('#temp').text(temp[temp.length-1][1]);
  $('#hum').text(hum[hum.length-1][1]);

  return {temp: temp, hum: hum};
}

function init_chart() {
  Highcharts.setOptions({
    global : {
      useUTC : false
    }
  });

  chart = new Highcharts.StockChart({
    chart: {
      renderTo: 'chart',
      defaultSeriesType: 'spline',
      events: {
        load: get_data
      }
    },

    rangeSelector: {
      buttons: [{
        count: 60,
        type: 'minute',
        text: '1h'
      }, {
        count: 1,
        type: 'day',
        text: '1d'
      }, {
        count: 1,
        type: 'week',
        text: '1w'
      }, {
        count: 1,
        type: 'month',
        text: '1m'
      }, {
        type: 'all',
        text: 'All'
      }],
      inputEnabled: false,
      selected: 0
    },

    credits: {
      enabled: false
    },

    legend: {
      enabled: true
    },

    xAxis : {
      events : {
        afterSetExtremes : afterSetExtremes
      },
//      minRange: 3600 * 1000 // one hour
    },

    series : [{
      name : 'Temperature',
      color: '#2cf586',
      data : [],
      marker: {
        enabled: true
      }
    }, {
      name : 'Humidity',
      color: '#2cc3f5',
      data : [],
      marker: {
        enabled: true
      }
    }]
  });
}

function afterSetExtremes(e) {
  chart.showLoading('Loading data from server...');
  $.get('/update_data', { start: Math.round(e.min) / 1000, end: Math.round(e.max) / 1000 }, function(data) {
    reports = prepare_data(data);

    chart.series[0].setData(reports.temp, false);
    chart.series[1].setData(reports.hum, false);

    chart.hideLoading();
  });
}


