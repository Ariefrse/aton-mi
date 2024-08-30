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
import { AtonData, MessageType21, MessageType6 } from "../declarations/types/types";

export default function MapModule() {
  const { toggles, setToggles, atonData, setAtonData } = useAtonStore();

  // In-Map Components
  const mapRef = useRef<MapRef | null>(null);
  const [layers, setLayers] = useState<LayersList | undefined>([]);
  const [hoverInfo, setHoverInfo] = useState({});
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
        const atonMetaDataFetch = await fetch(
          "http://localhost:3000/api/initial-aton-load"
        );
        const atonMetaData: AtonData[] = await atonMetaDataFetch.json()

        // Fetch message 21 only for mmsi in atonList table
        const message21Fetch = await fetch(
          "http://localhost:3000/api/ais-messages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messageType: "pnav.ais_type21",
              mmsi: atonMetaData?.map((aton) => aton.mmsi).toString(),
              startTs: "2024-08-30 04:00:47", // TODO: This should read from user filter
              endTs: "2024-08-30 04:35:47", // TODO: This should read from user filter
            }),
          }
        );

        const message6Fetch = await fetch(
          "http://localhost:3000/api/ais-messages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messageType: "pnav.ais_type6_533",
              mmsi: atonMetaData?.map((aton) => aton.mmsi).toString(),
              startTs: "2024-08-29 04:35:47", // TODO: This should read from user filter
              endTs: "2024-08-30 04:35:47", // TODO: This should read from user filter
            }),
          }
        );

        const message21Data: MessageType21[] = await message21Fetch.json();
        const message6Data: MessageType6[] = await message6Fetch.json();

        const atonDataMap = atonMetaData.map((aton) => ({
          ...aton,
          message21: [] as MessageType21[],
          message6: [] as MessageType6[],
        }));

        console.log('jjj', atonDataMap)

        message21Data.forEach((message) => {
          const aton = atonDataMap.find((a) => a.mmsi === message.mmsi);
          if (aton) aton.message21.push(message);
        });

        message6Data.forEach((message) => {
          const aton = atonDataMap.find((a) => a.mmsi === message.mmsi);
          if (aton) aton.message6.push(message);
        });

        setAtonData(atonDataMap)

        const newLayers = atonDataMap?.map((aton) => {
          const longitude = aton?.message21[0].longitude;
          const latitude = aton?.message21[0].latitude;

          return new ScatterplotLayer({
            id: `${aton?.mmsi}`,
            data: [
              {
                position: [longitude, latitude],
                atonname: aton?.name,
                longitude,
                latitude,
                structure: aton?.type,
              },
            ],
            getRadius: 800,
            getFillColor: [255, 0, 0],
            pickable: true,
            onHover: (info) => {
              if (info.object) {
                setHoverInfo({
                  latitude,
                  longitude,
                });
              } else setHoverInfo({});
            },
          });
        });

        setLayers((prevLayers) =>
          prevLayers ? [...prevLayers, ...newLayers] : newLayers
        );
      } catch (error) {
        console.error("Error fetching AtoN data:", error);
      }
    }

    fetchData();
  }, []);

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
                onClick={toggleTableModule}
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
