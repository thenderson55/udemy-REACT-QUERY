import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Posts } from './Posts';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    // provide React Query client to App
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        {/* The rest of your application */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <h1>Blog Posts</h1>
      <Posts />
    </div>
  );
}

export default App;
