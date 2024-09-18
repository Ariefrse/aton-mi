import { create } from "zustand";
import { AtonStore, AtonStatus, AtonType, AtonStatistics } from "../declarations/types/types";
import { GridFilterModel } from "@mui/x-data-grid";
import { fetchAtonSummary, AtonSummaryItem } from '../api/aton-api'; // Add AtonSummaryItem to the import

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

type AtonStoreState = {
  atonData?: AtonStore[]
  atonStatsData?: AtonStatistics[]
  viewState?: ViewState

  toggles: Toggles;
  tableFilterOptions: TableFilterOptions;

  setViewState: (data: ViewState) => void;
  setAtonData: (data: AtonStore[]) => void;
  setAtonStatsData: (data: AtonStatistics[]) => void;
  setToggles: (modal: Toggles) => void;
  setTableFilterOptions: (options: TableFilterOptions) => void;
  atonSummary: AtonSummaryItem[];  // Updated type
  fetchAtonSummary: () => Promise<void>;
  filterState: {
    selectedStructure: string;
    selectedRegion: string;
    condition: 'All' | 'Good' | 'Not Good';
  };
  setFilterState: (state: Partial<{
    selectedStructure: string;
    selectedRegion: string;
    condition: 'All' | 'Good' | 'Not Good';
  }>) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
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
  atonStatsData: [],
  atonSummary: [],
  toggles: {
    radialMenu: false,
    hoverInfo: false,
    legend: false,
    legendToggleBtn: true,
    atonInfo: false,
    atonSummaryToggleBtn: true,
    atonSummary: false,
    atonSummaryPanel: false,
    atonMessageCountOverview: false,
    graph: false,
    tableModule: false,
    tableOptions: false,
    tableToggelBtn: true,
    messageCountOverview: false,
  },
  tableFilterOptions: null,
  filterState: {
    selectedStructure: 'All',
    selectedRegion: 'All',
    condition: 'All',
  },
  setViewState: (data) => set({ viewState: data }),
  setAtonData: (data) => set({ atonData: data }),
  setAtonStatsData: (data) => set({ atonStatsData: data }),
  setToggles: (toggles) => set({ toggles }),
  setTableFilterOptions: (options) => set({ tableFilterOptions: options }),
  setFilterState: (newState) => set((state) => ({
    filterState: { ...state.filterState, ...newState },
  })),
  fetchAtonSummary: async () => {
    try {
      const atonSummary = await fetchAtonSummary();
      set({ atonSummary });
    } catch (error) {
      console.error('Failed to fetch AtoN summary:', error);
    }
  },
  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
}));

