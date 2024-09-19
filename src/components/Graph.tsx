import { LineChart } from "@mui/x-charts/LineChart";
import { ChangeEvent, useEffect, useState } from "react";
import { ATON_GRAPH_DATA } from "../mock/mock";
import { Msg6 } from "../declarations/types/types";

type GraphDataMap = {
  [key in keyof Pick<
    Msg6,
    "volt_int" | "volt_ex1" | "volt_ex2" | "light" | "beat" | "ambient"
  >]: string;
};

const GRAPH_DATA_MAP: GraphDataMap = {
  volt_int: "ARMS Battery",
  volt_ex1: "ATON Battery",
  volt_ex2: "Battery Lantern Primary",
  light: "Light Sensor",
  beat: "Heart Beat Sensor",
  ambient: "Ambient Light Sensor",
};

export default function Graph() {
  const [graphType, setGraphType] =
    useState<keyof typeof GRAPH_DATA_MAP>("volt_ex1");
  const [xAxisData, setXAxisData] = useState<string[]>([]);
  const [atonGraphData, setAtonGraphData] = useState<number[]>([]);

  useEffect(() => {
    const msg6Data = ATON_GRAPH_DATA.msg6;

    const timestamps: string[] = msg6Data.map((msg) => msg.ts_iso).slice(0, 10);
    const data: number[] = msg6Data.map((msg) => msg[graphType]).slice(0, 10);

    setXAxisData(timestamps);
    setAtonGraphData(data);
  }, [graphType]);

  const handleGraphTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setGraphType(event.target.value as keyof typeof GRAPH_DATA_MAP);
  };

  return (
    <div className="absolute bg-gray-700 flex flex-col w-1/2 h-1/2">
      <div className="bg-gray-700 mb-4 z-50 ml-auto">
        <label htmlFor="graphType" className="mr-2 text-white">
          Select Graph Type:
        </label>
        <select
          id="graphType"
          value={graphType}
          onChange={handleGraphTypeChange}
          className="p-2 rounded bg-gray-700 text-white"
        >
          {/* Dynamically create dropdown options */}
          {Object.entries(GRAPH_DATA_MAP).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <LineChart
        className="bg-gray-600 z-10"
        xAxis={[
          {
            data: xAxisData.map((x) => new Date(x)),
            label: "Timestamp",
            scaleType: "time",
            valueFormatter: (date) =>
              date.toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }),
            tickLabelStyle: { fill: "white" },
          },
        ]}
        yAxis={[
          {
            tickLabelStyle: { fill: "white" },
          },
        ]}
        series={[
          {
            data: atonGraphData,
            label: GRAPH_DATA_MAP[graphType],
            color: "red",
          },
        ]}
      />
    </div>
  );
}
