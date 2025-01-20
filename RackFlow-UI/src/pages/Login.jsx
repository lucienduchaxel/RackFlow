import React, { useState } from "react";
import axios from "axios";


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tenant, setTenant] = useState("");
  const [error, setError] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login", {
        tenantid: tenant,
        username: username,
        password: password
      });

      const { access_token, refresh_token, email } = response.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      const userInfo = { username, tenant};

      onLogin(userInfo);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h1 className="text-2xl mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="tenant">
            Tenant
          </label>
          <input
            type="text"
            id="tenant"
            value={tenant}
            onChange={(e) => setTenant(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
