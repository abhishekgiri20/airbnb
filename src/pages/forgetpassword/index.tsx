import Link from 'next/link'
import React from 'react'
import loginImage from "../../assets/signup.jpg"
import henceforthlogo from "../../assets/henceforthLogo.svg"
import { Button, Form, Input } from 'antd'
import henceforthApi from '@/utils/henceforthApi'
import { useRouter } from 'next/router'
const index = () => {
  const router = useRouter();

  const handleForgetPassword = async(value:any) => { 
    try {
      let payload = {
        email: value.email,
      } 
      const apiRes = await henceforthApi.Auth.forgetPassword(payload);
      router.push({
        pathname:"/entercode",
        query:{
          email:value.email,
        }
      })
    } catch (error) {
      console.log("error in forget password", error);
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
                  <p className="fs-4 px-4 fw-medium m-0 ">Forget Password</p>
                  <p className="fs-6 px-4 text-secondary mb-4">Please enter your email below, so we can send you a confirmation code.</p>
                </div>
                <Form layout="vertical" className="px-4" onFinish={handleForgetPassword}>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "please enter your Email!" },
                      { type: "email", message: "please enter valid Email!" },
                    ]}
                    hasFeedback
                  >
                    <Input
                      placeholder="Email address"
                      size="large"
                      autoComplete="off"
                    />
                  </Form.Item>

                 

                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button
                      block
                      type="primary"
                      htmlType="submit"
                      size="large"
                      style={{ backgroundColor: "#32CD32" }}
                    >
                     Request OTP
                    </Button>
                  </Form.Item>
                </Form>
            
               
                <div className="text-center ">
                  <p className="mt-4">
                    Go back to
                    <Link href={"/auth/login"}>Log In</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 ">
              <div className="login-image ">
                <img
                  src={loginImage.src}
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