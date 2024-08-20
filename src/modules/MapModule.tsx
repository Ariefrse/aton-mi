import { DeckGL } from "@deck.gl/react";
import Map, { MapRef, NavigationControl } from "react-map-gl";
import { useState, useRef, useEffect } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import Legend from "../components/Legend";
import Sidebar from "../components/Sidebar";
import { CiViewTable } from "react-icons/ci";
import { RiRefreshLine } from "react-icons/ri";
import { allAtonData } from "../dummy-data/all-aton";
import { LayersList } from "@deck.gl/core";
import { AllAtonResDto } from "../declarations/dtos/dtos";

type ScatterplotLayerData = {
  position: [number, number];
  // color: [number, number, number];
  // atonType: number;
};

export default function MapModule() {
  const mapRef = useRef<MapRef | null>(null);
  const [layers, setLayers] = useState<LayersList | undefined>([]);
  const initialViewState = {
    longitude: 101.5466,
    latitude: 3.0891,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  useEffect(() => {
    const socket = new WebSocket("wss://dash.datainsight.my/wss/");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      socket.send("getallaton");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)

      const newLayer = new ScatterplotLayer({
        id: `scatterplot-layer-${data.ss_longitude}-${data.ss_latitude}`,
        data: [
          {
            position: [data.ss_longitude, data.ss_latitude],
          },
        ] as ScatterplotLayerData[],
        getRadius: 5000,
        getFillColor: [255, 0, 0],
      });

      setLayers((prevLayers) =>
        prevLayers ? [...prevLayers, newLayer] : [newLayer]
      );
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => socket.close();
  }, []);

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
        <DeckGL initialViewState={initialViewState} controller={true} layers={layers}>
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
