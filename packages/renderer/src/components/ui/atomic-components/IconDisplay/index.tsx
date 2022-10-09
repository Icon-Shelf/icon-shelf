import type { FC } from 'react';
import SVG from 'react-inlinesvg';
import { detectOS } from '/@/utils/detectOS';

interface Props {
  src: string;
  color: string;
}

export const IconDisplay: FC<React.PropsWithChildren<Props>> = ({ src, color }) => {
  // const isDarkMode = document.documentElement.classList.contains('dark');

  const platform = detectOS();
  let formattedSrcPath = src;
  if (platform === 'Windows') {
    formattedSrcPath = src.replace(/\\/g, '/');
  }

  const srcPath = encodeURI(formattedSrcPath);

  return (
    <>
      <SVG
        src={`icon-image://${srcPath}`}
        className="mt-4 h-10 w-10"
        cacheRequests={false}
        stroke={color}
      />
    </>
  );
};
