import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import IconsHome from './components/modules/IconsHome';
import { Layout } from './components/ui/layout/index';
import '@fontsource/dm-sans';

export default function App() {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route path="/" component={IconsHome} />
        </Layout>
      </Switch>
    </Router>
  );
}
