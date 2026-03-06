import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <h1>Navbar Component</h1>
      <ul id="navbarList">
        <div className="left-items">
          <li>
            <Link to="/">Home</Link>
          </li>
        </div>
        <div className="right-items">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Register</Link>
          </li>
        </div>
      </ul>
    </div>
  );
}
export default Navbar;
