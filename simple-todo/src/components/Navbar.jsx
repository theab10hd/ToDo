import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem("userid");
    setIsLogged(!!userId);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userid");
    setIsLogged(false);
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          SimpleTodo
        </Link>

        {!isLogged ? (
          <Link
            className="fa-solid fa-right-to-bracket text-primary fs-4 text-decoration-none "
            to="/login"
          ></Link>
        ) : (
          <button className="btn btn-sm btn-danger" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
