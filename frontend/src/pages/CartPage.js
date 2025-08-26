import React, { useEffect, useState } from 'react';
import Cart from '../components/Cart';
import { fetchCartItems } from '../api';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const items = await fetchCartItems();
        setCartItems(items);
      } catch (err) {
        setError('Failed to load cart items');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCartItems();
  }, []);

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      <Cart items={cartItems} />
    </div>
  );
}

export default CartPage;