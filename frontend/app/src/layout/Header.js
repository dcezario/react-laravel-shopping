import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bulma-components/lib/components/navbar';
import AppContext from '../ContextProvider';
import {
  Input,
  Label,
  Field,
  Control
} from 'react-bulma-components/lib/components/form';
import Downshift from 'downshift'


import axios from 'axios';

const Header = () => {
	const items = [
	  {value: 'apple'},
	  {value: 'pear'},
	  {value: 'orange'},
	  {value: 'grape'},
	  {value: 'banana'},
	]
	return (
	<AppContext.Consumer>
		{
			(context) => (
				<Navbar>
					<Navbar.Brand>
						<Link to="/" className="navbar-item">
				          LOGO
				        </Link>
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
					    <Navbar.Container style={{marginTop:'15px'}}>
					    	 <Downshift
							    onChange={selection => context.redirect(`/product/${selection.id}`)}
							    itemToString={item => (item ? item.value : '')}
							    onInputValueChange={context.search}
							  >
							    {({
							      getInputProps,
							      getItemProps,
							      getLabelProps,
							      getMenuProps,
							      isOpen,
							      inputValue,
							      highlightedIndex,
							      selectedItem,
							    }) => (
							      <div>
							        <Input {...getInputProps()} placeholder="O que você precisa?" />
							        <ul {...getMenuProps()}>
							          {isOpen
							            ? context.searchResult
							                .filter(item => !inputValue || item.value.includes(inputValue))
							                .map((item, index) => (
							                  <li
							                    {...getItemProps({
							                      key: item.id,
							                      index,
							                      item,
							                      style: {
							                        backgroundColor:
							                          highlightedIndex === index ? 'lightgray' : 'white',
							                        fontWeight: selectedItem === item ? 'bold' : 'normal',
							                      },
							                    })}
							                  >
							                    {item.value}
							                  </li>
							                ))
							            : null}
							        </ul>
							      </div>
							    )}
							  </Downshift>
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
}
export default Header;