import { Routes, Route, BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import { useState } from "react";

function App() {
  const [page,setPage] = useState("users");
  return (
    <>
      {/* <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/users" element={<Users />} />

          <Route path="/products" element={<Products />} />

          <Route path="/orders" element={<Orders />} />
        </Routes> */}
        <div>
          <button onClick={()=>{ setPage("users")}} >Users</button>
          <button onClick={()=>{ setPage("products")}} >Products</button>
          <button onClick={()=>{ setPage("orders")}} >orders</button>
          {page === "users" && <Users/>}
          {page === "products" && <Products/>}
          {page === "orders" && <Orders/>}
        </div>
    </>
  );
}

export default App;