import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { fetchAtonStats } from "../api/aton-api";
import { useAtonStore } from "../store/store";
import { ATON_STATS } from "../dummy-data/aton-stats";

type RowData = {
  id: number;
  sitename: string;
  mmsi: number;
  structure: string;
  region: string;
  minLatAton: string;
  avgLatAton: string;
  minBattAton: number;
  maxBattAton: number;
  minTemp: number;
  maxTemp: number;
  meanBattAton: number;
  stddevBattAton: number;
  skewBattAton: number;
  kurtBattAton: number;
  minBattLant: number;
  maxBattLant: number;
  meanBattLant: number;
  stddevBattLant: number;
  skewBattLant: number;
  kurtBattLant: number;
  off_pos: string;
  msg6Count: number;
  siteTx: string;
  at_ts: string;
  last_seen: string;
}

const columns: GridColDef[] = [
  { field: "sitename", headerName: "Sitename", width: 150 },
  { field: "mmsi", headerName: "MMSI", width: 130 },
  { field: "structure", headerName: "Structure", width: 130 },
  { field: "region", headerName: "Region", width: 130 },
  { field: "minLatAton", headerName: "Min Lat Aton", width: 150 },
  { field: "avgLatAton", headerName: "Avg Lat Aton", width: 150 },
  { field: "minBattAton", headerName: "Min Batt Aton", width: 150 },
  { field: "maxBattAton", headerName: "Max Batt Aton", width: 150 },
  { field: "minTemp", headerName: "Min Temp", width: 150 },
  { field: "maxTemp", headerName: "Max Temp", width: 150 },
  { field: "meanBattAton", headerName: "Mean Batt Aton", width: 150 },
  { field: "stddevBattAton", headerName: "Std Dev Batt Aton", width: 150 },
  { field: "skewBattAton", headerName: "Skew Batt Aton", width: 150 },
  { field: "kurtBattAton", headerName: "Kurt Batt Aton", width: 150 },
  { field: "minBattLant", headerName: "Min Batt Lant", width: 150 },
  { field: "maxBattLant", headerName: "Max Batt Lant", width: 150 },
  { field: "meanBattLant", headerName: "Mean Batt Lant", width: 150 },
  { field: "stddevBattLant", headerName: "Std Dev Batt Lant", width: 150 },
  { field: "skewBattLant", headerName: "Skew Batt Lant", width: 150 },
  { field: "kurtBattLant", headerName: "Kurt Batt Lant", width: 150 },
  { field: "off_pos", headerName: "Off Pos", width: 150 },
  { field: "msg6Count", headerName: "Msg 6 Count", width: 150 },
  { field: "siteTx", headerName: "Site Tx", width: 150 },
  { field: "at_ts", headerName: "Timestamp", width: 150 },
  { field: "last_seen", headerName: "Last Seen", width: 150 },
];

export default function DataTable() {
  const { atonStatsData, setAtonStatsData } = useAtonStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchAtonStatsData = await fetchAtonStats();
        setAtonStatsData(fetchAtonStatsData!);
      } catch (error) {
        console.log("mende shiall !!", error);
      }
    }

    if (!atonStatsData) {
      fetchData();
    }
  }, []);

  return (
    <div className="bg-gray-500 z-50">
      <div
        className="bg-gray-500 z-50"
        style={{ height: "auto", width: "100%" }}
      >
        <DataGrid
          rows={ATON_STATS}
          columns={columns}
          pageSizeOptions={[20]}
          className="m-2 opacity-90"
          checkboxSelection
          sx={{
            "& .MuiDataGrid-root": {
              backgroundColor: "#2A2F38",
            },
            "& .MuiDataGrid-cell": {
              backgroundColor: "#2A2F38",
              color: "#ffffff",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#4A90E2",
              color: "#000000",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#2A2F38",
              color: "#913838",
              textColor: "#ffffff",
            },
            overflowX: "auto",
          }}
        />
      </div>
    </div>
  );
}
