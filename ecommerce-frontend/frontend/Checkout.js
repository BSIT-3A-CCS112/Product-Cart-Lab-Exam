import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ cartItem }) {
    const [data, setData] = useState([]);
    const [address, setAddress] = useState('');
    const [payment, setPayment] = useState('');
    const [totalAmount, setTotalAmount] = useState(0); // Add total amount state variable

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user-info'));
    const userId = user ? user.id : '';

    useEffect(() => {
        async function getData() {
            if (!userId) {
                navigate('/login');
            }
            let result = await fetch('http://127.0.0.1:8000/api/checkout/' + userId);
            result = await result.json();
            console.log('Result:', result); // Log the result to check its structure and contents
            setData(result);
            
            // Calculate total amount when fetching cart items
            let total = 0;
            result.forEach((item) => {
                const itemPrice = parseFloat(item.price); // Parse item price as float
                const itemQty = parseInt(item.qty);
                if (!isNaN(itemPrice) && !isNaN(itemQty)) {
                    total += itemPrice * itemQty; // Multiply price by quantity to get total price per item
                }
            });
            setTotalAmount(total);
        }
        getData();
    }, [userId, navigate]);

    // Check if data is empty or not
    if (!data || !data.length) {
        return <div>Loading...</div>; // Render loading indicator while fetching data
    }

    const deliveryFee = 100; // Delivery fee of 100

    function onChangeValue(e) {
        setPayment(e.target.value);
    }

    async function orderPlace() {
        const item = { userId, address, payment };
        let result = await fetch('http://127.0.0.1:8000/api/orderplace', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Type': 'application/json',
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        if (result) {
            cartItem();
            navigate('/massage');
        }
    }

    return (
        <div className="col-8 m-auto bg-white p-3 mt-3">
            <div className="row g-1 border-bottom">
                <h3 className="col-9">Shopping Cart</h3>
            </div>
            <div className="border-bottom">
                <table className="table table-striped table-hover">
                    <tbody>
                        <tr>
                            <td>Total Quantity</td>
                            <td>{data.length}</td> {/* Update to show the length of data array */}
                        </tr>
                        <tr>
                            <td>Delivery Fee</td>
                            <td>₱ {deliveryFee}</td>
                        </tr>
                        <tr>
                            <td>Total Amount</td>
                            <td>₱ {totalAmount.toFixed(2)}</td> {/* Update to use totalAmount state variable */}
                        </tr>
                    </tbody>
                </table>

                <form action="/orderplace">
                    <div className="form-group">
                        <label htmlFor="address">Delivery Address:</label>
                        <textarea className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} id="address" cols="30" rows="2" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="payment">Payment Method</label><br />
                        <div onChange={onChangeValue}>
                            <p><input type="radio" value="online" name="payment" /> Credit Card</p>
                            <p><input type="radio" value="online" name="payment" /> PayPal</p>
                            <p><input type="radio" value="online" name="payment" /> Bank Transfer</p>
                            <p><input type="radio" value="cash" name="payment" /> Cash on Delivery</p>
                        </div>
                    </div>
                    <button className="btn btn-info" type="button" onClick={orderPlace} style={{ backgroundColor: 'red', color: 'white' }}>Place Order</button>
                </form>
            </div>
        </div>
    );
}
