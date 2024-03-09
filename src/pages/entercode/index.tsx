import Link from 'next/link'
import React,{useRef, useState,} from 'react'
import henceforthlogo from "../../assets/henceforthLogo.svg"
import verifyCodeImage from "../../assets/resetimage.jpg"
import { MdEdit } from "react-icons/md";
import { useRouter } from 'next/router';
import henceforthApi from '@/utils/henceforthApi';
import { setCookie } from 'nookies';


const index = () => {

    const [otp, setOtp] = useState(new Array(4).fill(""));
    const otpBoxReference = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const  email = router.query.email;
  
    function handleChange(value: any, index: any) {

    if (/^[0-9]*$/.test(value)) {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);
      if (value && index < 4 - 1) {
        otpBoxReference.current[index + 1]?.focus();
      }
    }
  }

  function handleBackspaceAndEnter(e: any, index: any) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1]?.focus();
    }
    if (e.key === "Enter" && e.target.value && index < 4 - 1) {
      otpBoxReference.current[index + 1]?.focus();
    }
  }
  const hendleVerifyForgetPasswordOTP = async() => {
    try {
      let payload = {
        email: email,
        code : otp.join(""),
      }
      const apiRes =  await henceforthApi.Auth.checkEmailOTP(payload);
      console.log(apiRes,"data")
      const acessToken = await apiRes.token;
      if(acessToken){
        setCookie(null, "accessToken", acessToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      }
      router.push({
        pathname:"/resetpassword",
        query:{
          email: email
        }
      })  
    } catch (error) {
      console.log("error in email otp check", error)
    }
  }

  return (
    <>
    <section className="h-100">
    <div className="container-fluid ">
      <div className="row">
        <div className="col-6 ">
          <div className="login-top mt-3 px-4 mx-5">
            <img src={henceforthlogo.src} className="m-4" alt="" />
          </div>
          <div className="forget-password mx-5 d-flex flex-column justify-content-center">
            <div>
              <p className="fs-4 px-4 fw-medium m-0 ">Enter 4 Digit Code</p>
              <p className="fs-6 px-4 text-secondary mb-0">Enter 4 digit code that you received on your email</p>
              <p className='user-email text-success  px-4 mb-3 fs-6'>{email}<span className='fs-6'><MdEdit /></span></p>
            </div>
            <div className="otp-field d-flex px-3 ">
                  {otp.map((digit, index) => (
                    <input
          
                      key={index}
                      value={digit}
                      maxLength={1}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                      ref={(reference) =>
                        (otpBoxReference.current[index] = reference)
                      }
                    />
                  ))}
                </div>    
            <div className='resend-otp mx-4 mb-3'><p>Resend Code in <span className='text-success'>00:30</span></p></div>
        
            <button className='btn  px-4 mx-4 mb-3' style={{backgroundColor:"#32CD32", color:"#FFFFFF"}} onClick={hendleVerifyForgetPasswordOTP}>Submit</button>
          </div>
        </div>
        <div className="col-6 ">
          <div className="login-image ">
            <img
              src={verifyCodeImage.src}
              alt="login"
              className="img-fluid w-100 object-fit-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
    </>
  )
}

export default index