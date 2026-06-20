import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>{" | "}

      <Link to="/about">About</Link>{" | "}

      <Link to="/contact">Contact</Link>{" | "}

      <Link to="/users">Users</Link>{" | "}

      <Link to="/products">Products</Link>{" | "}

      <Link to="/orders">Orders</Link>
    </nav>
  );
}

export default Navbar;