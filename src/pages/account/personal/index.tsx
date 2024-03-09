import React from 'react'
import documentImg from "../../../assets/document.svg"
import personalInfoImg from "../../../assets/personalInfoImg.svg"
import passworsImg from "../../../assets/changePasswordImg.svg"
import Link from 'next/link';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Layout from '@/components/Layout';
import { useSelector } from 'react-redux';
const index = () => {

    const profileData =  useSelector((state:any) => state.user);

  return (
    <>
    <section className=' mb-4 '>
        <div className="container">
            <div className="row" >
                <div className="col-md-12" style={{height:"700px",marginTop:"130px"}} >
                    <div className='mt-3'>
                       <h3>User Profile</h3>
                       <div className="user-info d-flex ">
                           <div className="user-name"> <p style={{color:"#343A40"}}>{profileData?.intialState?.first_name},</p></div>
                           <div className="user-email"><p style={{color:"#343A40", opacity:"0.7"}}>{profileData?.intialState?.email}</p></div>
                       </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className="userprofile-card d-flex flex-column p-4 mt-5">
                                <div className="profile-top d-flex align-items-center mb-3">
                                    <div className="card-logo">
                                        <img src={personalInfoImg.src} alt="" style={{width:"47px",height:"47px"}}/>
                                    </div>
                                    <Link href="/account/personal/info" className='text-dark ms-5 fs-4 '  style={{color:"#343A40"}}>Personal info
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
                                    <Link href="/account/password" className='text-dark ms-5 fs-4' style={{color:"#343A40"}}>Update Password
                                      <span className='text-success'>
                                        <MdOutlineKeyboardArrowRight/>
                                      </span>
                                    </Link>    
                                </div>
                                <div className="profile-bottom"><p>Update your password and secure your account</p></div>
                            </div>
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <div className="userprofile-card d-flex flex-column p-4 mt-5">
                                <div className="profile-top d-flex align-items-center mb-3">
                                    <div className="card-logo">
                                        <img src={documentImg.src} alt="" style={{width:"47px",height:"47px"}}/>
                                    </div>
                                    <Link href="/account/personal/document" className='text-dark ms-5 fs-4 '  style={{color:"#343A40"}}>Documents
                                      <span className='text-success'>
                                        <MdOutlineKeyboardArrowRight/>
                                      </span>
                                    </Link>
                                    
                                </div>
                                <div className="profile-bottom"><p>Update your documents so that we better understand about you</p></div>
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