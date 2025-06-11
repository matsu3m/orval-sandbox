import { setupWorker } from 'msw/browser';
import {
  type ListItemsPostBody,
  getListItemsGetMockHandler,
  getListItemsGetResponseMock,
  getListItemsPostMockHandler,
  getListItemsPostResponseMock,
} from '../__generated__/api';

export const worker = setupWorker(
  getListItemsGetMockHandler(({ request }) => {
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

    return getListItemsGetResponseMock({
      items,
      hasMore: lastId < 100,
      nextCursor: lastId < 100 ? nextCursor : null,
    });
  }),

  getListItemsPostMockHandler(async ({ request }) => {
    const body = (await request.json()) as ListItemsPostBody;
    const { cursor, limit = 10 } = body;

    const startId = cursor ? JSON.parse(atob(cursor)).id + 1 : 1;

    const items = Array.from({ length: limit }, (_, i) => ({
      id: startId + i,
      title: `Item ${startId + i}`,
    }));

    const lastId = items[items.length - 1].id;
    const nextCursor = btoa(JSON.stringify({ id: lastId }));

    return getListItemsPostResponseMock({
      items,
      hasMore: lastId < 100,
      nextCursor: lastId < 100 ? nextCursor : null,
    });
  })
);
