import type { FC } from 'react';
import SVG from 'react-inlinesvg';
import { detectOS } from '/@/utils/detectOS';
import { isDarkMode } from '/@/utils/isDarkMode';

interface Props {
  src: string;
  color: string | null | undefined;
  className?: string;
}

export const IconDisplay: FC<React.PropsWithChildren<Props>> = ({ src, color, ...rest }) => {
  const isInDarkMode = isDarkMode();

  const platform = detectOS();
  let formattedSrcPath = src;
  if (platform === 'Windows') {
    formattedSrcPath = src.replace(/\\/g, '/');
  }
  const srcPath = encodeURI(formattedSrcPath);

  const showIconDiv = (color === undefined && isInDarkMode) || !!color;

  if (showIconDiv) {
    return (
      <div
        {...rest}
        draggable
        style={{
          WebkitMaskImage: `url(icon-image://${srcPath})`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          WebkitMaskPosition: 'center center',
          backgroundColor: color,
        }}
      />
    );
  } else {
    return <SVG src={`icon-image://${srcPath}`} className="mt-4 h-10 w-10" cacheRequests={false} />;
  }
};
