import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { Login } from './components/Login';
import { BusList } from './components/BusList';


const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const handleLogin = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token); 
  };

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/buses" replace /> : <Login onLogin={handleLogin} />}
        />

        <Route
          path="/buses"
          element={token ? <BusList /> : <Navigate to="/login" replace />}
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
    
      <div>

    </div>
  </div>
  );
};

export default App;