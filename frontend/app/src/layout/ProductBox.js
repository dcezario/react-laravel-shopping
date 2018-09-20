import React, {Fragment} from 'react'
import Card from 'react-bulma-components/lib/components/card';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import { Link } from 'react-router-dom'

const ProductBox = (product) => {
	const product_page = `/product/${product.product.id}`;
	return (
	<Fragment>
		<Card>
			<Card.Image size="4by3" src={product.product.picture} />
			<Card.Content>
				<Heading size={4}>{product.product.name}</Heading>
				<Heading subtitle size={6}>R$ {product.product.price}</Heading>
				<Link to={product_page}>Visualizar</Link>
			</Card.Content>
		</Card>
	</Fragment>
	)
}
export default ProductBox