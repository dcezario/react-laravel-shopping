import React, { Component, Fragment } from 'react';
import AppContext from '../ContextProvider';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';

class Root extends Component {
	constructor() {
		super()
		this.state = {
			endpoint: 'http://localhost:8081',
			categories: [],
			isLogged: false,
			totalItems: 0,
			searchResult: [],
			addToCart: (product, qty, attribute) => {
				let cookie = new Cookies();
				let cartToken = '';
				let cartTotalItems = 0;
				if (cookie.get('cart')) {
					const cartCookie = cookie.get('cart');
					cartTotalItems = parseInt(cartCookie['totalItems']);
					cartToken = cartCookie['token'];
				}
				const endpoint = this.state.endpoint + '/api/cart/';
				let token = this.state.authToken;

				const params = new URLSearchParams();
				params.append('product_id', product.id);
				params.append('quantity', qty);
				params.append('token', cartToken);

				let self = this;
				axios.post(endpoint, params, { headers: { Authorization: 'Bearer ' + token } })
				.then((response) => {
					const cartCookieInfo = {
						totalItems: cartTotalItems + parseInt(qty),
						token: response.data.hash,
					}
					cookie.set('cart', JSON.stringify(cartCookieInfo));
					this.setState({totalItems: cartTotalItems + parseInt(qty)});
				})
				.catch((err) => {
					console.log("ERR: ", err);
				})
			},
			removeItems: (item) => {
				let cookie = new Cookies();
				if (!cookie.get('cart')) {
					return false;
				}
				const cartCookie = cookie.get('cart');
				let cartTotalItems = parseInt(cartCookie['totalItems']);
				let cartToken = cartCookie['token'];
				let qty = item.quantity;

				let self = this;
				const endpoint = this.state.endpoint + '/api/cart/item/remove';
				let token = this.state.authToken;

				const params = new URLSearchParams();
				params.append('item_id', item.id);
				params.append('token', cartToken);

				axios.post(endpoint, params, { headers: { Authorization: 'Bearer ' + token } })
				.then((response) => {
					let newItemsCount = (parseInt(cartTotalItems) - parseInt(qty)) > 0 ? (parseInt(cartTotalItems) - parseInt(qty)) : 0;
					const cartCookieInfo = {
						totalItems: newItemsCount,
						token: response.data.hash,
					}
					cookie.set('cart', JSON.stringify(cartCookieInfo));
					this.setState({totalItems: newItemsCount});
				})
				.catch((err) => {
					console.log("ERR: ", err);
				})
			},
			search: (param) => {
				console.log(param);
				if (parseInt(param.length) > 0) {
					const endpoint = this.state.endpoint + '/api/product/search/'+param
					console.log(endpoint);
					let token = this.state.authToken;
					let self = this;
					let products = [];
					axios.get(endpoint, { headers: { Authorization: 'Bearer ' + token } })
					.then(function(response) {
						response.data.map((product,idx) => {
							const item = {
								value: product.name,
								id: product.id
							}
							products.push(item);
						})
						this.setState({searchResult: products})
					}.bind(this))
					.catch(function(err){
						console.log(err)
					})
				}
			},
			redirect: (path) => {
				this.props.history.push(path);
			},
			authUser: () => {
				this.setState({isLogged: true});
			},
			authToken: null,
			isLoaded: false
		}
		this.getCategories = this.getCategories.bind(this);
		this.checkCustomerAuth = this.checkCustomerAuth.bind(this);
	}
	getCategories() {
		return new Promise(function(resolve, reject) {
			const endpoint = this.state.endpoint + '/api/category'
			let token = this.state.authToken;
			let self = this;
			axios.get(endpoint, { headers: { Authorization: 'Bearer ' + token } })
			.then(function(response) {
				self.setState({categories: response.data})
				resolve(response.data)
			})
			.catch(function(err){
				reject(err)
			})
		}.bind(this))		
	}
	checkCustomerAuth() {
		let cookie = new Cookies();
		if (cookie.get('customerAccessToken')) {
			const accessToken = cookie.get('customerAccessToken');
			const endpoint = this.state.endpoint + '/api/customer/check/' + accessToken;
			let token = this.state.authToken;
			let self = this;
			axios.get(endpoint, { headers: { Authorization: 'Bearer ' + token } })
			.then(function(response) {
				if(response.data.success) {
					this.setState({isLogged: true});
				}
			}.bind(this))
			.catch((err) => {
				console.log(err);
			})
			
		} 
	}
	componentWillMount() {
		let cookie = new Cookies();
		if (!cookie.get('cart')) {
			this.setState({totalItems: 0});
		}
	}
	componentDidMount() {
		const authUrl = this.state.endpoint + '/oauth/token';
		let self = this;
		axios.post(authUrl, {
				grant_type: 'password',
				client_id: 2,
				client_secret: 'hds1mCNQsnvLfegsY69Sze6ltNNebrcI4Bje0oUN',
				username: 'api@test.com',
				password: 'secret'
			},{
				mode: 'cors'
			}
		)
		.then(function(response) {
			this.setState({ authToken: response.data.access_token})
			this.checkCustomerAuth()
			this.getCategories()
			.then(function(response) {
				self.setState({isLoaded: true})
				let cookie = new Cookies();
				if (cookie.get('cart')) {
					const totalItems = cookie.get('cart')['totalItems'];
					self.setState({totalItems: totalItems});
				}
			})
		}.bind(this))
		.catch(function(err) {
			console.log(err);
		})
	}
	render() {
		return (
			<Fragment>
			{ this.state.isLoaded &&
				<AppContext.Provider value={this.state}>
					{this.props.children}
				</AppContext.Provider> 
			}
			</Fragment>
		)
	}
}
export default withRouter(Root)