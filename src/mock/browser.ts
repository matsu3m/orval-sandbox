import { setupWorker } from 'msw/browser';
import {
  getGetPaginatedItemsMockHandler,
  getGetPaginatedItemsResponseMock,
} from '../__generated__/api';

export const worker = setupWorker(
  getGetPaginatedItemsMockHandler(({ request }) => {
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');
    const limit = Number(url.searchParams.get('limit')) || 10;

    const startId = cursor ? JSON.parse(atob(cursor)).id + 1 : 1;

    const items = Array.from({ length: limit }, (_, i) => ({
      id: startId + i,
      title: `Item ${startId + i}`,
    }));

    const lastId = items[items.length - 1].id;
    const nextCursor = btoa(JSON.stringify({ id: lastId }));

    return getGetPaginatedItemsResponseMock({
      items,
      hasMore: lastId < 100,
      nextCursor: lastId < 100 ? nextCursor : null,
    });
  })
);
