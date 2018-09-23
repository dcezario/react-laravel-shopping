import React, { Component } from 'react';
import AppContext from '../ContextProvider';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import Table from 'react-bulma-components/lib/components/table';
import Cookies from 'universal-cookie';
import axios from 'axios';

class OrdersBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			isLoaded: false,
		}
	}
	render() {
		return (
			<Container>
			<Heading size={4}>Seus pedidos</Heading>
			{this.state.isLoaded && this.state.orders.length > 0 &&
				<Table>
					<thead>
						<tr>
							<th>Pedido</th>
							<th>Data</th>
							<th>Itens</th>
							<th>Valor</th>
						</tr>
					</thead>
					<tbody>
						{this.state.orders.map((order, idx) => {
							return(
								<tr key={idx}>
									<td># {order.id}</td>
									<td>{order.created_at}</td>
									<td>{order.item_count}</td>
									<td>R$ {order.order_value}</td>
								</tr>
							)
							order.items.map((item) => {
										return <td>item.unit_price</td>
									})
						})}
					</tbody>
				</Table>
			}
			{this.state.isLoaded && this.state.orders.length === 0 &&
				<p>Nenhum pedido para mostrar</p>
			}
			</Container>
		)
	}
	componentDidMount() {
		let cookie = new Cookies();
		if (cookie.get('customerAccessToken')) {
			const accessToken = cookie.get('customerAccessToken');
			const endpoint = this.props.context.endpoint + '/api/order/'+ accessToken;
	        let token = this.props.context.authToken;
	        axios.get(endpoint, { headers: { Authorization: 'Bearer ' + token } })
	        .then(function(response) {
	            this.setState({orders: response.data.data, isLoaded: true});
	        }.bind(this))
	        .catch(function(response) {
	            console.log(response);
	        })
        }
	}
}

class Orders extends Component {
	constructor(props) {
        super(props)
    }
    render() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    const {match: {params} } = this.props
                    return (
                        <OrdersBase context={context}  />
                    )
                }}
            </AppContext.Consumer>
        )
    }
}
export default Orders;