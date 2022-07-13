import type { FC } from 'react';
import { ReactComponent as MailIcon } from '/assets/icons/mail.svg';

export const TempIconCard: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <div className="w-20 h-20 rounded-2xl bg-gray-200 text-black dark:bg-black2 dark:text-white flex flex-col items-center justify-center border border-gray-600">
      <MailIcon />
    </div>
  );
};
