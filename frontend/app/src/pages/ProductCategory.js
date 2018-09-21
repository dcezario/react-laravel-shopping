import React, { Component } from 'react';
import Columns from 'react-bulma-components/lib/components/columns';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import AppContext from '../ContextProvider';
import ProductBox from '../layout/ProductBox';
import Pagination from 'react-bulma-components/lib/components/pagination';
import axios from 'axios';

class ProductCategoryBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            currentPage: 1,
            nextPage: null,
            categoryId: null,
            currentCategory: null
        }
        this.getDados = this.getDados.bind(this);
        this.getCurrentCategory = this.getCurrentCategory.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }
    getDados(categoryId, page = 1) {
        const endpoint = this.props.context.endpoint + '/api/product/category/' + categoryId +  '?page=' + page
        let token = this.props.context.authToken;
        axios.get(endpoint, { headers: { Authorization: 'Bearer ' + token } })
        .then(function(response) {
            this.setState({products: response.data.data, totalPages: response.data.last_page});
        }.bind(this))
        .catch(function(response) {
            console.log(response);
        })
    }
    nextPage(event) {
        let pageAttribute = event.target.getAttribute('aria-label');
        let page = pageAttribute.replace(/[^0-9]/g, '')
        this.setState({currentPage: parseInt(page)})
        this.getDados(this.state.categoryId, page)
    }
    getCurrentCategory(categoryId) {
        const id = parseInt(categoryId);
        const currentCategory =  this.props.context.categories.filter(category => category.id === id);
        this.setState({currentCategory: currentCategory[0].name})
    }
    componentDidMount() {
        this.setState({categoryId: this.props.categoryId})
        this.getCurrentCategory(this.props.categoryId);
        this.getDados(this.props.categoryId);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({currentPage: 1, categoryId: nextProps.categoryId})
        this.getCurrentCategory(nextProps.categoryId);
        this.getDados(nextProps.categoryId);
    }

    render() {
        return (
            <Container>
                <Heading size={2}>{this.state.currentCategory}</Heading>
                <Columns>
                {
                    this.state.products.map((product, idx) => {
                        return (
                            <Columns.Column size={3} key={idx}>
                                <ProductBox product={product} key={idx} />
                            </Columns.Column>
                        )
                    })
                }
                </Columns>
                { this.state.categoryId &&
                    <div>
                        <Pagination showPrevNext={false} current={this.state.currentPage} total={this.state.totalPages} delta={3} onClick={this.nextPage}/>
                    </div>
                }
            </Container>
        )
    }
}

class ProductCategory extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    const {match: {params} } = this.props
                    return (
                        <ProductCategoryBase context={context} categoryId={params.id} />
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export default ProductCategory;