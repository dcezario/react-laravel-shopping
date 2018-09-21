import React, { Component, Fragment } from 'react'
import Columns from 'react-bulma-components/lib/components/columns';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import Image from 'react-bulma-components/lib/components/image';
import Button from 'react-bulma-components/lib/components/button';
import {
  Field,
  Control,
  Label,
  Input,
  Select,
  Help,
} from 'react-bulma-components/lib/components/form';

import AppContext from '../ContextProvider';
import axios from 'axios';

class ProductInfoBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product: null,
            qtyProduct: 1,
            attribute: null,
			isLoaded: false
		}
		this.getDados = this.getDados.bind(this);
        this.updateQty = this.updateQty.bind(this);
        this.updateAttribute = this.updateAttribute.bind(this);
	}
	getDados(productId) {
        const endpoint = this.props.context.endpoint + '/api/product/' + productId
        let token = this.props.context.authToken;
        axios.get(endpoint, { headers: { Authorization: 'Bearer ' + token } })
        .then(function(response) {
            this.setState({product: response.data.data, isLoaded: true});
        }.bind(this))
        .catch(function(response) {
            console.log(response);
        })
    }
    updateQty(event) {
        let qty = event.target.value.replace(/[^0-9]/g, '');
        this.setState({qtyProduct: qty})
    }
    updateAttribute(event) {
        this.setState({attribute: event.target.value})
    }
    componentWillMount() {
        console.log(this.props)
    	const productId = this.props.productId;
    	this.getDados(productId);
    }
	render() {
        let self = this
		return(
			<Fragment>
			{ this.state.isLoaded &&
				<Container>
					<Columns>
						<Columns.Column>
							<Image src={this.state.product.picture} size="3by2"/>
						</Columns.Column>
						<Columns.Column>
							<Heading size={3}>{this.state.product.name}</Heading>
							<Heading subtitle size={4}>R$ {this.state.product.price}</Heading>
							<Field>
						        <Label>Quantidade</Label>
						        <Control>
						          <input type="text" style={{width:'60px'}} value={this.state.qtyProduct} className="input" onChange={this.updateQty} />
						        </Control>
						     </Field>
						     <Field>
						        <Label>Cores</Label>
						        <Control>
						          <Select onChange={this.updateAttribute}>
								     {
								     	this.state.product.attributes.cor.map(function(attribute, idx) {
								     		return <option value={attribute.attribute_value_id} key={idx}>{attribute.value}</option>
								     	})
								     }
						     	   </Select>
						     	</Control>
						     </Field>
							<Button
					        fullwidth={true}
					        color='primary'
					        rounded={true}
                            onClick={() => this.props.addToCart(self.state.product, self.state.qtyProduct, self.attribute)}
					      >
					        Adicionar ao carrinho
					      </Button>
						</Columns.Column>
					</Columns>
					<Columns>
						<Columns.Column>
							{this.state.product.description}
						</Columns.Column>
					</Columns>
				</Container>
			}
			</Fragment>
		)
	}
}
class ProductInfo extends Component {
	constructor(props) {
        super(props)
    }
    render() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    const {match: {params} } = this.props
                    return (
                        <ProductInfoBase context={context} productId={params.id} addToCart={context.addToCart}/>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}
export default ProductInfo;