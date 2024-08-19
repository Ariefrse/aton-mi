import { DeckGL } from "@deck.gl/react";
import Map, { NavigationControl } from "react-map-gl";
import { useState, useRef } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import Legend from "../components/Legend";
import Sidebar from "../components/Sidebar";
import { CiViewTable } from "react-icons/ci";
import { RiRefreshLine } from "react-icons/ri";

export default function MapModule() {
  const [layers, setLayers] = useState<ScatterplotLayer>();
  const mapRef = useRef(null);
  const initialViewState = {
    longitude: 101.5466,
    latitude: 3.0891,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  return (
    <div className="h-[90vh] overflow-hidden p-3 mx-10 bg-gray-800 text-white flex flex-col rounded-md">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">AtoN</h1>
        <div className="flex gap-6 mr-8">
          <RiRefreshLine fontSize={30} className="text-blue-400" />
          <CiViewTable fontSize={30} className="text-blue-400" />
        </div>
      </div>
      <div className="flex-1 relative">
        <Sidebar />
        {/* <MessageOverview /> */}
        {/* <TableModule /> */}
        <DeckGL initialViewState={initialViewState} controller={true}>
          <Map
            ref={mapRef}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/satellite-v9"
          >
            <NavigationControl
              visualizePitch
              position="bottom-right"
              showCompass
              showZoom
            />
          </Map>
        </DeckGL>
        <Legend />
      </div>
    </div>
  );
}
