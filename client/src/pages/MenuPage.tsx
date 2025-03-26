import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { fetchMenuItems, filterByCategory, searchItems } from '../redux/slices/menuSlice';
import { addToCart } from '../redux/slices/cartSlice';
import '../styles/menupage.css';

const MenuPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredItems, categories, loading, activeCategory } = useAppSelector(
    (state: RootState) => state.menu
  );
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  const handleCategoryChange = (category: string) => {
    dispatch(filterByCategory(category));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(searchItems(value));
  };

  const handleAddToCart = (item: any) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <div className="container">
        <h1 className="section-title">Our Menu</h1>

        <div className="menu-filters">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search menu items..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="category-filters">
            <button
              className={`category-filter ${activeCategory === null ? 'active' : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`category-filter ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="no-results">
            <p>No items found matching your criteria. Try another search term or category.</p>
          </div>
        ) : (
          <div className="menu-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="menu-item card">
                <div className="menu-item-image">
                  <img src={item.image} alt={item.name} />
                  {!item.available && <div className="sold-out">Sold Out</div>}
                </div>
                <div className="menu-item-content">
                  <h3 className="menu-item-title">{item.name}</h3>
                  <p className="menu-item-description">{item.description}</p>
                  <div className="menu-item-footer">
                    <div className="menu-item-price">${item.price.toFixed(2)}</div>
                    <button 
                      className="btn btn-primary btn-add-to-cart"
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.available}
                    >
                      {item.available ? 'Add to Cart' : 'Sold Out'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage; 