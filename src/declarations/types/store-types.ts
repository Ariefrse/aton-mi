import { GridFilterModel } from "@mui/x-data-grid";
import { AtonData, AtonStatus, AtonTable, AtonType, Msg6 } from "./types";

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
  selectedData: string[];
  selectedStructures: string[];
  selectedRegions: string[];
  condition: 'All' | 'Good' | 'Not Good';
}

export type AtonFilterOptions = {
  structure: AtonType
  condition: AtonStatus | 'All'
  regions: string
  atonPropertyToFilter: 'No Message 21' | 'No Message 6' | 'Light Error' | 'Low Batt AtoN' | 'Low Batt Lantern' | 'Bad LDR' | 'Off Position'
}

type TableFilterOptions = GridFilterModel | null

export type AtonStoreState = {
  viewState?: ViewState
  toggles: Toggles;
  tableFilterOptions: TableFilterOptions;
  filterState: FilterState
  atonData: AtonData[]
  selectedAton: AtonData
  atonTablePreviewData?: AtonTable[]

  setViewState: (data: ViewState) => void;
  setToggles: (modal: Toggles) => void;
  setTableFilterOptions: (options: TableFilterOptions) => void;
  setFilterState: (state: Partial<FilterState>) => void;

  setAtonData: (data: AtonData[]) => void;
  setSelectedAton: (data: AtonData | null) => void
  setAtonTableData: (data: AtonTable[]) => void;
};