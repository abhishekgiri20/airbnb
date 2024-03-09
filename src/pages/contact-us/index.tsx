import React from 'react'
import contactImg from "../../assets/contact_us.png"
import Layout from '@/components/Layout'
import { Button, Form, Input, Select } from 'antd'
import henceforthValidations from '@/utils/henceforthValidations'
import country from "../country.json"

const index = () => {

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
  return (
    <>
    <section>
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center " style={{marginTop:"150px"}}>
                    <div className="contact-heading mt-5 fw-bolder"><h1 className='m-0'>Contact Us</h1></div>
                    <div className="contact-underline m-auto" style={{border:"3px solid #32CD32", width:"70px"}}></div>
                </div>
            </div>
            <div className="row" style={{marginTop:"50px"}}>
                <div className="col-md-6 d-flex align-items-center">
                    <div className="contact-profileImg p-5"style={{width:"560px", height:"400px", }} >
                        <img src= {contactImg.src} alt="" className='w-100 h-100' />
                    </div>
                </div>
                <div className="col-md-6 mb-3   ">
                    <Form layout="vertical" autoComplete="off" >
                        {/* name */}
                        <Form.Item name="name" label="Name" rules={[{required: true, message:"Please input your name!"}]}>
                            <Input placeholder='Enter name' size="large"/>
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

                        {/* phone */}
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
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} size="large" placeholder='Enter phone number'/>
                        </Form.Item>  

                        {/* subject*/}
                        <Form.Item name="subject" label="Subject" rules={[{required:true, message: "Please input your subject!"}]}>
                            <Input placeholder='Write your subject' size='large'/>
                        </Form.Item>

                        {/* message */}
                        <Form.Item name="message " label="Message">
                            <Input.TextArea placeholder='Write your message'/>
                        </Form.Item>
                        
                        <Form.Item>
                         <Button   type="primary" htmlType="submit" style={{backgroundColor:"#32CD32"}} size="large" >
                            Submit  
                         </Button>                            
                        </Form.Item>
                    </Form>
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
export default index