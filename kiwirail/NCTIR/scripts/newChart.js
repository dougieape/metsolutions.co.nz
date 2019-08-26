function googleAnalytics() {

    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-96841739-1', 'auto');
    ga('send', 'pageview');
    ga('send', 'event', 'TARP');


}

function readData(url, ctx){
	$.ajax({
		type: "GET",
		url: url,
		dataType: "text",
		success: function(data) {processData(data, ctx);}
	});
}

function processData(data, ctx){

	colours = ['rgba(51,51,215,1)','rgba(75,166,255,1)','rgba(159,216,239,1)','rgba(243,249,255,1)']

	data = data.split('\r\n')

	data = data.slice(1, data.length)
//console.log(data);


	displayData = {
		datasets: []
	}

	for (i in data){
		dataSplit = data[i].split(',')
console.log(dataSplit);
		if (dataSplit[0] == 'region'){
			region = dataSplit[3]
		}
		else if (dataSplit[0] == 'created'){
			created = dataSplit[3]
		}
		else if (dataSplit[0] == 'currentUntil'){
			currentUntil = dataSplit[3]
		}
		else if (data[i] != "") 
{
//console.log(i);
			output ={
				type: 'bubble',
				backgroundColor: colours[i-3],
				fillOpacity: 1,
				borderColor: '#000000',
				showLines: false,
				label: dataSplit[0],
				displayData:dataSplit[3],
				data: [
					{x:dataSplit[1],y:dataSplit[2],r: 7}
				],
				fill: false,
				tooltip: true,
				hiddenLegend: false
			}
			displayData.datasets.push(output)
		}
	}
console.log(displayData.datasets);
	limitData = [
			{
				type: 'bubble',
				backgroundColor: '#000000',
				borderColor: '#000000',
				showLines: false,
				label: 'dummy',
				data: [
					{x:0,y:0,r: 0}
				],
				fill: false,
				tooltip: false,
				hiddenLegend: true
			},
			{
				type: 'bubble',
				backgroundColor: '#000000',
				borderColor: '#000000',
				showLines: false,
				label: 'dummy',
				data: [
					{x:0,y:0,r: 0}
				],
				fill: false,
				tooltip: false,
				hiddenLegend: true
			},
			{
				label: 'BAU',
				type: 'line',
				backgroundColor: 'rgb(0,176,80)',
				borderColor: 'rgb(0,176,80)',
				pointRadius: 0,
				borderWidth: 2,
				data: [
					{x:0,y:15.56},
					{x:1,y:15.41},
					{x:2,y:14.98},
					{x:3,y:14.26},
					{x:4,y:13.24},
					{x:5,y:11.94},
					{x:6,y:10.36},
					{x:7,y:8.48},
					{x:8,y:6.31},
					{x:9,y:3.86},
					{x:10,y:1.11},
					{x:10.34,y:0}
				],
				fill: false,
				fillBetweenSet: 5,
          		fillBetweenColor: "rgba(0,176,80,0.3)",
				hiddenLegend: false
			},
			{
				label: 'Heightened Awareness',
				type: 'line',
				backgroundColor: 'rgb(255,255,0)',
				borderColor: 'rgb(255,255,0)',
				pointRadius: 0,
				borderWidth: 2,
				data: [
					{x:0,y:35},
					{x:1,y:34.92},
					{x:2,y:34.66},
					{x:4,y:33.64},
					{x:6,y:31.94},
					{x:8,y:29.56},
					{x:10,y:26.5},
					{x:12,y:22.76},
					{x:14,y:18.34},
					{x:16,y:13.24},
					{x:18,y:7.46},
					{x:20,y:1},
					{x:20.29,y:0}
				],
				fill: false,
				fillBetweenSet: 6,
          		fillBetweenColor: "rgba(255,255,0,0.3)",
				hiddenLegend: false
			},
			{
				label: "Run with RM Conditions",
				type: 'line',
				backgroundColor: 'rgb(255,192,0)',
				borderColor: 'rgba(255,192,0,0.3)',
				pointRadius: 0,
				borderWidth: 2,
				data: [
					{x:0,y:45.16},
					{x:1,y:45.11},
					{x:3,y:44.72},
					{x:6,y:43.40},
					{x:9,y:41.19},
					{x:12,y:38.10},
					{x:15,y:34.14},
					{x:18,y:29.28},
					{x:21,y:23.55},
					{x:24,y:16.94},
					{x:27,y:9.44},
					{x:30,y:1.06},
					{x:30.35,y:0}
				],
				fill: false,
				fillBetweenSet: 7,
          		fillBetweenColor: 'rgba(255,192,0,0.3)',
				hiddenLegend: true
			},
			{
				label: "Run with RM Conditions",
				type: 'line',
				backgroundColor: 'rgb(255,192,0)',
				borderColor: 'rgba(255,192,0,0.3)',
				pointRadius: 0,
				borderWidth: 2,
				data: [
					{x:0,y:55.12},
					{x:1,y:55.08},
					{x:4,y:54.58},
					{x:8,y:52.95},
					{x:12,y:50.25},
					{x:16,y:46.47},
					{x:20,y:41.60},
					{x:24,y:35.65},
					{x:28,y:28.62},
					{x:32,y:20.51},
					{x:36,y:11.31},
					{x:40,y:1.04},
					{x:40.38,y:0}
				],
				fill: false,
				fillBetweenSet: 8,
				fillBetweenColor: 'rgba(255,192,0,0.3)',
				hiddenLegend: false,
			},
			{
				label: "Run with RM Conditions",
				type: 'line',
				backgroundColor: 'rgb(255,192,0)',
				borderColor: 'rgb(255,192,0)',
				pointRadius: 0,
				borderWidth: 2,
				data: [
					{x:0,y:65.2},
					{x:1,y:65.0904003059023},
					{x:4,y:64.7064},
					{x:8,y:63.4776},
					{x:12,y:61.4296},
					{x:16,y:58.5624},
					{x:20,y:54.876},
					{x:24,y:50.3704},
					{x:28,y:45.0456},
					{x:32,y:38.9016},
					{x:36,y:31.9384},
					{x:40,y:24.156},
					{x:44,y:15.5544},
					{x:48,y:6.13359999999999},
					{x:50,y:1.116},
					{x:50.434,y:0}
				],
				fill: false,
				fillBetweenSet: 9,
				fillBetweenColor: 'rgba(255,192,0,0.3)',
				hiddenLegend: true,
			},
			{
				label: "Hold Trains",
				type: 'line',
				backgroundColor: 'rgb(240,59,32)',
				borderColor: "rgba(255,0,0,0)",
				pointRadius: 0,
				borderWidth: 2,
				data: [
					{x:0,y:max('y')},
					{x:max('x'),y:max('y')},
					{x:max('x'),y:0}
				],
				fill: false,
				fillBetweenSet: 10,
          		fillBetweenColor: "rgba(255,0,0,0.3)",
          		zoomTo: false,
				hiddenLegend: false,
			}]
	displayData.datasets=displayData.datasets.concat(limitData)
console.log(displayData.datasets);
	makeChart(ctx)
}

