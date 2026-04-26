import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { setUserInfo, logout } from "../features/auth/authSlice";
import { useUserDetailsQuery } from "../features/auth/authService";
import { useNotifier } from "../hooks/useNotifier";

function Navbar() {
  const dispatchFn = useDispatch();
  const navigateFn = useNavigate();

  let user = useSelector((state) => state?.authReducer?.user);
  const token = localStorage.getItem("token");
  const { data } = useUserDetailsQuery(token, { skip: !token });
  const { notificationMsg } = useNotifier();

  useEffect(() => {
    if (token) {
      dispatchFn(setUserInfo({ token, user: data?.user }));
    }
  }, [data]);

  const onLogoutClick = () => {
    try {
      dispatchFn(logout());
      notificationMsg("default", `Logged Out.`)
      navigateFn("/");
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  return (
    <>
      <ul>
        <li>
          <Link to="/">
            <img
              src="../mvlogo.png"
              alt="App Logo"
              style={{ width: "50px", height: "50px", borderRadius: "10px" }}
            />
          </Link>
        </li>
        {user?.username && (
          <>
            {user?.role === "Vendor" && (
              <li>
                <Link to="/outlets">Outlets</Link>
              </li>
            )}
            {user?.role === "User" && (
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            )}
            <li>
              <Link to="/orders">Orders</Link>
            </li>

            <div>{user?.username}</div>
            <img
              src={user.profileImg}
              alt={user.username}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <br />
            <button onClick={onLogoutClick}>Log Out</button>
          </>
        )}
        {!user?.username && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
}
export default Navbar;
