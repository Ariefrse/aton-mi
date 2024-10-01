import { create } from "zustand";
import { AtonData, AtonTable } from '../declarations/types/types';
import { AtonStoreState, Filter, Toggles } from "../declarations/types/store-types";
import { ViewState } from "react-map-gl";

export const useAtonStore = create<AtonStoreState>()((set) => ({
  viewState: {
    longitude: 101.5466,
    latitude: 3.0891,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  },
  toggles: {
    tableToggelBtn: true,
    radialMenu: false,
    hoverInfo: false,
    clickInfo: false,
    legend: false,
    legendToggleBtn: true,
    atonSummaryToggleBtn: true,
    atonSummaryPanel: false,
    graph: false,
    tableModule: false,
    tableOptions: false,
  },
  filter: {
    structures: ['All'],
    regions: ['All'],
    selectedData: [],
    condition: "All",
    date: new Date().toISOString().split('T')[0],
  },
  atonData: [],
  selectedAton: null,
  atonTableData: [],
  atonSummaryData: [],

  setViewState: (viewState: Partial<ViewState>) => 
    set((state) => ({ viewState: { ...state.viewState, ...viewState } })),
  setAtonData: (atonData: AtonData[]) => set({ atonData }),
  setSelectedAton: (selectedAton: AtonData | null) => set({ selectedAton }),
  setAtonTableData: (atonTableData: AtonTable[]) => set({ atonTableData }),
  setToggles: (toggles: Partial<Toggles>) => 
    set((state) => ({ toggles: { ...state.toggles, ...toggles } })),
  setFilter: (filter: Partial<Filter>) => 
    set((state) => ({ filter: { ...state.filter, ...filter } })),
}));