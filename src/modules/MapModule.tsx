import { DeckGL } from "@deck.gl/react";
import Map, { MapRef, NavigationControl } from "react-map-gl";
import { useState, useRef, useEffect } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import Legend from "../components/Legend";
import AtonSummary from "../components/AtonSummary";
import { CiViewTable } from "react-icons/ci";
import { RiRefreshLine } from "react-icons/ri";
import { LayersList } from "@deck.gl/core";
import { AtonType } from "../declarations/dtos/dtos";
import HoverInfo from "../components/HoverInfo";
import TableModule from "./TableModule";
import MessageCountOverview from "../components/MessageCountOverview";
import DropDownMenu from "../components/DropDownMenu";
import TextInput from "../components/TextInput";
import CloseButton from "../components/CloseButton";
import CsvButton from "../components/CsvButton";
import { BackspaceIcon } from "@heroicons/react/24/outline";
import AtonSummaryToggleBtn from "../components/AtonSummaryToggleBtn";
import { useAtonStore } from "../store/store";

type ScatterplotLayerData = {
  position: [number, number];
  atonname: string;
  status: number;
  region: string;
  latitude: number;
  longitude: number;
  atonbatt: number;
  lantBatt: number;
  offPosition: string;
  ambient: string;
  light: number;
  localTime: string;
  utcTime: string;
};

type HoverInfo = {
  structure: AtonType;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  atonbatt: number;
  lantBatt: number;
  offPosition: string;
  ambient: string;
  light: number;
  localTime: string;
  utcTime: string;
  x: number;
  y: number;
};

export default function MapModule() {
  // Floating Components
  const { toggles, setToggles, tableOptions, setTableOptions } = useAtonStore()

  // In-Map Components
  const mapRef = useRef<MapRef | null>(null);
  const [layers, setLayers] = useState<LayersList | undefined>([]);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const [initialViewState, setInitialViewState] = useState({
    longitude: 101.5466,
    latitude: 3.0891,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  });

  useEffect(() => {
    const socket = new WebSocket("wss://dash.datainsight.my/wss/");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      socket.send("getallaton");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const newLayer = new ScatterplotLayer({
        id: `scatterplot-layer-${data.ss_longitude}-${data.ss_latitude}`,
        data: [
          {
            position: [data.ss_longitude, data.ss_latitude],
            atonname: data.atonname,
            status: data.status,
            region: data.region,
            latitude: data.latitude,
            longitude: data.longitude,
            atonbatt: data.atonbatt,
            lantBatt: data.lantBatt,
            offPosition: data.offPosition,
            ambient: data.ambient,
            light: data.light,
            localTime: data.localTime,
            utcTime: data.utcTime,
          } as ScatterplotLayerData,
        ],
        getRadius: 5000,
        getFillColor: [255, 0, 0],
        pickable: true,

        onHover: (info) => {
          if (info.object) {
            setHoverInfo({
              structure: info.object.structure,
              name: info.object.atonname,
              region: info.object.region,
              latitude: info.object.latitude,
              longitude: info.object.longitude,
              atonbatt: info.object.atonbatt,
              lantBatt: info.object.lantBatt,
              offPosition: info.object.offPosition,
              ambient: info.object.ambient,
              light: info.object.light,
              localTime: info.object.localTime,
              utcTime: info.object.utcTime,
              x: info.x,
              y: info.y,
            });
          } else setHoverInfo(null);
        },
      });

      setLayers((prevLayers) =>
        prevLayers ? [...prevLayers, newLayer] : [newLayer]
      );
    };

    socket.onclose = () => console.log("WebSocket connection closed");
    socket.onerror = (error) => console.error("WebSocket error:", error);

    return () => socket.close();
  }, []);

  return (
    <div className="h-[90vh] overflow-visible p-3 mx-10 bg-gray-800 text-white flex flex-col rounded-md">
      <div className="mb-4 flex justify-between items-center">
        {toggles.tableModule === true ? null : (
          <>
            <h1 className="text-2xl font-bold">AtoN</h1>
            <div className="flex gap-6 mr-8">
              <RiRefreshLine fontSize={30} className="text-blue-400" />
              <CiViewTable fontSize={30} className="text-blue-400" />
            </div>
          </>
        )}
        {toggles.tableModule && (
          <>
            <h1 className="text-2xl font-bold">AtoN Analytics</h1>
            <DropDownMenu />
            <DropDownMenu />
            <TextInput />
            <BackspaceIcon className="w-10 h-10" />
            <div className="flex justify-center gap-2 items-center">
              <p>From</p>
              <input className="rounded-md text-gray-500 p-1" type="date" />
            </div>
            <div className="flex justify-center gap-2">
              <p>To</p>
              <input className="rounded-md text-gray-500 p-1" type="date" />
            </div>
            <BackspaceIcon className="w-10 h-10" />
            <CsvButton />
            <CloseButton />
          </>
        )}
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
            mapStyle="mapbox://styles/mapbox/satellite-v9"
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
        {/* Floating Component */}
        {hoverInfo && <HoverInfo hoverInfo={hoverInfo} />}
        {toggles.atonSummary && <AtonSummary />}
        {toggles.tableModule && <TableModule />}
        {toggles.tableToggelBtn && (
          <AtonSummaryToggleBtn
            onClick={() => setToggles({ ...toggles, atonSummary: true })}
          />
        )}
        {toggles.messageCountOverview && <MessageCountOverview />}
        {toggles.legend && <Legend />}
      </div>
    </div>
  );
}
