import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bulma-components/lib/components/navbar';
import AppContext from '../ContextProvider';
import axios from 'axios';

const Header = () => (
	<AppContext.Consumer>
		{
			(context) => (
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
								context.categories.map((cat, key) => {
									let url = "/product/category/" + cat.id
									return (
							          <Link to={url} key={key} className="navbar-item">{cat.name}</Link>
							        )
								})
					        }
					    </Navbar.Container>
				        <Navbar.Container position="end">
				        {
				        	!context.isLogged &&
				        	<Fragment>
				        		<Link to="/login" className="navbar-item">Login</Link>
				        	</Fragment>

				        }
				        {
				        	context.isLogged &&
				        	<Fragment>
				        		<Link to="/orders" className="navbar-item">Seus pedidos</Link>
				        	</Fragment>

				        }
				          <Link to="/cart" className="navbar-item">Carrinho ({context.totalItems})</Link>
				        </Navbar.Container>
			      	</Navbar.Menu>
				</Navbar>
			)
		}
	</AppContext.Consumer>
)
export default Header;