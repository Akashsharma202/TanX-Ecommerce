import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';

const Cart = () => {
    const [cart, setCart] = useState([]);
   //fetch orders from localhost
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/orders');
                setCart(response.data);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchData();
    }, []);
    //remove particular product from cart using productId
    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/orders/${productId}`);
            setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
            console.log('Removed from cart:', productId);
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    // adding quantity to each item 
    const updateQuantity = (productId, newQuantity) => {
        const validatedQuantity = Math.max(1, parseInt(newQuantity, 10));
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: validatedQuantity } : item
            )
        );
    };
    // calculation total amount by number of quantity * product amount
    const calculateTotalAmount = () => {
        return cart.reduce(
            (total, item) => (item.product ? total + item.product.amount * (item.quantity?item.quantity:1) : total),
            0
        );
    };

    // Generate a summary string for the QR code
    const generateCartSummaryString = () => {
        const summary = cart
            .filter((item) => item.product && item.product.image)
            .map((item) => `${item.product.title} x ${item.quantity?item.quantity:1}`)
            .join('\n');
        return `Cart Summary:\n\n${summary}\nTotal: $${calculateTotalAmount()} \n \n Thankyou Please Vist Us Again!!!`;
    };

    return (
        <div className="p-10 grid ">
            <h2 className="text-3xl font-semibold mb-6 place-self-center">Shopping Cart</h2>
            <div className="flex gap-x-10 flex-wrap justify-center md:justify-between md:flex-nowrap">
                {cart.length > 0 ? (
                    <div className="grid w-[70%] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {cart.map((item) =>
                            item.product && item.product.image ? (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-md overflow-hidden shadow-md m-2 relative place-self-center"
                                >
                                    <button
                                        className="absolute w-7 h-7 top-2 right-2 p-2 rounded-full bg-red-500 text-white"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <h2 className="-mt-1">X</h2>
                                    </button>
                                    <img
                                        src={item.product.image}
                                        alt={item.product.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-l font-semibold mb-2">
                                            {item.product.title}
                                        </h2>
                                        <p className="text-gray-700 mb-2">${item.product.amount}</p>
                                        <label className="block mb-2">Quantity:</label>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, e.target.value)}
                                            className="border p-2 w-full"
                                            min="1"
                                            defaultValue={1}
                                        />
                                    </div>
                                </div>
                            ) : null
                        )}
                    </div>
                ) : (
                    <p className="text-xl">Your cart is empty or contains items without images.</p>
                )}
                <div className="col-span-2 border bg-white p-4">
                    <h2 className="text-2xl font-semibold mb-2">Cart Summary</h2>
                    {cart.map((item) =>
                        item.product && item.product.image ? (
                            <div key={item.id} className="mb-2">
                                <h3>
                                    {item.product.title} x {item.quantity?item.quantity:1} = $
                                    {item.product.amount * (item.quantity?item.quantity:1)}
                                </h3>
                            </div>
                        ) : null
                    )}
                    <div className="text-xl mt-2">Total: ${calculateTotalAmount()}</div>
                    <div style={{ height: 'auto', margin: '0 auto', maxWidth: 200, width: '100%', padding: '10px', marginTop: '20px' }}>
                        <QRCode
                            size={256}
                            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                            value={generateCartSummaryString()}
                            viewBox={`0 0 256 256`}
                            
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Cart;
