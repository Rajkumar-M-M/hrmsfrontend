import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from './context/authContext.jsx'
import React from 'react';

createRoot(document.getElementById('root')).render(
 
    <AuthProvider>
      <App />
    </AuthProvider>
)
