import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <h1>Navbar Component</h1>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Register</Link>
        </li>
      </ul>
    </div>
  );
}
export default Navbar;
