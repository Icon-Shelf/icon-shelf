import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DefaultIconsRedirect } from 'components/modules/IconsHome/DefaultIconsRedirect';
import { QueryParamProvider } from 'use-query-params';
import { UpdateChecker } from 'components/modules/UpdateChecker';
import IconsHome from './components/modules/IconsHome';
import { Layout } from './components/ui/layout/index';

import './App.global.css';
import 'rc-tooltip/assets/bootstrap.css';
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
              <UpdateChecker>
                <Route path="/" component={DefaultIconsRedirect} exact />
                <Route path="/collections/:collectionId" component={IconsHome} exact />
              </UpdateChecker>
            </QueryClientProvider>
          </Layout>
        </Switch>
      </QueryParamProvider>
    </Router>
  );
}
