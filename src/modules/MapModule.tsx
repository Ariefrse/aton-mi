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
import AtonSummaryToggleBtn from "../components/AtonSummaryToggleBtn";
import { useAtonStore } from "../store/store";
import TableOptions from "../components/TableOptions";
import LegendToggleBtn from "../components/LegendToggleBtn";
import { allAtonData, AtonData } from "../dummy-data/all-aton";

export default function MapModule() {
  const { toggles, setToggles, tableOptions, setTableOptions, setAllAtonData } =
    useAtonStore();

  // In-Map Components
  const mapRef = useRef<MapRef | null>(null);
  const [layers, setLayers] = useState<LayersList | undefined>([]);
  const [hoverInfo, setHoverInfo] = useState({
    name: "",
    mmsi: null,
    lantBatt: null,
  });
  const [initialViewState, setInitialViewState] = useState({
    longitude: 101.5466,
    latitude: 3.0891,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  });

  // UNCOMMENT FOR LIVE WEBSOCKET DATA
  // useEffect(() => {
  //   const socket = new WebSocket("wss://dash.datainsight.my/wss/");

  //   socket.onopen = () => {
  //     console.log("Connected to WebSocket server");
  //     socket.send("getallaton");
  //   };

  //   socket.onmessage = (event) => {
  //     // const data = JSON.parse(event.data);
  //     const data = allAtonData

  //     // setAllAtonData(data)

  //     const newLayer = new ScatterplotLayer({
  //       id: `scatterplot-layer-${data.ss_longitude}-${data.ss_latitude}`,
  //       data: [
  //         {
  //           position: [data.ss_longitude, data.ss_latitude],
  //           atonname: data.atonname,
  //           status: data.status,
  //           region: data.region,
  //           latitude: data.latitude,
  //           longitude: data.longitude,
  //           atonbatt: data.atonbatt,
  //           lantBatt: data.lantBatt,
  //           offPosition: data.offPosition,
  //           ambient: data.ambient,
  //           light: data.light,
  //           localTime: data.localTime,
  //           utcTime: data.utcTime,
  //         }
  //       ],
  //       getRadius: 5000,
  //       getFillColor: [255, 0, 0],
  //       pickable: true,

  //       onHover: (info) => {
  //         if (info.object) {
  //           setHoverInfo({
  //             structure: info.object.structure,
  //             name: info.object.atonname,
  //             region: info.object.region,
  //             latitude: info.object.latitude,
  //             longitude: info.object.longitude,
  //             atonbatt: info.object.atonbatt,
  //             lantBatt: info.object.lantBatt,
  //             offPosition: info.object.offPosition,
  //             ambient: info.object.ambient,
  //             light: info.object.light,
  //             localTime: info.object.localTime,
  //             utcTime: info.object.utcTime,
  //             x: info.x,
  //             y: info.y,
  //           });
  //         } else setHoverInfo(null);
  //       },
  //     });

  //     setLayers((prevLayers) =>
  //       prevLayers ? [...prevLayers, newLayer] : [newLayer]
  //     );
  //   };

  //   socket.onclose = () => console.log("WebSocket connection closed");
  //   socket.onerror = (error) => console.error("WebSocket error:", error);

  //   return () => socket.close();
  // }, []);

  // State to hold all received data
  const [atonData, setAtonData] = useState<AtonData[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://api.example.com/aton");
        const data = await response.json();

        setAtonData(data);
      } catch (error) {
        console.error("Error fetching AtoN data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    atonData?.map((aton) => {
      const newLayer = new ScatterplotLayer({
        id: `${aton.mmsi}`,
        data: aton.data.map((item) => ({
          position: [item.ss_longitude, item.ss_latitude],
          atonname: aton.name,
          status: item.status,
          region: item.region,
          latitude: item.ss_latitude,
          longitude: item.ss_longitude,
          offPosition: item.ss_off_position,
          ambient: item.ambient,
          light: item.light,
          localTime: item.lcl_ts,
          utcTime: item.ss_utc_second,
          structure: aton.type,
        })),
        getRadius: 5000,
        getFillColor: [255, 0, 0],
        pickable: true,

        onHover: (info) => {
          if (info.object) {
            setHoverInfo({
              structure: info.object.type,
              name: info.object.name,
              region: info.object.region,
              latitude: info.object.ss_latitude,
              longitude: info.object.ss_longitude,
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
