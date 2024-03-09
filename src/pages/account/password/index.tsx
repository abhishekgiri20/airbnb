import Layout from '@/components/Layout';
import { Button, Form, Input, message } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import passwordImg from "../../../assets/changePasswordImg.svg"
import henceforthApi from '@/utils/henceforthApi';
import { useRouter } from 'next/router';

const index = () => {
   
  const [passwordState, setPasswordState] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const success = (message:any) => {
    messageApi.open({
      type: 'success',
      content: message,
      onClose: () =>{
        router.push("/userprofile")
      }
    });
  };
  const updateError = (message:any) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };

  const handleState = () => setPasswordState(prevState => !prevState);

  // update password
  const handleUpdatePassword = async(values:any) =>{
    try {
      let payload = {
        old_password: values.old_password,
        new_password: values.new_password,
        confirm_new_password: values.confirm_new_password,
      }
      const apiRes = await henceforthApi.Auth.changePassword(payload);
      if(apiRes.message!) success(`${apiRes.message}`);

    } catch (error:any) {
      updateError(`${error.response.body.message}`);
    }

  }

  return (
    <>
    <section >
      {contextHolder}
      <div className="container">
         <div className="row">
          <div className="col-12" style={{marginTop:"130px"}}>
            <div className="update-password-header d-flex gap-2">
              <div><Link href="/account/personal" className='text-secondary'>User Profile</Link></div>
              <div className='arrow'><span> <MdOutlineKeyboardArrowRight/></span></div>
              <div><p className='text-secondary'>Update Password</p></div>
              <div className='arrow'><span> <MdOutlineKeyboardArrowRight/></span></div>
              <div><p className='text-secondary'>Edit</p></div>
            </div>
          </div>
         </div>
         <div className="row">
           <div className="col-12 ">
            <h3 className='mb-5'>Update Password</h3>
           </div>
         </div> 
         <div className="row justify-content-between ">
          <div className="col-6">
            {
              passwordState?
              <div className='border  p-4 mb-4' >
                <div className='password-container d-flex justify-content-between'>
                 <div><p className='m-0'>Password</p></div>
                 <div className='update-btn'><p onClick={handleState}>Cancel</p></div>
                </div>              
                <Form layout="vertical" onFinish={handleUpdatePassword}>
                  <Form.Item name="old_password" label="Current password">
                    <Input.Password placeholder='Current password' size='large'/>
                  </Form.Item>
                  <Form.Item name="new_password" label="New password">
                    <Input.Password placeholder='New password' size='large'/>
                  </Form.Item>
                  <Form.Item name="confirm_new_password" label="Confirm password">
                    <Input.Password placeholder='Confirm password' size='large'/>
                  </Form.Item>     
                  <Form.Item wrapperCol={{ span: 24 }}>
                      <Button  type="primary" htmlType="submit" style={{backgroundColor:"#32CD32"}} size="large" >
                          Update Password  
                      </Button>
                  </Form.Item>                              
                </Form>
              </div>:
              <div className='password-container border p-4 d-flex justify-content-between '>
                 <div>
                  <p className='m-0'>Password</p>
                  <p>Last updated 19 days ago</p>
                 </div>
                 <div className='update-btn'><p onClick={handleState}>Update</p></div>
              </div>
            }
          </div>
          <div className="col-4">
            <div className="password-right-container border p-4 mb-5">
              <div className="password-top " style={{width:"47px", height:"47px"}}>
                  <img src={passwordImg.src} alt="" className='w-100 h-100'/>
              </div>
              <div className="password-mid  my-3 "><h6>Keeping your account secure</h6></div>
              <div className="password-bottom"><p>We regularly review accounts to make sure they’re as secure as possible. We’ll also let you know if there’s more we can do to increase the security of your account.</p></div>
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