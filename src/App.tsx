import Header from "./components/Header";
import MapModule from "./modules/MapModule";

function App() {
  // const { setAtonData } = useAtonStore();

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       console.log("Fetching AtoN data...");
  //       const atonList = await fetchAtonList();
  //       if (!atonList) {
  //         console.warn("No AtoN data returned.");
  //         return;
  //       }

  //       console.log("Fetched AtoN list:", atonList);

  //       const atonDataPromises = atonList.map(async (aton) => {
  //         try {
  //           // console.log(`Fetching messages for MMSI: ${aton.mmsi}`);
  //           const [msg21, msg6] = await Promise.all([
  //             fetchMessage21(aton.mmsi),
  //             fetchMessage6(aton.mmsi),
  //           ]);

  //           // console.log(`Fetched messages for MMSI ${aton.mmsi}:`, {
  //           //   msg21,
  //           //   msg6,
  //           // });

  //           const atonStoreData: AtonStore = {
  //             mmsi: aton.mmsi,
  //             name: aton.name,
  //             region: aton.region,
  //             type: aton.type,
  //             msg21: msg21 || [],
  //             msg6: msg6 || [],
  //           };

  //           return atonStoreData;
  //         } catch (error) {
  //           console.error(
  //             `Error fetching messages for MMSI ${aton.mmsi}:`,
  //             error
  //           );
  //         }
  //       });

  //       const atonData = await Promise.all(atonDataPromises);
  //       console.log("All AtoN data fetched:", atonData);

  //       setAtonData(atonData);
  //     } catch (error) {
  //       console.error("Error in fetching data:", error);
  //     }
  //   }

  //   fetchData();
  // }, [setAtonData]);

  return (
    <div className="bg-gray-950 h-screen overflow-hidden">
      <Header />
      <MapModule />
    </div>
  );
}

export default App;
