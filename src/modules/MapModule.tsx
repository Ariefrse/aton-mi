import { DeckGL } from "@deck.gl/react";
import Map, { MapRef, NavigationControl } from "react-map-gl";
import { useState, useRef, useEffect } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import Legend from "../components/Legend";
import AtonSummary from "../components/AtonSummary";
import { LayersList, MapViewState } from "@deck.gl/core";
import HoverInfo, { HoverInfoProps } from "../components/HoverInfo";
import TableModule from "./TableModule";
import MessageCountOverview from "../components/MessageCountOverview";
import AtonSummaryToggleBtn from "../components/AtonSummaryToggleBtn";
import { useAtonStore } from "../store/store";
import TableOptions from "../components/TableOptions";
import LegendToggleBtn from "../components/LegendToggleBtn";
import { AtonType, MapAtonResDto } from "../declarations/types/types";
import { fetchAtonList } from "../api/aton-api";
import RadialMenu, { RadialMenuProps } from "../components/RadialMenu";
import TableBtn from "../components/TableBtn";
import MapStyleDropdown from "../components/MapStyleDropdown";
import { MAP_STYLES } from "../declarations/constants/constants";

type ClickInfoType = {
  name?: string;
  mmsi?: number;
  type?: AtonType;
  position: [number, number];
};

type MapStyle = (typeof MAP_STYLES)[keyof typeof MAP_STYLES];

export default function MapModule() {
  const { toggles, setToggles } = useAtonStore();
  const mapRef = useRef<MapRef | null>(null);
  const [mapAton, setMapAton] = useState<MapAtonResDto[]>();
  const [mapStyle, setMapStyle] = useState<MapStyle>(MAP_STYLES.satellite);
  const [layers, setLayers] = useState<LayersList | undefined>([]);
  const [clickInfo, setClickInfo] = useState<ClickInfoType | null>(null);
  const [radialMenuData, setRadialMenuData] = useState<RadialMenuProps>(null);
  const [hoverInfoData, setHoverInfoData] = useState<HoverInfoProps>(null);
  const [initialViewState, setInitialViewState] = useState<MapViewState>({
    longitude: 101.5466,
    latitude: 3.0891,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  });

  useEffect(() => {
    async function fetchMapAtonData() {
      try {
        const mapAtonFetchRes = await fetchAtonList();
        setMapAton(mapAtonFetchRes);
      } catch (error) {
        console.error("Error fetching AtoN data:", error);
      }
    }

    if (!mapAton) {
      fetchMapAtonData();
    }
  }, []);

  useEffect(() => {
    const newLayers = mapAton
      ?.map((aton, index) => {
        const layerId = `scatterplot-layer-${aton?.mmsi}-${index}`;

        return new ScatterplotLayer({
          id: layerId,
          data: [
            {
              coordinate: [aton?.longitude, aton?.latitude],
              name: aton?.name,
              mmsi: aton?.mmsi,
              battAton: aton?.last_BattAton,
              type: aton?.type,
            },
          ],
          getRadius: 800,
          getPosition: (d) => d.coordinate,
          getFillColor: [255, 0, 0],
          pickable: true,
          onClick: (info) => {
            if (info.object) {
              setToggles({ ...toggles, radialMenu: true });
              setRadialMenuData({
                mmsi: info.object.mmsi,
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
                name: info?.object?.name,
                mmsi: info?.object?.mmsi,
                lantBatt: info?.object?.battAton,
                position: [info.x, info.y],
              });
            } else {
              setHoverInfoData(null);
              setToggles({ ...toggles, hoverInfo: false });
            }
          },
        });
      })
      .filter((layer) => layer !== null);

    setLayers(newLayers);
  }, [mapAton]);

  useEffect(() => {
    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault();
      // event.stopPropagation();
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
      messageCountOverview: false,
      atonSummary: false,
      atonSummaryToggleBtn: false,
    });
  };

  const handleMapStyleChange = (event: any) => {
    const newStyle = event.target.value;
    setMapStyle(newStyle);
  };

  return (
    <div className="h-[90vh] overflow-visible p-3 mx-10 bg-gray-800 text-white flex flex-col rounded-md">
      <div className="mb-4 flex justify-between items-center">
        {toggles.tableModule === true ? null : (
          <>
            <h1 className="text-xl ">AtoN</h1>
            <div className="flex gap-6 mr-6">
              {/* <TableRefreshBtn onClick={() => handleTableDataRefresh()}/> */}
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
          initialViewState={initialViewState}
          onViewStateChange={({ viewState }) => setInitialViewState(viewState)}
          controller={true}
          layers={layers}
        >
          <Map
            ref={mapRef}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            mapStyle={mapStyle}
            style={{
              zIndex: 0,
            }}
          >
            <NavigationControl
              visualizePitch
              position="bottom-right"
              showCompass
              showZoom
            />
          </Map>
        </DeckGL>
        {/* Microinteractive Components */}
        {hoverInfoData && <HoverInfo {...hoverInfoData} />}
        {clickInfo && (
          <div className="absolute top-2 right-2 bg-gray-800 opacity-70 text-white p-4 rounded-md shadow-lg">
            <h2 className="text-lg font-bold">{clickInfo.name}</h2>
            <p>MMSI: {clickInfo.mmsi}</p>
            <p>Type: {clickInfo.type}</p>
            <p>Latitude: {clickInfo?.position[0]}</p>
            <p>Longitude: {clickInfo?.position?.[1]}</p>
          </div>
        )}
        ``
        {toggles.radialMenu && <RadialMenu {...radialMenuData!} />}
        {toggles.hoverInfo && <HoverInfo {...hoverInfoData!} />}
        {toggles.atonSummary && (
          <div className="flex gap-2 absolute top-2 left-2 h-[95%]">
            <AtonSummary />
            {toggles.messageCountOverview && <MessageCountOverview />}
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
