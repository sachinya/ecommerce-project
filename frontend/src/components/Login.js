import React from 'react';

const Login = ({ username, password, setUsername, setPassword, handleLogin, loginError }) => (
  <div className="login-container">
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
    {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
  </div>
);

export default Login;