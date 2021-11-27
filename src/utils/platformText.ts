import os from 'os';

export function platformBasedText({
  mac,
  win,
  linux,
}: {
  mac: string;
  win: string;
  linux: string;
}) {
  const platform = os.platform();

  if (platform === 'darwin') {
    return mac;
  }
  if (platform === 'win32') {
    return win;
  }

  return linux;
}
