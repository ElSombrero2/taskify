
export const useWindow = () => {
  return { isWidget: !!(window as any).widget, theme: (window as any).theme || 'dark' };
}