import { useQuery, useMutation } from '@tanstack/react-query';

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'DELETE' }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery

  const { data, isLoading, isError, error } = useQuery(
    ['comments', post.id],
    () => fetchComments(post.id)
  );

  const deletePostMutation = useMutation((postID) => deletePost(postID));

  const updatePostMutation = useMutation((postID) => updatePost(postID));

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error: {error.message}</h3>;
  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deletePostMutation.mutate(post.id)}>Delete</button>
      <button onClick={() => updatePostMutation.mutate(post.id)}>Update</button>

      {deletePostMutation.isLoading && <p>Deleting...</p>}
      {deletePostMutation.isError && (
        <p>Error: {deletePostMutation.error.message}</p>
      )}
      {deletePostMutation.isSuccess && <p>Deleted!</p>}

      {updatePostMutation.isLoading && <p>Updating...</p>}
      {updatePostMutation.isError && (
        <p>Error: {updatePostMutation.error.message}</p>
      )}
      {updatePostMutation.isSuccess && <p>Updated!</p>}

      <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
