// import { Button, Form, Input } from 'antd';
// import Link from 'next/link';
// import React from 'react'
// import resetimage from "../../assets/resetimage.jpg"
// import henceforthlogo from "../../assets/henceforthLogo.svg"
// import { useRouter } from 'next/router';
// import { parseCookies } from 'nookies';
// import henceforthApi from '@/utils/henceforthApi';
// const index = () => {
//   const router =  useRouter();
//   const token =  parseCookies().access_token;
//   console.log("token",token);

//   const handleResetPassword = async(values:any) =>{
//     try {
//       let payload = {
//         email: router.query.email,
//         password: values.password,
//         token: token
//       }
//       const apiRes =  await henceforthApi.Auth.resetPassword(payload);
//     } catch (error) {
//       console.log("error in reset password",error)
//     }
//   }
//   return (
//     <>
//        <section className="h-100">
//         <div className="container-fluid ">
//           <div className="row">
//             <div className="col-6 ">
//               <div className="login-top mt-3 px-4 mx-5">
//                 <img src={henceforthlogo.src} className="m-4" alt="" />
//               </div>
//               <div className="reset-password mx-5 d-flex flex-column justify-content-center">
//                 <div>
//                   <p className="fs-4 px-4 fw-medium m-0 ">Reset Password</p>
//                   <p className="fs-6 px-4 text-secondary mb-4">Enter the new password</p>
//                 </div>
//                 <Form layout="vertical" className="px-4" onFinish={handleResetPassword}>
//                   <Form.Item
//                     name="password"
//                     rules={[
//                       { required: true, message: "please enter your password!" },
                   
//                     ]}
//                     hasFeedback
//                   >
//                     <Input.Password
//                       placeholder="Password"
//                       size="large"
//                       autoComplete="off"
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     name="confirmpassword"
//                     rules={[
//                       { required: true, message: "please confirm your  password!" },
                   
//                     ]}
//                     hasFeedback
//                   >
//                     <Input.Password
//                       placeholder="Confirm Password"
//                       size="large"
//                       autoComplete="off"
//                     />
//                   </Form.Item>

//                   <Form.Item wrapperCol={{ span: 24 }}>
//                     <Button
//                       block
//                       type="primary"
//                       htmlType="submit"
//                       size="large"
//                       style={{ backgroundColor: "#32CD32" }}
//                     >
//                     Submit
//                     </Button>
//                   </Form.Item>
//                 </Form>
            
              
//               </div>
//             </div>
//             <div className="col-6 ">
//               <div className="reset-image ">
//                 <img
//                   src={resetimage.src}
//                   alt="login"
//                   className="img-fluid w-100 object-fit-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
  
//   )
// }

// export default index;


import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import React from 'react';
import resetimage from "../../assets/resetimage.jpg";
import henceforthlogo from "../../assets/henceforthLogo.svg";
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import henceforthApi from '@/utils/henceforthApi';

const Index = () => {
  const router = useRouter();
  const token = parseCookies().accessToken;
 
  const handleResetPassword = async (values:any) => {
    try {
      let payload = {
        email: router.query.email,
        password: values.password,
        token: token
      };
      const apiRes = await henceforthApi.Auth.resetPassword(payload);
      router.push("/auth/login")
    } catch (error) {
      console.log("error in reset password", error);
    }
  };

  return (
    <>
      <section className="h-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <div className="login-top mt-3 px-4 mx-5">
                <img src={henceforthlogo} className="m-4" alt="" />
              </div>
              <div className="reset-password mx-5 d-flex flex-column justify-content-center">
                <div>
                  <p className="fs-4 px-4 fw-medium m-0 ">Reset Password</p>
                  <p className="fs-6 px-4 text-secondary mb-4">Enter the new password</p>
                </div>
                <Form layout="vertical" className="px-4" onFinish={handleResetPassword}>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Please enter your password!" },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      placeholder="Password"
                      size="large"
                      autoComplete="off"
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      { required: true, message: "Please confirm your password!" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The two passwords do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Confirm Password"
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
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <div className="col-6">
              <div className="reset-image">
                <img
                  src={resetimage.src}
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

export default Index;
