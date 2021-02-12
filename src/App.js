import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import makeServer from "./server";

import TodoList from "./components/todoList";

makeServer();

const queryClient = new QueryClient();

const theme = extendTheme({
  styles: {
    global: () => ({
      "html, body": {
        backgroundColor: "#d2d6dc",
      },
    }),
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
