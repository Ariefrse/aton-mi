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
import {
  AtonData,
  Msg21,
  Msg6,
} from "../declarations/types/types";

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
    async function fetchData(){
      try {
        console.log("Fetching AtoN metadata...");
        const atonMetaDataFetch = await fetch(
          "http://localhost:3000/api/aton-list"
        );
        const atonMetaData: AtonData[] =
          await atonMetaDataFetch.json();

        console.log("AtoN metadata fetched:", atonMetaData);

        type Msg21MapData = Pick<Msg21, 'mmsi' | 'longitude' | 'latitude'>;
        let msg21Data: Msg21MapData[] = [];
        try {
          console.log("Fetching MessageType21 data...");
          const msg21Fetch = await fetch(
            "http://localhost:3000/api/ais-messages",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                messageType: "pnav.ais_type21",
                mmsi: atonMetaData?.map((aton) => aton?.mmsi).toString(),
                startTs: "2024-08-30 04:00:47", // TODO: This should read from user filter
                endTs: "2024-08-30 04:35:47", // TODO: This should read from user filter
              }),
            }
          );
          msg21Data = await msg21Fetch.json();
          console.log("MessageType21 data fetched:", msg21Data);
        } catch (error) {
          console.error("Error fetching Msg21 data:", error);
        }

        // let msg6Data: Msg6[] = []; // TODO: To enable when confirmed with team
        // try {
        //   console.log("Fetching MessageType6 data...");
        //   const msg6Fetch = await fetch(
        //     "http://localhost:3000/api/ais-messages",
        //     {
        //       method: "POST",
        //       headers: { "Content-Type": "application/json" },
        //       body: JSON.stringify({
        //         messageType: "pnav.ais_type6_533",
        //         mmsi: atonMetaData?.map((aton) => aton?.mmsi).toString(),
        //         startTs: "2024-08-30 04:35:47", // TODO: This should read from user filter
        //         endTs: "2024-08-31 04:35:47", // TODO: This should read from user filter
        //       }),
        //     }
        //   );
        //   msg6Data = await msg6Fetch.json();
        //   console.log("MessageType6 data fetched:", msg6Data);
        // } catch (error) {
        //   console.error("Error fetching Msg6 data:", error);
        // }

        const atonDataMap = atonMetaData.map((aton) => ({
          ...aton,
          msg21: [] as Msg21MapData[],
          // msg6: [] as Msg6[],
        }));

        console.log("Mapping AtoN data with fetched messages...");
        msg21Data.forEach((message) => {
          const aton = atonDataMap.find((a) => a.mmsi === message.mmsi);
          if (aton) aton.msg21.push(message);
        });

        // msg6Data.forEach((message) => {
        //   const aton = atonDataMap.find((a) => a.mmsi === message.mmsi);
        //   if (aton) aton.msg6.push(message);
        // });

        console.log("Final AtoN data map:", atonDataMap);
        setAtonData(atonDataMap);
      } catch (error) {
        console.error("Error fetching AtoN data:", error);
      }
    };

    fetchData()
  }, []);

  useEffect(() => {
    const newLayers = atonData
      ?.map((aton, index) => {
        if (!aton?.msg21) return null;

        const long = aton?.msg21[0]?.longitude;
        const lat = aton?.msg21[0]?.latitude;

        const layerId = `scatterplot-layer-${aton.mmsi}-${index}`;

        return new ScatterplotLayer({
          id: layerId,
          data: [
            {
              position: [long, lat],
              name: aton?.al_name ?? aton?.name,
              mmsi: aton?.al_mmsi ?? aton?.mmsi,
              type: aton?.al_type ?? aton?.type,
              msg21: aton?.msg21,
              msg6: aton?.msg6,
            },
          ],
          getRadius: 800,
          getPosition: (d) => d.position,
          getFillColor: [255, 0, 0],
          pickable: true,
          onHover: (info) => {
            console.log('info', info)
            if (info.object) {
              setHoverInfo({
                name: info?.object?.name,
                mmsi: info?.object?.mmsi,
                x: info.x,
                y: info.y,
              });
            } else {
              setHoverInfo({});
            }
          },
        });
      })
      .filter((layer) => layer !== null);

    setLayers(newLayers);
  }, [atonData]);



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
