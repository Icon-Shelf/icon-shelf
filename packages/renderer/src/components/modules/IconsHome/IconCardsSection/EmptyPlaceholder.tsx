import type { FC } from 'react';
import { useParams } from 'react-router';
import { useQueryClient } from 'react-query';
import type { Collection } from '/@/data/collections';
import { Button } from '/@/components/ui/atomic-components';

const Wrapper: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1">
      <div className="dark:text-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      {children}
    </div>
  );
};

export const EmptyPlaceholder: FC<React.PropsWithChildren<{
  searchQuery?: string | null;
}>> = ({ searchQuery }) => {
  const queryClient = useQueryClient();
  const { collectionId } = useParams();

  const collectionsList: Collection[] | undefined = queryClient.getQueryData('collections-list');

  if (searchQuery) {
    return (
      <Wrapper>
        <div className="dark:text-white w-1/2 text-center">
          No icons in collection for “{searchQuery}”.
        </div>
      </Wrapper>
    );
  }

  if (collectionId === 'all-icons' && !collectionsList?.length) {
    return (
      <Wrapper>
        <div className="w-1/2 text-center">
          {/*  eslint-disable-next-line react/no-unescaped-entities */}
          You don't have any collection created
          <br />
          Click{' '}
          <Button
            type="link"
            onClick={() => {
              document?.querySelector<HTMLButtonElement>('#create-collection-btn')?.click();
            }}
          >
            here
          </Button>{' '}
          to create a new collection.
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="w-1/2 text-center">
        Click{' '}
        <Button
          type="link"
          onClick={() => {
            document?.querySelector<HTMLButtonElement>('#add-icon-to-collection-btn')?.click();
          }}
        >
          here
        </Button>{' '}
        to add icons to collection.
      </div>
    </Wrapper>
  );
};
