import React from 'react'
import personalInfoImg from "../../../assets/personalInfoImg.svg"
import passworsImg from "../../../assets/changePasswordImg.svg"
import Link from 'next/link';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Layout from '@/components/Layout';
const index = () => {
  return (
    <>
    <section className=' mb-4 '>
        <div className="container">
            <div className="row" >
                <div className="col-md-12" style={{height:"700px",marginTop:"100px"}} >
                    <div className='mt-3'>
                       <h3>Business Account</h3>
                       <div className="user-info d-flex ">
                           <div className="user-name"> <p style={{color:"#343A40"}}>Abhishek, </p></div>
                           <div className="user-email"><p style={{color:"#343A40", opacity:"0.7"}}>abhi@gmial.com</p></div>
                       </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className="userprofile-card d-flex flex-column p-4 mt-5">
                                <div className="profile-top d-flex align-items-center mb-3">
                                    <div className="card-logo">
                                        <img src={personalInfoImg.src} alt="" style={{width:"47px",height:"47px"}}/>
                                    </div>
                                    <Link href="/account/business/info" className='text-dark ms-5 fs-5'  style={{color:"#343A40"}}>Business info
                                      <span className='text-success'>
                                        <MdOutlineKeyboardArrowRight/>
                                      </span>
                                    </Link>
                                    
                                </div>  
                                <div className="profile-bottom"><p>Provide personal details and how we can reach you</p></div>
                            </div>
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <div className="userprofile-card d-flex flex-column p-4 mt-5">
                                <div className="profile-top d-flex align-items-center mb-3">
                                    <div className="card-logo">
                                        <img src={passworsImg.src} alt="" style={{width:"47px",height:"47px"}}/>
                                    </div>
                                    <Link href="/account/business/document" className='text-dark ms-5 fs-5' style={{color:"#343A40"}}>Documents
                                      <span className='text-success'>
                                        <MdOutlineKeyboardArrowRight/>
                                      </span>
                                    </Link>
                                    
                                </div>
                                <div className="profile-bottom"><p>Update your documents so that we better understand about you</p></div>
                            </div>
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <div className="userprofile-card d-flex flex-column p-4 mt-5">
                                <div className="profile-top d-flex align-items-center mb-3">
                                    <div className="card-logo">
                                        <img src={personalInfoImg.src} alt="" style={{width:"47px",height:"47px"}}/>
                                    </div>
                                    <Link href="/account/business/payments" className='text-dark ms-5 fs-5'  style={{color:"#343A40"}}>Payment & Payouts
                                      <span className='text-success'>
                                        <MdOutlineKeyboardArrowRight/>
                                      </span>
                                    </Link>
                                    
                                </div>
                                <div className="profile-bottom"><p>Add, edit or update your cards for the bookings</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}


index.getLayout =  function getLayout(page:any){
    return <Layout>{page}</Layout>
}

export default index;