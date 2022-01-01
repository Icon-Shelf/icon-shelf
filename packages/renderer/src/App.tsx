import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { QueryParamProvider } from "use-query-params";
import { DefaultIconsRedirect } from "./components/modules/IconsHome/DefaultIconsRedirect";
import IconsHome from "./components/modules/IconsHome";
import { Layout } from "./components/ui/layout";
import { RouteAdapter } from "./RouteAdapter";
import { setupGlobalListeners } from "./data/globalListeners";

import "rc-tooltip/assets/bootstrap.css";
import "@fontsource/dm-sans";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

setupGlobalListeners();

export default function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={RouteAdapter}>
        <Layout>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<DefaultIconsRedirect />} />
              <Route
                path="/collections/:collectionId"
                element={<IconsHome />}
              />
            </Routes>
          </QueryClientProvider>
        </Layout>
      </QueryParamProvider>
    </Router>
  );
}
