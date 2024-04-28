import type { IDepthRestResponse } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useApiStore = defineStore("apiStore", () => {
  const getDepthSnapshot = async (
    symbol: string,
    limit?: number,
  ): Promise<IDepthRestResponse> => {
    const url = new URL(`${import.meta.env.VITE_HTTP_API_URL}/depth`);

    url.searchParams.append("symbol", symbol);
    if (limit) url.searchParams.append("limit", limit.toString());

    const res = await fetch(url);
    const data = await res.json();

    return data;
  };

  const depthWebSocket = ref<WebSocket | null>(null);
  const establishWebSocketConnection = ref<boolean>(false);

  const closeDepthWebSocketConnection = () => {
    depthWebSocket.value?.close();
  };

  const establishWebSocketConnectionHandler = () => {
    establishWebSocketConnection.value = false;
  };

  const startDepthWebSocketConnection = (
    symbol: string,
    webSocketMessageHandler: (e: MessageEvent) => void,
  ) => {
    establishWebSocketConnection.value = true;

    closeDepthWebSocketConnection();
    const url = `${import.meta.env.VITE_WS_API_URL}/${symbol.toLowerCase()}@depth`;

    depthWebSocket.value = new WebSocket(url);
    depthWebSocket.value.addEventListener("message", webSocketMessageHandler);
    depthWebSocket.value.addEventListener("error", () =>
      startDepthWebSocketConnection(symbol, webSocketMessageHandler),
    );
    depthWebSocket.value.addEventListener(
      "open",
      establishWebSocketConnectionHandler,
    );
  };

  return {
    startDepthWebSocketConnection,
    getDepthSnapshot,
    establishWebSocketConnection,
  };
});
