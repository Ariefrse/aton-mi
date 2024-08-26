import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Fragment } from "react/jsx-runtime";
import { useAtonStore } from "../store/store";
import { CloseButton } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Data for each section
const data = [
  {
    title: "Last 5 minutes",
    chartData: {
      labels: ["0m", "1m", "2m", "3m", "4m"],
      datasets: [
        {
          label: "Message 6",
          data: [61900, 61000, 62000, 63000, 61900],
          borderColor: "rgba(255, 99, 132, 1)", // Red line
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderDash: [5, 5], // Dashed line
        },
        {
          label: "Message 8",
          data: [2880, 2900, 2800, 3000, 2880],
          borderColor: "rgba(54, 162, 235, 1)", // Blue line
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderDash: [10, 5], // Dashed line
        },
        {
          label: "Message 21",
          data: [93050, 94000, 92000, 95000, 93050],
          borderColor: "rgba(75, 192, 192, 1)", // Green line
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderDash: [5, 10], // Dashed line
        },
      ],
    },
  },
  {
    title: "Yesterday, at these times",
    chartData: {
      labels: ["0m", "1m", "2m", "3m", "4m"],
      datasets: [
        {
          label: "Message 6",
          data: [62930, 62000, 63000, 64000, 62930],
          borderColor: "rgba(255, 99, 132, 1)", // Red line
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderDash: [5, 5], // Dashed line
        },
        {
          label: "Message 8",
          data: [3005, 3100, 2900, 3200, 3005],
          borderColor: "rgba(54, 162, 235, 1)", // Blue line
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderDash: [10, 5], // Dashed line
        },
        {
          label: "Message 21",
          data: [91992, 93000, 91000, 94000, 91992],
          borderColor: "rgba(75, 192, 192, 1)", // Green line
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderDash: [5, 10], // Dashed line
        },
      ],
    },
  },
  {
    title: "Difference Today and Yesterday",
    chartData: {
      labels: ["0m", "1m", "2m", "3m", "4m"],
      datasets: [
        {
          label: "Message 6 Difference",
          data: [1000, 1100, 900, 1200, 1000],
          borderColor: "rgba(255, 99, 132, 1)", // Red line
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderDash: [5, 5], // Dashed line
        },
        {
          label: "Message 8 Difference",
          data: [500, 600, 400, 700, 500],
          borderColor: "rgba(54, 162, 235, 1)", // Blue line
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderDash: [10, 5], // Dashed line
        },
        {
          label: "Message 21 Difference",
          data: [2000, 2100, 1900, 2200, 2000],
          borderColor: "rgba(75, 192, 192, 1)", // Green line
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderDash: [5, 10], // Dashed line
        },
      ],
    },
  },
];

const MessageCountOverview = () => {
  const { toggles, setToggles } = useAtonStore();

  return (
    <div className="relative">
      <div className="bg-gray-700 z-10 p-4 rounded-lg h-full">
        <div className="vessel-info-title">
          <div className="flex justify-between">
            <h4 className="text-lg font-bold">Message 6, 8, 21 Counting...</h4>
            <IoMdClose
              className="absolute top-1 right-2"
              fontSize={24}
              onClick={() =>
                setToggles({ ...toggles, messageCountOverview: false })
              }
            />
          </div>
          {data.map((section, index) => (
            <Fragment key={index}>
              <div className="title mt-4">
                <h4 className="text-gray-300">{section.title}</h4>
              </div>
              <div className="mt-4">
                <Line data={section.chartData} options={{ responsive: true }} />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageCountOverview;
