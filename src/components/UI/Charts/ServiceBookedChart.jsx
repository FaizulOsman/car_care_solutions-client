import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ServiceBookedChart = () => {
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
        data: [2, 7, 15, 12, 18, 25, 22, 35, 48, 41, 57, 59],
      },
    ],
  };

  return (
    <div className="flex-1 border border-solid border-[#1e3a8a] shadow p-4 rounded-md">
      <div className="flex items-center text-lg sm:text-2xl z-40 dark:text-white mb-5 border-l-4 pl-3">
        Service Booked
      </div>
      <Chart
        options={options}
        series={options.series}
        type={options.chart.type}
        height={300}
      />
    </div>
  );
};

export default ServiceBookedChart;
