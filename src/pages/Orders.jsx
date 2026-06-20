import { useEffect, useState } from "react";

function Orders() {
    const[users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const [form, setForm] = useState({
        userId: "",
        productId: "",
        quantity: 1,
    });

    const fetchOrders = async () => {
        const res = await api("/orders");
        setOrders(res.data);
    };
    const fetchUsers = async () => {
        const res = await api("/users");
        setUsers(res.data);
    };
    const fetchProducts = async () => {
        const res = await api("/products");
        setProducts(res.data);
    };

    useEffect(() => {
        (fetchOrders(), fetchProducts(), fetchUsers());
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value,
        });
    };

    const selectedProduct = products.find(
        (product) => product._id === form.productId,
    );

    const createOrder = async () => {
        if(!form.userId || !form.productId){
            alert("Please select user and product");
            return;
        }
        const totalAmount = selectedProduct.price * Number(form.quantity);
        const payload = {
            userId : form.userId,
            products: [
                {
                    productId: form.productId,
                    quantity: Number(form.quantity),
                    price: selectedProduct.price,
                },
            ],
            totalAmount,
        };
        await api.post("/orders", payload);
        fetchOrders();

        setForm({
            userId: "",
            productId: "",
            quantity: 1,
        });
    };

    const deleteOrder = async () => {
        await api.delete(`/orders/${id}`);
        fetchOrders();
    };

    return (
        <>
        <div>
            <h1>Orders</h1>
            {/*User Dropdown*/}
            <select name="userId" value={form.userId}
            onChange={handleChange}>
                <option value="">Select User</option>
                {users.map((user) => (

                    <option key={user._id} value={user._id}>
                        {user.name}
                        </option>
                ))}
            </select>
            {/*Product Dropdown*/}
            <select name="productId" value={form.productId}
            onChange={handleChange}>
                <option value="">Select Product</option>
                {products.map((product) => (

                    <option key={product._id} value={product._id}>
                        {product.name}
                        </option>
                ))}
            </select>

            {/*Quantity*/}
            <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            />

            <br />
            <br />

            {/* product details*/}

            {selectedProduct && (

                <div>
                    <p>Price: {selectedProduct.price}</p>
                    <p>Total: {selectedProduct.price * Number(form.quantity)}</p>
                </div>
            )}
            <button onClick={createOrder}>Add Order</button>

            <hr />
        </div>
        </>
    )
}

export default Orders;