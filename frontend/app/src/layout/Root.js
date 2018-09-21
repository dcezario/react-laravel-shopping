import React, { Component, Fragment } from 'react';
import AppContext from '../ContextProvider';
import axios from 'axios';

class Root extends Component {
	constructor() {
		super()
		this.state = {
			endpoint: 'http://localhost:8081',
			categories: [],
			isLogged: false,
			totalItems: 0,
			addToCart: (product, qty, attribute) => {
				const storedToken = localStorage.getItem('cartToken');
				let totalItems = parseInt(this.state.totalItems);

				const data = {
					product_id: product.id,
					quantity: qty,
					token: storedToken
				}
				/*let data = new FormData()
				data.set('product_id', product.id)
				data.set('quantity', qty)
				data.set('token', storedToken)*/

				const endpoint = this.state.endpoint + '/api/cart';
				let token = this.state.authToken;
				let self = this;
				axios.post(endpoint, { headers: { Authorization: 'Bearer ' + token } })
				.then(function(response) {
					self.setState({categories: response.data})
					return(response.data)
				})
				/*axios({
					method: 'post',
					url: endpoint,
					data: data,
					config: {
						headers: {
							'Authorization': 'Bearer ' + token,
							//'Content-Type': 'application/x-www-form-urlencoded'
						}
					}
				})*/
				.then(function(response) {
					localStorage.setItem('cartToken', response.hash);
					self.setState({ totalItems: totalItems + qty })
				})
				.catch(function(err) {
					console.log(err.response);
				})				
			},
			authToken: null,
			isLoaded: false
		}
		this.getCategories = this.getCategories.bind(this);
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
	componentDidMount() {
		const authUrl = this.state.endpoint + '/oauth/token';
		let self = this;
		axios.post(authUrl, {
				grant_type: 'password',
				client_id: 2,
				client_secret: 'l70tWBdZ6FUsq3Zm784thOF4TALpt5Q2iEluCugK',
				username: 'api@test.com',
				password: 'secret'
			},{
				mode: 'cors'
			}
		)
		.then(function(response) {
			this.setState({ authToken: response.data.access_token})
			this.getCategories()
			.then(function(response) {
				self.setState({isLoaded: true})
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
export default Root