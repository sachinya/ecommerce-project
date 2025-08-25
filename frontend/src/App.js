import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const callBackend = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/hello');
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      setMessage('Error: Could not connect to backend');
      console.error('Error calling backend:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/status');
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      setMessage('Error: Could not connect to backend');
      console.error('Error calling backend:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Ecommerce Frontend</h1>
        <div style={{ margin: '20px' }}>
          <button 
            onClick={callBackend} 
            disabled={loading}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#61dafb',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              margin: '10px'
            }}
          >
            {loading ? 'Loading...' : 'Call Backend Hello'}
          </button>
          <button 
            onClick={checkStatus} 
            disabled={loading}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              margin: '10px'
            }}
          >
            {loading ? 'Loading...' : 'Check Status'}
          </button>
        </div>
        {message && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#282c34',
            border: '1px solid #61dafb',
            borderRadius: '5px',
            color: '#61dafb'
          }}>
            <strong>Response:</strong> {message}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
