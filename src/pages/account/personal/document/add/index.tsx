import { Button, Form, Select,Spin,message } from 'antd';
import Link from 'next/link'
import React, { useState } from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import country_name from "../../../../country_name.json"
import Layout from '@/components/Layout';
import type { UploadProps } from 'antd';
import henceforthApi from '@/utils/henceforthApi';
import { ImCross } from "react-icons/im";
import { useRouter } from 'next/router';


const index = () => {

    const { Option } = Select;
    const [showBack, setShowBack] = useState(false);
    const [frontImg, setFrontImg] = useState<any>(null);
    const [backImg, setBackImg] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [showSpin, setShowSpin] = useState(false);
    const router = useRouter();
 

    const props: UploadProps = {
        name: 'file',
        // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
            console.log(info,'infoe');

          }
          if (info.file.status === 'done') {
            message.success(`file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`file upload failed.`);
          }
        },
      };


    const handleFrontImgUpload = async() =>{
      try {
       const apiRes = await henceforthApi.Auth.documentImgUplaod(frontImg);
        return apiRes.data;
      } catch (error) {
        console.log("error in uplaodig document img", error)
      }
    }

    const handBackImgUpload = async() =>{
      try {
       const apiRes = await henceforthApi.Auth.documentImgUplaod(backImg);
        return apiRes.data;
      } catch (error) {
        console.log("error in uplaodig document img", error)
      }
    }

    const handleDocumentUpload = async(values:any) => {
      setShowSpin(true);
     let backImgResponse = "null";
     let document_name = "";
     let frontImgResponse = await handleFrontImgUpload();
     if(values.document_type == 1){
          backImgResponse =  await handBackImgUpload();
          document_name = "aadhar card"
     }else   document_name = "passport"
      try {
        let payload = {
          issued_country: values.issued_country,
          document_name:  document_name  ,
          document: frontImgResponse,
          document_type: values.document_type,
          document_back: backImgResponse,
        }
      
        const apiRes = await henceforthApi.Auth.uploadDocuments(payload);
        router.push("/account/personal/document"); 
        setShowSpin(false);
      } catch (error:any) {
        // alert(`${error.response.body.message}`)
        
      }
     
    }

    const handleValueChange = (values:any) => {
        if(values.document_type == 1){
          setShowBack(true);
          
        }else  setShowBack(false);
     }



    // front  image change
     const handleFrontImgChange =  async(e:any) => {   
      if (e.target.files) {
        setFrontImg(e.target.files[0])
      }
    }

    //back image change
    const handleBackImgChange =  async(e:any) => {   
      if (e.target.files) {
        setBackImg(e.target.files[0])
      }
    }

    const handleImageShown = (val:any) =>{
      if(val == 2){
        setFrontImg(null);
      }else  setBackImg(null); 
     
     
    }

  

  return (
    <>
      {contextHolder}
      <section>
        <div className="container">
            <div className="row">
                <div className='d-flex gap-2' style={{marginTop:"150px"}}>
                    <div><Link href="/account/personal/document" className='text-dark'>User Profile</Link></div>
                    <div><span><MdOutlineKeyboardArrowRight/></span></div>
                    <div><p>Documents</p></div>
                    <div><span><MdOutlineKeyboardArrowRight/></span></div>
                    <div><p>Add Document</p></div>
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <div className='mb-5'><h4>Add Document</h4></div>
                    <div className='w-75'>
                      <Spin spinning={showSpin}>
                        <Form layout="vertical" onFinish={handleDocumentUpload} onValuesChange={handleValueChange}>
                            <Form.Item name="issued_country" label="Select the issuing country/region" rules={[{required:true,message:"Please enter issued_country"}]}>
                                <Select placeholder="Select" size='large' showSearch allowClear>
                                    {
                                        country_name?.map((res)=>(
                                            <Select.Option key={res.code} value={res.name}>{res.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item name="document_type" label="Select the document you want to upload" rules={[{required:true, message:"Please enter document_type"}]}>
                                <Select placeholder="Select" size='large' showSearch allowClear>
                                    <Option value="1">Aadhar Card</Option>
                                    <Option  value="2">Passport</Option>
                                </Select>
                            </Form.Item>
                            {
                              showBack?
                              <div className='d-flex gap-3'>
                                  <div>
                                  <p >Upload front</p>
                                    {
                                      frontImg?
                                      <div style={{height:"200px",width:"300px", margin:"10px 0 20px 0"}}>
                                        <img src={URL.createObjectURL(frontImg)} alt="" className='w-100 h-100 object-fit-cover position-relative ' />
                                        <span className='frontImg position-absolute text-danger' style={{left:"280px",zIndex:"2"}} onClick={()=>handleImageShown(2)}><ImCross /></span>
                                     </div>
                                     :
                                     <div>
                                        <div className='border d-flex justify-content-center align-items-center mb-3' style={{height:"200px", width:"310px"}}  >   
                                            <button className='px-3 py-2 bg-transparent rounded 'type='button' style={{borderColor:"#32CD32"}}>
                                              <label htmlFor="documentImage" style={{color:"#32CD32"}}>Uplaod Image</label>
                                            </button>
                                            <input id='documentImage' type="file" onChange={handleFrontImgChange} hidden/>
                                        </div>  
                                     </div>
                                    }
                                      
                                     
                                  </div>
                                  <div>
                                    <p >Upload Back</p>
                                    {
                                      backImg?
                                      <div style={{height:"200px",width:"300px", margin:"10px 0 20px 0"}}>
                                        <img src={URL.createObjectURL(backImg)} alt="" className='w-100 h-100 object-fit-cover position-relative ' />
                                        <span className='backImg position-absolute text-danger' style={{left:"600px",zIndex:"2"}} onClick={handleImageShown}><ImCross /></span>
                                      </div>
                                      :
                                      <div className='border d-flex justify-content-center align-items-center mb-3' style={{height:"200px",width:"310px"}} >   
                                        <button type='button' className='px-3 py-2 bg-transparent rounded 'style={{borderColor:"#32CD32"}}>
                                          <label htmlFor="documentBackImage" style={{color:"#32CD32"}}>Uplaod Image</label>
                                        </button>
                                        <input id='documentBackImage' type="file" hidden  onChange={handleBackImgChange}/>
                                    </div>
                                     }
                                  </div> 
                              </div>
                               :
                              <div>
                                <p >Upload front</p>
                                {
                                  frontImg?
                                   <div style={{height:"200px", margin:"10px 0 20px 0"}}>
                                    <img src={URL.createObjectURL(frontImg)} alt="" className='w-100 h-100 object-fit-cover position-relative ' />
                                    <span className=' position-absolute text-danger' style={{left:"620px",zIndex:"2"}} onClick={()=>handleImageShown(2)}><ImCross /></span>
                                   </div>
                                  :
                                  <div className='border d-flex justify-content-center align-items-center mb-5' style={{height:"200px"}} >   
                                    <button className='px-3 py-2 bg-transparent rounded 'style={{borderColor:"#32CD32"}} type='button'>
                                    <label htmlFor="documentImage" style={{color:"#32CD32"}}>Uplaod Image</label></button>
                                  <input id='documentImage' type="file"  hidden onChange={handleFrontImgChange}/>
                                </div> 
                                }
                              </div>                            
                            } 

                            <div className='d-flex gap-4'>
                  
                              <Form.Item>
                                <Button type='primary' htmlType="submit"style={{backgroundColor:"#32CD32"}} size="large">Submit</Button>
                              </Form.Item>
                              <Button type='primary' size="large" style={{backgroundColor:"#32CD32"}}><Link href="/account/personal/document">Cancel</Link></Button>
                           
                            </div>
                        </Form>
                      </Spin> 
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