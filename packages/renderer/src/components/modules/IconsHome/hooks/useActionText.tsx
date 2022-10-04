import { useState } from 'react';

export const useCopyActionText = (cb: () => void) => {
  const [text, setText] = useState('');

  const onAction = (actionText: string) => {
    cb();
    setText(actionText);
    setTimeout(() => {
      setText('');
    }, 1500);
  };

  return [text, onAction] as const;
};
