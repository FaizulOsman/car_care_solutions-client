import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ServiceProvidingTimeChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const series = [
    {
      name: "Series 1",
      data: [100, 100, 100, 100, 100, 50, 100],
    },
  ];

  const options = {
    chart: {
      dropShadow: {
        enabled: false,
      },
      type: "radar",
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      radar: {
        // size: 100,
        polygons: {
          strokeColors: "#008ffb",
          fill: {
            colors: ["transparent", "transparent"],
          },
        },
      },
    },
    colors: ["#FF4560"],
    markers: {
      size: 4,
      colors: ["#fff"],
      strokeColor: "#FF4560",
      strokeWidth: 2,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    xaxis: {
      categories: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    // yaxis: {
    //   tickAmount: 7,
    //   labels: {
    //     formatter: function (val, i) {
    //       return i % 2 === 0 ? val : "";
    //     },
    //   },
    // },
    responsive: [
      {
        breakpoint: 510,
        options: {
          chart: {
            height: 220,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1024,
        options: {
          chart: {
            width: "100%",
            height: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            width: 270,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="w-full border border-solid border-[#1e3a8a] shadow p-4 rounded-md">
      <div className="flex items-center text-lg sm:text-2xl z-40 dark:text-white mb-5 border-l-4 pl-3">
        Service Providing Time (%)
      </div>
      {isClient && (
        <div className="flex-1 items-center justify-center">
          <div id="chart">
            <ReactApexChart
              options={options}
              series={series}
              type="radar"
              height={350}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProvidingTimeChart;
