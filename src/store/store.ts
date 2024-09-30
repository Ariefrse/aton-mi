import { create } from "zustand";
import { AtonData } from '../declarations/types/types';
import { AtonStoreState } from "../declarations/types/store-types";


interface AtonStore{
  // ... existing state ...
  atonData: AtonData[] | null
  setAtonData: (data: AtonData[]) => void
  // ... other existing methods ...
}

export const useAtonStore = create<AtonStoreState>((set) => ({
  viewState: {
    longitude: 101.5466,
    latitude: 3.0891,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  },
  toggles: {
    radialMenu: false,
    hoverInfo: false,
    clickInfo: false,
    legend: false,
    legendToggleBtn: true,
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
    selectedStructures: ['All'],
    selectedRegions: ['All'],
    selectedData: [],
    condition: "All",
  filter: {
    date: new Date().toISOString().split('T')[0].toString(),
    structures: ['All'],
    regions: ['All'],
    condition: 'All',
  },
  atonData: [],  // Changed from null to an empty array
  selectedAton: null,  // Changed from [] to null
  atonTablePreviewData: [],
  atonSummaryData: [],

  setViewState: (data) => set({ viewState: data }),
  setAtonData: (data: AtonData[]) => set({ atonData: data }),
  setSelectedAton: (data: AtonData | null) => set({ selectedAton: data }),
  setAtonTableData: (data) => set({ atonTablePreviewData: data }),
  setToggles: (toggles) => set({ toggles }),
  setTableFilterOptions: (options) => set({ tableFilterOptions: options }),
  setFilterState: (newState) => set((state) => ({
    filterState: { ...state.filterState, ...newState },
  })),
}));