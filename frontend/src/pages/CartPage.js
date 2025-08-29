import React, { useEffect, useState } from 'react';

const CartPage = ({ cart, onRemoveFromCart, products }) => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const details = cart
      .map(id => products.find(p => p.id === id))
      .filter(Boolean);
    setCartProducts(details);
  }, [cart, products]);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartProducts.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {cartProducts.map(product => (
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
              <button onClick={() => onRemoveFromCart(product.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => alert('Payment flow coming soon!')}>Pay</button>
    </div>
  );
};

export default CartPage;