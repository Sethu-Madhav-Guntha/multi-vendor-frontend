import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserInfo, logout } from "../features/auth/authSlice";
import { useEffect } from "react";
import { useUserDetailsQuery } from "../features/auth/authService";

function Navbar() {
  const dispatchFn = useDispatch();
  const navigateFn = useNavigate();
  let user = useSelector((state) => state?.authReducer?.user);
  const token = localStorage.getItem("token");
  const { data } = useUserDetailsQuery(token, { skip: !token });

  useEffect(() => {
    if (token) {
      dispatchFn(setUserInfo({ token, user: data?.user }));
    }
  }, [data]);

  const onLogoutClick = () => {
    dispatchFn(logout());
    navigateFn("/");
  };

  return (
    <div>
      <h1>Navbar Component</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
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
    </div>
  );
}
export default Navbar;
