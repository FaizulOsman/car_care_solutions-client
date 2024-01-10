import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ServicePositionChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const series = [68, 87, 75, 17, 15, 12];

  const options = {
    chart: {
      width: 380,
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    fill: {
      type: "gradient",
    },
    responsive: [
      {
        breakpoint: 560,
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
            width: 300,
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
    <div className="w-full sm:w-1/2 border border-solid border-[#1e3a8a] shadow p-4 rounded-md">
      <div className="flex items-center text-lg sm:text-2xl z-40 dark:text-white mb-5 border-l-4 pl-3">
        Service Position
      </div>
      {isClient && (
        <div className="flex items-center justify-center">
          <div id="chart">
            <ReactApexChart
              options={{ ...options, labels: seriesNames }}
              series={series}
              type="donut"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePositionChart;
