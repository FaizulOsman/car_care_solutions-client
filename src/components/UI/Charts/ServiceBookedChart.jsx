import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ServiceBookedChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  const options = {
    chart: {
      type: "area",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    series: [
      {
        name: "Sales",
        data: [2, 7, 15, 12, 18, 25, 22, 35, 48, 41, 52, 59],
      },
    ],
    responsive: [
      {
        breakpoint: 510,
        options: {
          chart: {
            width: 410,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="w-full bg-[#161921] shadow p-4 rounded-md">
      <div className="flex items-center text-lg sm:text-2xl z-40 dark:text-white mb-5 border-l-4 pl-3">
        Service Booked
      </div>
      {isClient && (
        <div className="overflow-x-scroll sm:overflow-x-hidden overflow-y-hidden">
          <Chart
            options={options}
            series={options.series}
            type={options.chart.type}
            height={300}
          />
        </div>
      )}
    </div>
  );
};

export default ServiceBookedChart;
