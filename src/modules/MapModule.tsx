import { DeckGL } from "@deck.gl/react";
import Map, { MapRef, NavigationControl } from "react-map-gl";
import { useState, useRef, useEffect } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import Legend from "../components/Legend";
import AtonSummary from "../components/AtonSummary";
import { CiViewTable } from "react-icons/ci";
import { RiRefreshLine } from "react-icons/ri";
import { LayersList } from "@deck.gl/core";
import HoverInfo from "../components/HoverInfo";
import TableModule from "./TableModule";
import MessageCountOverview from "../components/MessageCountOverview";
import AtonSummaryToggleBtn from "../components/AtonSummaryToggleBtn";
import { useAtonStore } from "../store/store";
import TableOptions from "../components/TableOptions";
import LegendToggleBtn from "../components/LegendToggleBtn";

type HoverInfo = {
  name: string;
  mmsi: number | null;
  lant
};

export default function MapModule() {
  const { toggles, setToggles, atonInitialData, setAtonInitialData } =
    useAtonStore();

  // In-Map Components
  const mapRef = useRef<MapRef | null>(null);
  const [layers, setLayers] = useState<LayersList | undefined>([]);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>();
  const [initialViewState, setInitialViewState] = useState({
    longitude: 101.5466,
    latitude: 3.0891,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/initial-aton-load");
        await response.json().then((data) => {
          setAtonInitialData(data);
          console.log(atonInitialData);
        });
      } catch (error) {
        console.error("Error fetching AtoN data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    atonInitialData?.map((aton) => {
      const newLayer = new ScatterplotLayer({
        id: `${aton?.mmsi}`,
        data: [
          {
            position: [aton?.longitude, aton?.latitude],
            atonname: aton?.name,
            latitude: aton?.latitude,
            longitude: aton?.longitude,
            structure: aton?.type,
          },
        ],
        getRadius: 5000,
        getFillColor: [255, 0, 0],
        pickable: true,

        onHover: (info) => {
          if (info.object) {
            setHoverInfo({
              name: info.object.name,
              mmsi: info.object.mmsi,
            });
          } else setHoverInfo(null);
        },
      });

      setLayers((prevLayers) =>
        prevLayers ? [...prevLayers, newLayer] : [newLayer]
      );
    });
  }, []);

  return (
    <div className="h-[90vh] overflow-visible p-3 mx-10 bg-gray-800 text-white flex flex-col rounded-md">
      <div className="mb-4 flex justify-between items-center">
        {toggles.tableModule === true ? null : (
          <>
            <h1 className="text-2xl font-bold">AtoN</h1>
            <div className="flex gap-6 mr-8">
              <RiRefreshLine
                fontSize={25}
                className="text-blue-400 hover:cursor-pointer"
              />
              <CiViewTable
                fontSize={30}
                className="text-blue-400 hover:cursor-pointer"
                onClick={() =>
                  setToggles({
                    ...toggles,
                    tableModule: !toggles.tableModule,
                    atonSummaryToggleBtn: false,
                  })
                }
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
        {/* Microinteractive Components */}
        {hoverInfo && <HoverInfo hoverInfo={hoverInfo} />}
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
