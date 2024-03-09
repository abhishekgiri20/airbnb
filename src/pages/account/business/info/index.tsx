import Link from 'next/link';
import React, { useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import businessInfoImg from "../../../../assets/personalInfoImg.svg"
import { Form, Input, Select } from 'antd';
import country from "../../../country.json"
import Layout from '@/components/Layout';
const index = () => {

  const [businessState, setBusinessState] = useState({
    addressState: false,
    numberState: false,
    companyNameState: false,
  })

  const handleAddressEdit = () => {
    if (!businessState.addressState) {
      setBusinessState({...businessState, addressState: true});
    } else {
      setBusinessState({...businessState, addressState: false});
    }
  }
  const handlePhoneEdit = () => {
    if (!businessState.numberState) {
      setBusinessState({...businessState, numberState: true});
    } else {
      setBusinessState({...businessState, numberState: false});
    }
  }
  const handleCompanyState = () =>{
    if(!businessState.companyNameState){
      setBusinessState({...businessState, companyNameState:true});
    } else {
      setBusinessState({...businessState, companyNameState:false});
    }
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
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
           <div className="col-md-12" style={{marginTop:"130px"}}>
              <div className="profile-header d-flex align-items-center mb-5 gap-3">
                <Link href="/account/business" className='text-secondary p-0 '>Business Account</Link>
                <span><FaChevronRight /></span>
                <p className='m-0 text-secondary'>Business Info</p>
              </div>
              <div className='mb-4'><h4>Business Info</h4></div>
           </div>
         </div>
         <div className="row">
            <div className="col-4">
            <div className="profileinfo-card d-flex flex-column align-items-center justify-content-center ">
                <div className="profile-img">
                    {/* { 
                      uploadImage? <img src={URL.createObjectURL(uploadImage)} alt=""  className='w-100 h-100 rounded-circle'/>: <img src={`https://demoserver3.sgp1.digitaloceanspaces.com/user/original/${profileData.intialState?.profile_pic}`} alt="" className='w-100 h-100 rounded-circle'/>
                    } */}
                </div>
                <div className="upload-btn">
                    <input type="file" id='imgUpload' className='d-none'  />
                    <button className='mt-3 py-1 border-0 px-4 text-white rounded-1' style={{backgroundColor:"#32CD32"}}><label htmlFor="imgUpload" style={{cursor:"pointer", backgroundColor:"#32CD32"}} > Upload Photo</label></button>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mb-5">
                  <div className="profileinfo-card d-flex flex-column  mt-3 p-3 h-auto">
                    <div className="card-logo mb-3 " ><img src={businessInfoImg.src} alt="" style={{width:"47px"}}/></div>   
                    <p className='fw-bold'>What info is shared with others?</p>  
                    <p>Henceforth only release contact information for hosts and guests after a reservation is confirmed.   </p>                                                  
                </div>                            
                </div>
            </div>
            </div>
            <div className="col-8">
              {
                businessState.addressState?
                <div className="userinfo-card border p-3 mb-3 rounded">
                <div className="userinfo-top d-flex align-items-center justify-content-between">
                    <p className='m-0'>Address</p>
                    <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handleAddressEdit}>Cancel</p>
                </div>

                <div className="userinfo-heading"><p className='text-secondary'>Use a permanent address where you can receive mail.</p></div>
                
                    <div>
                        <p>Street address</p>
                        <Form.Item name= "street">
                           <Input placeholder='House name/number +street /road'size='large'/>
                        </Form.Item>
                    </div>
                    <div>
                        <p>Flat, suite. (Optional)</p>
                        <Form.Item name= "flat">
                           <Input placeholder='Flat, suite, building access code'size='large'/>
                        </Form.Item>
                    </div>                            
                    <div className="useinfo_input w-100 d-flex gap-3">
                       <div className="input-right w-50">
                        <p>City</p>
                        <Form.Item name= "city">
                            <Input size='large'/>
                        </Form.Item>

                        </div>
                        <div className="input-left w-50">
                          <p>State</p>
                          <Form.Item name= "state" >
                            <Input size='large'/>
                          </Form.Item>
                        </div>                               
                    </div>
                    <div className="useinfo_input w-100 d-flex gap-3">
                       <div className="input-right w-50">
                        <p>Post</p>
                        <Form.Item name= "post">
                            <Input size='large'/>
                        </Form.Item>

                        </div>
                        <div className="input-left w-50">
                          <p>Country</p>
                          <Form.Item name= "country" >
                            <Input size='large'/>
                          </Form.Item>
                        </div>                               
                    </div>                            
                <button className=" border-0 px-3 py-2 rounded text-white" >
                  Save
                </button>  
                </div> :
                <div className="userinfo-card border p-3 mb-3 rounded">
                  <div className="userinfo-top d-flex align-items-center justify-content-between">
                   <p className='m-0'>Address</p>
                   <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }}  onClick={handleAddressEdit} >Edit</p>
                  </div>
                  <div className="useraddress"><p className='fs-6 text-secondary'>N/A</p></div>    
                </div>
              }

              {
                businessState.numberState?
                <div className="userinfo-card border p-3 mb-3 rounded">
                <div className="userinfo-top d-flex align-items-center justify-content-between">
                    <p className='m-0'>Phone Number </p>
                    <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handlePhoneEdit}>Cancel</p>
                </div>

                <div className="userinfo-heading"><p className='text-secondary'>For notifications, reminders, and help logging in</p>
                </div>
                <Form.Item name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} size="large"/>
                </Form.Item>                                        
                <button className=" border-0 px-3 py-2 rounded text-white" >
                  Save
                </button>  
                </div>:
                <div className="userinfo-card border p-3 mb-3 rounded">
                <div className="userinfo-top d-flex align-items-center justify-content-between">
                    <p className='m-0'>Phone Number </p>
                    <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handlePhoneEdit}>Edit</p>
                </div>
                {/* <div className="usernumber"><p className='fs-6 text-secondary'>+{profileData[0]?.country_code} {profileData[0]?.phone_number}</p></div>                    */}
                </div>
              }
              {
                businessState.companyNameState?
                <div className="userinfo-card border p-3 mb-3 rounded">
                <div className="userinfo-top d-flex align-items-center justify-content-between mb-3">
                    <p className='m-0'>Registered Company Name</p>
                    <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handleCompanyState}>Cancel</p>
                </div>
                <Form.Item  name="company"  rules={[{required: true,message: "please enter your Email!",}]}>
                 <Input placeholder="Enter your company name" size="large"  autoComplete="off"/>
                </Form.Item>                            
                <button className=" border-0 px-3 py-2 rounded text-white" >
                  Save
                </button>  
                </div>:
                <div className="userinfo-card border p-3 mb-3 rounded">
                 <div className="userinfo-top d-flex align-items-center justify-content-between">
                     <p className='m-0'>Registered Company Name</p>
                     <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handleCompanyState}>Edit</p>
                 </div>
                 {/* <div className="useremail"><p className='fs-6 text-secondary'>{profileData[0]?.email}</p></div> */}
                </div>                
              }
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