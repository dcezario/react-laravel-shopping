import React, { Component, Fragment } from 'react';
import AppContext from '../ContextProvider';
import axios from 'axios';

class Root extends Component {
	constructor() {
		super()
		this.state = {
			endpoint: 'http://localhost:8081',
			isLogged: false,
			authToken: false,
		}
	}
	componentWillMount() {
		const authUrl = this.state.endpoint + '/oauth/token';
		axios.post(authUrl, {
				grant_type: 'password',
				client_id: 2,
				client_secret: 'l70tWBdZ6FUsq3Zm784thOF4TALpt5Q2iEluCugK',
				username: 'api@test.com',
				password: 'secret'
			},{
				mode: 'cors'
			}
		).then(function(response) {
			this.setState({authToken: response.data.access_token})
		}).catch(function(err) {
			console.log(err);
		})
	}
	render() {
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		)
	}
}
export default Root