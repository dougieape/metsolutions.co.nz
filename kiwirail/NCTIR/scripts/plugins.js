Chart.pluginService.register({
	beforeDraw: function (chart, easing) {
		if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
			var helpers = Chart.helpers;
			var ctx = chart.chart.ctx;
			var chartArea = chart.chartArea;

			ctx.save();
			ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
			ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
			ctx.restore();
		}
	}
});

Chart.pluginService.register({
    beforeRender: function(chart) {
        if (chart.config.options.showAllTooltips) {
            // create an array of tooltips
            // we can't use the chart tooltip because there is only one tooltip per chart
            chart.pluginTooltips = [];
            chart.config.data.datasets.forEach(function(dataset, i) {
                if (chart.config.data.datasets[i].displayLabel){
                    chart.getDatasetMeta(i).data.forEach(function(sector, j) {
                        chart.pluginTooltips.push(new Chart.Tooltip({
                            _chart: chart.chart,
                            _chartInstance: chart,
                            _data: chart.data,
                            _options: chart.options.tooltips,
                            _active: [sector]
                        }, chart));
                    });
                }
            });

            // turn off normal tooltips
            chart.options.tooltips.enabled = false;
        }
    },
    afterDraw: function(chart, easing) {
        if (chart.config.options.showAllTooltips) {
            // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
            if (!chart.allTooltipsOnce) {
                if (easing !== 1)
                    return;
                chart.allTooltipsOnce = true;
            }

            // turn on tooltips
            chart.options.tooltips.enabled = true;
            Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
                tooltip.initialize();
                tooltip.update();
                // we don't actually need this since we are not animating tooltips
                tooltip.pivot();
                tooltip.transition(easing).draw();
            });
            chart.options.tooltips.enabled = true;
        }
    }
})

Chart.pluginService.register({
        beforeDraw: function (chart) {
            var ctx = chart.chart.ctx;
            var xaxis = chart.scales['x-axis-0'];
            var yaxis = chart.scales['y-axis-0'];
            var datasets = chart.data.datasets;
            ctx.save();

            for (var d = 0; d < datasets.length; d++) {
                var dataset = datasets[d];
                if (dataset.fillBetweenSet == undefined) {
                    continue;
                }

                // get meta for both data sets
                var meta1 = chart.getDatasetMeta(d);
                var meta2 = chart.getDatasetMeta(dataset.fillBetweenSet);

                ctx.beginPath();

                // vars for tracing
                var curr, prev;

                // trace set1 line
                for (var i = 0; i < meta1.data.length; i++) {
                    curr = meta1.data[i];
                    if (i === 0) {
                        ctx.moveTo(curr._view.x, curr._view.y);
                        ctx.lineTo(curr._view.x, curr._view.y);
                        prev = curr;
                        continue;
                    }
                    if (curr._view.steppedLine === true) {
                        ctx.lineTo(curr._view.x, prev._view.y);
                        ctx.lineTo(curr._view.x, curr._view.y);
                        prev = curr;
                        continue;
                    }
                    if (curr._view.tension === 0) {
                        ctx.lineTo(curr._view.x, curr._view.y);
                        prev = curr;
                        continue;
                    }

                    ctx.bezierCurveTo(
                      prev._view.controlPointNextX,
                      prev._view.controlPointNextY,
                      curr._view.controlPointPreviousX,
                      curr._view.controlPointPreviousY,
                      curr._view.x,
                      curr._view.y
                    );
                    prev = curr;
                }


                // connect set1 to set2 then BACKWORDS trace set2 line
                for (var i = meta2.data.length - 1; i >= 0; i--) {
                    curr = meta2.data[i];
                    if (i === meta2.data.length - 1) {
                        ctx.lineTo(curr._view.x, curr._view.y);
                        prev = curr;
                        continue;
                    }
                    if (curr._view.steppedLine === true) {
                        ctx.lineTo(prev._view.x, curr._view.y);
                        ctx.lineTo(curr._view.x, curr._view.y);
                        prev = curr;
                        continue;
                    }
                    if (curr._view.tension === 0) {
                        ctx.lineTo(curr._view.x, curr._view.y);
                        prev = curr;
                        continue;
                    }

                    // reverse bezier
                    ctx.bezierCurveTo(
                      prev._view.controlPointPreviousX,
                      prev._view.controlPointPreviousY,
                      curr._view.controlPointNextX,
                      curr._view.controlPointNextY,
                      curr._view.x,
                      curr._view.y
                    );
                    prev = curr;
                }

                ctx.closePath();
                ctx.save()
                if (dataset.fillBetweenPattern){
                    image = new Image()
                    image.src = dataset.fillBetweenPattern
                    image.style.opacity = 0.2
                    image.style.filter  = 'alpha(opacity=20)'
                    ctx.globalAlpha = 0.3
                    ctx.fillStyle = ctx.createPattern(image, "repeat")
                } else {
                    ctx.fillStyle = dataset.fillBetweenColor || "rgba(0,0,0,0.1)";
                }

                ctx.fill();
                ctx.restore()
            }
        } // end afterDatasetsDraw
    })