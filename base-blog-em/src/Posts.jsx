import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { useQuery } from 'react-query';
import { PostDetail } from './PostDetail';
const maxPostPage = 10;

async function fetchPosts(page) {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10&_page=' + page
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // const query = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });

  const { data, isLoading, isError, error } = useQuery(
    ['posts', currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 1000,
    }
  );
  if (isLoading) return <h3> Loading... </h3>;
  if (isError) return <h3> Error: {error.message} </h3>;

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className='post-title'
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className='pages'>
        <button
          disabled={currentPage === 0}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled={currentPage === maxPostPage - 1}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
