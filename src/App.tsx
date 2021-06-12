import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';
import IconsHome from './components/modules/IconsHome';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={IconsHome} />
      </Switch>
    </Router>
  );
}
