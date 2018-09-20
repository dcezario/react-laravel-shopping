import React, { Component, Fragment } from 'react';
import AppContext from '../ContextProvider';
import axios from 'axios';

class Root extends Component {
	constructor() {
		super()
		this.state = {
			endpoint: 'http://localhost:8081',
			isLogged: false,
			authToken: null,
		}
	}
	componentDidMount() {
		const authUrl = this.state.endpoint + '/oauth/token';
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
		}.bind(this))
		.catch(function(err) {
			console.log(err);
		})
	}
	render() {
		return (
			<div>
			{ this.state.authToken &&
				<AppContext.Provider value={this.state}>
					{this.props.children}
				</AppContext.Provider> 
			}
			</div>
		)
	}
}
export default Root