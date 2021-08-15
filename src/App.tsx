import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import IconsHome from './components/modules/IconsHome';
import { Layout } from './components/ui/layout/index';
import '@fontsource/dm-sans';

const queryClient = new QueryClient();

export default function App() {
  return (
    <Router>
      <Switch>
        <Layout>
          <QueryClientProvider client={queryClient}>
            <Route path="/" component={IconsHome} />
          </QueryClientProvider>
        </Layout>
      </Switch>
    </Router>
  );
}
