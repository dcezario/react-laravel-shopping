import React, { Component } from 'react'
import Columns from 'react-bulma-components/lib/components/columns';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import Cookies from 'universal-cookie';
import AppContext from '../ContextProvider';
import Box from 'react-bulma-components/lib/components/box';
import axios from 'axios';
import ItemResume from '../layout/ItemsResume';
import Button from 'react-bulma-components/lib/components/button';
import Notification from 'react-bulma-components/lib/components/notification';

import {
  Field,
  Control,
  Select,
} from 'react-bulma-components/lib/components/form';

class OrderBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: false,
            cart: false,
            address: '',
            isLoaded: false,
            subtotal: 0,
            error: false
        }
        this.getCustomer = this.getCustomer.bind(this);
        this.getCartItems = this.getCartItems.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
    }
    componentWillMount() {
        if (!this.props.context.isLogged) {
            this.props.context.redirect('/login');
        }
    }
    componentDidMount() {
        this.getCustomer()
        .then((response) => {
            this.getCartItems();    
        })
        
    }
    getCustomer() {
        return new Promise((resolve, reject) => {
            let cookie = new Cookies();
            const accessToken = cookie.get('customerAccessToken');
            const endpoint = this.props.context.endpoint + '/api/customer/' + accessToken;
            const token = this.props.context.authToken;
            let self = this;
            axios.get(endpoint, { headers: { Authorization: 'Bearer ' + token } })
            .then(function(response) {
                self.setState({customer: response.data})
                resolve(response);
            })
            .catch(function(response) {
                reject(response);
            }.bind(this))
        })
        
    }
    getCartItems() {
        let cookie = new Cookies();
        if (cookie.get('cart')) {
            let cartCookie = cookie.get('cart');
            let cartToken = cartCookie['token'];
            let cartTotalItems = cartCookie['totalItems'];
            if (parseInt(cartTotalItems) < 1) {
                this.setState({emptyCart: true, isLoaded: true});
            } else {
                const endpoint = this.props.context.endpoint + '/api/cart/items/' + cartToken;
                let token = this.props.context.authToken;
                axios.get(endpoint, { headers: { Authorization: 'Bearer ' + token } })
                .then(function(response) {
                    const data = response.data;
                    this.setState({cart: data, isLoaded: true});
                }.bind(this))
                .catch(function(response) {
                    console.log(response);
                })
            }
        } else {
            this.setState({isLoaded:true, emptyCart: true});
        }
    }
    updateAddress(event) {
        let address = event.target.value;
        this.setState({address: address});
    }
    placeOrder() {
        if (!this.state.address) {
            this.setState({error: true})
        } else {
            const endpoint = this.props.context.endpoint + '/api/order';
            const token = this.props.context.authToken;
            let cookie = new Cookies();
            const customerAccessToken = cookie.get('customerAccessToken')
            const cartToken = cookie.get('cart')['token'];

            const params = new URLSearchParams();
            params.append('cartToken', cartToken);
            params.append('customerAccessToken', customerAccessToken);
            params.append('addressId', this.state.address);

            axios.post(endpoint, params, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                if (response.data.success) {
                    cookie.remove('cart');
                    this.props.context.redirect('/orders');
                }
            })
            .catch((err) => {
                this.setState({loginError: true});
                console.log("ERR: ", err);
            })
        }
    }
    render() {
        return(
            <Container>
                <Heading size={4}>Fechar pedido</Heading>
                {this.state.isLoaded &&
                    <Columns>
                        <Columns.Column>
                            <Heading size={6}>Dados pessoais</Heading>
                            <Box>
                                <Heading size={6}>Nome: </Heading> 
                                <Heading subtitle size={6}>{this.state.customer.name}</Heading>
                                <Heading size={6}>Email: </Heading> 
                                <Heading subtitle size={6}>{this.state.customer.email}</Heading>
                                <Heading size={6}>Endereço de entrega: </Heading> 
                                <Field>
                                <Select onChange={this.updateAddress} value={this.state.address}>
                                    <option value="">Selecione abaixo</option>
                                    {
                                        this.state.customer.addresses.map((address, idx) => {
                                            return <option key={idx} value={address.id}>{address.address}</option>  
                                        }) 
                                    }
                                </Select>
                            </Field> 
                            { this.state.error &&
                                <Notification color="danger">
                                  Por favor, informe seu endereço de entrega.
                                </Notification>
                            }
                            </Box>
                        </Columns.Column>
                        <Columns.Column>
                            <Heading size={6}>Itens do pedido</Heading>
                            <ItemResume items={this.state.cart} />
                            <Button
                            fullwidth={false}
                            color='primary'
                            rounded={false}
                            onClick={this.placeOrder}
                          >
                            COMPRAR
                          </Button>
                        </Columns.Column>
                    </Columns>
                }
            </Container>
        );
    }
}
class Order extends Component {
	constructor(props) {
        super(props)
    }
    render() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    const {match: {params} } = this.props
                    return (
                        <OrderBase context={context}/>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}
export default Order