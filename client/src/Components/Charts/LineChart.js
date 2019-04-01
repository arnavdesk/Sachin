import React from "react";
import ReactApexChart from "react-apexcharts";

export default class LineChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          shadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#03a9f4', '#f44336'],
        dataLabels: {
          enabled: true,
        },
        title: {
          text: 'Number of Centuries and Half Centuries Year Wise.',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 6,
        },
        yaxis:{
          min: 0,
          max:15
        },
        xaxis: {
          categories: this.props.years,
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'right',
        }
      },
      series: [
        {
          name: "Centuries",
          data: this.props.centuriesEachYear
        },
        {
          name: "Half Centuries",
          data: this.props.halfCenturiesEachYear
        }
      ],
    }
  }

  render() {

    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" />
      </div>
    )
  }
}