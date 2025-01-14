import { platform } from "@tauri-apps/api/os";
import { useEffect, useState } from "react";

export const useWindow = () => {
  const [os, setOs] = useState('unknown');

  useEffect(() => {
    platform().then(setOs)
  });

  return {
    os, 
    isWidget: !!(window as any).widget, theme: (window as any).theme || 'dark',
  };
}