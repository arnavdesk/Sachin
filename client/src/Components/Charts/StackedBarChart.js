import React from "react";
import ReactApexChart from "react-apexcharts";

export default class StackedBarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          stacked: true,
          toolbar: {
            show: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        colors: [this.props.color1, this.props.color2],
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          categories: [this.props.text],
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
      series: [{
        name: this.props.name1,
        data: [this.props.achievement1]
      }, {
        name: this.props.name2,
        data: [this.props.achievement2]
      }],
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="350" />
      </div>
    );
  }
}