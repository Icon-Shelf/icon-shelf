import { FC } from 'react';

export const IconCard: FC = () => {
  return (
    <div
      className="w-full h-full min-w-full min-h-full flex items-center justify-center rounded-2xl cursor-pointer"
      style={{
        minHeight: '8rem',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        // background: 'linear-gradient(180deg, #696EFF 0%, #F7ABFF 100%)',
      }}
    >
      <div
        className="rounded-2xl bg-black2 flex items-center justify-center"
        style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }}
      >
        one
      </div>
    </div>
  );
};
