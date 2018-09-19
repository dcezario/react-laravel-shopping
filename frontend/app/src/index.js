import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App';
import Root from './layout/Root';
import Header from './layout/Header';
import registerServiceWorker from './registerServiceWorker';

const routing = (
	<Router>
        <Root>
            <Header />
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </Root>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker();
