import type { FC } from 'react';

interface Props {
  className?: string;
}

export const TitleBarDrag: FC<React.PropsWithChildren<Props>> = (props) => {
  //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //  @ts-ignore
  return <div style={{ WebkitAppRegion: 'drag' }} className="h-5 fixed inset-0" {...props} />;
};
