import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch('http://127.0.0.1:8000/api/');
                const jsonData = await result.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {/* Header banner */}
            <header className="py-5" style={{
                backgroundImage: `url(/Vans.jpg)`, // Corrected syntax
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                textAlign: 'center',
            }}>
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center">
                        <h1 className="display-4 fw-bolder" style={{ color: 'red', marginBottom: '-10px'}}>VANS</h1>
                        <p className="lead fw-normal mb-0" style={{ color: 'red'}}>Off the Wall</p>
                    </div>
                </div>
            </header>
            {/* Product section */}
            <section className="py-5">
    <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {/* Display products */}
            {data.map((item) => (
                <div className="col mb-4" key={item.id}>
                    <div className="card h-100">
                        {/* Product image */}
                        <img className="card-img-top" src={`http://127.0.0.1:8000/storage/gallery/${item.gallery}`} alt="Product" />
                        {/* Product details */}
                        <div className="card-body p-2">
                            <div className="text-center">
                                {/* Product name with font size */}
                                <h5 className="fw-bolder" style={{ fontSize: '18px' }}>{item.name}</h5>
                                {/* Product price */}
                                <h6 style={{ fontSize: '15px' }}>₱{item.price}</h6>
                            </div>
                        </div>
                        {/* Product actions */}
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <Link className="btn btn-mt-auto" to={`/product/${item.id}`} style={{ backgroundColor: 'red', color: 'white', width: '150px' }}>See More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>

        </>
    );
}
