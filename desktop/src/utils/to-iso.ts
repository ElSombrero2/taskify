
export const toISO = (date?: string) => {
  if (date) {
      const [d, h] = date.split(' ');
      return `${d}T${h}`;
  }
  return '';
}