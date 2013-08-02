var chart;
var time;

$(document).ready(function() {
  init_chart();
});

function get_data() {
  $.get('/get_data', function(data) {
    reports = prepare_data(data);

    chart.series[0].setData(reports.hum);
    chart.series[1].setData(reports.temp);

    chart.xAxis[0].setExtremes(chart.xAxis[0].min, chart.xAxis[0].max, true, true);
    chart.rangeSelector.clickButton(0,{count: 60, type: 'minute'}, true);
    chart.hideLoading();
    setInterval('update_data();', 10000);
  });
}

function update_data() {
  $.get('/update_data', { from: time }, function(data) {
    reports = prepare_data(data);

    for (i=0; i < reports.temp.length; i++) {
      if (chart.xAxis[0].max < reports.temp[i][0]) {
        chart.series[0].addPoint(reports.hum[i]);
        chart.series[1].addPoint(reports.temp[i]);

        chart.xAxis[0].setExtremes(chart.xAxis[0].min, chart.xAxis[0].max, true, true);
      }
    }
  });
}

function prepare_data(data) {
  time = data['time']
  temp = data['reports']['temp']
  hum = data['reports']['hum']
  flags = data['flags']

  if (temp.length > 0) {
    $('#time').text(Highcharts.dateFormat('%d/%m/%Y %H:%M:%S', temp[temp.length-1][0]));
    $('#temp').text(temp[temp.length-1][1]);
    $('#hum').text(hum[hum.length-1][1]);
  }

  add_flags(flags);

  return {temp: temp, hum: hum};
}

function add_flags(data) {
//  data: [{x: time}, {x: time}]
  chart.addSeries({
    type: 'flags',
    showInLegend: false,
    data: data,
    width: 16,
  });
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
        load: function() {
          this.showLoading('Loading data from server...');
          get_data();
        }
      }
    },

    rangeSelector: {
      buttons: [{
        count: 60,
        type: 'minute',
        text: '1h'
      }, {
        count: 240,
        type: 'minute',
        text: '4h'
      }, {
        count: 720,
        type: 'minute',
        text: '12h'
      }, {
        count: 1,
        type: 'day',
        text: '1d'
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

    navigator: {
      baseSeries: 1
    },

    tooltip: {
      useHTML: true,
      formatter: function() {
        if(this.point) {
          p = '<img src="#" alt="' + new Date(this.point.x).toDateString() + '" />';
        } else {
          p = '<tspan style="font-size: 10px">' + Highcharts.dateFormat('%A, %b %e, %H:%M', this.x) + '</tspan></br>';
          $.each(this.points, function(i, series){
            p += '<tspan style="color:' + this.series.color + '">' + this.series.name + '</tspan>';
            p += '<tspan>: </tspan>';
            p += '<tspan style="font-weight:bold">' + this.y + '</tspan></br>';
          });
        }

        return p;
      }
    },

    series : [{
      name : 'Humidity',
      color: '#2cc3f5',
      data : [],
      marker: {
//      enabled: true
      }
    }, {
      name : 'Temperature',
      color: '#2cf586',
      data : [],
      marker: {
//      enabled: true
      }
    }]
  });
}
