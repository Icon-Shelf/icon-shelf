import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DefaultIconsRedirect } from 'components/modules/IconsHome/DefaultIconsRedirect';
import { QueryParamProvider } from 'use-query-params';
import IconsHome from './components/modules/IconsHome';
import { Layout } from './components/ui/layout/index';

import './App.global.css';
import '@fontsource/dm-sans';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch>
          <Layout>
            <QueryClientProvider client={queryClient}>
              <Route path="/" component={DefaultIconsRedirect} exact />
              <Route
                path="/collections/:collectionId"
                component={IconsHome}
                exact
              />
            </QueryClientProvider>
          </Layout>
        </Switch>
      </QueryParamProvider>
    </Router>
  );
}