function makeChart(ctx){
console.log(displayData);
	var myChart = new Chart(ctx, {
		type: 'bubble',
		data: displayData,
		options: setOptions()
	});

	document.getElementById('chartjsLegend').innerHTML = myChart.generateLegend();
/*
	if (window.location.href.indexOf('localhost') == -1) {
		console.log('Enable GA')
		googleAnalytics();
	}
*/
}

function max(axis){
	curmax = 0

	for (i in displayData.datasets){
		if (parseInt(i) < 5){	
			if (parseInt(displayData.datasets[i].data[0][axis]) > curmax){
				curmax = parseInt(displayData.datasets[i].data[0][axis])
			}
		}
	}

	if (curmax > 65){
		return (Math.ceil(curmax / 10) * 10)+10;
	} else {
		return 70
	}
}

function setOptions(){
	options = {
		title:{
			display: true,
			text: ['NCTIR - ' + region, 'Created: ' + created,'Next update by ' + currentUntil],
			fontSize: 14,
			fontFamily:  "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
		},
		responsive: false,
		maintainAspectRatio: true,
		scales: {
			yAxes: [{
				scaleLabel:{
					display: true,
					labelString:'Daily Rainfall (mm)'
					
				},
				ticks: {
					beginAtZero:true,
					max: max('y')
				}
			}],
			xAxes: [{
				scaleLabel:{
					display: true,
					labelString:'Antecedent Rainfall Index'
				},
				ticks: {
					beginAtZero:true,
					max: max('x')
				}
			}]
		},
		legend:{
			display: false,
			labels:{
				filter: function(legendItem, chartData){
					return !chartData.datasets[legendItem.datasetIndex].hiddenLegend
				}
			},
			position: 'bottom'
		},
		chartArea: {
			// backgroundColor: 'rgba(255,0,0,0.3)'
		},
		showAllTooltips: false,
		tooltips: {
			filter: function (tooltipItem,chartData) {
				return chartData.datasets[tooltipItem.datasetIndex].tooltip;
			},
			backgroundColor: 'rgba(0,0,0,0.5)',
			callbacks: {
				title: function(tooltipItem, data) {
					try{
						return data.datasets[tooltipItem[0].datasetIndex].label;
					} catch(err){
						return false
					}
					
				},
				label: function(tooltipItem, data) {
					// return data['datasets'][0]['data'][tooltipItem['index']];
					if (data.datasets[tooltipItem.datasetIndex].displayData != ''){
						return data.datasets[tooltipItem.datasetIndex].displayData
					}else{
						return false
					}
				}
			}
		},
		hover: {
			mode: true
		},
		annotation: {
			annotations: [
				{
					type: 'line',
					id: 'call-count-1',
					mode: 'horizontal',
					scaleID: 'y-axis-0',
					value: 7,
					borderColor: 'transparent',
					label: {
						backgroundColor: 'transparent',
						fontFamily:  "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
						fontSize: 14,
						fontStyle: 'normal',
						fontColor: '#000000',
						xPadding: 12,
						yPadding: 6,
						cornerRadius: 4,
						position: 'left',
						xAdjust: 15,
						enabled: true,
						content: ['BAU'],
						rotation: 0
					}
				},
				{
					type: 'line',
					id: 'call-count-2',
					mode: 'horizontal',
					scaleID: 'y-axis-0',
					value: 15,
					borderColor: 'transparent',
					label: {
						backgroundColor: 'transparent',
						fontFamily:  "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
						fontSize: 14,
						fontStyle: 'normal',
						fontColor: '#000000',
						xPadding: 12,
						yPadding: 6,
						cornerRadius: 4,
						position: 'left',
						xAdjust: 60,
						enabled: true,
						content: ['Heightened', 'Awareness'],
						rotation: 0
					}
				},
				{
					type: 'line',
					id: 'call-count-3',
					mode: 'horizontal',
					scaleID: 'y-axis-0',
					value: 27,
					borderColor: 'transparent',
					label: {
						backgroundColor: 'transparent',
						fontFamily:  "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
						fontSize: 14,
						fontStyle: 'normal',
						fontColor: '#000000',
						xPadding: 12,
						yPadding: 6,
						cornerRadius: 4,
						position: 'left',
						xAdjust: 180,
						enabled: true,
						content: ["Run with RM", "Conditions"],
						rotation: 0
					}
				},
				{
					type: 'line',
					id: 'call-count-5',
					mode: 'horizontal',
					scaleID: 'y-axis-0',
					value: 40,
					borderColor: 'transparent',
					label: {
						backgroundColor: 'transparent',
						fontFamily:  "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
						fontSize: 14,
						fontStyle: 'normal',
						fontColor: '#000000',
						xPadding: 12,
						yPadding: 6,
						cornerRadius: 4,
						position: 'left',
						xAdjust: 400,
						enabled: true,
						content: ["Hold Trains"]
					}
				}
			],
			drawTime: 'afterDraw'
		}
	}

	return options

}

function newChart(div,data){

	ctx = document.getElementById(div);


	

	readData(data, ctx)
}