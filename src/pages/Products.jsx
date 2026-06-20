import { useEffect,useState } from "react";
import api from "../api";

export default function productsPage(){
  const [products,setproducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity:"",
    category: "",
  });

  const fetchproducts = async()=>{
    const res = await api.get("/products");
    setproducts(res.data);
  }

  useEffect(()=>{
    fetchproducts();
  },[]);

  const handlechange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
    const createproduct = async()=>{
      await api.post("/products",form);
      setForm({
        name: "",
        description: "",
        price: "",
        quantity:"",
        category: "",
      });
      fetchproducts();
    };

    const deleteproduct = async(id)=>{
      await api.delete(`/products/${id}`);
      fetchproducts();
    };
    return (
      <>
        <div>
          <h1>products</h1>
          <input 
            type ="text"
            name = "name"
            placeholder="name"
            value={form.name}
            onChange={handlechange}
          />
          <input 
            type ="text"
            name = "description"
            placeholder="description"
            value={form.description}
            onChange={handlechange}
          />
          <input 
            type ="text"
            name = "price"
            placeholder="price"
            value={form.price}
            onChange={handlechange}
          />
          <input 
            type ="text"
            name = "quantity"
            placeholder="quantity"
            value={form.quantity}
            onChange={handlechange}
          />
          <input 
            type ="text"
            name = "category"
            placeholder="category"
            value={form.category}
            onChange={handlechange}
          />
          <button onClick={createproduct}>Add products</button>
        </div>
        {products.map((product)=>(
          <div key={product._id}>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
            <p>{product.category}</p>

            <button onClick={()=>deleteproduct(product._id)}>
              Delete
            </button>
          </div>
        ))}
      </>
    );
}