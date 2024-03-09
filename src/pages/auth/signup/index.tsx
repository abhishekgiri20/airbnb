import React,{useState} from "react";
import { Form, Input, Checkbox,  Button, Row, Col, Select, message} from "antd";
import signupImage from "../../../assets/signup.jpg";
import henceforthlogo from "../../../assets/henceforthLogo.svg";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import country from "../../country.json"
import henceforthApi from "@/utils/henceforthApi";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import henceforthValidations from "@/utils/henceforthValidations";



const index = () => {
 
  const [messageApi, contextHolder] = message.useMessage();
  const { Option } = Select;
  const router =  useRouter();
  const prefixSelector = (
    <Form.Item name="country_code" noStyle>
      <Select style={{ width: 100 }} showSearch defaultValue={"+91"}>
        {country?.map((res) => (
            // <option value={res.dial_code} >{ res.dial_code}</option>
            <Select.Option value={res.dial_code} >{ res.dial_code}</Select.Option>
           ))}
      </Select>
    </Form.Item>
  );

  const success = (message:any ,email:any,number:any) => {
    messageApi.open({
    type: 'success',
    content: `${message}`,
  });
  router.push({
    pathname: "/auth/verify-email",
    query: { country_code:"+91",
    phone_number:number,
    email: email}
  });
  };

  const handleSendEmailVerification = async(email:any) =>{
    try {
      let payload = {
        email: email,
      }
      const apiRes = await henceforthApi.Auth.sendEmailVerification(payload);
    } catch (error) {
      console.log("error in  email verification",error)
    }
  }

  const handleFormData = async(value:any) =>{
    try {
      let payload = {
        first_name: value.first_name,
        last_name: value.last_name,
        email: value.email,
        country_code: value.country_code,
        phone_number: value.phone_number,
        password: value.password,
        confirm_password: value.confirm_password
      }
      const apiRes = await henceforthApi.Auth.signUp(payload);
      const data = apiRes.data;
      console.log("from response..........",data)
      const acessToken = await data?.access_token;
      if(acessToken){
        setCookie(null, "accessToken", acessToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      }
      success("signup Successfully",value.email,value.phone_number); 
      handleSendEmailVerification(value.email);
    } catch (error) {
      console.log("error in signup",error)
    }       
   }                   
 
    const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    };

  return (
    <>
      <section>
      {contextHolder}
        <div className="container-fluid ">
          <Row className="h-100">
            <Col span={24} md={12}>
              <div className="main-auth-wrapper pt-4">
                <div className="signup-wrapper mt-3 px-4 mx-5">
                  <div className="logo-wrapper m-4">
                    <Link href="/">
                    <img src={henceforthlogo.src} alt="logo" />
                  </Link>
                  </div>
                  <div className="signup-form-wrapper">
                      <div><p className='fs-4 fw-semibold' >Sign Up</p></div>

                    <Form layout="vertical" onFinish={handleFormData}  onFinishFailed={onFinishFailed} autoComplete="off">

                      {/* first name */}

                      <Form.Item
                        label="First Name"
                        name="first_name"
                        rules={[
                          { required: true,message: "Please enter your username!",},
                          { whitespace: true , message:"name can't be empty!"},
                          { min: 5, message:"first name must be atleast 5 characters!" },
                        ]}
                        hasFeedback
                      >
                        <Input placeholder="First Name" size="large"/>
                      </Form.Item>

                      {/* lastname */}
                      <Form.Item
                        label="Last Name"
                        name="last_name"
                        rules={[
                          { required: true,message: "Please enter your lastname!",},
                          { whitespace: true , message:"name can't be empty!"},
                          
                        ]}
                        hasFeedback
                      >
                        <Input placeholder="Last Name" size="large"/>
                      </Form.Item>

                      {/* email */}
                      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }, () => ({
                       validator(_, value) {
                          if (value) {
                          if (!henceforthValidations.email(value)) {
                          return Promise.reject("Please enter correct email");
                         } 
                        return Promise.resolve();
                       }
                        else {
                           return Promise.resolve();
                            }
                       },
                        })]}
                        hasFeedback>
                        <Input placeholder="Email" size="large"  autoComplete="off"/>
                      </Form.Item>

                      {/* phone number */}

                      <Form.Item name="phone_number" label= "Phone Number" rules={[{ required: true, message: 'Please input your phone number!' }, () => ({
                      validator(_, value) {
                      if (value) {
                      if (!henceforthValidations.NumberValidation(value)) {
                        return Promise.reject("Number should be numeric number ");
                      }
                      return Promise.resolve();
                    }
                    else {
                      return Promise.resolve();
                    }
                   },
                   })]} hasFeedback>
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} size="large"/>
                      </Form.Item>
                     
                     {/* password */}
                     <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }, () => ({
                          validator(_, value) {
                          if (value) {
                             if (!henceforthValidations.strongPassword(value)) {
                                return Promise.reject("Password must has at least 8 characters that include at least 1 (lowercase , uppercase , number, and special ) character in (!@#$%^&*)");
                               }
                               return Promise.resolve();
                               }
                               else {
                                 return Promise.resolve();
                                 } },})]} hasFeedback>
                        <Input.Password placeholder="Password" name="password" size="large"/>
                      </Form.Item>

                      {/* confirm password */}
                      <Form.Item                       
                        name="confirm_password"
                        dependencies={["password"]}
                        rules={[ {
                            required: true,
                            message: "please enter your confirm password!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                "confirm password does not match"
                              );
                            },
                          }),
                        ]}
                        hasFeedback
                      >
                        <Input.Password
                          placeholder="Confirm password"
                          name="changepassword"
                          size="large"
                        />
                      </Form.Item>                     
                      

                      {/* chechbox */}
                      <Form.Item
                        name="agreement"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message:"Please accept terms and conditions!"
                        //   },
                        // ]}
                      >
                        <Checkbox>
                          Agree to <Link href="#" >Terms of service</Link> and <Link href="#"> Privacy policy</Link>
                        </Checkbox>
                      </Form.Item>

                      <Form.Item wrapperCol={{ span: 24 }}>
                        <Button block type="primary" htmlType="submit" style={{backgroundColor:"#32CD32"}} size="large" >
                          Sign Up
                          
                        </Button>
                      </Form.Item>
                    </Form>


                    <div className="my-3 ">
                        <div className="text-center">
                          <div className="d-flex align-items-center">
                            <div className="border-0 border-bottom w-100">
                              </div><div className="mx-2"><p className="mb-0">or</p></div>
                              <div className="border-0 border-bottom w-100"></div>
                            </div>
                          </div>
                    </div>

                    <div className='google-btn  d-flex '>
                        <span className='fs-4 px-3  '><FcGoogle /></span>
                        <button className='btn bg-tranparent border-0 w-100'>Continue with Google</button>
                    </div>
                    <div className='facebook-btn  d-flex my-3'>
                        <span className='fs-4 px-3  '><FaFacebook /></span>
                        <button className='btn bg-tranparent border-0 w-100'>Continue with Facebook</button>
                    </div>      
                    <div className="text-center">
                      <p className='mt-4 fs-6'>
                        Already have an account?{" "}
                        <Link href={"/auth/login"}>
                           Log in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={24} md={12}>
              <img
                className="img-fluid h-100 "
                src={signupImage.src}
                alt="Auth Image"
              />
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default index;
