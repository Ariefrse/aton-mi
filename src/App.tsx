import MapModule from "./modules/MapModule";
import Header from "./components/Header";
import { useAtonStore } from "./store/store";
import { fetchAtonList, fetchMessage21, fetchMessage6 } from "./api/aton-api";
import { useEffect } from "react";
import { AtonStore } from "./declarations/types/types";

function App() {
  const { setAtonData } = useAtonStore();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching AtoN data...');
        const atonList = await fetchAtonList();

        if (!atonList) return;
        const atonDataPromises = atonList.map(async (aton) => {
          const [msg21, msg6] = await Promise.all([
            fetchMessage21(aton.mmsi),
            fetchMessage6(aton.mmsi),
          ]);

          const atonStoreData: AtonStore = {
            mmsi: aton.mmsi,
            name: aton.name,
            region: aton.region,
            type: aton.type,
            msg21: msg21 || [],
            msg6: msg6 || [],
          };

          return atonStoreData
        });

        const atonData = await Promise.all(atonDataPromises)
        setAtonData(atonData)

        console.log('atonData', atonData)

      } catch (error) {
        console.log('Mende sial :', error)
      }
    };

    fetchData()
  }, []);

  return (
    <div className="bg-gray-950 h-screen overflow-hidden">
      <Header />
      {/* <MapModule /> */}
    </div>
  );
}

export default App;
