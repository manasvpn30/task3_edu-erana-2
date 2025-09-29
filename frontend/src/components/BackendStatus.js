import React, { useState, useEffect } from 'react';
import { healthCheck } from '../services/api';

const BackendStatus = () => {
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    setStatus('checking');
    setMessage('Testing connection to backend...');
    
    try {
      const response = await healthCheck();
      setStatus('connected');
      setMessage(`Backend is connected on port 5002! Server: ${response.data.message}`);
    } catch (error) {
      setStatus('error');
      setMessage(`Backend connection failed: ${error.message}`);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return '#d4edda';
      case 'error': return '#f8d7da';
      case 'checking': return '#fff3cd';
      default: return '#fff3cd';
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case 'connected': return '#c3e6cb';
      case 'error': return '#f5c6cb';
      case 'checking': return '#ffeaa7';
      default: return '#ffeaa7';
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'connected': return '#155724';
      case 'error': return '#721c24';
      case 'checking': return '#856404';
      default: return '#856404';
    }
  };

  return (
    <div style={{ 
      padding: '12px', 
      margin: '10px', 
      borderRadius: '8px',
      backgroundColor: getStatusColor(),
      border: `2px solid ${getBorderColor()}`,
      color: getTextColor(),
      fontSize: '14px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>🔌 Backend Status: {status.toUpperCase()}</strong>
          <div style={{ fontSize: '12px', marginTop: '4px' }}>{message}</div>
        </div>
        <button 
          onClick={checkBackend}
          style={{ 
            padding: '6px 12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Retest
        </button>
      </div>
    </div>
  );
};

export default BackendStatus;