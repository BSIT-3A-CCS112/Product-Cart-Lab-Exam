import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Product({ cartItem }) {
    const [data, setData] = useState([]);
    const [qty, setQty] = useState(1);

    const navigate = useNavigate();
    const { id } = useParams();

    const user = JSON.parse(localStorage.getItem('user-info'));
    const userId = user ? user.id : '';

    useEffect(async () => {
        let result = await fetch('http://127.0.0.1:8000/api/detail/' + id);
        result = await result.json();
        setData(result);
    }, [id])

    const productId = data.id;

    async function addToCart() {
        if (!userId) {
            navigate('/login');
        }
        let item = { userId, productId, qty };
        let result = await fetch("http://127.0.0.1:8000/api/add_to_cart", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        cartItem();
        console.log(result);
    }

    return (
        <>
            {console.log(productId)}
            {/* Product-page */}
            <div className="row my-4 container bg-light m-auto">
                <div className="col-12 col-md-6">
                    <img src={"http://127.0.0.1:8000/storage/gallery/" + data.gallery} alt="Product image" className="card-img" />
                </div>
                <div className="col-12 col-md-6 mt-5">
                <h4 style={{ color: 'red', fontSize: '2rem', marginTop: '-20px'}}>{data.name}</h4> {/* Apply inline styling */}
                    <p><b>Brand: </b> Sony</p>
                    <p><b>Category: </b> {data.category}</p>
                    <p><b>Price: </b>₱ {data.price}</p>
                    <p>
                     <label htmlFor="qty"><b>Quantity:</b>&nbsp;</label> {/* Added space character after "Quantity:" */}
                     <input className="form-control-sm text-center me-3" id="qty" type="number" value={qty} onChange={(e) => setQty(e.target.value)} min="1" style={{ maxWidth: '5rem' }} required />
                     <br/>
                    <button className="btn btn- mt-3" onClick={addToCart} type="button" id="button-addon1" style={{ backgroundColor: 'red', color: 'white' }}>
                   Add To Cart
                     </button>
                      </p>

                </div>
                <div className="col-12 bg-light mt-3 border-top">
                    <div className="p-3 details-2">
                        <h4 className="fw-bold" style={{ color: 'red' }}>Product Details</h4>
                        <p>{data.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}