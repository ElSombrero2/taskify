import { useState } from "react"

export const useToggler = (value?: boolean) => {
  const [open, setOpen] = useState<boolean>(!!value);

  const hide = () => setOpen(false);
  const show = () => setOpen(true);
  const toggle = () => setOpen(!open);
  
  return { show, hide, open, toggle }
}