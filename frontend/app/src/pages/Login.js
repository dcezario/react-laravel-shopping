import React, { Component } from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import Columns from 'react-bulma-components/lib/components/columns';
import Notification from 'react-bulma-components/lib/components/notification';
import AppContext from '../ContextProvider';
import Cookies from 'universal-cookie';
import axios from 'axios';
import {
  Field,
  Control,
  Label,
  Help,
} from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';

class LoginBase extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			loginError: false
		}
		this.setEmail = this.setEmail.bind(this);
		this.setPassword = this.setPassword.bind(this);
		this.authenticate = this.authenticate.bind(this);
	}
	setEmail(event) {
		let email = event.target.value;
		this.setState({email: email});
	}
	setPassword(event) {
		let password = event.target.value;
		this.setState({password: password});
	}
	authenticate() {
		const endpoint = this.props.context.endpoint + '/api/customer/login';
		const token = this.props.context.authToken;
		const params = new URLSearchParams();
		params.append('email', this.state.email);
		params.append('password', this.state.password);

		axios.post(endpoint, params, { headers: { Authorization: 'Bearer ' + token } })
		.then((response) => {
			if (response.data.success) {
				let cookie = new Cookies();
				if (cookie.get('customerAccessToken')) {
					cookie.remove('customerAccessToken');
				}
				cookie.set('customerAccessToken', response.data.success);
				this.props.context.redirect('/orders');
			}
		})
		.catch((err) => {
			this.setState({loginError: true});
			console.log("ERR: ", err);
		})
	}
	render () {
		return (
			<Container>
				<Columns>
					<Columns.Column size="half" offset="one-quarter">
						<Heading size={4}>Bem vindo! Entrar no sistema</Heading>
						<Field>
							<Label>E-mail</Label>
							<Control>
								<input type="text" value={this.state.email} onChange={this.setEmail} className='input'/>
							</Control>
						</Field>
						<Field>
							<Label>Senha</Label>
							<Control>
								<input type="password" value={this.state.password} onChange={this.setPassword} className='input'/>
							</Control>
						</Field>
						<Button color='primary' onClick={this.authenticate}>
							Fazer login
						</Button>
					</Columns.Column>
				</Columns>
				<Columns>
					<Columns.Column>
						{this.state.loginError &&
								<Notification color="danger">
							      Credenciais inválidas
							    </Notification>
							}
					</Columns.Column>
				</Columns>
			</Container>
		)
	}
}
class Login extends Component {
	constructor(props) {
        super(props)
    }
    render() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    const {match: {params} } = this.props
                    return (
                        <LoginBase context={context}/>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}
export default Login;