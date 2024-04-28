import { useVariablesStore } from "@/stores/variablesStore";
const { thresholdHeight } = useVariablesStore();

export const isFullScreenScroll = () => window.innerHeight > thresholdHeight;
