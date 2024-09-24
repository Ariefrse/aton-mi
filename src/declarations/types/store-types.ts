import { GridFilterModel } from "@mui/x-data-grid";
import { AtonStatus, AtonType } from "./types";
import { AtonSummaryItem } from "../../api/aton-api";

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

export type FilterState = {
  selectedStructures: string[];
  selectedRegions: string[];
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
  viewState: ViewState;
  atonSummary: AtonSummaryItem[];
  setAtonSummary: (data: AtonSummaryItem[]) => void;
  toggles: Toggles;
  setToggles: (toggles: Toggles) => void;
  filterState: FilterState;
  setFilterState: (filterState: FilterState) => void;
};