import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccessMassage() {
  return (
    <>
    {/* search result section */}
    <div className="container veiw-h">
        <div className="alert alert-success position-absolute top-50 start-50 translate-middle" role="alert">
          {/* Removed the heading */}
            <p>Successfully placed your order.</p>
            {/* Removed the horizontal line */}
            <div className="mb-0 d-grid gap-2 col-7 mx-auto">
                <Link className="btn btn-info" to="/">Done</Link>
            </div>
        </div>
    </div>
    </>
  )
}
