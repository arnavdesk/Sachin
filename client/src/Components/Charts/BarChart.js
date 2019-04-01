
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

export default class BarChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'bottom', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
            colors: ["#000"]
          }
        },
        xaxis: {
          categories: this.props.categories,
          position: 'top',
          labels: {
            offsetY: -18,
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          tooltip: {
            enabled: true,
            offsetY: -35,
          }
        },
        fill: {
          colors: [this.props.barColor],
          gradient: {
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          },
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
          }
        },
        title: {
          text: this.props.text,
          floating: true,
          offsetY: 320,
          align: 'center',
          style: {
            color: '#000',
          }
        }
      },
      series: [{
        name: this.props.name,
        data: this.props.data
      }],
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="350" />
      </div>
    )
  }
}













