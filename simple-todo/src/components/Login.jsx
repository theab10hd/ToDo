import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../api/baseUrl";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [errorTxt, setErrorTxt] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!user.email || !user.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(`${url}/user/login`, user);
      toast.success("Login Successfull", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "slide",
      });
      if (response.data.user._id) {
        sessionStorage.setItem("userid", response.data.user._id);
      }
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (e) {
      setErrorTxt(e.response?.data?.message || "An error occurred. Try again.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorTxt("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorTxt]);

  return (
    <div className="row w-100">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="slide"
      />
      <div className="col-md-6 mx-auto d-flex flex-column ">
        <div className="card p-4 border-0 bg-body-tertiary shadow-sm">
          <h3 className="text-center fw-medium">Login</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                name="password"
                required
                onChange={handleChange}
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="btn btn-primary w-100"
            >
              Login
            </button>
          </form>
          <p className="text-danger mt-3 text-center">{errorTxt}</p>
          <div className="text-center mt-3">
            <p>
              Don't have an account?
              <Link to="/register" className="text-decoration-none">
                {" "}
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
