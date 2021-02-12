import { QueryClientProvider, QueryClient } from "react-query";

const defaultConfig = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 0,
      cacheTime: 0,
    },
  },
});

/* eslint-disable-next-line react/prop-types */
export const reactQueryWrapper = ({ children }) => (
  <QueryClientProvider client={defaultConfig}>{children}</QueryClientProvider>
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  reactQueryWrapper,
};
