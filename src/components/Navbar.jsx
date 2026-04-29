import { Link } from "react-router-dom";

import { useAuthNavbar } from "../hooks/useAuthNavbar";
import { useEffect } from "react";

function Navbar() {
  const { userInfo, isVendor, isUser, isAuthenticated, onLogoutClick } =
    useAuthNavbar();

  // Helper to close the mobile menu
  const closeNavCollapse = () => {
    const navCollapse = document.getElementById("navbarNav");
    if (navCollapse) {
      navCollapse.classList.remove("show");
    }
  };

  // Close toggler when focus is lost (click outside entire navbar)
  const handleDocumentClick = (e) => {
    const navCollapse = document.getElementById("navbarNav");
    const toggler = document.querySelector(".navbar-toggler");
    if (
      navCollapse &&
      navCollapse.classList.contains("show") &&
      !navCollapse.contains(e.target) &&
      !toggler.contains(e.target)
    ) {
      navCollapse.classList.remove("show");
    }
  };

  // Attach global click listener once
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // Wrap logout to also reset toggler
  const handleLogout = () => {
    closeNavCollapse();
    onLogoutClick();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          onClick={closeNavCollapse}
        >
          <img
            src="/mvlogo.png"
            alt="App Logo"
            className="rounded me-2"
            style={{ width: "40px", height: "40px" }}
          />
          MultiVendor
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                {isVendor && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/outlets"
                      onClick={closeNavCollapse}
                    >
                      Outlets
                    </Link>
                  </li>
                )}
                {isUser && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/cart"
                      onClick={closeNavCollapse}
                    >
                      Cart
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/orders"
                    onClick={closeNavCollapse}
                  >
                    Orders
                  </Link>
                </li>

                {/* User Profile Dropdown */}
                <li className="nav-item dropdown">
                  <img
                    src={userInfo?.profileImg}
                    alt={userInfo?.username}
                    className="rounded-circle dropdown-toggle"
                    style={{ width: "40px", height: "40px", cursor: "pointer" }}
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                  >
                    <li>
                      <span className="dropdown-item-text">
                        {userInfo?.username}
                      </span>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Log Out
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={closeNavCollapse}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    onClick={closeNavCollapse}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
