import Link from 'next/link';
import React,{useState,useRef} from 'react'
import verifyNumberImage  from "../../../assets/resetimage.jpg"
import henceforthlogo from "../../../assets/henceforthLogo.svg"
import { MdEdit } from "react-icons/md";
import { Input } from 'antd';
import henceforthApi from '@/utils/henceforthApi';
import { useRouter } from 'next/router';
const index = () => {
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const otpBoxReference = useRef<(HTMLInputElement | null)[]>([]);

    const router = useRouter();
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

  const hnadlePhoneVerification = async() =>{
     try {
      let payload = {
        otp: otp.join(""),
        country_code: router.query.country_code,
        phone_number: router.query.phone_number
      }
      const apiRes = await henceforthApi.Auth.numberVerification(payload)
     } catch (error) {
       console.log("error in phone verification")
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
              <p className="fs-4 px-4 fw-medium m-0 ">Please Verify Your Phone No.</p>
              <p className="fs-6 px-4 text-secondary mb-0">Enter 4 digit code that you received on your email</p>
              <p className='user-email text-success  px-4 mb-5 fs-6'>+91-6532864505 <span className='fs-6'><MdEdit /></span></p>
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
        
            <button className='btn  px-4 mx-4 mb-3' style={{backgroundColor:"#32CD32", color:"#FFFFFF"}} onClick={hnadlePhoneVerification}>Submit</button>
            <Link href ="/" className='px-4  '><button className='btn  border w-100'>Skip</button></Link>
            
          </div>
        </div>
        <div className="col-6 ">
          <div className="login-image ">
            <img
              src={verifyNumberImage.src}
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

export default index;