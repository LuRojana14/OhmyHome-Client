import React from 'react';
import { Router } from './router'
import AuthProvider from './utils/AuthProvider'
import './App.css';


function App () {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
