import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../components/Login";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";

const Auth = ({ register }) => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem("userid");
    setIsLogged(!!userId);
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 ">
      {register ? <Register /> : isLogged ? navigate("/") : <Login />}
    </div>
  );
};

export default Auth;
