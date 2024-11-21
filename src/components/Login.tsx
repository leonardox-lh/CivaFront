import React, { useState } from "react";
import logo from '../assets/img/logo.png';
import "../assets/styles/LoginStyles.css";

interface LoginProps {
  onLogin: (token: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [showTooltip, setShowTooltip] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();
      console.log("data:", data);
      console.log("token:", data.data.token);
      localStorage.setItem("token", data.data.token);
      onLogin(data.data.token);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    }
  };

  return (
    <div className="container">
      <div className="container-title">
        <h2 className="title">Iniciar Sesión</h2>
        
        <img src={logo} alt="Logo" className="image" />
        <div
          className="help-icon"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          ?
          {showTooltip && (
            <div className="tooltip">
              <p>User: admin </p>
              <p>Password: 12345 </p>
            </div>
          )}
        </div>
      </div>
      
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Nombre:
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
            placeholder="Introduce tu nombre"
          />
        </label>
        <label className="label">
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
            placeholder="Introduce tu contraseña"
          />
        </label>
        <button type="submit" className="button">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};
