import MapModule from "./modules/MapModule";
import Header from "./components/Header";
import useWebSocket from "./api/aton-api";
import { useEffect } from "react";
import { useAtonStore } from "./store/store";

function App() {
  // const sendMsg = useWebSocket();
  // const { atonInitialCount, allAton, atonMsgCount, atonStats } = useAtonStore();

  // UNCOMMENT TO TEST
  // useEffect(() => {
  //   if (sendMsg) {
  //     sendMsg("getatoninitialcount");
  //     sendMsg("getallaton");
  //     sendMsg("getatoninitialcount");
  //     sendMsg("getatonmsgcount");
  //     sendMsg("getdailystatisticstartfrom");
  //   }
  // }, [sendMsg]);

  // UNCOMMENT TO TEST GLOBAL ZUSTAND STATE
  // console.log("atonInitialCount", atonInitialCount)
  // console.log("allAton", allAton)
  // console.log("atonMsgCount", atonMsgCount)
  // console.log("atonStats", atonStats)

  return (
    <div className="bg-gray-950 h-screen overflow-hidden">
      <Header />
      <MapModule />
    </div>
  );
}

export default App;
