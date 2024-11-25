import { createContext, ReactNode, useState } from "react";
import { useWindow } from "../../hooks/window";

type Themes = 'dark' | 'light';

export const Theme = createContext({theme: '', setTheme: (_: Themes) => {}});

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const { theme: defaultTheme } = useWindow();
  const [theme, setTheme] = useState<Themes>(defaultTheme);
  return (
    <Theme.Provider value={{theme, setTheme}}>
      {children}
    </Theme.Provider>
  )
}