import React from "react";
import loginImage from "../../../assets/signup.jpg";
import henceforthlogo from "../../../assets/henceforthLogo.svg";
import { Form, Input, Checkbox, Button, message } from "antd";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import henceforthApi from "@/utils/henceforthApi";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

const index = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const router  = useRouter();
     const success = (message:any) => {
       messageApi.open({
       type: 'success',
       content: `${message}`,
       onClose: () =>{
        router.push("/");
       }
     });  
   };
   const loginError = (message:any) => {
    messageApi.open({
      type: 'error',
      content: `${message}`,
    });
  };

  const handleLoginData = async(value:any) =>{
       try {
        let payload = {
          email: value.email,
          password: value.password,
        }
        const apiRes =  await henceforthApi.Auth.login(payload);
        console.log(apiRes,"response..........")
        const data = apiRes.data;
        const acessToken =  await data?.access_token;
        if(acessToken){
          setCookie(null, "accessToken", acessToken, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
        }  
        success("Login Successfully");
        console.log("login data......",data);
        console.log("login token....",acessToken)
       } catch (error:any) {
        loginError(`${error.response.body.message}`)
       }

      
  }
  return (
    <>
      <section className="h-100">
      {contextHolder}
        <div className="container-fluid ">
          <div className="row">
            <div className="col-6 ">
              <div className="login-top mt-3 px-4 mx-5">
                  <Link href="/">
                    <img src={henceforthlogo.src} className="m-4"  alt="logo" />
                  </Link>
                
              </div>
              <div className="login-bottom mx-5">
                <div>
                  <p className="fs-4 px-4 fw-semibold">Log In</p>
                </div>
                <Form layout="vertical" className="px-4" onFinish={handleLoginData}>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "please enter your Email!" },
                      { type: "email", message: "please enter valid Email!" },
                    ]}
                    hasFeedback
                  >
                    <Input
                      placeholder="Email"
                      size="large"
                      autoComplete="off"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password placeholder="Password" size="large" />
                  </Form.Item> 
                   <div className="d-flex justify-content-between ">
                   <Form.Item name="remember">
                    <Checkbox>Remember Me</Checkbox>  
                  </Form.Item>
                  <Link href="/forgetpassword" className="fs-6" >Forget Password?</Link>
                   </div>
              
                  

                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button
                      block
                      type="primary"
                      htmlType="submit"
                      size="large"
                      style={{ backgroundColor: "#32CD32" }}
                    >
                     Log In 
                    </Button>
                  </Form.Item>
                </Form>
                <div className="my-3 px-4">
                  <div className="text-center">
                    <div className="d-flex align-items-center">
                      <div className="border-0 border-bottom w-100"></div>
                      <div className="mx-2">
                        <p className="mb-0">or</p>
                      </div>
                      <div className="border-0 border-bottom w-100"></div>
                    </div>
                  </div>
                </div>
                <div className="google-btn  d-flex mx-4">
                  <span className="fs-4 px-3  ">
                    <FcGoogle />
                  </span>
                  <button className="btn bg-tranparent border-0 w-100">
                    Continue with Google
                  </button>
                </div>
                <div className="facebook-btn  d-flex mx-4 my-3">
                  <span className="fs-4 px-3  ">
                    <FaFacebook />
                  </span>
                  <button className="btn bg-tranparent border-0 w-100">
                    Continue with Facebook
                  </button>
                </div>
                <div className="text-center ">
                  <p className="mt-4">
                    Don't have an account?{" "}
                    <Link href={"/auth/signup"}>Sign Up</Link>
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
  );
};

export default index;
