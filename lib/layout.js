export const PANEL_LAYOUT = {
  breakpoint: 768,
  gutter: 16,
  desktopMaxWidth: 520,
  desktopViewportFraction: 0.46,
  projectMaxWidth: 1040,
  projectViewportFraction: 0.64,
  mobileViewportFraction: 0.62,
};

export function getPanelFraction(width, height, isProject) {
  const layout = PANEL_LAYOUT;
  if (width >= layout.breakpoint) {
    const panelWidth = isProject
      ? Math.min(layout.projectMaxWidth, width * layout.projectViewportFraction)
      : Math.min(layout.desktopMaxWidth, width * layout.desktopViewportFraction);
    return (panelWidth + layout.gutter * 2) / width;
  }
  return (height * layout.mobileViewportFraction + layout.gutter) / height;
}
