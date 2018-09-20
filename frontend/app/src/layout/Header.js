import React, { Component } from 'react';
import Navbar from 'react-bulma-components/lib/components/navbar';
import AppContext from '../ContextProvider';
import axios from 'axios';

class HeaderBase extends Component {
	constructor(props) {
		super(props)
		this.state = {
			categories: []
		}
	}
	componentDidMount() {
		const endpoint = this.props.context.endpoint + '/api/category'
		let token = this.props.context.authToken;
		axios.get(endpoint, { headers: { Authorization: 'Bearer ' + token } })
		.then(function(response) {
			this.setState({categories: response.data})
		}.bind(this)).catch(function(err){
			console.log(err)
		})
	}
	render() {
		return(
		<div>
		{
			this.state.categories &&
				<Navbar>
					<Navbar.Brand>
						<Navbar.Item renderAs="a" href="/">
				          LOGO
				        </Navbar.Item>
				        <Navbar.Burger
				        />
					</Navbar.Brand>
					<Navbar.Menu>
						<Navbar.Container>
							{
								this.state.categories.map((cat, key) => {
									let url = "product/category/" + cat.id
									return (
							          <Navbar.Item href={url} key={key}>{cat.name}</Navbar.Item>
							        )
								})
					        }
					    </Navbar.Container>
				        <Navbar.Container position="end">
				          <Navbar.Item href="#">At the end</Navbar.Item>
				        </Navbar.Container>
			      	</Navbar.Menu>
				</Navbar>
		}
		</div>
		);
	}
}
const Header = () => (
	<AppContext.Consumer>
			{
				(context) => (
					<HeaderBase context={context} />
				)
			}
	</AppContext.Consumer>
)
export default Header;