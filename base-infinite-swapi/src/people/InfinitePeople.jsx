import InfiniteScroll from 'react-infinite-scroller';
import { Person } from './Person';
import { useInfiniteQuery } from '@tanstack/react-query';

const initialUrl = 'https://swapi.dev/api/people/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery(
    ['sw-people'],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );
  if (isLoading) return <div className='loading'>Loading ...</div>;
  if (isError) return <div className='error'>Error! {error.toString()}</div>;
  return (
    <>
      {isFetching && <div className='loading'>Loading ...</div>}
      <InfiniteScroll
        loadMore={fetchNextPage}
        hasMore={hasNextPage}
        loader={<div key={0}>Loading ...</div>}
      >
        {data?.pages.map((page, i) => (
          <ul key={i}>
            {page.results.map((person) => (
              <Person key={person.name} {...person} />
            ))}
          </ul>
        ))}
      </InfiniteScroll>
    </>
  );
}
