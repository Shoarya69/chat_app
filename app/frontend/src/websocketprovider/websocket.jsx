import { createContext, useContext } from "react";
import useWebSocket from "react-use-websocket";
import WebSocket_url from "@/chat/api_utlits/websocket_url";

const WSContext = createContext(null);

export default function WebSocketProvider({ children }) {
  const token = localStorage.getItem("token");
  const ws_url = WebSocket_url();

  const ws = useWebSocket(ws_url, {
    queryParams: { tok: token },
    share: true,
    shouldReconnect: () => true,
  });

  return (
    <WSContext.Provider value={ws}>
      {children}
    </WSContext.Provider>
  );
}

export const useWS = () => useContext(WSContext);
