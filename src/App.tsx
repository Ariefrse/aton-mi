import { DeckGL } from "@deck.gl/react";
import Map, { NavigationControl } from "react-map-gl";
import { useState, useRef } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import Sidebar from "./components/Sidebar";
import Legend from "./components/Legend";
import MessageOverview from "./components/MessageOverview";
import { FaBars } from "react-icons/fa";

function App() {
  const [layers, setLayers] = useState<ScatterplotLayer>();
  const mapRef = useRef(null);

  return (
    <div className="bg-gray-950">
      <header className="flex justify-between text-white mt-0 p-4">
        <div>
          <FaBars size={24} />
        </div>
        <div className="rounded-full overflow-hidden w-10 h-10">
          {" "}
          <img
            src="/src/assets/react.svg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </header>
      <div className="p-5 mx-10 bg-gray-800 text-white h-screen flex flex-col rounded-md">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AtoN</h1>
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Layers
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Filters
            </button>
          </div>
        </div>
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
    </div>
  );
}

export default App;
