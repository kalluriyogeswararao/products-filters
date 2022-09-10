import {BsSearch} from 'react-icons/bs'
import './index.css'

const Category = props => {
  const {eachCat, selectCategoryItem, isActive} = props
  const {name, categoryId} = eachCat

  const activeBtn = isActive ? 'avtive-btn' : ''

  const onClickCategoryId = () => {
    selectCategoryItem(categoryId)
  }

  return (
    <li className="category-list-items">
      <button
        type="button"
        className={`category-btn ${activeBtn}`}
        onClick={onClickCategoryId}
      >
        <p>{name}</p>
      </button>
    </li>
  )
}

const Ratings = props => {
  const {rating, selectRatingItem, isActive} = props
  const {imageUrl, ratingId} = rating

  const onClickRating = () => {
    selectRatingItem(ratingId)
  }

  const activeRatingBtn = isActive ? 'avtive-btn' : ''

  return (
    <p className="category-list-items">
      <button type="button" className="rating-btn" onClick={onClickRating}>
        <img
          src={imageUrl}
          alt={`rating ${ratingId}`}
          className="rating-stars"
        />
        <span className={activeRatingBtn}>$up</span>
      </button>
    </p>
  )
}

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    selectCategoryItem,
    selectRatingItem,
    onSearchResults,
    clearFilters,
    categoryId,
    ratingId,
    searchResults,
  } = props

  const onChangeSearch = event => {
    onSearchResults(event.target.value)
  }

  const onClickClearFilters = () => {
    clearFilters()
  }

  return (
    <div className="filters-group-container">
      <div className="search-container">
        <input
          type="search"
          className="search"
          placeholder="Search"
          onChange={onChangeSearch}
          value={searchResults}
        />
        <BsSearch className="search-icon" />
      </div>
      <h1 className="category-heading">Category</h1>
      <ul className="all-categories">
        {categoryOptions.map(each => (
          <Category
            eachCat={each}
            key={each.categoryId}
            selectCategoryItem={selectCategoryItem}
            isActive={each.categoryId === categoryId}
          />
        ))}
      </ul>

      <div>
        <h1 className="rating-heading">Rating</h1>
        <div className="all-categories">
          {ratingsList.map(item => (
            <Ratings
              rating={item}
              key={item.ratingId}
              selectRatingItem={selectRatingItem}
              isActive={item.ratingId === ratingId}
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        className="clear-filter-btn"
        onClick={onClickClearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}
export default FiltersGroup
