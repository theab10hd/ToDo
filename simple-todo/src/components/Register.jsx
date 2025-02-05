import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import url from "../api/baseUrl";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const [errorTxt, setErrorTxt] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorTxt("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorTxt]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (!user.email || !user.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(`${url}/user/register`, user);
      toast.success("Register Successfull", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "Flip",
      });
      if (response.data.newUser._id) {
        sessionStorage.setItem("userid", response.data.newUser._id);
      }
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (e) {
      setErrorTxt(e.response?.data?.message || "An error occurred. Try again.");
    }
  };

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
        transition={"Flip"}
      />
      <div className="col-md-6 mx-auto d-flex flex-column">
        <div className="card p-4 border-0 bg-body-tertiary shadow-sm">
          <h3 className="text-center fw-medium">Register</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
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
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleRegister}
            >
              Register
            </button>
            <p className="text-danger mt-3 text-center">{errorTxt}</p>
          </form>
          <div className="text-center mt-3">
            <p>
              Already have an account?"
              <Link to="/login" className="text-decoration-none">
                {" "}
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
