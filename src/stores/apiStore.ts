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
  const timeout = ref<number | undefined>(undefined);

  const closeDepthWebSocketConnection = () => {
    clearTimeout(timeout.value);
    depthWebSocket.value?.close();
  };

  const establishWebSocketConnectionHandler = () => {
    establishWebSocketConnection.value = false;
  };

  const startDepthWebSocketConnection = (
    symbol: string,
    webSocketMessageHandler: (e: MessageEvent) => void,
  ) => {
    const refreshWebSocketConnection = () => {
      startDepthWebSocketConnection(symbol, webSocketMessageHandler);
    };

    establishWebSocketConnection.value = true;

    closeDepthWebSocketConnection();
    const url = `${import.meta.env.VITE_WS_API_URL}/${symbol.toLowerCase()}@depth@1000ms`;

    depthWebSocket.value = new WebSocket(url);
    depthWebSocket.value.addEventListener("message", (e: MessageEvent) => {
      // На случай если сообщения не приходят в течении 3-х секунд, устанавливаем подключение заново
      clearTimeout(timeout.value);
      timeout.value = setTimeout(() => {
        refreshWebSocketConnection();
      }, 5_000);

      webSocketMessageHandler(e);
    });
    depthWebSocket.value.addEventListener("error", refreshWebSocketConnection);
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
