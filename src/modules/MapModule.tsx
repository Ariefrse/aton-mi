import { DeckGL } from "@deck.gl/react";
import Map, { MapRef, NavigationControl } from "react-map-gl";
import { useState, useRef, useEffect } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import Legend from "../components/Legend";
import Sidebar from "../components/Sidebar";
import { CiViewTable } from "react-icons/ci";
import { RiRefreshLine } from "react-icons/ri";
import { LayersList } from "@deck.gl/core";
import {
  AllAtonResDto,
  AtonDataResDto,
  AtonType,
} from "../declarations/dtos/dtos";

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
  x: number; // x position of the hover event
  y: number; // y position of the hover event
};

export default function MapModule() {
  const mapRef = useRef<MapRef | null>(null);
  const [layers, setLayers] = useState<LayersList | undefined>([]);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
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
          }
        },
        getTooltip: (info: any) =>
          info.object &&
          `
            <div>
              <strong>Position:</strong> ${info.object.atonname}<br/>
              <strong>Region:</strong> ${info.object.region}<br/>
              <strong>Latitude:</strong> ${info.object.latitude}<br/>
              <strong>Longitude:</strong> ${info.object.longitude}<br/>
              <strong>Aton Battery:</strong> ${info.object.atonbatt}<br/>
              <strong>Lant Battery:</strong> ${info.object.lantBatt}<br/>
              <strong>Offset Position:</strong> ${info.object.offPosition}<br/>
              <strong>Ambient:</strong> ${info.object.ambient}<br/>
              <strong>Light:</strong> ${info.object.light}<br/>
              <strong>Local Time:</strong> ${info.object.localTime}<br/>
              <strong>UTC Time:</strong> ${info.object.utcTime}
            </div>`,
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
        <DeckGL
          initialViewState={initialViewState}
          controller={true}
          layers={layers}
        >
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
        {hoverInfo && (
          <div
            className="absolute bg-gray-700 p-2 rounded"
            style={{
              left: hoverInfo.x + 10,
              top: hoverInfo.y + 10,
              pointerEvents: "none",
            }}
          >
            <div>
              <strong>Position:</strong> {hoverInfo.name}
              <br />
              <strong>Region:</strong> {hoverInfo.region}
              <br />
              <strong>Latitude:</strong> {hoverInfo.latitude}
              <br />
              <strong>Longitude:</strong> {hoverInfo.longitude}
              <br />
              <strong>Aton Battery:</strong> {hoverInfo.atonbatt}
              <br />
              <strong>Lant Battery:</strong> {hoverInfo.lantBatt}
              <br />
              <strong>Offset Position:</strong> {hoverInfo.offPosition}
              <br />
              <strong>Ambient:</strong> {hoverInfo.ambient}
              <br />
              <strong>Light:</strong> {hoverInfo.light}
              <br />
              <strong>Local Time:</strong> {hoverInfo.localTime}
              <br />
              <strong>UTC Time:</strong> {hoverInfo.utcTime}
            </div>
          </div>
        )}
        <Legend />
      </div>
    </div>
  );
}
