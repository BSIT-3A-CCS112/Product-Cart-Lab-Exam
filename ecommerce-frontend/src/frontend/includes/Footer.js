import React from 'react'

export default function Footer() {
  return (
    <>
        {/* footer */}
        <footer className="bg-dark mt-3">
            <div className="text-center footer1">
            {/* <a className="m-2" href="#">
                <img src="shopline.png" alt="" width="100px" height="60px" className="d-inline-block">
            </a> */}
            <select className="btn btn-dark px-4 border text-light border-light m-2">
                <option value="volvo">English</option>
                <option value="saab">Bangla</option>
                <option value="mercedes">Urdu</option>
                <option value="audi">Arabic</option>
            </select>
            <select className="btn btn-dark px-4 border text-light border-light m-2">
                <option value="volvo">৳ TK-BD</option>
                <option value="saab">$ USD-U.S. Dollar</option>
                <option value="mercedes">&euro; EUP-Euro</option>
            </select>
            <select className="btn btn-dark px-4 border text-light border-light m-2">
                <option value="volvo">Bangladesh</option>
                <option value="saab">UK</option>
                <option value="mercedes">USA</option>
                <option value="audi">China</option>
            </select>
            </div>
            <div className="footer2">
            <div className="row pt-4 text-white mx-5">
                <div className="col-md-4 follow">
                    <h4 className="border-bottom border-light border-2 mx-2">Follow Us</h4>
                    <a href="#"><i className="fab fa-facebook-square text-white fs-1 p-2"></i></a>
                    <a href="#"><i className="fab fa-twitter-square text-white fs-1 p-2"></i></a>
                    <a href="#"><i className="fab fa-instagram-square text-white fs-1 p-2"></i></a>
                    <a href="#"><i className="fab fa-linkedin text-white fs-1 p-2"></i></a>
                </div>
                <div className="col-md-4 services">
                    <h4 className="border-bottom border-light border-2 mx-2">Services</h4>
                    <ul>
                        <li><a href="#">Affiliate</a></li>
                        <li><a href="#">Suppliers</a></li>
                        <li><a href="#">Vendors</a></li>
                    </ul>
                </div>
                <div className="col-md-4 Contact text-white">
                    <h4 className="border-bottom border-light border-2 mx-2">Contact Us</h4>
                    <p className="px-2">Helpline: 16xxx</p>
                    <p className="px-2">Email: helpline@ourbazar.com</p>
                    <p className="px-2">Kutub Ail, Fatullah, Narayanganj</p>
                </div>
            </div>
            </div>
        </footer>
    </>
  )
}
