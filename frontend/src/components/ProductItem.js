import React from 'react';

const ProductItem = ({ product, onAddToCart }) => {
  const { id, name, price, description, imageUrl } = product;

  return (
    <div className="product-item" key={id} style={styles.productItem}>
      <img src={imageUrl} alt={name} style={styles.image} />
      <h2 style={styles.title}>{name}</h2>
      <p style={styles.description}>{description}</p>
      <p style={styles.price}>${price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(product)} style={styles.button}>
        Add to Cart
      </button>
    </div>
  );
};

const styles = {
  productItem: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '15px',
    margin: '10px',
    textAlign: 'center',
    width: '200px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  title: {
    fontSize: '18px',
    margin: '10px 0',
  },
  description: {
    fontSize: '14px',
    color: '#555',
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ProductItem;