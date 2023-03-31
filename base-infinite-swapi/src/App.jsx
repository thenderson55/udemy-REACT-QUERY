import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { InfinitePeople } from './people/InfinitePeople';
// import { InfiniteSpecies } from './species/InfiniteSpecies';
import './App.css';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className='App'>
        <h1>Infinite SWAPI</h1>
        <InfinitePeople />
      </div>
    </QueryClientProvider>
  );
}

export default App;
