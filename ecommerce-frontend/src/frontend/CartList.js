import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CartList({ cartItem }) {
    const [data, setData] = useState([]);

    const user = JSON.parse(localStorage.getItem('user-info'));
    const userId = user ? user.id : '';

    useEffect(() => {
        getData();
    }, [])

    async function removeItem(cartId) {

        let result = await fetch("http://127.0.0.1:8000/api/removeitem/" + cartId, {
            method: 'DELETE'
        });
        result = await result.json();
        cartItem();
        getData();
        console.log(result);
    }

    async function getData() {
        let result = await fetch('http://127.0.0.1:8000/api/cartlist/' + userId);
        result = await result.json();
        setData(result);
    }

    return (
        <>
            {/* search result section */}
            <main className="veiw-h">
                <div className="col-8 m-auto bg-white p-3 mt-3">
                    <div className="row g-1 border-bottom">
                        <h2 className="col-9">Shopping Cart</h2>
                    </div>

                    <div className="border-bottom">
                        <div className="row g-0">
                            {data.map((item) =>
                                <>
                                    <div className="col-md-4">
                                        <img src={"http://127.0.0.1:8000/storage/gallery/" + item.gallery} className="img-fluid rounded-start" alt="product pic" />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <a href="detail/{{$product['id']}}" className="text-decoration-none underline">
                                                <h5 className="card-title" style={{ color: 'red', fontSize: '20px' }}>{item.name}</h5> {/* Apply inline styling */}
                                                <p className="card-text text-truncate" style={{ color: 'black', fontSize: '16px', marginBottom: '2px' }}>{item.description}</p> {/* Apply inline styling */}
                                                <p className="card-text">
                                                    <small className="text-danger"><b>Item Price: </b> ₱ {item.price}</small>
                                                    <small className="text-danger"><b> Quantity: </b>{item.qty}</small>
                                                </p>
                                            </a>
                                            <button className="btn btn-warning mt-3" onClick={() => removeItem(item.cart_id)} style={{ color: 'white' }}>Remove Item</button> {/* Apply inline styling */}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {!data[0] ? <div className="text-danger fs-4 text-center">Cart is empty!!</div> : ""}
                    
                    {/* Check Out button at the bottom right */}
                    <div className="row mt-3">
                        <div className="col-12 d-flex justify-content-end">
                            <Link className="btn btn-info" to="/checkout" style={{ backgroundColor: 'red', color: 'white' }}>  Check Out  </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
