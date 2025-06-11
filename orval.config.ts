import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: './api-spec.yaml',
    output: {
      target: './src/__generated__/api.ts',
      client: 'react-query',
      httpClient: 'axios',
      mock: {
        type: 'msw',
      },
      override: {
        mutator: {
          path: './src/lib/axios/mutator.ts',
          name: 'customAxiosInstance',
        },
        operations: {
          listItemsGet: {
            query: {
              useInfinite: true,
              useInfiniteQueryParam: 'cursor',
            },
          },
          listItemsPost: {
            query: {
              useInfinite: true,
              useInfiniteQueryParam: 'cursor',
            },
          },
        },
      },
    },
  },
});
