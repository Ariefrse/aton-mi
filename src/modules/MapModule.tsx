import React, { useState, useRef, useEffect, useMemo } from "react";
import { DeckGL } from "@deck.gl/react";
import Map, { MapRef } from "react-map-gl";
import { ScatterplotLayer } from "@deck.gl/layers";
import { LayersList, MapViewState, Color } from "@deck.gl/core";
import { useAtonStore } from "../store/store";
import { AtonData, AtonType } from "../declarations/types/types";
import { MAP_STYLES } from "../declarations/constants/constants";
import "mapbox-gl/dist/mapbox-gl.css";
import circle from "../assets/icon/circle.svg";
import square from "../assets/icon/Square.svg";
import beacon from "../assets/icon/beacon.svg";

// Import components
import Legend from "../components/Legend";
import HoverInfo, { HoverInfoProps } from "../components/HoverInfo";
import TableModule from "./TableModule";
import TableOptions from "../components/TableOptions";
import LegendToggleBtn from "../components/LegendToggleBtn";
import RadialMenu, { RadialMenuProps } from "../components/RadialMenu";
import TableBtn from "../components/TableBtn";
import MapStyleDropdown from "../components/MapStyleDropdown";
import AtonMessageCountOverview from "../components/AtonMessageCountOverview";
import AtonSummaryToggleBtn from "../components/AtonSummaryToggleBtn";
import AtonSummaryPanel from "../components/AtonSummaryPanel";
import { fetchAtonData } from "../api/aton-api";

// Types
type ClickInfoType = {
  name?: string;
  mmsi?: number;
  type?: AtonType;
  position: [number, number];
};

type MapStyle = (typeof MAP_STYLES)[keyof typeof MAP_STYLES];

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 101.5466,
  latitude: 3.0891,
  zoom: 6,
  pitch: 0,
  bearing: 0,
};

// Define a constant for AtoN type icons
const ATON_TYPE_ICONS: { [key: string]: string } = {
  Buoy: circle,
  Lighthouse: square,
  Beacon: beacon,
};

const ATON_COLORS: { [key: string]: Color } = {
  GOOD: [0, 255, 0, 255], // Green
  NOT_GOOD: [255, 0, 0, 255], // Red
  OUTLINE: [255, 255, 255, 255], // White for the outline
};

