import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect } from "react";

export default function Graph() {
  useEffect(() => {}, []);

  return (
    <div className="m-auto h-auto z-50">
      <LineChart
        className="bg-gray-800 rounded-md"
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
      />
    </div>
  );
}
