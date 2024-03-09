import Layout from '@/components/Layout';
import Link from 'next/link';
import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import paymentcardImg from "../../../../assets/paymentImg.svg"
import { Button, DatePicker, Divider, Form, Input, Select } from 'antd';
import henceforthValidations from '@/utils/henceforthValidations';
import country from "../../../country.json"

const index = () => {
    const [paymentState, setPaymentState] = useState(false);
    const { Option } = Select;


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

    const handlePaymentState = () =>{
        if(paymentState){
            setPaymentState(false);
        }else{
            setPaymentState(true);
        }
    }
  return (
    <>
    <section>
        <div className="container">
            <div className="row">
                <div className="col-12" style={{marginTop:"130px"}}>
                    <div className='d-flex gap-2'>
                        <div><Link href="/account/business">Business Account</Link></div>
                        <div><span> <MdOutlineKeyboardArrowRight/></span></div>
                        <div><p>Payments & Payouts</p></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6 p-4">
                    <div><h3 className='mb-5'>Payments & Payouts</h3></div>
                    {
                        paymentState?
                        <Form layout="vertical">
                            <Form.Item label="Full Name" rules={[{required:true, message:"Please enter your name!"}]}>
                                <Input placeholder="Enter your name" size='large'/>
                            </Form.Item>
                            <Form.Item name="phone_number" label= "Phone Number" rules={[{ required: true, message: 'Please input your phone number!' }, () => ({
                               validator(_, value) {
                              if (value) {
                                    if (!henceforthValidations.NumberValidation(value)) {
                                    return Promise.reject("Number should be numeric number ");
                                    }
                                 return Promise.resolve();
                                } else {
                                    return Promise.resolve();
                                    }},})]} hasFeedback>
                                <Input addonBefore={prefixSelector} style={{ width: '100%' }} size="large"/>
                            </Form.Item>

                            {/* address */}
                            <Form.Item label="Full address">
                                <Input placeholder='Enter full address' size='large'/>
                            </Form.Item>

                            {/* account number */}
                            <Form.Item label="Account Number" rules={[{required:true,message:"Please enter account number"}]}>
                                <Input placeholder='eg. 1234567890' size='large'/>
                            </Form.Item>

                            {/* routing number */}
                            <Form.Item label="Routing Number" rules={[{required:true,message:"Please enter routing number!"}]}>
                                <Input placeholder='eg. 1234' size='large'/>
                            </Form.Item>

                            {/* ssn number */}
                            <Form.Item label="Last 4 SSN Number" rules={[{required:true,message:"Please enter SSN number!"}]}>
                                <Input placeholder='eg. 123' size='large'/>
                            </Form.Item>

                            {/* dob */}
                            <Form.Item label="DOB">
                                <DatePicker placeholder='Select date' allowClear style={{width:"100%"}} size ="large"/>
                            </Form.Item>

                            <div className='d-flex gap-4'>
                              <Form.Item>
                                 <Button type="primary" size='large' style={{backgroundColor:"#32CD32" }}>Submit</Button>
                              </Form.Item>
                              <Button size='large'  onClick={handlePaymentState}>Cancel</Button>
                            </div>        
                          
                        </Form>
                        :
                        <div>
                            <div><h5 className='text-bolder'>Payment methods</h5></div>
                            <div className='w-75 '>
                               <p className='text-secondary mb-5'>When you receive a payment for a reservation, we call that payment to you a "payout".
                                 Our secure payment system supports several payout methods, which can be set up below.
                              </p>
                            </div>
                            <div className="payment-btn"><button className='btn btn-outline-primary' onClick={handlePaymentState}>Connect with Stripe</button></div>
                        </div>
                    }
                    
                </div>
                <div className="col-6 d-flex justify-content-end">
                    <div className='payment-card border w-75 mb-5 p-4' style={{height:"280px"}}>
                        <div><img src={paymentcardImg.src} alt="" /></div>
                        <div><h5 className='py-3'>Make all payments through Henceforth</h5></div>
                        <div><p>Always pay and communicate through with us to ensure you’re protected under our Terms of Service, Payments Terms of Service, cancellation, and other safeguards. Learn more</p></div>
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

export default index