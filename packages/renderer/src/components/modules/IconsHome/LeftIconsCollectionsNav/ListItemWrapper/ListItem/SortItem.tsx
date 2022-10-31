import { useSearchParams } from 'react-router-dom';
import { ReactComponent as ArrowDown } from '/assets/icons/arrow-down.svg';
import { ReactComponent as ArrowsUpDown } from '/assets/icons/arrows-up-down.svg';

export const SortItem = () => {
  const [searchParams] = useSearchParams();
  const isSortedDesc = searchParams.get('sortByNameDesc');

  if (isSortedDesc === null)
    return (
      <>
        <ArrowDown className="w-4 h-4 mr-2 rotate-180" />
        <span>Sort by name ascending</span>
      </>
    );

  return isSortedDesc === 'true' ? (
    <>
      <ArrowsUpDown className="w-4 h-4 mr-2" />
      <span>Reset sorting</span>
    </>
  ) : (
    <>
      <ArrowDown className="w-4 h-4 mr-2" />
      <span>Sort by name descending</span>
    </>
  );
};
