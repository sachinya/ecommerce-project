import React from 'react';

const Products = ({ products, onAddToCart, addedToCart, onGoToCart }) => (
  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
    {products.map(product => (
      <div key={product.id} style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        width: '200px'
      }}>
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: '100%', height: '120px', objectFit: 'cover', marginBottom: '8px' }}
          />
        )}
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p><strong>${product.price}</strong></p>
        {addedToCart[product.id] ? (
          <button onClick={() => onGoToCart()}>Go to Cart</button>
        ) : (
          <button onClick={() => onAddToCart(product.id)}>
            Add to Cart
          </button>
        )}
      </div>
    ))}
  </div>
);

export default Products;