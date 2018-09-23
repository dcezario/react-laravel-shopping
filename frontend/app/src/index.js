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
import ShoppingCart from './pages/ShoppingCart'
import Order from './pages/Order'
import Login from './pages/Login'
import Orders from './pages/Orders'
import registerServiceWorker from './registerServiceWorker';

const routing = (
	<Router>
        <Root>
            <Header />
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/product/category/:id" component={ProductCategory} />
                <Route path="/product/:id" component={ProductInfo} />
                <Route path="/cart" component={ShoppingCart} />
                <Route path="/order" component={Order} />
                <Route path="/orders" component={Orders} />
                <Route path="/login" component={Login} />
            </Switch>
        </Root>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker();
