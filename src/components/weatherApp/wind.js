import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";

highchartsMore(Highcharts);
solidGauge(Highcharts);
const Wind = (props) => {
  useEffect(() => {
    let wind_speed = props.speed ? props.speed : 0;
    Highcharts.chart("wind-container", {
      chart: {
        type: "gauge",
        plotBackgroundColor: null,
        plotBackgroundImage: "./components/resources/background-image1.jpg",
        plotBorderWidth: 0,
        plotShadow: false,
        height: "80%",
      },

      title: {
        text: "Wind Speed",
      },

      pane: {
        startAngle: -90,
        endAngle: 89.9,
        background: null,
        center: ["50%", "75%"],
        size: "100%",
      },

      // the value axis
      yAxis: {
        min: 0,
        max: 200,
        tickPixelInterval: 72,
        tickPosition: "inside",
        tickColor: Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
        tickLength: 20,
        tickWidth: 2,
        minorTickInterval: null,
        labels: {
          distance: 20,
          style: {
            fontSize: "14px",
          },
        },
        lineWidth: 0,
        plotBands: [
          {
            from: 0,
            to: 120,
            color: "#55BF3B", // green
            thickness: 20,
          },
          {
            from: 120,
            to: 160,
            color: "#DDDF0D", // yellow
            thickness: 20,
          },
          {
            from: 160,
            to: 200,
            color: "#DF5353", // red
            thickness: 20,
          },
        ],
      },

      series: [
        {
          name: "Wind Speed",
          data: [wind_speed],
          tooltip: {
            valueSuffix: " km/h",
          },
          dataLabels: {
            format: "{y} km/h",
            borderWidth: 0,
            color:
              (Highcharts.defaultOptions.title &&
                Highcharts.defaultOptions.title.style &&
                Highcharts.defaultOptions.title.style.color) ||
              "#333333",
            style: {
              fontSize: "16px",
            },
          },
          dial: {
            radius: "80%",
            backgroundColor: "gray",
            baseWidth: 12,
            baseLength: "0%",
            rearLength: "0%",
          },
          pivot: {
            backgroundColor: "gray",
            radius: 6,
          },
        },
      ],
    });
  }, [props.speed]);

  return (
    <figure class="highcharts-figure">
      <div id="wind-container"></div>
    </figure>
  );
};

export default Wind;
