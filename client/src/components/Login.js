import React, { useState } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState("");

  return (
    <form onSubmit={onLogin}>
      <h1>Bubble App - Login</h1>
      <input
        type="username"
        name="username"
        placeholder="username"
        onChange={handleChange}
        value={credentials.username}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
        value={credentials.password}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
