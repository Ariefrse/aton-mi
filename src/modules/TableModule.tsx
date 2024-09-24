import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import { fetchAtonTableData } from "../api/aton-api";
import { useAtonStore } from "../store/store";
import { Box } from "@mui/material";

const renderCell = (params?: GridRenderCellParams) => {
  if (!params) return null;
  const { field, value } = params;
  let bgColor = "";

  // RULES & CONDITIONS //TODO: Need to confirm with Mai
  if (
    (field === "minBattAton" && value < 13.0) ||
    (field === "maxBattAton" && value < 12.0) ||
    (field === "minBattLant" && value < 12.0) ||
    (field === "maxBattLant" && value > 15.0) ||
    (field === "off_pos" && value === "OK") ||
    (field === "msg6" && value <= 0)
  ) {
    bgColor = "rgba(29, 78, 216, 1)";
  }

  return (
    <Box
      sx={{
        backgroundColor: bgColor,
        width: "100%",
        height: "100%",
      }}
    >
      {value}
    </Box>
  );
};

const columns: GridColDef[] = [
  { field: "al_name", headerName: "Sitename", width: 150 },
  { field: "al_mmsi", headerName: "MMSI", width: 100 },
  { field: "al_type", headerName: "Structure", width: 100 },
  { field: "al_region", headerName: "Region", width: 200 },
  { field: "minBattAton", headerName: "Min Batt Aton", width: 120, renderCell },
  { field: "maxBattAton", headerName: "Max Batt Aton", width: 120, renderCell },
  { field: "minTemp", headerName: "Min Temp", width: 100 },
  { field: "maxTemp", headerName: "Max Temp", width: 100 },
  { field: "meanBattAton", headerName: "Mean Batt Aton", width: 150 },
  { field: "stddevBattAton", headerName: "Std Dev Batt Aton", width: 150 },
  { field: "skewBattAton", headerName: "Skew Batt Aton", width: 150 },
  { field: "kurtBattAton", headerName: "Kurt Batt Aton", width: 150 },
  { field: "minBattLant", headerName: "Min Batt Lant", width: 150, renderCell },
  { field: "maxBattLant", headerName: "Max Batt Lant", width: 150, renderCell },
  { field: "meanBattLant", headerName: "Mean Batt Lant", width: 150 },
  { field: "stddevBattLant", headerName: "Std Dev Batt Lant", width: 150 },
  { field: "skewBattLant", headerName: "Skew Batt Lant", width: 120 },
  { field: "kurtBattLant", headerName: "Kurt Batt Lant", width: 120 },
  { field: "off_pos", headerName: "Off Pos", width: 100, renderCell },
  { field: "msg6", headerName: "Msg 6 Count", width: 100, renderCell },
  { field: "at_ts", headerName: "Timestamp", width: 200 },
  { field: "lastseen", headerName: "Last Seen", width: 200 },
];

export default function TableModule() {
  const { atonTablePreviewData: atonTableData, setAtonTableData } = useAtonStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchAtonTableData();
        setAtonTableData(data!);
      } catch (error) {
        console.error("Error fetching aton stats data :", error);
      }
    }

    if (!atonTableData ||atonTableData.length === 0) {
      fetchData();
    }
  }, [atonTableData, setAtonTableData]);

  return (
    <div className="z-50 flex-grow h-[80vh]">
      <DataGrid
        rows={atonTableData}
        columns={columns}
        // pageSizeOptions={[20]}
        disableDensitySelector
        disableRowSelectionOnClick
        disableColumnSelector
        // filterModel={tableFilterOptions}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        className="m-2 opacity-90 bg-white"
        sx={{
          "& .MuiDataGrid-cell": {
            backgroundColor: "#121213",
            color: "#ffffff",
          },
        }}
      />
    </div>
  );
}
