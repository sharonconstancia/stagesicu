import Chart from 'react-apexcharts';

const LineChart = ({ series, options }) => {
  const lineChartData = [
    {
      name: 'Nombres des locateurs',
      data: [...series,1,2,3,4,5],
      color: '#87CEEB',
    },
  ]; 
  const lineChartOptions = {
    legend: {
      show: false,
    },
  
    theme: {
      mode: 'light',
    },
    chart: {
      type: 'line',
  
      toolbar: {
        show: false,
      },
    },
  
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
  
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: undefined,
        backgroundColor: '#000000',
      },
      theme: 'dark',
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#A3AED0',
          fontSize: '12px',
          fontWeight: '500',
        },
      },
      type: 'text',
      range: undefined,
      categories: [...options,3,4,5,6,7],
    },
  
    yaxis: {
      show: false,
    },
  };
  

  return (
    <Chart
      options={lineChartOptions}
      type='area'
      width='90%'
      height='190%'
      series={lineChartData}
    />
  );
};

export default LineChart;
