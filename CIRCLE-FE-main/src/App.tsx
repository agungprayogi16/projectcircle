import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer, toast } from "react-toastify";
import Router from "./router";
import store from "./redux/store";
import getError from "./utils/getError";

const queryCLient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(getError(error), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  }),
});

export default function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <QueryClientProvider client={queryCLient}>
          <ChakraProvider>
            <Router />
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
      </Provider>
      <ToastContainer />
    </Fragment>
  );
}
