import { GridFilterModel } from "@mui/x-data-grid";
import { AtonData, AtonStatus, AtonTable, AtonType } from "./types";

/** Popups/modals/nav tools to toggle on/off */
type Toggles = {
  radialMenu: boolean
  hoverInfo: boolean
  clickInfo: boolean
  legend: boolean;
  legendToggleBtn: boolean;
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

export type FilterState = {
  structure: "All" | AtonType;
  region: string;
  condition: 'All' | 'Good' | 'Not Good';
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
  filterState: FilterState
  atonData: AtonData[]
  selectedAton: AtonData | null
  atonTablePreviewData?: AtonTable[]
  selectedDate: Date | null;

  // SET STATES FUNCTION
  setViewState: (data: ViewState) => void;
  setToggles: (modal: Toggles) => void;
  setTableFilterOptions: (options: TableFilterOptions) => void;
  setFilterState: (state: Partial<FilterState>) => void;

  setAtonData: (data: AtonData[]) => void;
  setSelectedAton: (data: AtonData) => void
  setAtonTableData: (data: AtonTable[]) => void;
  setSelectedDate: (date: Date | null) => void;
};