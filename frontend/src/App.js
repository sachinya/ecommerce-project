import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Products from './components/Products';
import CartPage from './pages/CartPage';
import Header from './components/Header';
import Login from './components/Login';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('username'));
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loginError, setLoginError] = useState('');
  const [addedToCart, setAddedToCart] = useState({});
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  // Fetch cart when logged in
  useEffect(() => {
    if (loggedIn && username) {
      fetch(`http://localhost:8080/api/cart/${username}`)
        .then(res => res.json())
        .then(data => {
          setCart(data);
          // Mark products as added to cart
          const cartMap = {};
          data.forEach(id => { cartMap[id] = true; });
          setAddedToCart(cartMap);
        })
        .catch(() => setCart([]));
    }
  }, [loggedIn, username]);

  // On login success, save username to localStorage
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const res = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.error) {
      setLoginError(data.message);
    } else {
      setLoggedIn(true);
      localStorage.setItem('username', username);
    }
  };

  // Optional: Add logout functionality
  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    localStorage.removeItem('username');
    setCart([]);
    setAddedToCart({});
    navigate('/');
  };

  // Add to cart
  const handleAddToCart = async (productId) => {
    await fetch('http://localhost:8080/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, productId }),
    });
    // Refresh cart
    fetch(`http://localhost:8080/api/cart/${username}`)
      .then(res => res.json())
      .then(data => {
        setCart(data);
        const cartMap = {};
        data.forEach(id => { cartMap[id] = true; });
        setAddedToCart(cartMap);
      });
  };

  // Remove from cart
  const handleRemoveFromCart = async (productId) => {
    await fetch('http://localhost:8080/api/cart/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, productId }),
    });
    // Refresh cart
    fetch(`http://localhost:8080/api/cart/${username}`)
      .then(res => res.json())
      .then(data => {
        setCart(data);
        const cartMap = {};
        data.forEach(id => { cartMap[id] = true; });
        setAddedToCart(cartMap);
      });
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  if (!loggedIn) {
    return (
      <Login
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        loginError={loginError}
      />
    );
  }

  return (
    <div className="App">
      <Header username={username} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <h2>Products</h2>
              <Products
                products={products}
                onAddToCart={handleAddToCart}
                addedToCart={addedToCart}
                onGoToCart={handleGoToCart}
              />
            </main>
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              onRemoveFromCart={handleRemoveFromCart}
              products={products}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}