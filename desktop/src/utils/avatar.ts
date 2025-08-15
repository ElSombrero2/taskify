import { stringToHex } from "./string-to-hex";

export const createAvatar = (name?: string) => {
    const names = name?.split(' ');
    const color = stringToHex(name || '')
    const initials = ((names?.[0]?.charAt(0) || '')
    + (names?.[1]?.charAt(0) || names?.[0]?.charAt(1) || ''))
    .toUpperCase()
    return { color, initials }
}
