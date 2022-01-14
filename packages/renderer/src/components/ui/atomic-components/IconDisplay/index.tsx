import type { FC } from 'react';
import SVG from 'react-inlinesvg';

interface Props {
  src: string;
  className: string;
}

export const IconDisplay: FC<Props> = ({ src, ...rest }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');

  const srcPath = encodeURI(src);

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
    return <SVG src={`icon-image://${srcPath}`} className="h-10 w-10 mt-4 text-black" />;
  }
};
