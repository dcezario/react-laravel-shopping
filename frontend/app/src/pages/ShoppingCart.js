import React, { Component, Fragment } from 'react';
import Table from 'react-bulma-components/lib/components/table';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import AppContext from '../ContextProvider';
import axios from 'axios';
import Cookies from 'universal-cookie';
import CartItem from '../layout/CartItem';
import CartTotal from '../layout/CartTotal';

class ShoppingCartBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyCart: true,
            isLoaded: false,
            cartUpdate: false,
            cartItems: []
        }
        this.getCartItems = this.getCartItems.bind(this);
        this.updateCart = this.updateCart.bind(this);
    }
    getCartItems() {
        const cookie = new Cookies();
        if (cookie.get('cart')) {
            let cartCookie = cookie.get('cart');
            let cartToken = cartCookie['token'];
            let cartTotalItems = cartCookie['totalItems'];
            if (parseInt(cartTotalItems) > 1) {
                //this.setState({emptyCart: true, isLoaded: true});
            } else {
                const endpoint = this.props.context.endpoint + '/api/cart/items/' + cartToken;
                let token = this.props.context.authToken;
                axios.get(endpoint, { headers: { Authorization: 'Bearer ' + token } })
                .then(function(response) {
                    const data = response.data;
                    if (typeof(data.message) !== 'undefined') {
                        this.setState({emptyCart: true});
                    } else {
                        this.setState({cartItems: data})
                        this.setState({emptyCart: false});
                    }
                    this.setState({isLoaded: true});
                }.bind(this))
                .catch(function(response) {
                    console.log(response);
                })
            }
        } else {
            this.setState({isLoaded:true, emptyCart: true});
        }
    }
    componentDidMount() {
        this.getCartItems();

    }
    componentDidUpdate() {
        if (this.state.cartUpdate) {
            this.getCartItems();
        }
    }
    updateCart() {
        console.log('update');
        this.setState({cartUpdate: true})
    }
	render() {
		return (

			<Fragment>
			 {
                this.state.isLoaded &&
                this.state.cartItems.length < 1 &&
                <Container>
                    <Heading size={2}>Carrinho</Heading>
                    Que pena! Seu carrinho está vazio... =(
                </Container>
             }
             {
                this.state.isLoaded &&
                this.state.cartItems.length > 0 &&
                <Container>
                    <Heading size={2}>Carrinho</Heading>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Quantidade</th>
                                    <th>Preço</th>
                                    <th>-</th>
                                </tr>
                            </thead>
                            {this.state.cartItems.map((item, idx) =>{
                                return (
                                    <CartItem item={item} key={idx} removeItems={this.props.context.removeItems} updateCart={this.updateCart}/>
                                )
                            })}
                        </Table>
                        <CartTotal context={this.props.context} items={this.state.cartItems}/>
                </Container>
             }   
			</Fragment>
		)
	}
}
class ShoppingCart extends Component {
	constructor(props) {
        super(props)
    }
    render() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    const {match: {params} } = this.props
                    return (
                        <ShoppingCartBase context={context} />
                    )
                }}
            </AppContext.Consumer>
        )
    }
}
export default ShoppingCart