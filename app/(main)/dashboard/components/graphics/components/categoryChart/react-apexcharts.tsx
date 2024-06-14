"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";

interface ChartProps {
  data: {
    categories: string[];
    series: {
      name: string;
      data: number[];
    }[];
  };
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const options = {
    chart: {
      id: "pie-chart",
      toolbar: {
        show: false,
      },
    },
    labels: data.categories,
    colors: ["#66B9FF", "#003366", "#00A86B", "#FFA500", "#66CC99", "#4D4D4D"],
    fill: {
      colors: [
        "#66B9FF",
        "#003366",
        "#00A86B",
        "#FFA500",
        "#66CC99",
        "#4D4D4D",
      ],
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: (w: any) => {
                return `R$ ${w.globals.seriesTotals
                  .reduce((a: number, b: number) => a + b, 0)
                  .toFixed(2)
                  .replace(".", ",")}`;
              },
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) => {
          return `R$ ${value.toFixed(2).replace(".", ",")}`;
        },
      },
    },
  };

  const series = data.series[0].data;

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      height="280px"
      width="100%"
    />
  );
};

export default Chart;
