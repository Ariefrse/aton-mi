import { useState, useRef, useEffect, useMemo } from "react";
import { match } from "ts-pattern";
import { DeckGL } from "@deck.gl/react";
import Map, { MapRef } from "react-map-gl";
import { ScatterplotLayer } from "@deck.gl/layers";
import { LayersList, Color, PickingInfo } from "@deck.gl/core";
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
import LegendToggleBtn from "../components/LegendToggleBtn";
import RadialMenu, { RadialMenuProps } from "../components/RadialMenu";
import AtonMessageCountOverview from "../components/AtonMessageCountOverview";
import GraphModule from "./GraphModule";
import AtonSummaryToggleBtn from "../components/AtonSummaryToggleBtn";
import AtonSummaryPanel from "../components/AtonSummaryPanel";
import ClickInfo, { ClickInfoProps } from "../components/ClickInfo";
import MapHeader from "../components/MapHeader";
import { FilterState } from "../declarations/types/store-types";
import { fetchAtonData } from "../api/aton-api";

export type MapStyle = (typeof MAP_STYLES)[keyof typeof MAP_STYLES];

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
  const {
    viewState,
    atonData,
    setAtonData,
    setSelectedAton,
    toggles,
    setToggles,
    filterState,
  } = useAtonStore();
  const mapRef = useRef<MapRef | null>(null);
  const [mapStyle, setMapStyle] = useState<MapStyle>(MAP_STYLES.satellite);
  const [layers, setLayers] = useState<LayersList | undefined>([]);
  const [clickInfo, setClickInfo] = useState<ClickInfoProps | null>(null);
  const [radialMenuData, setRadialMenuData] = useState<RadialMenuProps>(null);
  const [hoverData, setHoverData] = useState<HoverInfoProps | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (atonData.length === 0) {
        const data = await fetchAtonData();
        setAtonData(data);
        setIsDataLoaded(true);
      }
      // console.log("Aton Summary Data:", atonData);
    };

    fetchData();
  }, []);

  const filteredAtonData = useMemo(
    () => filterAtonData(atonData, filterState),
    [atonData, filterState]
  );

  useEffect(() => {
    if (!atonData || atonData.length === 0) return;
    // const filteredData = memoisedFilteredAtonData;
    // console.log("Filtered Aton Data:", filteredData);
    // console.log("Filtered Aton Data Length:", filteredData.length);
    const layers = createLayers(filteredAtonData);
    // console.log("Layers:", layers);
    setLayers(layers);
  }, [atonData, filterState, toggles, setToggles]);

  useEffect(() => {
    const mapEl = mapRef.current?.getMap().getCanvas();
    if (mapEl) {
      mapEl.addEventListener("contextmenu", handleRightClick);
      return () => mapEl.removeEventListener("contextmenu", handleRightClick);
    }
  }, [mapRef, toggles, setToggles]);

  // Event handlers
  const handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    const { clientX: x, clientY: y } = event;
    setRadialMenuData({ mmsi: 0, position: [x, y] });
    setToggles({ ...toggles, radialMenu: true });
  };

  const createLayers = (data: AtonData[]) => {
    const scatterplotLayer = new ScatterplotLayer<AtonData>({
      id: "aton-outline-layer",
      data: data,
      getPosition: (d) => [d.lng, d.lat],
      getFillColor: [0, 0, 0, 0], // Transparent fill
      getLineColor: (d): Color => {
        return d.healthStatus === 1 ? ATON_COLORS.GOOD : ATON_COLORS.NOT_GOOD;
      },
      getRadius: (d) => {
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

  const handleIconClick = (info: PickingInfo<AtonData>) => {
    if (info.object) {
      const { mmsi, name, type, lng, lat } = info.object;
      setToggles({ ...toggles, radialMenu: true });
      setRadialMenuData({
        mmsi: mmsi,
        position: [info.x, info.y],
      });
      setClickInfo({
        name: name,
        mmsi: mmsi,
        type: type,
        position: {
          lng: lng,
          lat: lat,
        },
      });
      setSelectedAton(atonData.find((aton) => aton.mmsi === mmsi)!);
    } else {
      setRadialMenuData(null);
      setToggles({ ...toggles, radialMenu: false });
    }
  };

  const handleIconHover = (info: PickingInfo<AtonData>) => {
    if (info.object) {
      const { mmsi, name, lastBattLant } = info.object;
      setToggles({ ...toggles, hoverInfo: true });
      setSelectedAton(atonData.find((aton) => aton.mmsi === mmsi)!);
      setHoverData({
        name: name,
        mmsi: mmsi,
        lantBatt: lastBattLant,
        position: [info.x, info.y],
      });
    } else {
      setHoverData(null);
      setToggles({ ...toggles, hoverInfo: false });
    }
  };

  function filterAtonData(
    atonData: AtonData[],
    filterState: FilterState
  ): AtonData[] {
    return atonData.filter((aton) => {
      const structureMatch = match(filterState.structure)
        .with("All", () => true)
        .otherwise((structure: AtonType) => structure === aton.type);

      const regionMatch = match(filterState.region)
        .with("All", () => true)
        .otherwise((region: string) => region === aton.region);

      const conditionMatch = match(filterState.condition)
        .with("All", () => true)
        .with("Good", () => aton.healthStatus === 1)
        .with("Not Good", () => aton.healthStatus === 0)
        .otherwise(() => false);

      return structureMatch && regionMatch && conditionMatch;
    });
  }

  return (
    <div className="h-[90vh] overflow-visible p-3 mx-10 bg-gray-900 text-white flex flex-col rounded-md">
      <MapHeader mapStyle={mapStyle} setMapStyle={setMapStyle} />
      <div className="flex items-center justify-center flex-1 relative">
        {isDataLoaded ? (
          <DeckGL
            initialViewState={viewState}
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
        )}
        {hoverData && <HoverInfo {...hoverData} />}
        {toggles.clickInfo && <ClickInfo {...clickInfo} />}
        {radialMenuData && <RadialMenu {...radialMenuData} />}
        {toggles.atonSummaryPanel && (
          <div className="flex gap-2 absolute top-2 left-2 h-[95%]">
            <AtonSummaryPanel />
            {toggles.atonMessageCountOverview && <AtonMessageCountOverview />}
          </div>
        )}
        {toggles.tableModule && <TableModule />}
        {toggles.atonSummaryToggleBtn && <AtonSummaryToggleBtn />}
        {toggles.legend && <Legend />}
        {toggles.legendToggleBtn && <LegendToggleBtn />}
        {toggles.graph && <GraphModule />}
      </div>
    </div>
  );
}
