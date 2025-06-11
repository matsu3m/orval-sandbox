import { GetInfiniteScroll } from './components/get-infinite-scroll-test';
import { PostInfiniteScroll } from './components/post-infinite-scroll-test';

function App() {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <GetInfiniteScroll />
      <PostInfiniteScroll />
    </div>
  );
}

export default App;
