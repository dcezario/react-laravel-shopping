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
				client_secret: 'wHnapQ2iV1DFBncXhh2spyATilb0v3AZYnHD2PJu',
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