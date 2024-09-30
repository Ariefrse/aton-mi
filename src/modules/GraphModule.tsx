import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Msg6 } from "../declarations/types/types";
import { fetchMsg6 } from "../api/aton-api";
import CloseButton from "../components/CloseButton";
import { useAtonStore } from "../store/store";
import { AxisConfig, ChartsXAxisProps } from "@mui/x-charts";
import { AxisScaleConfig } from "@mui/x-charts/internals";
import { IoDownload } from "react-icons/io5";

type GraphDataMap = {
  [key in keyof Pick<
    Msg6,
    "voltInt" | "voltExt1" | "voltExt2" | "light" | "beat" | "ambient"
  >]: string;
};

const graphDropdownItem: GraphDataMap = {
  voltInt: "ARMS Battery",
  voltExt1: "Battery Lantern Primary",
  voltExt2: "ATON Battery",
  light: "Light Sensor",
  beat: "Heart Beat Sensor",
  ambient: "Ambient Light Sensor",
};

type GraphType = keyof typeof graphDropdownItem;

export default function GraphModule() {
  const { toggles, setToggles, selectedAton, setSelectedAton, filter: filterState } =
    useAtonStore();
  const [graphType, setGraphType] = useState<GraphType>("voltInt");
  const [xAxisData, setXAxisData] = useState<string[]>([]);
  const [graphData, setGraphData] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
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
          setSelectedAton({ ...selectedAton!, msg6: msg6Data });

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
    })();
  }, [graphType]);

  const xAxisDataConfig: AxisConfig<
    keyof AxisScaleConfig,
    any,
    ChartsXAxisProps
  >[] = useMemo(
    () => [
      {
        id: "x-axis-id",
        data: xAxisData?.map((x) => new Date(x)),
        label: "Timestamp",
        scaleType: "time" as const,
        valueFormatter: (date) =>
          date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
        tickLabelStyle: { fill: "black" },
        labelStyle: { fill: "black" },
      },
    ],
    [xAxisData]
  );

  const seriesDataConfig = useMemo(
    () => [
      {
        data: graphData,
        label: `${selectedAton?.mmsi} - ${selectedAton?.name} (${graphDropdownItem[graphType]})`,
        color: "blue",
      },
    ],
    [graphData, graphType, selectedAton?.mmsi, selectedAton?.name]
  );

  const handleDownloadReport = async () => {
    const pdf = new jsPDF();
    let currentPage = 1;
    let chartsPerPage = 2;

    for (const [key, label] of Object.entries(graphDropdownItem)) {
      setGraphType(key as GraphType);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const chartElement = document.querySelector(".chart-container");

      if (chartElement) {
        const canvas = await html2canvas(chartElement as HTMLElement);
        const imgData = canvas.toDataURL("image/png");

        if (currentPage > chartsPerPage) {
          pdf.addPage();
          currentPage = 1;
        }

        const yPosition = (currentPage - 1) * (100 + 20);

        pdf.text(label, 10, yPosition + 10);
        pdf.addImage(imgData, "PNG", 10, yPosition + 20, 190, 100);

        currentPage++;
      }
    }

    pdf.save(`Report-${selectedAton?.mmsi}-${filterState?.date}.pdf`);
  };

  return (
    <div className="absolute transition-opacity bg-gray-900 rounded-md flex flex-col w-1/2 h-1/2">
      <div className="flex w-full items-center gap-2 mb-4 z-50 ml-auto pt-2 pr-2">
        <label htmlFor="graphType" className="mr-2 ml-4 text-white">
          Graph Type:
        </label>
        <select
          id="graphType"
          value={graphType}
          onChange={(e) => setGraphType(e.target.value as GraphType)}
          className="p-2 rounded bg-gray-700 text-white"
        >
          {Object.entries(graphDropdownItem).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <IoDownload className="text-white" onClick={handleDownloadReport} />
        <div className="flex-1" />
        <CloseButton
          className="ml-auto m-1 hover:cursor-pointer border-none"
          onClick={() => {
            setToggles({ ...toggles, graph: !toggles.graph });
            setSelectedAton(null);
          }}
        />
      </div>
      <LineChart
        className="bg-white z-10 chart-container"
        xAxis={xAxisDataConfig}
        yAxis={[
          {
            tickLabelStyle: { fill: "black" },
            labelStyle: { fill: "black" },
          },
        ]}
        series={seriesDataConfig}
      />
    </div>
  );
}
