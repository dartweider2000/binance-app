import { useHtmlElStore } from "@/stores/htmlElStore";
const { thresholdHeight } = useHtmlElStore();

export const isFullScreenScroll = () => window.innerHeight > thresholdHeight;
