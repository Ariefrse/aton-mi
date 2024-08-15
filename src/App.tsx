import { DeckGL } from "@deck.gl/react";
import Map, { NavigationControl } from "react-map-gl";
import { useState, useRef } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import Sidebar from "./components/Sidebar";
import Legend from "./components/Legend";
import MessageOverview from "./components/MessageOverview";

function App() {
  const [layers, setLayers] = useState<ScatterplotLayer>();
  const mapRef = useRef(null);

  return (
    <div className="p-5 bg-gray-800 text-white h-screen flex flex-col">
      <header className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">AtoN</h1>
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Layers
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Filters
          </button>
        </div>
      </header>
      <div className="flex-1 relative">
        {/* <Sidebar /> */}
        <MessageOverview />
        <DeckGL
          initialViewState={{
            longitude: 101.5466,
            latitude: 3.0891,
            zoom: 13,
            pitch: 0,
            bearing: 0,
          }}
          controller={true}
        >
          <Map
            ref={mapRef}
            mapboxAccessToken="pk.eyJ1IjoibmF6cnVsLWp1Z2dlcm5heiIsImEiOiJjbGxudWd3c2wwM282M2VvNHI3bWsyY3ViIn0.tIwOlxD2FcESclugJAr98A"
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

export default App;
