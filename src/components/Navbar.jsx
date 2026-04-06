import { Link } from "react-router-dom";

function Navbar(){
    return <div>
        <h1>Navbar Component</h1>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/stores">Stores</Link>
            </li>
            <li>
                <Link to="/cart">Cart</Link>
            </li>
            <li>
                <Link to="/orders">Orders</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
        </ul>
    </div>
}
export default Navbar;