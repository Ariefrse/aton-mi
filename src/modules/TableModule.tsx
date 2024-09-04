
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


// Define the data type for each row
interface RowData {
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
  last_maintain: string;
}

const columns: GridColDef[] = [
  { field: 'sitename', headerName: 'Sitename', width: 150 },
  { field: 'mmsi', headerName: 'MMSI', width: 130 },
  { field: 'structure', headerName: 'Structure', width: 130 },
  { field: 'region', headerName: 'Region', width: 130 },
  { field: 'minLatAton', headerName: 'Min Lat Aton', width: 150 },
  { field: 'avgLatAton', headerName: 'Avg Lat Aton', width: 150 },
  { field: 'minBattAton', headerName: 'Min Batt Aton', width: 150 },
  { field: 'maxBattAton', headerName: 'Max Batt Aton', width: 150 },
  { field: 'minTemp', headerName: 'Min Temp', width: 150 },
  { field: 'maxTemp', headerName: 'Max Temp', width: 150 },
  { field: 'meanBattAton', headerName: 'Mean Batt Aton', width: 150 },
  { field: 'stddevBattAton', headerName: 'Std Dev Batt Aton', width: 150 },
  { field: 'skewBattAton', headerName: 'Skew Batt Aton', width: 150 },
  { field: 'kurtBattAton', headerName: 'Kurt Batt Aton', width: 150 },
  { field: 'minBattLant', headerName: 'Min Batt Lant', width: 150 },
  { field: 'maxBattLant', headerName: 'Max Batt Lant', width: 150 },
  { field: 'meanBattLant', headerName: 'Mean Batt Lant', width: 150 },
  { field: 'stddevBattLant', headerName: 'Std Dev Batt Lant', width: 150 },
  { field: 'skewBattLant', headerName: 'Skew Batt Lant', width: 150 },
  { field: 'kurtBattLant', headerName: 'Kurt Batt Lant', width: 150 },
  { field: 'off_pos', headerName: 'Off Pos', width: 150 },
  { field: 'msg6Count', headerName: 'Msg 6 Count', width: 150 },
  { field: 'siteTx', headerName: 'Site Tx', width: 150 },
  { field: 'at_ts', headerName: 'Timestamp', width: 150 },
  { field: 'last_maintain', headerName: 'Last Maintain', width: 150 },
];

// Example data
const rows: RowData[] = [
  {
    id: 1,
    sitename: 'KP NO 2',
    mmsi: 995330042,
    structure: 'Beacon',
    region: 'Wilayah Timur Tambahan',
    minLatAton: '',
    avgLatAton: '',
    minBattAton: 12.8,
    maxBattAton: 13.7,
    minTemp: 0,
    maxTemp: 0,
    meanBattAton: 12.91,
    stddevBattAton: 0.17,
    skewBattAton: 2.22,
    kurtBattAton: 9.05,
    minBattLant: 12.85,
    maxBattLant: 14,
    meanBattLant: 13.06,
    stddevBattLant: 0.21,
    skewBattLant: 1.97,
    kurtBattLant: 8.25,
    off_pos: 'OK',
    msg6Count: 2456,
    siteTx: 'OK',
    at_ts: '2024-09-03 10:45:02',
    last_maintain: ''
  },
  // Add more rows as needed...
];

export default function DataTable() {
  return (

    <div className = 'bg-gray-500 z-50'>
    <div className='bg-gray-500 z-50' style={{ height: 'auto', width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={20} checkboxSelection
      sx={{
        '& .MuiDataGrid-root': {
          backgroundColor: '#2A2F38', // Background color of the table
        },
        '& .MuiDataGrid-cell': {
          backgroundColor: '#2A2F38',
          color: '#ffffff', // Text color of the cells
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#4A90E2', // Background color of the header
          color: '#ffffff', // Text color of the header
        },
        '& .MuiDataGrid-footerContainer': {
          backgroundColor: '#2A2F38', // Background color of the footer
          color: '#ffffff', 
          textColor: '#ffffff',// Text color of the footer
        },}} />
    </div>
    </div>
  );
}