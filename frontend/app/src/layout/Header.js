import React, { Component } from 'react';
import Navbar from 'react-bulma-components/lib/components/navbar';

class Header extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return(
			<Navbar>
				<Navbar.Brand>
					<Navbar.Item renderAs="a" href="#">
			          LOGO
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
		);
	}
}

export default Header;