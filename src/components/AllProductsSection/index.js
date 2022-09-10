import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const checkResults = [
  ('initial': 'INITIAL'),
  'inprogress:"IN_PROGRESS',
  ('success': 'SUCCESS'),
  ('failure': 'FAILURE'),
]

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    categoryId: '',
    ratingId: '',
    searchResults: '',
    searchStatus: checkResults[0],
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({searchStatus: checkResults[1]})
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, categoryId, ratingId, searchResults} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categoryId}&title_search=${searchResults}&rating=${ratingId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        searchStatus: checkResults[2],
      })
    } else {
      this.setState({searchStatus: checkResults[3]})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  emptyProducts = () => (
    <div className="no-products-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        alt="no products"
      />
      <h1>No Products Found</h1>
      <p>We could not find any products. Try other filters.</p>
    </div>
  )

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View

    if (productsList.length > 0) {
      return (
        <div className="all-products-container">
          <ProductsHeader
            activeOptionId={activeOptionId}
            sortbyOptions={sortbyOptions}
            changeSortby={this.changeSortby}
          />
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      )
    }
    return this.emptyProducts()
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  selectCategoryItem = categoryId => {
    this.setState({categoryId}, this.getProducts)
  }

  selectRatingItem = ratingId => {
    this.setState({ratingId}, this.getProducts)
  }

  onSearchResults = result => {
    this.setState({searchResults: result}, this.getProducts)
  }

  clearFilters = () => {
    this.setState(
      {
        categoryId: '',
        ratingId: '',
        searchResults: '',
        activeOptionId: sortbyOptions[0].optionId,
      },
      this.getProducts,
    )
  }

  failureResults = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
      />
      <h1 className="failure-heading">Oops! Something went wrong</h1>
      <p>
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  getAllResults = () => {
    const {searchStatus} = this.state

    switch (searchStatus) {
      case checkResults[1]:
        return this.renderLoader()
      case checkResults[2]:
        return this.renderProductsList()
      case checkResults[3]:
        return this.failureResults()

      default:
        return null
    }
  }

  render() {
    const {categoryId, ratingId, searchResults} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          selectCategoryItem={this.selectCategoryItem}
          selectRatingItem={this.selectRatingItem}
          onSearchResults={this.onSearchResults}
          clearFilters={this.clearFilters}
          categoryId={categoryId}
          ratingId={ratingId}
          searchResults={searchResults}
        />

        {this.getAllResults()}
      </div>
    )
  }
}

export default AllProductsSection
