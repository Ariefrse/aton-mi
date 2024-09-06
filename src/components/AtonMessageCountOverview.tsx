import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { X } from 'lucide-react';
import { useAtonStore } from '../store/store'; // Make sure to replace with the correct path
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: { color: 'rgba(255, 255, 255, 0.7)' },
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: { color: 'rgba(255, 255, 255, 0.7)' },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const generateChartData = (labels: string[], data1: number[], data2: number[], data3: number[]) => ({
  labels,
  datasets: [
    {
      label: 'Message 6',
      data: data1,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Message 8',
      data: data2,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
    {
      label: 'Message 21',
      data: data3,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
});

const last5MinData = generateChartData(
  ['07:14', '07:15', '07:16', '07:17', '07:18', '07:19', '07:20', '07:21', '07:22', '07:23'],
  [52733, 52733, 52733, 52733, 52733, 52733, 52733, 52733, 52733, 52733],
  [2514, 2514, 2514, 2514, 2514, 2514, 2514, 2514, 2514, 2514],
  [84476, 84476, 84476, 84476, 84476, 84476, 84476, 84476, 84476, 84476]
);

const last24HoursData = generateChartData(
  ['07:04', '09:04', '11:04', '13:04', '15:04', '17:04', '19:04', '21:04', '23:04', '01:04'],
  [50897, 50897, 50897, 50897, 50897, 50897, 50897, 50897, 50897, 50897],
  [2386, 2386, 2386, 2386, 2386, 2386, 2386, 2386, 2386, 2386],
  [83814, 83814, 83814, 83814, 83814, 83814, 83814, 83814, 83814, 83814]
);

const todayVsYesterdayData = generateChartData(
  ['07:14', '07:15', '07:16', '07:17', '07:18', '07:19', '07:20', '07:21', '07:22'],
  [1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800],
  [400, 400, 400, 400, 400, 400, 400, 400, 400],
  [200, 200, 200, 200, 200, 200, 200, 200, 200]
);

const AtonMessageCountOverview = () => {
  const { toggles, setToggles } = useAtonStore();
  const [isVisible, setIsVisible] = useState(true); // Add state for visibility

  if (!isVisible) return null; 
  

  return (
    <div className=" bg-gray-900 z-0 p-4 rounded-lg w-96 h-full overflow-y-auto ">
     
      <div className="justify-between mb-6">
        <h2 className="text-xl ">AtoN Message Count Overview</h2>
        <IoMdClose
              className="absolute top-2 text-gray-400 hover:text-white right-2 mt-3 mr-2 hover:cursor-pointer transition-transform duration-500" // Updated duration
              fontSize={22}
              onClick={() => {
                setToggles({
                  ...toggles,
                  messageCountOverview: false,
                 // Added this line
                });
                setIsVisible(false); // Update visibility state
            }}
            
            />
      </div>

      <div className="space-y-8 h-96 ">
        <div>
          <h3 className="text-lg font-medium mb-2">Last 5 minutes</h3>
          <div className="h-48">
            <Line options={chartOptions} data={last5MinData} />
          </div>
          <div className="mt-2 text-sm">
            <p>Message 6: 52733</p>
            <p>Message 8: 2514</p>
            <p>Message 21: 84476</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Last 24 Hours</h3>
          <div className="h-48">
            <Line options={chartOptions} data={last24HoursData} />
          </div>
          <div className="mt-2 text-sm">
            <p>Message 6: 50897</p>
            <p>Message 8: 2386</p>
            <p>Message 21: 83814</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Today vs. Yesterday</h3>
          <div className="h-48">
            <Line options={chartOptions} data={todayVsYesterdayData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtonMessageCountOverview;