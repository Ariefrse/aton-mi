import { GridFilterModel } from "@mui/x-data-grid";
import { AtonData, AtonStatus, AtonTable, AtonType } from "./types";

/** Popups/modals/nav tools to toggle on/off */
type Toggles = {
  radialMenu: boolean
  hoverInfo: boolean
  legend: boolean;
  legendToggleBtn: boolean;
  atonInfo: boolean;
  atonSummaryToggleBtn: boolean;
  atonSummaryPanel: boolean;
  atonMessageCountOverview: boolean;
  graph: boolean;
  tableModule: boolean;
  tableOptions: boolean;
  tableToggelBtn: boolean;
};

type ViewState = {
  longitude: number,
  latitude: number,
  zoom: number,
  pitch: number,
  bearing: number,
}

export type AtonFilterOptions = {
  structure: AtonType
  condition: AtonStatus | 'All'
  regions: 'North' | 'South' | 'East' | 'West' | 'Borneo'
  atonPropertyToFilter: 'No Message 21' | 'No Message 6' | 'Light Error' | 'Low Batt AtoN' | 'Low Batt Lantern' | 'Bad LDR' | 'Off Position'
}

type TableFilterOptions = GridFilterModel | null

export type AtonStoreState = {
  // STATES
  viewState?: ViewState
  toggles: Toggles;
  tableFilterOptions: TableFilterOptions;
  filterState: {
    selectedStructure: string;
    selectedRegion: string;
    condition: 'All' | 'Good' | 'Not Good';
  };
  atonData: AtonData[]
  // atonSummaryData: AtonSummaryItem[]
  atonTablePreviewData?: AtonTable[]
  selectedDate: Date | null;

  // SET STATES FUNCTION
  setViewState: (data: ViewState) => void;
  setToggles: (modal: Toggles) => void;
  setTableFilterOptions: (options: TableFilterOptions) => void;
  setFilterState: (state: Partial<{
    selectedStructure: string;
    selectedRegion: string;
    condition: 'All' | 'Good' | 'Not Good';
  }>) => void;

  setAtonData: (data: AtonData[]) => void;
  setAtonTableData: (data: AtonTable[]) => void;
  // setAtonSummaryData: (data: AtonSummaryItem[]) => void;
  setSelectedDate: (date: Date | null) => void;
};