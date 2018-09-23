import React, { Component, Fragment} from 'react'
import Button from 'react-bulma-components/lib/components/button';

class CartItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			item: this.props.item
		}
		this.removeItem = this.removeItem.bind(this);
	}
	removeItem(item) {
		this.props.removeItems(item);
		this.props.updateCart();
	}
	render() {
		return (
		<Fragment>
			<tbody>
				<tr>
					<td>{this.state.item.products.name}</td>
					<td>{this.state.item.quantity}</td>
					<td>R$ {this.state.item.products.price}</td>
					<td>
					<Button
				        fullwidth={false}
				        color='warning'
				        rounded={false}
	                    onClick={() => this.removeItem(this.state.item)}
				      >
				        Remover do carrinho
				      </Button>
					</td>
				</tr>
			</tbody>
		</Fragment>
		)
	}
}
export default CartItem