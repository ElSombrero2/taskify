import { createAvatar } from "@/utils/avatar";
import { useEffect, useState } from "react"

export const useAvatar = (name?: string) => {
  const [color, setColor] = useState<string>("#000000");
  const [initials, setInitials] = useState('');

  useEffect(() => {
    const avatar = createAvatar(name);
    setColor(avatar.color);
    setInitials(avatar.initials);
  }, [name]);

  return { color, initials, };
}