export default function MapModule() {
  // Hooks
  const { atonData, setAtonData, toggles, setToggles, filterState } =
    useAtonStore();
  const mapRef = useRef<MapRef | null>(null);

  // State
  const [mapStyle, setMapStyle] = useState<MapStyle>(MAP_STYLES.satellite);
  const [layers, setLayers] = useState<LayersList | undefined>([]);
  const [clickInfo, setClickInfo] = useState<ClickInfoType | null>(null);
  const [radialMenuData, setRadialMenuData] = useState<RadialMenuProps>(null);
  const [hoverData, setHoverData] = useState<HoverInfoProps | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Effects
  useEffect(() => {
    const fetchData = async () => {
      if (atonData.length === 0) {
        const data = await fetchAtonData();
        setAtonData(data);
        setIsDataLoaded(true);
      }
      console.log("Aton Summary Data:", atonData);
    };

    fetchData()
  }, [atonData]);

  useEffect(() => {
    if (!atonData || atonData.length === 0) return;
    const filteredData = filterAtonData(atonData, filterState);
    console.log("Filtered Aton Data:", filteredData);
    console.log("Filtered Aton Data Length:", filteredData.length);
    const layers = createLayers(filteredData);
    console.log("Layers:", layers);
    setLayers(layers);
  }, [atonData, filterState, toggles, setToggles]);

  useEffect(() => {
    const mapElement = mapRef.current?.getMap().getCanvas();
    if (mapElement) {
      mapElement.addEventListener("contextmenu", handleRightClick);
      return () =>
        mapElement.removeEventListener("contextmenu", handleRightClick);
    }
  }, [mapRef, toggles, setToggles]);

  const memoisedFilteredAtonData = useMemo(
    () => filterAtonData(atonData, filterState),
    [atonData, filterState]
  );

  // Event handlers
  const handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    const { clientX: x, clientY: y } = event;
    setRadialMenuData({ mmsi: 0, position: [x, y] });
    setToggles({ ...toggles, radialMenu: true });
  };

  const toggleTableModule = () => {
    setToggles({
      ...toggles,
      tableModule: !toggles.tableModule,
      legendToggleBtn: false,
      legend: false,
      atonMessageCountOverview: false,
      atonSummaryPanel: false,
      atonSummaryToggleBtn: false,
    });
  };

  const handleMapStyleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setMapStyle((event.target as HTMLSelectElement).value as MapStyle);
  };

  const createLayers = (data: AtonData[]) => {
    const scatterplotLayer = new ScatterplotLayer({
      id: "aton-outline-layer",
      data: data,
      getPosition: (d: AtonData) => [Number(d.long), Number(d.lat)],
      getFillColor: [0, 0, 0, 0], // Transparent fill
      getLineColor: (d: AtonData): Color => {
        return d.healthStatus === 1 ? ATON_COLORS.GOOD : ATON_COLORS.NOT_GOOD;
      },
      getRadius: (d: AtonData) => {
        switch (d.type) {
          case "Buoy":
            return 15;
          case "Lighthouse":
            return 17;
          case "Beacon":
            return 16;
          default:
            return 15;
        }
      },
      pickable: true,
      stroked: true,
      lineWidthUnits: "pixels",
      lineWidthScale: 2,
      lineWidthMinPixels: 1,
      lineWidthMaxPixels: 10,
      radiusScale: 6,
      radiusMinPixels: 5,
      radiusMaxPixels: 35,
      onClick: handleIconClick,
      onHover: handleIconHover,
    });

    return [scatterplotLayer];
  };

  const handleIconClick = (info: any) => {
    if (info.object) {
      setToggles({ ...toggles, radialMenu: true });
      setRadialMenuData({
        mmsi: info.object.mmsi,
        position: [info.x, info.y],
      });
      setClickInfo({
        name: info.object.name,
        mmsi: info.object.mmsi,
        type: info.object.type,
        position: [Number(info.object.longitude), Number(info.object.latitude)],
      });
    } else {
      setRadialMenuData(null);
      setToggles({ ...toggles, radialMenu: false });
    }
  };

  const handleIconHover = (info: any) => {
    if (info.object) {
      setToggles({ ...toggles, hoverInfo: true });
      setHoverData({
        name: info.object.name,
        mmsi: info.object.mmsi,
        lantBatt: info.object.last_BattLant,
        position: [info.x, info.y],
      });
    } else {
      setHoverData(null);
      setToggles({ ...toggles, hoverInfo: false });
    }
  };

  // Render
  return (
    <div className="h-[90vh] overflow-visible p-3 mx-10 bg-gray-900 text-white flex flex-col rounded-md">
      {renderHeader()}
      <div className="flex-1 relative">
        {renderMap()}
        {renderOverlays()}
      </div>
    </div>
  );

  // Render helper functions
  function renderHeader() {
    return (
      <div className="mb-4 flex justify-between items-center">
        {!toggles.tableModule && (
          <>
            <h1 className="text-xl">AtoN</h1>
            <div className="flex gap-6 mr-6">
              <TableBtn onClick={toggleTableModule} />
              <MapStyleDropdown
                mapStyle={mapStyle}
                handleMapStyleChange={handleMapStyleChange}
              />
            </div>
          </>
        )}
        {toggles.tableModule && <TableOptions />}
      </div>
    );
  }

  function renderMap() {
    return isDataLoaded ? (
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <Map
          ref={mapRef}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          mapStyle={mapStyle}
          style={{ width: "100%", height: "100%" }}
        >
          {/* <NavigationControl visualizePitch position="bottom-right" /> */}
        </Map>
      </DeckGL>
    ) : (
      <div>Loading AtoN data...</div>
    );
  }

  function renderOverlays() {
    return (
      <>
        {hoverData && toggles.hoverInfo && <HoverInfo {...hoverData} />}
        {clickInfo && renderClickInfo()}
        {toggles.radialMenu && radialMenuData && (
          <RadialMenu {...radialMenuData} />
        )}
        {toggles.atonSummaryPanel && renderatonDataPanel()}
        {toggles.tableModule && <TableModule />}
        {toggles.atonSummaryToggleBtn && <AtonSummaryToggleBtn />}
        {toggles.legend && <Legend />}
        {toggles.legendToggleBtn && <LegendToggleBtn />}
      </>
    );
  }

  function renderClickInfo() {
    return (
      <div className="absolute top-2 right-2 bg-gray-800 text-white p-4 rounded-md shadow-lg">
        <h2 className="text-lg font-bold">{clickInfo!.name}</h2>
        <p>MMSI: {clickInfo!.mmsi}</p>
        <p>Type: {clickInfo!.type}</p>
        <p>Latitude: {clickInfo!.position[0].toFixed(6)}</p>
        <p>Longitude: {clickInfo!.position[1].toFixed(6)}</p>
      </div>
    );
  }

  function renderatonDataPanel() {
    return (
      <div className="flex gap-2 absolute top-2 left-2 h-[95%]">
        <AtonSummaryPanel />
        {toggles.atonMessageCountOverview && <AtonMessageCountOverview />}
      </div>
    );
  }
}

// Utility functions
function filterAtonData(atonData: AtonData[], filterState: any): AtonData[] {
  return atonData.filter((aton: AtonData) => {
    const structureMatch =
      filterState.selectedStructure === "All" ||
      filterState.selectedStructure === aton.type;
    const regionMatch =
      filterState.selectedRegion === "All" ||
      filterState.selectedRegion === aton.region;
    let conditionMatch = true;
    if (filterState.condition === "Good") {
      conditionMatch = aton.healthStatus === 1;
    } else if (filterState.condition === "Not Good") {
      conditionMatch = aton.healthStatus === 0;
    }
    return structureMatch && regionMatch && conditionMatch;
  });
}
