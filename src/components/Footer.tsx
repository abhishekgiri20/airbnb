import React from "react";
import footerlogo from "../assets/footer.png";
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { AiOutlineLinkedin } from "react-icons/ai";
import appstore from "../assets/applestore.svg";
import playstore from "../assets/playstore.svg";
const Footer = () => {
  return (
    <>
      <footer>
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-3  ">
              <div className="footer-logo d-flex flex-column justify-content-center h-100">
                <div className="logo mb-2">
                  <img src={footerlogo.src} alt="" />
                </div>
                <div className="footer-copyright text-white">
                  <p>© 2020 Henceforth, Inc.</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="footer-btns d-flex flex-column justify-content-center h-100 gap-2 align-items-center">
                <button className="bg-transparent text-white border-0 text-start">
                  <span>About Us</span>
                </button>
                <button className="bg-transparent text-white border-0 text-start">
                 <span> Contact Us</span>
                </button>
                <button className="bg-transparent text-white border-0 text-start">
                 <span> Terms & Conditions</span>
                </button>
              </div>
            </div>
            <div className="col-3">
              <div className="socialmedia d-flex flex-column justify-content-center align-items-center h-100 gap-2">
                <button className="bg-transparent text-white border-0 text-start"><span className="fs-5 me-2"><FaFacebookF /></span>Facebook</button>
                <button className="bg-transparent text-white border-0 text-start"><span  className="fs-5 me-2"><IoLogoInstagram /></span>Instagram</button>
                <button className="bg-transparent text-white border-0 text-start"><span  className="fs-5 me-2"><AiOutlineLinkedin /></span>Linkedin</button>
              </div>
            </div>
            <div className="col-3">
                <div className="play-btns d-flex flex-column justify-content-center align-items-end h-100 gap-2 ">
                    <img src={appstore.src} alt="" />
                    <img src={playstore.src} alt="" />
                </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
