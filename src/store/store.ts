import { create } from "zustand";
import { AtonStore, AtonStatus, AtonType } from "../declarations/types/types";

/** Popups/modals/nav tools to toggle on/off */
type Toggles = {
  radialMenu: boolean
  hoverInfo: boolean
  legend: boolean;
  legendToggleBtn: boolean;
  atonInfo: boolean;
  atonSummaryToggleBtn: boolean;
  atonSummary: boolean;
  graph: boolean;
  tableModule: boolean;
  tableOptions: boolean;
  tableToggelBtn: boolean;
  messageCountOverview: boolean;
};

type ViewState = {
  longitude: number,
  latitude: number,
  zoom: number,
  pitch: number,
  bearing: number,
}

export type GlobalAtonFilterOptions = {
  structure: AtonType
  condition: AtonStatus | 'All'
  regions: 'North' | 'South' | 'East' | 'West' | 'Borneo'
  atonPropertyToFilter: 'No Message 21' | 'No Message 6' | 'Light Error' | 'Low Batt AtoN' | 'Low Batt Lantern' | 'Bad LDR' | 'Off Position'
}

type TableFilterOptions = {
  fromDate: string
  toDate: string;
};

type AtonStoreState = {
  atonData?: AtonStore[]
  viewState?: ViewState

  toggles: Toggles;
  tableOptions: TableFilterOptions;

  setViewState: (data: ViewState) => void;
  setAtonData: (data: AtonStore[]) => void;
  setToggles: (modal: Toggles) => void;
  setTableOptions: (options: TableFilterOptions) => void;
};

export const useAtonStore = create<AtonStoreState>((set) => ({
  viewState: {
    longitude: 101.5466,
    latitude: 3.0891,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  },
  atonData: [],
  toggles: {
    radialMenu: true,
    hoverInfo: false,
    legend: false,
    legendToggleBtn: true,
    atonInfo: false,
    atonSummaryToggleBtn: true,
    atonSummary: false,
    graph: false,
    tableModule: false,
    tableOptions: false,
    tableToggelBtn: true,
    messageCountOverview: false,
  },
  tableOptions: {
    fromDate: '',
    toDate: '',
    sortBy: "timestamp",
    sortOrder: "asc",
  },

  setViewState: (data) => set({ viewState: data }),
  setAtonData: (data) => set({ atonData: data }),
  setToggles: (toggles) => set({ toggles }),
  setTableOptions: (options) => set({ tableOptions: options }),
}));
