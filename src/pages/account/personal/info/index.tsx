import Layout from '@/components/Layout';
import Link from 'next/link'
import React, { useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import personalInfoImg from "../../../../assets/personalInfoImg.svg"
import { Button, DatePicker, Form, Input, Select,Modal,Image } from 'antd';
import country from "../../../country.json"
import { useDispatch, useSelector } from 'react-redux';
import henceforthApi from '@/utils/henceforthApi';
import { Spin } from 'antd';
import { updateProfile } from '@/store/userSlice';

const index = () => {
    const { Option } = Select;
    const { TextArea } = Input;
    const profileData =  useSelector((state:any) => state.user);
    const [uploadImage, setUploadImage] = useState(null);
    
    
    const[editState , setEditState] = useState({
      editName: false,
      editGender: false,
      editDOB: false,
      editEmail: false,
      editNumber: false,
      editAddress: false,
      editDiscription: false
    })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [spin, setSpin] =  useState(false);
   
    const dispatch = useDispatch();

    //loader
    const showLoader = () => {
      setSpin(true);
      setTimeout(() => {
        setSpin(false);
      }, 5000);
    };   

    const handleNameEdit = () => {
      if (!editState.editName) {
          setEditState({...editState, editName: true});
      } else {
          setEditState({...editState, editName: false});
      }
    }
    const handleGenderEdit = () =>{
      if (!editState.editGender) {
        setEditState({...editState, editGender: true});
      } else {
        setEditState({...editState, editGender: false});
      }
    }
    const handleEditDOB = () =>{
      if (!editState.editDOB) {
        setEditState({...editState, editDOB: true});
      } else {
        setEditState({...editState, editDOB: false});
      }
    }
    const handleEditEmail = () =>{
      if (!editState.editEmail) {
        setEditState({...editState, editEmail: true});
      } else {
        setEditState({...editState, editEmail: false});
      }
    }
    const handlePhoneEdit = () => {
      if (!editState.editNumber) {
        setEditState({...editState, editNumber: true});
      } else {
        setEditState({...editState, editNumber: false});
      }
    }
    const handleAddressEdit = () => {
      if (!editState.editAddress) {
        setEditState({...editState, editAddress: true});
      } else {
        setEditState({...editState, editAddress: false});
      }
    }  
    const handleDisEdit = () => {
      if (!editState.editDiscription) {
        setEditState({...editState, editDiscription: true});
      } else {
        setEditState({...editState, editDiscription: false});
      }
    }
  

    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select style={{ width: 100 }} showSearch defaultValue={"+91"}>
          {country?.map((res) => (
              // <option value={res.dial_code} >{ res.dial_code}</option>
              <Select.Option value={res.dial_code} >{ res.dial_code}</Select.Option>
             ))
          }
        </Select>
      </Form.Item>
    );

    const handleEditData = async(value:any) =>{
      try {
        const apiRes = await henceforthApi.Auth.editProfile(value);
        console.log("response",apiRes);
        if(value?.first_name || value?.last_name){
          handleNameEdit()
        }else if(value.gender){
          handleGenderEdit();
        }else if(value.dob){
          handleEditDOB();
        }else if(value.email){
          handleEditEmail();
        }
      } catch (error) {
        console.log("error in edit data", error);
      }
      console.log("editformData...",value)
      console.log(value);
      
    }
  

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

  const handleImgChange =  async(e:any) => {
    if (e.target.files) {
      setUploadImage(e.target.files[0])
      setSpin(true);
    try {
      debugger
      const apiRes = await henceforthApi.Auth.uploadImg(e.target.files[0])
      if(apiRes){
        const imgdata = {
          profile_pic: apiRes.data,
        }
        handleEditData(imgdata)} 
        const imageData = {
          profile_pic: apiRes.data,
        } 
        dispatch(updateProfile(imageData))
    } catch (error) {
      console.log("error in uploading img", error)
    }
    setSpin(false)
  }
}

  return (
   
    <>
     <section>
        <div className="container">
            <div className="row">
                <div className="col-md-12" style={{marginTop:"130px"}}>
                    <div className="profile-header d-flex align-items-center mb-5">
                       <Link href="/account/personal">User Profile</Link>
                       <span><FaChevronRight /></span>
                       <h6 className='m-0'>Personal info</h6>
                    </div>
                    <div className='mb-4'><h4>Personal info</h4></div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="profileinfo-card d-flex flex-column align-items-center justify-content-center ">
                        <div className="profile-img ">
                            { 
                            uploadImage? <Spin spinning={spin}><Image src={URL.createObjectURL(uploadImage)} alt="" className='rounded-circle'    width={130} height={130}/></Spin> : <Spin spinning={spin} ><Image src={`https://demoserver3.sgp1.digitaloceanspaces.com/user/original/${profileData.intialState?.profile_pic}`} alt="" className='rounded-circle'  width={130} height={130}  onChange={showLoader} /></Spin>
                             }
                        </div>
                        <div className="upload-btn">
                            <input type="file" id='imgUpload' className='d-none' onChange={handleImgChange}/>
                            <button className='mt-3 py-1 border-0 px-4 text-white rounded-1' style={{backgroundColor:"#32CD32"}}><label htmlFor="imgUpload" style={{cursor:"pointer", backgroundColor:"#32CD32"}} > Upload Photo</label></button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="profileinfo-card d-flex flex-column  mt-3 p-3 h-auto">
                                  <div className="card-logo mb-3 " ><img src={personalInfoImg.src} alt="" style={{width:"47px"}}/></div>   
                                  <p className='fw-bold'>What info is shared with others?</p>  
                                  <p>Henceforth only release contact information for hosts and guests after a reservation is confirmed.   </p>                                                  
                            </div>                            
                        </div>
                    </div>
                </div>

                <div className="col-8">
                <Form layout="vertical" className="px-4" autoComplete='off' onFinish={handleEditData}>
                   {/* username */}
                   {
                    editState.editName?  
                   ( <div className="userinfo-card border p-3 mb-3 rounded">
                      <div className="userinfo-top d-flex align-items-center justify-content-between">
                        <p className='m-0'>Legal Name</p>
                        <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handleNameEdit}>Cancel</p>
                       </div>

                      <div className="userinfo-heading"><p className='text-secondary'>This is the name on your travel document, which could be a licence or a passport.</p></div>
                      <div className="useinfo_input w-100 d-flex gap-3">
                        <div className="input-right w-50">
                            <p>First Name</p>
                            <Form.Item name= "first_name">
                                <Input placeholder='first name'size='large' />
                            </Form.Item>

                        </div>
                        <div className="input-left w-50">
                            <p>Last Name</p>
                            <Form.Item name= "last_name" >
                                <Input placeholder='last name' size='large'/>
                            </Form.Item>
                           
                        </div>                               
                      </div>
            
                      <Form.Item>
                        <Button id='btn1'  type="primary" htmlType="submit" style={{backgroundColor:"#32CD32"}} size="large" >
                          Save
                        </Button>
                      </Form.Item>

                   </div>): 
                   (<div className="userinfo-card border p-3 mb-3 rounded">
                      <div className="userinfo-top d-flex align-items-center justify-content-between">
                        <p className='m-0'>Legal Name</p>
                        <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handleNameEdit}>Edit</p>
                      </div>
                      <div className="username mb-2"><p className='fs-6 text-secondary' > {`${profileData.intialState?.first_name} ${profileData.intialState?.last_name}`}</p></div>  
                    </div>)
                   }
               
                
                  {/* Gender */}
                  {
                    editState.editGender? 
                     (<div className="userinfo-card border p-3 mb-3 rounded">
                     <div className="userinfo-top d-flex align-items-center justify-content-between mb-2">
                         <p className='m-0'>Gender</p>
                         <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handleGenderEdit}>Cancel</p>
                     </div>   
                     <Form.Item
                         name="gender"
                         rules={[{ required: true, message: 'Please select gender!' }]} >
                            <Select placeholder="select your gender" size='large'>
                              <Option value="male">Male</Option>
                              <Option value="female">Female</Option>
                              <Option value="other">Other</Option>
                            </Select>
                     </Form.Item>                               
                     <button className=" border-0 px-3 py-2 rounded text-white" >
                       Save
                     </button>  
                       </div>) :
                       (<div className="userinfo-card border p-3 mb-3 rounded">
                      <div className="userinfo-top d-flex align-items-center justify-content-between">
                          <p className='m-0'>Gender</p>
                          <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handleGenderEdit}>Edit</p>
                      </div>
                      <div className="usergender"><p className='fs-6 text-secondary'>{profileData?.intialState?.gender}</p></div>  
                                                  
                    </div>)
                  } 

                  {/* DOB*/}
                  {
                    editState.editDOB?
                    <div className="userinfo-card border p-3 mb-3 rounded">
                    <div className="userinfo-top d-flex align-items-center justify-content-between mb-2">
                        <p className='m-0'>Date of birth</p>
                        <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handleEditDOB}>Cancel</p>
                    </div>  
                    <Form.Item >
                       <DatePicker size='large' style={{width:"100%"}}/>
                    </Form.Item>                             
                    <button className=" border-0 px-3 py-2 rounded text-white" >
                      Save
                    </button>  
                    </div> 
                    : 
                    <div className="userinfo-card border p-3 mb-3 rounded">
                     <div className="userinfo-top d-flex align-items-center justify-content-between mb-2">
                        <p className='m-0'>Date of birth</p>
                        <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handleEditDOB}>Edit</p>
                     </div>  
                     <div className="userdob"><p className='fs-6 text-secondary'>{profileData?.intialState?.dob}</p></div>
                    </div> 
                  }
                  

                  {/* email*/}
                  {
                    editState.editEmail?
                    <div className="userinfo-card border p-3 mb-3 rounded">
                    <div className="userinfo-top d-flex align-items-center justify-content-between">
                        <p className='m-0'>Email address</p>
                        <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handleEditEmail}>Cancel</p>
                    </div>

                    <div className="userinfo-heading"><p className='text-secondary'>Use an address you’ll always have access to.</p></div>
                    <Form.Item  name="email"rules={[{required: true,message: "please enter your Email!",},
                      {
                        type: "email",
                        message: "please enter valid Email!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Email" size="large"  autoComplete="off"/>
                    </Form.Item>                            
                    <button className=" border-0 px-3 py-2 rounded text-white" >
                      Verify
                    </button>  
                    </div>:
                    <div className="userinfo-card border p-3 mb-3 rounded">
                     <div className="userinfo-top d-flex align-items-center justify-content-between">
                         <p className='m-0'>Email address</p>
                         <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handleEditEmail}>Edit</p>
                     </div>
                     <div className="useremail"><p className='fs-6 text-secondary'>{profileData?.intialState?.email}</p></div>
                    </div>
                  }
                  

                  {/* number */}
                  {
                    editState.editNumber?
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
                    <button className=" border-0 px-3 py-2 rounded text-white" onClick={showModal} >
                      Verify
                    </button>  
                    </div>:
                    <div className="userinfo-card border p-3 mb-3 rounded">
                    <div className="userinfo-top d-flex align-items-center justify-content-between">
                        <p className='m-0'>Phone Number </p>
                        <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handlePhoneEdit}>Edit</p>
                    </div>
                    <div className="usernumber"><p className='fs-6 text-secondary'>+{profileData?.intialState?.country_code}{profileData?.intialState?.phone_number}</p></div>                   
                    </div>
                  }
                 

                  {/* address */}
                  {
                    editState.editAddress?
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
                       <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handleAddressEdit} >Edit</p>
                      </div>
                      <div className="useraddress"><p className='fs-6 text-secondary'>Not Provided</p></div>    
                    </div>
                  }
                
                  {/* discription */}
                  {
                    editState.editDiscription?
                    <div className="userinfo-card border p-3 mb-3 rounded">
                    <div className="userinfo-top d-flex align-items-center justify-content-between">
                        <p className='m-0'>Discription </p>
                        <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handleDisEdit}>Cancel</p>
                    </div>

                    <Form.Item >
                      <TextArea rows={4} />
                    </Form.Item>                                      
                    <button className=" border-0 px-3 py-2 rounded text-white" >
                      Save
                    </button>  
                    </div>:
                     <div className="userinfo-card border p-3 mb-3 rounded">
                     <div className="userinfo-top d-flex align-items-center justify-content-between">
                         <p className='m-0'>Discription </p>
                         <p className="c-pointer m-0" style={{cursor:'pointer',color:"#32CD32" }} onClick={handleDisEdit}>Edit</p>
                     </div>
                      <div className="userdisc"><p className='fs-6 text-secondary '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, deserunt! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta dolorem, eos illo nesciunt et aperiam consectetur doloremque magnam dolor. Id quae maxime laboriosam eveniet molestiae facilis quia fugit rem. Iure.
                      Ex veritatis inventore, atque saepe  quisquam nulla optio possimus facilis sequi, numquam aut porro distinctio nostrum temporibus veritatis id sit incidunt. Dolore minima a consequatur cumque aperiam.
                      Hic quam voluptatem aspernatur exercitationem nemo voluptat cupiditate magnam omnis eaque vitae temporibus ipsum vel alias repellat, molestiasure eum praesentium dolorem est. Quisquam explicabo deserunt fuga.! </p></div> 
                     </div>
                  }
                 
                </Form>
                </div>
            </div>
        </div>
        {/* verifynumber modal */}
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
     </section>
    </>
  )
}

index.getLayout =  function getLayout(page:any){
    return <Layout>{page}</Layout>
}

export default index