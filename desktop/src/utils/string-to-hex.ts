
export const stringToHex = (str: string) => {
  let final = '#';
  for (let i = 0; i < str.length; i++) {
    final += ((str.charCodeAt(i) * str.length) % 0xaa).toString(16);
    if (final.length > 6)
      return final;
  }
  return final;
}
