import React, { Component } from 'react';
import Navbar from 'react-bulma-components/lib/components/navbar';
import AppContext from '../ContextProvider';

class Header extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return(
			<AppContext.Consumer>
			{
				(context) => (
					<Navbar>
						<Navbar.Brand>
							<Navbar.Item renderAs="a" href="#">
					          LOGO {context.fdp}
					        </Navbar.Item>
					        <Navbar.Burger
					        />
						</Navbar.Brand>
						<Navbar.Menu>
					        <Navbar.Container>
					          <Navbar.Item href="#">Second</Navbar.Item>
					        </Navbar.Container>
					        <Navbar.Container position="end">
					          <Navbar.Item href="#">At the end</Navbar.Item>
					        </Navbar.Container>
				      	</Navbar.Menu>
					</Navbar>
				)
			}
			</AppContext.Consumer>
		);
	}
}

export default Header;