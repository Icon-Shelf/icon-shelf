import type { FC } from 'react';

interface Props {
  src: string;
  className: string;
}

export const IconDisplay: FC<Props> = ({ src, ...rest }) => {
  const srcPath = encodeURI(src);

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
};

// to render as svg
// <SVG src={icon.imageSrc} className="h-10 w-10 mt-4 text-white fill-white" /> */
