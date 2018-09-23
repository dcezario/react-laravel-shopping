import React, { Component, Fragment} from 'react'
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import { withRouter } from 'react-router-dom';


class CartTotal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: this.props.items
		}
		this.redirect = this.redirect.bind(this);
	}
	redirect() {
		this.props.history.push('/order');
	}
	render() {
		let totalItems = 0;
		let totalPrice = 0;
		this.state.items.forEach((element) => {
			totalItems+= parseInt(element.quantity, 10);
		});
		this.state.items.forEach((element) => {
			totalPrice += parseFloat(element.products.price) * parseInt(element.quantity, 10);
		});
		return (
		<Fragment>
			<Columns>
				<Columns.Column size={4} offset={8}>
					<p><strong>Subtotal: R$ {totalPrice}</strong></p>
					<p><strong>Itens: {totalItems}</strong></p>
				</Columns.Column>
				<Columns.Column>
					<Button
				        fullwidth={true}
				        color='primary'
				        rounded={false}
	                    onClick={this.redirect}
				      >
				        CONFIRMAR PEDIDO
				      </Button>
				</Columns.Column>
			</Columns>
		</Fragment>
		)
	}
}
export default withRouter(CartTotal)