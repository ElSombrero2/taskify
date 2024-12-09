import { useEffect, useState } from "react"

const stringToHex = (str: string) => {
  let final = '#';
  for (let i = 0; i < str.length; i++) {
    final += (str.charCodeAt(i) + 0x22).toString(16);
    if (final.length > 7)
      return final;
  }
  return final;
}

export const useAvatar = (name?: string) => {
  const [color, setColor] = useState<string>("#000000");
  const [initial, setInitial] = useState('');

  useEffect(() => {
    const names = name?.split(' ');
    setColor(stringToHex(name || ''));
    setInitial(
      ((names?.[0].charAt(0) || '')
      + (names?.[1].charAt(0) || ''))
      .toUpperCase()
    )
  }, [name]);

  return {color, initial};
}