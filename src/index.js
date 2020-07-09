import React from "react";
import ReactDOM from "react-dom";

import "./style.css";
import LoginForm from "./LoginForm";

function App() {
  return (
    <div className="App">
      <h2>Login Form</h2>
      <LoginForm />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
