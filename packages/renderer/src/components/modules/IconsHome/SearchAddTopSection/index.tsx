import type { FC } from 'react';
import { Input } from '/@/components/ui/atomic-components';
import { GlobalHotKeys } from 'react-hotkeys';
import { platformBasedText } from '/@/utils/platformText';
import { AddIconToCollection } from '../LeftIconsCollectionsNav/AddIconToCollection/index';
import { debounce } from 'lodash';

const { Search } = Input;

interface Props {
  searchQuery?: string | undefined;
  setSearchQuery: (newValue: string) => void;
}

const keyMap = {
  FOCUS_ICON_SEARCH: ['cmd+f', 'ctrl+f'],
};

export const SearchAddTopSection: FC<React.PropsWithChildren<Props>> = ({ setSearchQuery }) => {
  const debouncedSetSearch = debounce((val) => setSearchQuery(val), 150);

  const handlers = {
    FOCUS_ICON_SEARCH: () => {
      const searchDom = document.querySelector<HTMLInputElement>('[name="icons-search"]');
      searchDom?.focus?.();
    },
  };

  return (
    <div className="mx-4 mt-5 flex pb-3">
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
      <Search
        name="icons-search"
        placeholder={`Quick search in collection (${platformBasedText({
          mac: '⌘f',
          win: 'Ctrl+f',
          linux: 'Ctrl+f',
        })})`}
        className="flex-1"
        onChange={(e) => debouncedSetSearch(e.target.value)}
      />
      <AddIconToCollection />
    </div>
  );
};
