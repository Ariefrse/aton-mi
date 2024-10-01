import { GridFilterModel } from "@mui/x-data-grid";
import { AtonData, AtonStatus, AtonTable, AtonType } from "./types";
import { ViewState } from "react-map-gl";

/** Popups/modals/nav tools to toggle on/off */
export interface Toggles {
  tableToggelBtn: boolean;
  radialMenu: boolean;
  hoverInfo: boolean;
  clickInfo: boolean;
  legend: boolean;
  legendToggleBtn: boolean;
  atonSummaryToggleBtn: boolean;
  atonSummaryPanel: boolean;
  graph: boolean;
  tableModule: boolean;
  tableOptions: boolean;
}

export interface Filter {
  structures: string[];
  regions: string[];
  selectedData: AtonData[];
  condition: string;
  date: string;
}

export interface AtonStoreState {
  viewState: ViewState;
  toggles: Toggles;
  filter: Filter;
  atonData: AtonData[];
  selectedAton: AtonData | null;
  atonTableData: AtonTable[];
  atonSummaryData: any[]; // Replace 'any' with the correct type if available

  setViewState: (viewState: Partial<ViewState>) => void;
  setAtonData: (atonData: AtonData[]) => void;
  setSelectedAton: (selectedAton: AtonData | null) => void;
  setAtonTableData: (atonTableData: AtonTable[]) => void;
  setToggles: (toggles: Partial<Toggles>) => void;
  setFilter: (filter: Partial<Filter>) => void;
}