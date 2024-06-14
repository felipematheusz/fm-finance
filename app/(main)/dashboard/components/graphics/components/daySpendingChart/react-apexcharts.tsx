'use client';

import React from 'react';

import ReactApexChart from 'react-apexcharts';

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
      id: 'basic-bar',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.categories,
    },
    yaxis: {
      labels: {
        formatter: (value: number) => {
          return `R$ ${value.toFixed(2).replace('.', ',')}`;
        },
      },
    },
    colors: ['#003366'],
    fill: {
      colors: ['#003366'],
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = data.series;

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="280"
        width="100%"
      />
    </div>
  );
};

export default Chart;
