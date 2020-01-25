import React, { useState } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

const Login = ({history}) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState("");

  const onLogin = event => {
    event.preventDefault();
    setIsLoading(true);

    console.log(credentials);

    axiosWithAuth()
      .post("http://localhost:5000/api/login", credentials)
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.payload);
        history.pushState("/bubbles");
      })
      .catch(error => console.log(error));
  };

  const handleChange = event => {
    event.preventDefault();
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

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
      {isLoading && <p>Patientia....</p>}
    </form>
  );
};

export default Login;
