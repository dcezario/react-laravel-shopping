import React, { Component, Fragment } from 'react'
import Columns from 'react-bulma-components/lib/components/columns';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import Image from 'react-bulma-components/lib/components/image';
import Button from 'react-bulma-components/lib/components/button';
import AppContext from '../ContextProvider';
import axios from 'axios';

class ProductInfoBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product: null,
			isLoaded: false
		}
		this.getDados = this.getDados.bind(this);
	}
	getDados(productId) {
        const endpoint = this.props.context.endpoint + '/api/product/' + productId
        let token = this.props.context.authToken;
        axios.get(endpoint, { headers: { Authorization: 'Bearer ' + token } })
        .then(function(response) {
        	console.log(response)
            this.setState({product: response.data.data, isLoaded: true});
        }.bind(this))
        .catch(function(response) {
            console.log(response);
        })
    }
    componentWillMount() {
    	const productId = this.props.productId;
    	this.getDados(productId);
    }
	render() {
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
							<Button
					        fullwidth={true}
					        color='primary'
					        rounded={true}
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
                        <ProductInfoBase context={context} productId={params.id} />
                    )
                }}
            </AppContext.Consumer>
        )
    }
}
export default ProductInfo;