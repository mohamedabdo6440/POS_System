import React, { useEffect, useState } from "react";
import Home from "./components/home/Home";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isAuth } = useSelector((state) => state.login);
  const [isToken, setIsToken] = useState(false);
  let token = localStorage.getItem("token");

  useEffect(() => {
    token ? setIsToken(true) : setIsToken(false);
  }, [isAuth, token]);

  return (
    <div className="App">
      <ToastContainer />
      <Home isToken={isToken} />
    </div>
  );
}

export default App;
