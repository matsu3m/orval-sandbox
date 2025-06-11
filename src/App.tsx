import { GetInfiniteScroll } from './components/get-infinite-scroll';
import { PostInfiniteScroll } from './components/post-infinite-scroll';

function App() {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <GetInfiniteScroll />
      <PostInfiniteScroll />
    </div>
  );
}

export default App;
