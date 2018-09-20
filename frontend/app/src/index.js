import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Columns } from 'react-bulma-components/full';
import App from './App';
import Root from './layout/Root';
import Header from './layout/Header';
import ProductCategory from './pages/ProductCategory'
import ProductInfo from './pages/ProductInfo'
import registerServiceWorker from './registerServiceWorker';

const routing = (
	<Router>
        <Root>
            <Header />
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/product/category/:id" component={ProductCategory} />
                <Route path="/product/:id" component={ProductInfo} />
            </Switch>
        </Root>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker();
