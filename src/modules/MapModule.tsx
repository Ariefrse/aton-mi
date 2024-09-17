import { DeckGL } from "@deck.gl/react";
import Map, { MapRef, NavigationControl } from "react-map-gl";
import { useState, useRef, useEffect, useMemo } from "react";
import { IconLayer } from "@deck.gl/layers";
import Legend from "../components/Legend";
import AtonSummaryPanel from "../components/AtonSummaryPanel";
import { LayersList, MapViewState } from "@deck.gl/core";
import HoverInfo, { HoverInfoProps } from "../components/HoverInfo";
import TableModule from "./TableModule";
import AtonSummaryToggleBtn from "../components/AtonSummaryToggleBtn";
import { useAtonStore } from "../store/store";
import TableOptions from "../components/TableOptions";
import LegendToggleBtn from "../components/LegendToggleBtn";
import { AtonType, AtonList } from "../declarations/types/types";
import { fetchAtonList } from "../api/aton-api";
import RadialMenu, { RadialMenuProps } from "../components/RadialMenu";
import TableBtn from "../components/TableBtn";
import MapStyleDropdown from "../components/MapStyleDropdown";
import { MAP_STYLES } from "../declarations/constants/constants";
import AtonMessageCountOverview from "../components/AtonMessageCountOverview";
import 'mapbox-gl/dist/mapbox-gl.css';

type ClickInfoType = {
  name?: string;
  mmsi?: number;
  type?: AtonType;
  position: [number, number];
};

type MapStyle = (typeof MAP_STYLES)[keyof typeof MAP_STYLES];

const ATON_TYPE_ICONS: { [key in AtonType]: string } = {
  Buoy: "icon/Rectangle1.svg",
  Lighthouse: "icon/Rectangle2.svg",
  Beacon: "icon/Ellipse.svg",
};

export default function MapModule() {
  const { toggles, setToggles, filterState } = useAtonStore();
  const mapRef = useRef<MapRef | null>(null);
  const [mapAton, setMapAton] = useState<AtonList[]>([]);
  const [mapStyle, setMapStyle] = useState<MapStyle>(MAP_STYLES.satellite);
  const [layers, setLayers] = useState<LayersList | undefined>([]);
  const [clickInfo, setClickInfo] = useState<ClickInfoType | null>(null);
  const [radialMenuData, setRadialMenuData] = useState<RadialMenuProps>(null);
  const [hoverInfoData, setHoverInfoData] = useState<HoverInfoProps>(null);
  const [mapViewState, setMapViewState] = useState<MapViewState>({
    longitude: 101.5466,
    latitude: 3.0891,
    zoom: 6,
    pitch: 0,
    bearing: 0,
  });

  useEffect(() => {
    async function fetchMapAtonData() {
      try {
        const mapAtonFetchRes = await fetchAtonList();
        console.log("Fetched AtoN data:", mapAtonFetchRes);
        setMapAton(mapAtonFetchRes || []);
      } catch (error) {
        console.error("Error fetching AtoN data:", error);
      }
    }

    fetchMapAtonData();
  }, []);

  const filteredAtonData = useMemo(() => {
    return mapAton.filter((aton) => {
      const structureMatch = filterState.selectedStructure === 'All' || filterState.selectedStructure === aton.type;
      const regionMatch = filterState.selectedRegion === 'All' || filterState.selectedRegion === aton.region;
      let conditionMatch = true;
      if (filterState.condition === 'Good') {
        conditionMatch = aton.health === 1;
      } else if (filterState.condition === 'Not Good') {
        conditionMatch = aton.health === 0;
      }
      return structureMatch && regionMatch && conditionMatch;
    });
  }, [mapAton, filterState]);

  useEffect(() => {
    const newLayer = new IconLayer({
      id: 'aton-layer',
      data: filteredAtonData,
      getIcon: (d) => ({
        url: ATON_TYPE_ICONS[d.type as AtonType],
        width: 128,
        height: 128,
        anchorY: 128,
      }),
      getPosition: (d) => [d.longitude, d.latitude],
      getSize: 5,
      sizeScale: 8,
      pickable: true,
      onClick: (info) => {
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
            position: [info.x, info.y],
          });
        } else {
          setRadialMenuData(null);
          setToggles({ ...toggles, radialMenu: false });
        }
      },
      onHover: (info) => {
        if (info.object) {
          setToggles({ ...toggles, hoverInfo: true });
          setHoverInfoData({
            name: info.object.name,
            mmsi: info.object.mmsi,
            lantBatt: info.object.last_BattLant,
            position: [info.x, info.y],
          });
        } else {
          setHoverInfoData(null);
          setToggles({ ...toggles, hoverInfo: false });
        }
      },
    });

    setLayers([newLayer]);
    console.log(`Number of AtoNs: ${filteredAtonData.length}`);
  }, [filteredAtonData, toggles]);

  useEffect(() => {
    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault();
      const { clientX: x, clientY: y } = event;

      setRadialMenuData({ mmsi: 0, position: [x, y] });
      setToggles({ ...toggles, radialMenu: true });
    };

    const mapElement = mapRef.current?.getMap().getCanvas();

    if (mapElement) {
      mapElement.addEventListener("contextmenu", handleRightClick);
    }

    return () => {
      if (mapElement) {
        mapElement.removeEventListener("contextmenu", handleRightClick);
      }
    };
  }, [mapRef, toggles, setToggles]);

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

  const handleMapStyleChange = (event: any) => {
    const newStyle = event.target.value;
    setMapStyle(newStyle);
  };

  return (
    <div className="h-[90vh] overflow-visible p-3 mx-10 bg-gray-900 text-white flex flex-col rounded-md">
      <div className="mb-4 flex justify-between items-center">
        {toggles.tableModule === true ? null : (
          <>
            <h1 className="text-xl ">AtoN</h1>
            <div className="flex gap-6 mr-6">
              <TableBtn onClick={() => toggleTableModule()} />
              <MapStyleDropdown
                mapStyle={mapStyle}
                handleMapStyleChange={handleMapStyleChange}
              />
            </div>
          </>
        )}
        {toggles.tableModule && <TableOptions />}
      </div>
      <div className="flex-1 relative">
        <DeckGL
          initialViewState={mapViewState}
          controller={true}
          layers={layers}
        >
          <Map
            ref={mapRef}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            mapStyle={mapStyle}
            style={{width: '100%', height: '100%'}}
          >
            <NavigationControl visualizePitch position="bottom-right" />
          </Map>
        </DeckGL>
        {hoverInfoData && <HoverInfo {...hoverInfoData} />}
        {clickInfo && (
          <div className="absolute top-2 right-2 bg-gray-800 text-white p-4 rounded-md shadow-lg ">
            <h2 className="text-lg font-bold">{clickInfo.name}</h2>
            <p>MMSI: {clickInfo.mmsi}</p>
            <p>Type: {clickInfo.type}</p>
            <p>Latitude: {clickInfo?.position[0].toFixed(6)}</p>
            <p>Longitude: {clickInfo?.position[1].toFixed(6)}</p>
          </div>
        )}
        {toggles.radialMenu && <RadialMenu {...radialMenuData!} />}
        {toggles.hoverInfo && <HoverInfo {...hoverInfoData!} />}
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
      </div>
    </div>
  );
}
