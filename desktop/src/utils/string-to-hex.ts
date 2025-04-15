
export const stringToHex = (str: string) => {
  let final = '#';
  for (let i = 0; i < str.length; i++) {
    final += (str.charCodeAt(i) + 0x22).toString(16);
    if (final.length > 6)
      return final;
  }
  return final;
}
