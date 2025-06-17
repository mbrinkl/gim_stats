import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { routeTree } from "./routeTree.gen";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const queryClient = new QueryClient();

const router = createRouter({ routeTree, context: { queryClient } });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider forceColorScheme="dark">
      <QueryClientProvider client={queryClient}>
        <Notifications />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>,
);
