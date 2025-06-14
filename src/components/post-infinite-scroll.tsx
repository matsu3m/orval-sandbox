import { Fragment } from 'react';
import { listItemsPost, useListItemsPostInfinite } from '../__generated__/api';

export const PostInfiniteScroll = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useListItemsPostInfinite(
      {},
      {
        query: {
          getNextPageParam: ({ hasMore, nextCursor }) => {
            return hasMore ? nextCursor : undefined;
          },
          queryFn: ({ pageParam }) =>
            listItemsPost({
              limit: 10,
              cursor: typeof pageParam === 'string' ? pageParam : undefined,
            }),
        },
      }
    );

  if (isPending) return <p>Loading...</p>;
  if (!data) return <p>No data available</p>;

  const handleClick = () => {
    fetchNextPage();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>POST Infinite Scroll</h3>
      <div>
        {data.pages.map((group) => (
          <Fragment key={group.nextCursor || 'last-page'}>
            {(group?.items || []).map((item) => (
              <div key={item.id} style={{ padding: '8px', border: '1px solid #eee' }}>
                {item.title}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <button
        type="button"
        onClick={handleClick}
        disabled={!hasNextPage || isFetchingNextPage}
        style={{
          padding: '8px 16px',
          backgroundColor: hasNextPage ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          cursor: hasNextPage && !isFetchingNextPage ? 'pointer' : 'not-allowed',
        }}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
      </button>
    </div>
  );
}
