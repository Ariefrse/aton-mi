import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useEffect } from "react";
import { fetchAtonStats } from "../api/aton-api";
import { useAtonStore } from "../store/store";
import { tableValueFormatter } from "../utils/utils";

const columns: GridColDef[] = [
  { field: "no", headerName: "No", width: 10 },
  { field: "al_name", headerName: "Sitename", width: 150 },
  { field: "al_mmsi", headerName: "MMSI", width: 130 },
  { field: "al_type", headerName: "Structure", width: 130 },
  { field: "al_region", headerName: "Region", width: 130 },
  // { field: "minLatAton", headerName: "Min Lat Aton", width: 150 },
  // { field: "avgLatAton", headerName: "Avg Lat Aton", width: 150 },
  {
    field: "minBattAton",
    headerName: "Min Batt Aton",
    width: 150,
    valueFormatter: tableValueFormatter,
  },
  {
    field: "maxBattAton",
    headerName: "Max Batt Aton",
    width: 150,
    valueFormatter: tableValueFormatter,
  },
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
  {
    field: "off_pos",
    headerName: "Off Pos",
    width: 150,
    valueFormatter: tableValueFormatter,
  },
  {
    field: "msg6",
    headerName: "Msg 6 Count",
    width: 150,
    valueFormatter: tableValueFormatter,
  },
  // { field: "siteTx", headerName: "Site Tx", width: 150 },
  { field: "at_ts", headerName: "Timestamp", width: 150 },
  { field: "lastseen", headerName: "Last Seen", width: 150 },
];

export default function DataTable() {
  const { atonStatsData, setAtonStatsData } = useAtonStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchAtonStatsData = await fetchAtonStats();
        setAtonStatsData(fetchAtonStatsData!);
      } catch (error) {
        console.error("mende shiall !!", error);
      }
    }

    if (!atonStatsData || atonStatsData.length === 0) {
      fetchData();
    }
    console.log(atonStatsData);
  }, [atonStatsData, setAtonStatsData]);

  return (
    <div className="z-50 flex-grow h-[80vh]">
      <DataGrid
        rows={atonStatsData}
        columns={columns}
        pageSizeOptions={[20]}
        disableDensitySelector
        disableRowSelectionOnClick
        disableColumnSelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        className="m-2 opacity-90"
        sx={{
          "& .MuiDataGrid-root": {
            backgroundColor: "#121213",
          },
          "& .MuiDataGrid-cell": {
            backgroundColor: "#01060e",
            color: "#ffffff",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#4A90E2",
            color: "#030712",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#141516",
            color: "#913838",
            textColor: "#ffffff",
          },
        }}
      />
    </div>
  );
}
