import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const IVCurve = ({ X, Y, title, xLabel, yLabel, color }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy the previous chart instance if it exists
    if (chartInstance.current) {
        chartInstance.current.destroy();
      }
  
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: X,
            datasets: [{
              label: '',
              data: Y,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: color,
              borderWidth: 3,
              pointRadius: 0
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: yLabel, // Y-axis label
                  font: {
                    size: 16,
                    family: 'Arial', // Customize the font family
                    style: 'normal',
                    weight: 'bold'
                  }
                },
                ticks: {
                  font: {
                    size: 13, // Customize the font size
                    family: 'Arial', // Customize the font family
                    style: 'normal',
                    weight: 'bold'
                  }
                }
              },
              x: {
                title: {
                  display: true,
                  text: xLabel, // X-axis label
                  font: {
                    size: 16,
                    family: 'Arial', // Customize the font family
                    style: 'normal',
                    weight: 'bold'
                  }
                },
                ticks: {
                  font: {
                    size: 13, // Customize the font size
                    family: 'Arial', // Customize the font family
                    style: 'normal',
                    weight: 'bold'
                  }
                }
              },
            },
            plugins: {
              title: {
                  display: true,
                  text: title, // Chart title
                  font: {
                    size: 20,
                    family: 'Arial', // Customize the font family
                    style: 'normal',
                    weight: 'bold'
                  }
              },
              legend: {
                display: false // Disables the legend
              },
            },
            animation: {
              duration: 0 // Disable animation
            }
          }
      });
  
      // Cleanup function to destroy chart instance when component unmounts
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }, [X, Y]); // Redraw the chart if X or Y data changes

  return <canvas ref={chartRef}></canvas>;
};

export default IVCurve;