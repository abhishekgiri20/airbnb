import { Button, Form, Input, Select, Spin, Upload, message } from 'antd';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import country_name from "../../../../../country_name.json"
import Layout from '@/components/Layout';
import type { UploadProps } from 'antd';
import henceforthApi from '@/utils/henceforthApi';
import { ImCross } from "react-icons/im";
import { useRouter } from 'next/router';


const index = () => {
  

  const [editData, setEditData] = useState<any>({});
  const [oldFrontImage, setOldFrontImage] = useState<any>(null);
  const [oldBackImage, setOldBackImage] = useState<any>(null);
  const [newFrontImage, setNewFrontImage] = useState<any>(null);
  const [newBackImage, setNewBackImage] = useState<any>(null);
  const { Option } = Select;
  const [showBack, setShowBack] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [showSpin, setShowSpin] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  let id = editData?.id;
 
  const getHostDocData = async() =>{
        try {
            const apiRes = await henceforthApi.host.getHostDocumentData();
            const data = apiRes.data;
            setEditData(data[0]);
            setOldFrontImage(data[0].document);
            setOldBackImage(data[0].document_back);
            if(data[0]?.document_type == 1){
              setShowBack(true);
            }
            form.setFieldsValue({
              issued_country: data[0]?.issued_country,
              document_type: data[0]?.document_name,
            });
        } catch (error) {
            console.log("error in get host data", error)
        }
  }

  useEffect(()=>{
    getHostDocData();
  },[])


 
  const props: UploadProps = {

      name: 'file',
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
     const apiRes = await henceforthApi.host.hostDocumentImgUplaod(newFrontImage);
      return apiRes.data;
    } catch (error) {
      console.log("error in uplaodig document img", error)
    }
  }

  const handBackImgUpload = async() =>{
    try {
     const apiRes = await henceforthApi.host.hostDocumentImgUplaod(newBackImage);
      return apiRes.data;
    } catch (error) {
      console.log("error in uplaodig document img", error)
    }
  }



  //handle host  edit document frorm upload
  const handleDocumentUpload = async(values:any) => {

   setShowSpin(true);
   let backImgResponse = "null";
   let document_name = "";
   let frontImgResponse =  oldFrontImage ? oldFrontImage : await handleFrontImgUpload();
   if(values.document_type == 1){
        backImgResponse =  await handBackImgUpload();
        document_name = "aadhar card"
   }else document_name = "passport"
    try {
      let payload = {
        issued_country: values.issued_country,
        document_name:  document_name,
        document: frontImgResponse,
        document_type: values.document_type,
        document_back: backImgResponse,
      }
    
      const apiRes = await henceforthApi.host.editHostDocuments(id, payload);
      router.push("/account/business/document"); 
      setShowSpin(false);
    } catch (error:any) {
      // alert(`${error.response.body.message}`)  
    }
   
  }


  const handleValueChange = (values:any) => {
      if(values.document_type == 1){
        setShowBack(true);
        setEditData({...editData, document_type:1});
      }else{
        setShowBack(false);
        setEditData({...editData, document_type:2});
      }  
     
   }


  
  // front  image change
   const handleFrontImgChange =  async(e:any) => {   
    if (e.target.files) {
      setNewFrontImage(e.target.files[0])
    }
  }

  //back image change
  const handleBackImgChange =  async(e:any) => {   
    if (e.target.files) {
      setNewBackImage(e.target.files[0])
    }
  }

  const handleImageShown = (val:any) =>{
    if(val == 2){
      setNewFrontImage(null);
      setOldFrontImage(null);
    }else {
      setNewBackImage(null);
      setOldBackImage(null);
    } 
   
  }


  return (
    <>
      <section>
        <div className="container">
            <div className="row">
                <div className='d-flex gap-2' style={{marginTop:"150px"}}>
                    <div><Link href="/account/business/document" className='text-dark'>Business Account</Link></div>
                    <span><MdOutlineKeyboardArrowRight/></span>
                    <div><p>Document    </p></div>
                    <span><MdOutlineKeyboardArrowRight/></span>
                    <div><p>Add Document</p></div>
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <div className='mb-5'><h4>Edit Document</h4></div>
                    <div className='w-75'>
                      <Spin spinning={showSpin}>
                        <Form layout="vertical" onFinish={handleDocumentUpload} onValuesChange={handleValueChange} form={form}>
                            <Form.Item name="issued_country" label="Select the issuing country/region" rules={[{ required: true, message: "Please enter issued_country" }]}>
                                <Select placeholder="Select" size='large' showSearch allowClear>
                                    {country_name && country_name.map((res) => (
                                        <Select.Option key={res.code} value={res.name}>{res.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            
                            <Form.Item name="document_type"  label="Select the document you want to upload" rules={[{required:true, message:"Please enter document_type"}]}>
                                <Select placeholder="Select"  size='large' showSearch allowClear>
                                    <Option value="1">Aadhar Card</Option>
                                    <Option  value="2">Passport</Option>
                                </Select>
                            </Form.Item>
                            
                            {   
                              (editData?.document_type == 1)&& showBack?
                              <div className='d-flex gap-3'>
                                <div>
                                  <p >Upload front</p>
                                  {
                                     oldFrontImage?
                                     (
                                       <div style={{height:"200px",width:"310px", margin:"10px 0 48px 0"}}>
                                         <img src={`https://demoserver3.sgp1.digitaloceanspaces.com/${oldFrontImage}`} alt="" className='w-100 h-100 img-fluid object-fit-cover position-relative ' />
                                         <span className='frontImg position-absolute text-danger' style={{left:"280px",zIndex:"2"}} onClick={()=>handleImageShown(2)}><ImCross /></span>
                                       </div>  
                                     ):
                                     (
                                      newFrontImage?
                                         (
                                           <div style={{height:"200px",width:"310px", margin:"10px 0 48px 0"}}>
                                             <img src={URL.createObjectURL(newFrontImage)} alt="" className='w-100 h-100 img-fluid object-fit-cover position-relative ' />
                                             <span className='frontImg position-absolute text-danger' style={{left:"280px",zIndex:"2"}} onClick={()=>handleImageShown(2)}><ImCross /></span>
                                           </div>  
                                         ) :
                                         (
                                          <div className='border d-flex justify-content-center align-items-center mb-5' style={{height:"200px",width:"310px"}} >   
                                            <button className='px-3 py-2 bg-transparent rounded 'style={{borderColor:"#32CD32"}} type='button'>
                                            <label htmlFor="documentImage" style={{color:"#32CD32"}}>Uplaod Image</label></button>
                                            <input id='documentImage' type="file"  hidden onChange={handleFrontImgChange}/>
                                          </div>
                                         )    
                                     )
                                  }
                               
                                </div>
                              
                                <div>
                                  <p>Uplaod Back</p>
                                  {
                                    oldBackImage?
                                    (
                                      <div style={{height:"200px", margin:"10px 0 48px 0"}}>
                                         <img src={`https://demoserver3.sgp1.digitaloceanspaces.com/${oldBackImage}`} alt="" className='w-100 h-100 object-fit-cover position-relative ' />
                                         <span className='frontImg position-absolute text-danger' style={{left:"600",zIndex:"2"}} onClick={()=>handleImageShown(1)}><ImCross /></span>
                                       </div> 
                                    ) :
                                    (
                                      newBackImage?
                                      (
                                        <div style={{height:"200px", margin:"10px 0 48px 0"}}>
                                        <img src={URL.createObjectURL(newBackImage)} alt="" className='w-100 h-100 object-fit-cover position-relative ' />
                                        <span className='frontImg position-absolute text-danger' style={{left:"600px",zIndex:"2"}} onClick={()=>handleImageShown(1)}><ImCross /></span>
                                      </div>  
                                      ) :
                                      (
                                        <div className='border d-flex justify-content-center align-items-center mb-5' style={{height:"200px",width:"310px"}} >   
                                          <button type='button' className='px-3 py-2 bg-transparent rounded 'style={{borderColor:"#32CD32"}}>
                                            <label htmlFor="documentBackImage" style={{color:"#32CD32"}}>Uplaod Image</label>
                                          </button>
                                          <input id='documentBackImage' type="file" hidden  onChange={handleBackImgChange}/>
                                        </div>
                                      )
                                    )
                                  }
                                
                                </div>
                              </div>
                             
                              :
                              <div>
                                <p>Upload front</p>
                                {
                                  oldFrontImage?
                                  (
                                    <div style={{height:"200px", margin:"10px 0 48px 0"}}>
                                      <img src={`https://demoserver3.sgp1.digitaloceanspaces.com/${oldFrontImage}`} alt="" className='w-100 h-100 object-fit-cover position-relative ' />
                                      <span className='frontImg position-absolute text-danger' style={{left:"620px",zIndex:"2"}} onClick={()=>handleImageShown(2)}><ImCross /></span>
                                    </div>  
                                  ):
                                  (
                                    newFrontImage?
                                      (
                                        <div style={{height:"200px", margin:"10px 0 48px 0"}}>
                                          <img src={URL.createObjectURL(newFrontImage)} alt="" className='w-100 h-100 object-fit-cover position-relative ' />
                                          <span className='frontImg position-absolute text-danger' style={{left:"620px",zIndex:"2"}} onClick={()=>handleImageShown(2)}><ImCross /></span>
                                        </div>  
                                      ) :
                                      (
                                        <div className='border d-flex justify-content-center align-items-center mb-3' style={{height:"200px"}} >   
                                          <label className='btn btn-primary px-3 py-2 bg-transparent rounded shadow-none ' htmlFor="documentBackImage" style={{color:"#32CD32",border:"1px solid #32CD32"}}>Uplaod Image</label>
                                          <input id='documentBackImage' type="file" hidden  onChange={handleFrontImgChange}/>
                                      </div>
                                      )    
                                  )
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