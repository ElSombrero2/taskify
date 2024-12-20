import { createContext, ReactNode, useState } from "react";
import { useWindow } from "@/hooks/window";

type Themes = 'dark' | 'light';

export const Theme = createContext({theme: '', setTheme: (_: Themes) => {}});

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const { theme: defaultTheme } = useWindow();
  const [theme, _setTheme] = useState<Themes>((localStorage.getItem('TASKIFY_THEME') as Themes) || defaultTheme || 'dark');

  const setTheme = (theme: Themes) => {
    _setTheme(theme);
    localStorage.setItem('TASKIFY_THEME', theme);
  }

  return (
    <Theme.Provider value={{theme, setTheme}}>
      {children}
    </Theme.Provider>
  )
}