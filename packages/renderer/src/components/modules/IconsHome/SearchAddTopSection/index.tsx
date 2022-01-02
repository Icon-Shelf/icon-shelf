import type { FC } from 'react';
import { Input } from '/@/components/ui/atomic-components';
import { GlobalHotKeys } from 'react-hotkeys';
import { platformBasedText } from '/@/utils/platformText';
import { AddIconToCollection } from '../LeftIconsCollectionsNav/AddIconToCollection/index';

const { Search } = Input;

interface Props {
  searchQuery: string | undefined;
  setSearchQuery: (newValue: string) => void;
}

const keyMap = {
  FOCUS_ICON_SEARCH: ['cmd+f', 'ctrl+f'],
};

export const SearchAddTopSection: FC<Props> = ({ searchQuery, setSearchQuery }) => {
  const handlers = {
    FOCUS_ICON_SEARCH: () => {
      const searchDom = document.querySelector<HTMLInputElement>('[name="icons-search"]');
      searchDom?.focus?.();
    },
  };

  return (
    <div className="flex mt-5 mx-4 pb-3">
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
      <Search
        name="icons-search"
        placeholder={`Quick search for icons (${platformBasedText({
          mac: '⌘f',
          win: 'Ctrl+f',
          linux: 'Ctrl+f',
        })})`}
        className="flex-1"
        value={searchQuery || ''}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <AddIconToCollection />
    </div>
  );
};
