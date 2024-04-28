import type { IDepth } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useApiStore = defineStore("apiStore", () => {
  const getDepthSnapshot = async (
    symbol: string,
    limit?: number,
  ): Promise<IDepth> => {
    const url = new URL(`${import.meta.env.VITE_HTTP_API_URL}/depth`);

    url.searchParams.append("symbol", symbol);
    if (limit) url.searchParams.append("limit", limit.toString());

    const res = await fetch(url);
    const data = res.json();

    console.log(data);

    return data;
  };

  const depthWebSocket = ref<WebSocket | null>(null);

  const depthWebSocketMessageHandler = (e: MessageEvent) => {
    console.log(JSON.parse(e.data));
  };

  const closeDepthWebSocketConnection = () => {
    depthWebSocket.value?.close();
  };

  const startDepthWebSocketConnection = (symbol: string) => {
    closeDepthWebSocketConnection();
    const url = `${import.meta.env.VITE_WS_API_URL}/${symbol.toLowerCase()}@depth`;

    depthWebSocket.value = new WebSocket(url);
    depthWebSocket.value.addEventListener(
      "message",
      depthWebSocketMessageHandler,
    );
    depthWebSocket.value.addEventListener("error", () =>
      startDepthWebSocketConnection(symbol),
    );
  };

  return {
    startDepthWebSocketConnection,
    getDepthSnapshot,
  };
});
