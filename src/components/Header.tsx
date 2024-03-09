import Link from "next/link";
import React, { useEffect, useState } from "react";
import henceforthLogo from "../assets/henceforthLogo.svg";
import searchicon from "../assets/searchicon.svg";
import { GrLanguage } from "react-icons/gr";
import { destroyCookie, parseCookies } from "nookies";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setData } from '../store/userSlice'; 

const Header = () => {

  const profileData = useSelector((state:any) => state.user);
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const [token,settoken] = useState('')
  const router = useRouter()

  useEffect(()=>{
    settoken(cookies.accessToken);
  },[])



  // handle logout 
  const handleLogout = () =>{
    destroyCookie(null, 'accessToken');
    dispatch(setData({})); 
    settoken("");
    router.push("/");

  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Bookings
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Favourite
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <Link rel="noopener noreferrer" href="/account/personal">
          User Profile
        </Link>
      ),
    },
    {
      key: '4',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
         Host an Experience
        </a>
      ),
    },{
      key: '5',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Host Guest
        </a>
      ),
    },
    {
      key: '6',
      label: (
        <Link href="/account/business">Business Profile</Link>
      ),
    },
    {
      key: '7',
      label: (
        <Link  rel="noopener noreferrer" href="/contact-us">
          Contact Us
        </Link>
      ),
    },
    {
      key: '8',
      label: (
        
        <p onClick={handleLogout} >Logout</p>
      ),
    },
  ];

  return (
    <>
      <header className="inner-header ">
        <div className="container">
          <div className="row d-flex flex-direction-around align-items-center py-3">
              <div className="col-3">
                <div className="header-left">
                  <Link href="/">
                    <img src={henceforthLogo.src} alt="logo" />
                  </Link>
                </div>
              </div>
          
             
                <div className="col-4">
                    <div className="header-center d-flex px-2  py-2 justify-content-around">
                      <button><span>Location</span></button>
                      <button><span>Dates</span></button>
                      <button><span>Guests</span></button>
                      <button className="border-0">
                        <img src={searchicon.src} alt="" />
                      </button>
                    </div>
               </div>
        


              {
                token?
                (<div className="col-5">
                    <div className="d-flex gap-4 justify-content-end align-items-center w-100">
                      <div><p className="m-0">Switch to Hosting</p></div>
                      <div className="chat-icon"><span className="fs-4"><IoChatbubblesOutline /></span></div>
                      <div className="notification-icon"><span  className="fs-4"><IoNotificationsOutline /></span></div>
                      <div className="earth-icon"><span  className="fs-4"><GrLanguage /></span></div>
                      <Space direction="vertical">
                          <Space wrap>
                              <Dropdown menu={{ items }} placement="bottomLeft" >
                                    <div className="profile d-flex justify-content-around  align-items-center border  p-2 rounded" style={{minWidth:"150px"}}>
                                      <div className="profile-img rounded-circle border border-success" style={{width:"30px",height:"30px",borderColor:"red"}}><img src={`https://demoserver3.sgp1.digitaloceanspaces.com/user/original/${profileData.intialState?.profile_pic}`} alt="" className='w-100 h-100 rounded-circle'/></div>
                                      <div className="profile-name">{profileData.intialState?.first_name}</div>
                                    </div>  
                              </Dropdown>
                          </Space>               
                      </Space>
                    </div>
                </div>):
                (<div className="col-5">
                    <div className="header-right  d-flex   py-2 align-items-center gap-3 justify-content-end"> 
                        <button className="bg-transparent border-0"><p className="m-0">Become a host</p></button>
                        <button className="bg-transparent border-0" ><span className="fs-3"><GrLanguage /></span></button>
                        <Link href="/auth/login"><button className="bg-transparent border-0">Login</button></Link>
                        <Link href="/auth/signup"><button className="btn text-white" style={{backgroundColor: "#32CD32"}}>Sign Up</button></Link>
                    </div>
                </div>)               
              }
            </div>
          </div>
      </header>
    </>
  );
};

export default Header;
