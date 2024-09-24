import { LineChart } from "@mui/x-charts/LineChart";
import { ChangeEvent, useEffect, useState } from "react";
import { Msg6 } from "../declarations/types/types";
import { fetchMsg6 } from "../api/aton-api";
import CloseButton from "../components/CloseButton";
import { useAtonStore } from "../store/store";

type GraphDataMap = {
  [key in keyof Pick<
    Msg6,
    "voltInt" | "voltExt1" | "voltExt2" | "light" | "beat" | "ambient"
  >]: string;
};

const graphDropdownItem: GraphDataMap = {
  voltInt: "ARMS Battery",
  voltExt1: "ATON Battery",
  voltExt2: "Battery Lantern Primary",
  light: "Light Sensor",
  beat: "Heart Beat Sensor",
  ambient: "Ambient Light Sensor",
};

type GraphType = keyof typeof graphDropdownItem;

export default function GraphModule() {
  const { toggles, setToggles, selectedAton, setSelectedAton } = useAtonStore();
  const [graphType, setGraphType] = useState<GraphType>("voltInt");
  const [xAxisData, setXAxisData] = useState<string[]>([]);
  const [graphData, setGraphData] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedAton?.msg6) {
        const timestamps = selectedAton?.msg6
          .slice(0, 10)
          .map((msg) => msg.localTs);
        const data = selectedAton?.msg6
          .slice(0, 10)
          .map((msg) => msg[graphType]);

        setXAxisData(timestamps.filter((timestamp) => timestamp !== undefined));
        setGraphData(data.filter((data) => data !== undefined));
      } else {
        try {
          const msg6Data = await fetchMsg6(selectedAton?.mmsi!);
          setSelectedAton({ ...selectedAton, msg6: msg6Data });

          console.log("msg", selectedAton);

          // Check if data exists and has the expected properties
          if (!msg6Data?.length || !msg6Data[0]?.[graphType]) {
            console.error("Missing or invalid data in API response");
            return;
          }

          const timestamps = msg6Data.slice(0, 10).map((msg) => msg.localTs);
          const data = msg6Data.slice(0, 10).map((msg) => msg[graphType]);

          setXAxisData(timestamps);
          setGraphData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [graphType]);

  const handleGraphTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setGraphType(event.target.value as GraphType);
  };

  const handleCloseGraph = () => {
    setToggles({...toggles, graph: !toggles.graph });
    setSelectedAton(null);
  };

  return (
    <div className="absolute bg-gray-900 rounded-md flex flex-col w-1/2 h-1/2">
      <CloseButton
        className="top-0 right-0 border-none m-1"
        onClick={handleCloseGraph}
      />
      <div className="mb-4 z-50 ml-auto pt-4 pr-2">
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
          {Object.entries(graphDropdownItem).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <LineChart
        className="bg-gray-900 z-10"
        xAxis={[
          {
            data: xAxisData?.map((x) => new Date(x)),
            label: "Timestamp",
            scaleType: "time",
            valueFormatter: (date) =>
              date.toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }),
            tickLabelStyle: { fill: "white" },
            labelStyle: { fill: "white" },
          },
        ]}
        yAxis={[
          {
            tickLabelStyle: { fill: "white" },
            labelStyle: { fill: "white" },
          },
        ]}
        series={[
          {
            data: graphData,
            label: `${selectedAton?.mmsi} - ${selectedAton?.name} (${graphDropdownItem[graphType]})`,
            color: "red",
          },
        ]}
      />
    </div>
  );
}
