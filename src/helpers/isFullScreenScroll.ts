const thresholdHeight = parseInt(
  window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--scroll-threshold-height"),
);

export const isFullScreenScroll = () => window.innerHeight > thresholdHeight;
