import React, { Component } from 'react';
import Table from 'react-bulma-components/lib/components/table';

class ItemsResume extends Component {
	constructor(props){
		super(props);
	}
	render() {
		let totalPrice = 0;
		return (
	        <Table>
	            <thead>
	                <tr>
	                    <th>produto</th>
	                    <th>quantidade</th>
	                    <th>preço</th>
	                </tr>
	            </thead>
	            <tbody>
	            {
	                this.props.items.map((item, idx) => {
	                    totalPrice += parseFloat(item.products.price) * parseInt(item.quantity, 10)
	                    return (
	                        <tr key={idx}>
	                            <td>{item.products.name}</td>
	                            <td>{item.quantity}</td>
	                            <td><strong>R$ {item.products.price}</strong></td>
	                        </tr>
	                    )
	                })
	            }
            	<tr>
            		<td colSpan="3">Subtotal: R$ {totalPrice}</td>
            	</tr>
	            </tbody>
	        </Table>
		)
	}
}

export default ItemsResume