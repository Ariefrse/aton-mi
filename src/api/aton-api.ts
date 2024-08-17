import { useEffect, useState, useCallback } from "react";
import { AtonMsgCountResDto, AtonInitialCountResDto, AtonStatsResDto, AllAtonResDto, AtonWsPayload } from "../declarations/dtos/dtos";
import { useAtonStore } from "../store/store";

const WS_ENDPOINT = "wss://dash.datainsight.my/wss/";

function useWebSocket() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const {
    setAtonMsgCount,
    setAtonStatsData,
    setAtonInitialCount,
    setAllAtonData,
  } = useAtonStore();

  useEffect(() => {
    const initWs = new WebSocket(WS_ENDPOINT);

    initWs.onopen = () => {
      setWs(initWs);
      console.log("WebSocket connected");
    };

    initWs.onmessage = (event) => {
      if (event instanceof MessageEvent) {
        const data = JSON.parse(event.data);

        if (data.payload === "getatonmessagecount")
          setAtonMsgCount(data as AtonMsgCountResDto);
        if (data.payload === "getatoninitialcount")
          setAtonInitialCount(data as AtonInitialCountResDto);
        if (data.payload === "getatonstatistics")
          setAtonStatsData(data as AtonStatsResDto[]);
        if (data.payload === "getallaton")
          setAllAtonData(data as AllAtonResDto[]);
      }
    };

    initWs.onclose = () => {
      setWs(null);
      console.log("WebSocket closed");
    };

    initWs.onerror = () => console.error("WebSocket error");

    return () => initWs.close();
  }, []);

  const sendMsg = useCallback((payload: AtonWsPayload) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(payload);
    } else {
      console.error("WebSocket is not connected or not ready");
    }
  }, [ws]);

  return sendMsg;
}

export default useWebSocket;
