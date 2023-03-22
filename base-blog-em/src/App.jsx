import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import {
//   QueryClient,
//   QueryClientProvider,
// } from 'react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Posts } from './Posts';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className='App'>
        <h1>Blog Posts</h1>
        <Posts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
