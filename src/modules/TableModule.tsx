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
import { AtonTable } from "../declarations/types/types";

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
    (field === "offPos" && value === "OK") ||
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

const columns: GridColDef<AtonTable>[] = [
  { field: "name", headerName: "Sitename", width: 150 },
  { field: "mmsi", headerName: "MMSI", width: 100 },
  { field: "type", headerName: "Structure", width: 100 },
  { field: "region", headerName: "Region", width: 200 },
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
  { field: "offPos", headerName: "Off Pos", width: 100, renderCell },
  { field: "msg6Count", headerName: "Msg 6 Count", width: 100, renderCell },
  { field: "atTs", headerName: "Timestamp", width: 200 },
  { field: "lastSeen", headerName: "Last Seen", width: 200 },
];

export default function TableModule() {
  const { atonTableData, setAtonTableData } = useAtonStore();

  useEffect(() => {
    if (!atonTableData || atonTableData.length === 0) {
      (async () => {
        try {
          setAtonTableData(await fetchAtonTableData());
        } catch (error) {
          console.error("Error fetching aton stats data :", error);
        }
      })();
    }
  }, [atonTableData, setAtonTableData]);

  return (
    <div className="z-50 flex-grow overflow-hidden h-[80vh]">
      <DataGrid
        getRowId={(row) => row.mmsi}
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
