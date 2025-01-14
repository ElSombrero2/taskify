import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react"

export const useListener = (event: string, callback: (args: unknown) => void) => {
    useEffect(() => {
        const listener = listen(event, callback);
        return () => { listener.then((free) => free()); }
    }, []);
}