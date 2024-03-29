import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ServiceRatingsChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const series = [79, 95, 81, 75, 65, 50];

  const options = {
    chart: {
      type: "polarArea",
      dropShadow: {
        enabled: false,
      },
      background: "transparent",
    },
    stroke: {
      colors: ["#fff"],
    },
    fill: {
      opacity: 0.97,
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        labels: {
          name: {
            show: true,
            fontSize: "14px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            color: undefined,
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: "16px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            color: undefined,
            offsetY: 16,
            formatter: function (val) {
              return val;
            },
          },
          total: {
            show: true,
            label: "Total",
            color: undefined,
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              }, 0);
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 790,
        options: {
          chart: {
            width: 250,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1280,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1400,
        options: {
          chart: {
            width: 250,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1500,
        options: {
          chart: {
            width: 280,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1600,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1700,
        options: {
          chart: {
            width: 320,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1920,
        options: {
          chart: {
            width: 350,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const seriesNames = [
    "Regulars",
    "Standard",
    "Premium",
    "Paint",
    "Interior",
    "Platinum",
  ];

  return (
    <div className="w-full sm:w-1/2 bg-[#161921] shadow p-4 rounded-md">
      <div className="flex items-center text-lg sm:text-2xl z-40 dark:text-white mb-5 border-l-4 pl-3">
        Service Ratings (%)
      </div>
      {isClient && (
        <div id="chart" className="flex items-center justify-center">
          <ReactApexChart
            options={{ ...options, labels: seriesNames }}
            series={series}
            type="polarArea"
          />
        </div>
      )}
    </div>
  );
};

export default ServiceRatingsChart;
