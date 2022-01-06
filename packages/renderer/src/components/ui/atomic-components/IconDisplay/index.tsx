import type { DragEvent, FC } from 'react';

interface Props {
  src: string;
  className: string;
}

export const IconDisplay: FC<Props> = ({ src, ...rest }) => {
  const srcPath = encodeURI(src);

  const onDragStart = async (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.effectAllowed = 'copy';

    window.electron.ipcRenderer.send('drag-icon-start', [srcPath]);
  };

  return (
    <>
      <div
        {...rest}
        draggable
        onDragStart={onDragStart}
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
