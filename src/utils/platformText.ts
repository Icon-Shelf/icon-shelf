import { detectOS } from './detectOS';

export function platformBasedText({
  mac,
  win,
  linux,
}: {
  mac: string;
  win: string;
  linux: string;
}) {
  const platform = detectOS();

  if (platform === 'Mac OS') {
    return mac;
  }

  if (platform === 'Linux') {
    return linux;
  }

  return win;
}
