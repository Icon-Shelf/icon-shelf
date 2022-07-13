import type { FC } from 'react';
import SVG from 'react-inlinesvg';
import { detectOS } from '/@/utils/detectOS';

interface Props {
  src: string;
  className: string;
}

export const IconDisplay: FC<Props> = ({ src, ...rest }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');

  const platform = detectOS();
  let formattedSrcPath = src;
  if (platform === 'Windows') {
    formattedSrcPath = src.replace(/\\/g, '/');
  }

  const srcPath = encodeURI(formattedSrcPath);

  if (isDarkMode) {
    return (
      <>
        <div
          {...rest}
          draggable
          style={{
            WebkitMaskImage: `url(icon-image://${srcPath})`,
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            WebkitMaskPosition: 'center center',
          }}
        />
      </>
    );
  } else {
    return (
      <SVG
        src={`icon-image://${srcPath}`}
        className="mt-4 h-10 w-10 text-black"
        cacheRequests={false}
      />
    );
  }
};
