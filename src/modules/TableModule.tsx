import { useEffect, useState } from "react";
import { useAtonStore } from "../store/store";
import { ColumnDefinition, ReactTabulator } from "react-tabulator";
import { atonData } from "../declarations/types/types";

/**
 * Converts camelCase or snake_case string to Uppercase Normal Case (Title Case).
 * Example: "offPosition" -> "OFF POSITION"
 * Example: "message_type_desc" -> "MESSAGE TYPE DESC"
 * @param str - The camelCase or snake_case string to convert.
 * @returns The converted uppercase Normal Case string.
 */
function formatToUpperCase(str: string): string {
  const withSpaces = str.replace(/_/g, " ");
  const withSpacesAndCamelCase = withSpaces.replace(/([a-z])([A-Z])/g, "$1 $2");
  return withSpacesAndCamelCase
    .split(" ")
    .map((word) => word.toUpperCase())
    .join(" ");
}

export default function TableModule() {
  const { atonData } = useAtonStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFormatter = (condition: (value: number | string) => boolean) => {
    const color = "rgba(29, 78, 216, 1)";
    return (cell: any) => {
      const value = cell.getValue();
      const isNumber = typeof value === "number";
      const shouldColor = isNumber && condition(value);
      cell.getElement().style.backgroundColor = shouldColor ? color : "";
      return value;
    };
  };

  const columns: ColumnDefinition[] = [
    { title: "No", field: "no", formatter: "rownum" },
    { title: "Site Name", field: "al_name", headerFilter: "input", width: 100 },
    { title: "MMSI", field: "mmsi", headerFilter: "input", width: 100 },
    { title: "Structure", field: "al_type", headerFilter: "input", width: 100 },
    { title: "Region", field: "al_region", headerFilter: "input", width: 120 },
    { title: "Min. Temp.", field: "minTemp" },
    { title: "Max. Temp.", field: "maxTemp" },
    {
      title: "Min Batt ATON",
      field: "minBattAton",
      formatter: getFormatter(
        (value) => typeof value === "number" && value < 12.0
      ),
    },
    {
      title: "Max Batt ATON",
      field: "maxBattAton",
      formatter: getFormatter(
        (value) => typeof value === "number" && value > 15.0
      ),
    },
    { title: "Avg BattATON", field: "meanBattAton" },
    { title: "Stddev Batt ATON", field: "stddevBattAton" },
    { title: "Skew Batt ATON", field: "skewBattAton" },
    { title: "Kurt Batt ATON", field: "kurtBattAton" },
    {
      title: "Min Batt Lantern",
      field: "minBattLant",
      formatter: getFormatter(
        (value) => typeof value === "number" && value < 12.0
      ),
    },
    {
      title: "Max Batt Lantern",
      field: "maxBattLant",
      formatter: getFormatter(
        (value) => typeof value === "number" && value > 15.0
      ),
    },
    { title: "Avg. Batt Lantern", field: "meanBattLant" },
    { title: "Stddev Batt Lantern", field: "stddevBattLant" },
    { title: "Skew Batt Lantern", field: "skewBattLant" },
    { title: "Kurt Batt Lantern", field: "kurtBattLant" },
    {
      title: "off Position",
      field: "off_pos",
      headerFilter: "input",
      formatter: getFormatter((value) => value === "NG"),
    },
    {
      title: "Message 6 Counting",
      field: "msg6Count",
      formatter: getFormatter(
        (value) => typeof value === "number" && value <= 0
      ),
    },
    {
      title: "Site with Message 6",
      field: "siteTx",
      headerFilter: "input",
      formatter: getFormatter((value) => value === "NG"),
    },
    { title: "Last Seen (Second)", field: "at_ts" },
    { title: "Last Maintain", field: "last_maintain" },
  ];

  return (
    <div className="z-50 absolute top-10 left-10 m-auto bg-gray-600 rounded-md bg-opacity-90">
      <ReactTabulator
        columns={columns}
        data={atonData}
        options={{
          height: "500px",
          layout: "fitColumns",
          pagination: "local",
          paginationSize: 10,
          movableColumns: true,
          movableRows: true,
        }}
      />
    </div>
  );
}
