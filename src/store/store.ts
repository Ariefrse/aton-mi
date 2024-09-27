import { create } from "zustand";
import { AtonStoreState } from "../declarations/types/store-types";

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
  filter: {
    date: new Date().toISOString().split('T')[0].toString(),
    structures: ['All'],
    regions: ['All'],
    condition: 'All',
  },
  atonData: [],
  selectedAton: null,
  atonTableData: [],
  atonSummaryData: [],

  setViewState: (data) => set({ viewState: data }),
  setAtonData: (data) => set({ atonData: data }),
  setSelectedAton: (data) => set({ selectedAton: data }),
  setAtonTableData: (data) => set({ atonTableData: data }),
  setToggles: (toggles) => set({ toggles }),
  setTableFilterOptions: (options) => set({ tableFilterOptions: options }),
  setFilter: (newState) => set((state) => ({
    filter: { ...state.filter, ...newState },
  })),
}));