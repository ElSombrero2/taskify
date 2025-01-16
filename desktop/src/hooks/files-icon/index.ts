import { useEffect, useState } from "react"

const Types = {
  'default': 'fa-file',
  'application/pdf': 'fa-file-pdf text-red-500',
  'application/zip': 'fa-file-zipper text-yellow-500',
  'application/gz': 'fa-file-zipper text-yellow-500',
  'application/rar': 'fa-file-zipper text-yellow-500',
  'image/png': 'fa-file-image text-blue-500',
  'image/jpeg': 'fa-file-image text-blue-500',
  'image/jpg': 'fa-file-image text-blue-500',
  'image/bmp': 'fa-file-image text-blue-500',
  'video/mp4': 'fa-file-video text-emerald-500',
  'video/avi': 'fa-file-video text-emerald-500',
  'video/mpeg': 'fa-file-video text-emerald-500',
  'audio/mpeg': 'fa-file-audio text-orange-500',
  'audio/mp3': 'fa-file-audio text-orange-500',
  'audio/ogg': 'fa-file-audio text-orange-500',
}

export type MimeTypes = keyof typeof Types;

export const useFileIcon = (type: MimeTypes) => {
  const [icon, setIcon] = useState<string>('');
  useEffect(() => {
    setIcon(Types[type] || Types['default']);
  }, []);
return icon;
}