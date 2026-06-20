// component set up
import React from "react";
import Chart from "chart.js";

let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'Open Sans', sans-serif";
Chart.defaults.global.legend.display = false;
//--Chart Style Options--//

export default class LineGraph extends React.Component {
  // alt method by using createRef
  //chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  buildChart = () => {
    // alt method by using createRef
    //const myChartRef = this.chartRef.current.getContext("2d");
    //const { data, average, labels } = this.props;

    // alt method by calling explicit unique id
    const myChartRef = document.getElementById(this.props.id).getContext("2d");

    // label on y access optional
    var yLabel = "";
    if (this.props.yLabel != null) yLabel = this.props.yLabel;

    var xLabelExt = "";
    if (this.props.xLabelExt != null) xLabelExt = this.props.xLabelExt;

    // line tension optional
    var lineTension = 0.4;
    if (this.props.lineTension != null) lineTension = this.props.lineTension;

    // stepped line
    let steppedLine = false;
    if (this.props.steppedLine != null) steppedLine = this.props.steppedLine;

    // prevent accidental duplicate
    if (typeof myLineChart !== "undefined") myLineChart.destroy();

    this.myLineChart = new Chart(myChartRef, {
      type: "line",
      data: {
        labels: this.props.xLabels,
        datasets: [
          {
            //fill: false, // no fill below
            lineTension: lineTension,
            steppedLine: steppedLine,
            borderColor: "rgba(255,255,255,0.6)",
            backgroundColor: "rgba(255,255,255,0.2)",
            pointBackgroundColor: "rgba(255,255,255,0.9)",
            data: this.props.data,
          },
        ],
      },
      options: {
        layout: {
          padding: {
            bottom: -8,
            left: -5,
          },
        },
        tooltips: {
          custom: function (tooltip) {
            if (!tooltip) return;
            tooltip.displayColors = false;
          },
          callbacks: {
            title: function (tooltipItem) {
              var newLabel = this._data.labels[tooltipItem[0].index];
              newLabel = newLabel.replace("-", "");
              return newLabel + xLabelExt;
            },
            label: function (tooltipItems, data) {
              return (
                data.datasets[tooltipItems.datasetIndex].data[
                  tooltipItems.index
                ] + yLabel
              );
            },
          },
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                color: "rgba(220,220,220,.1)",
                zeroLineColor: "rgba(220,220,220,.1)",
                drawBorder: false,
                drawTicks: true,
              },
              ticks: {
                fontColor: "rgba(255,255,255,0.5)",
                beginAtZero: true,
                min: 0,
                max: this.props.yRange,
                stepSize: this.props.yStep,
                callback: function (tick) {
                  return tick + yLabel;
                },
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
                color: "rgba(220,220,220,.1)",
                drawBorder: false,
              },
              ticks: {
                fontColor: "rgba(255,255,255,0.5)",
              },
            },
          ],
        },
      },
    });
  };

  updateChart = () => {
    for (var i = 0; i < this.props.data.length; i++) {
      this.myLineChart.data.datasets[0].data[i] = this.props.data[i];
    }

    this.myLineChart.update();
  };

  render() {
    // ref={this.chartRef}

    return (
      <div>
        <canvas id={this.props.id} />
      </div>
    );
  }
}
