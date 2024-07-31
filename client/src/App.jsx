// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store,  persistor } from './store/store';
import Navbar from './components/Navbar';
import Auth from './components/Auth/Auth';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
