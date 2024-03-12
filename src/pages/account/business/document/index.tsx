import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdDelete, MdOutlineKeyboardArrowRight } from "react-icons/md";
import documentImg from "../../../../assets/document.svg"
import Layout from '@/components/Layout';
import henceforthApi from '@/utils/henceforthApi';
import { Image } from 'antd';
import { MdModeEditOutline } from "react-icons/md";

const index = () => { 
    
    const [documentData, setDocumentData] = useState<any>({});

    const getDocumentData = async() =>{
      try {
          const apiRes = await henceforthApi.host.getHostDocumentData();
          const data = apiRes.data;
          setDocumentData(data[0]);
         
      } catch (error) {
          console.log("Error in getting document data",error)
      }
    }
    useEffect(()=>{
      getDocumentData();
    },[])
  
  
    const handleDocumentDelete = async() =>{
      let id = documentData?.id;
      try {
          const apiRes = await henceforthApi.host.deleteHostDocument(id);
          getDocumentData();
          console.log("document delete.......",apiRes)
      } catch (error) {
          console.log("error in deleting document",error)
      }
    }
  
  return (
    <>
    <section>
       <div className="container" >
        <div className="row">
            <div className="col-12" style={{marginTop:"130px"}}>
                <div className="document-link d-flex gap-2 mb-4">
                    <div><Link href="/account/business" className='text-dark'>Business Account</Link></div>
                    <div><span><MdOutlineKeyboardArrowRight/></span></div>
                    <div><p>Document</p></div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-7 ">
                <div className='mb-4'><h4>Document</h4></div>
                {
                    documentData?
                    <div className='border p-4' style={{ width: "300px", height: "250px" }}>
                        <div className='d-flex justify-content-between'>
                           <div className="document-name">
                              <p>{documentData?.document_name}</p>
                           </div>
                           <div>
                              <p className='text-danger'>Not Verified</p>
                            </div>
                        </div>
                       
                            {
                              (documentData?.document_type == 2)?
                                <div className="image-container">
                                    <div>
                                     <Image src={`https://demoserver3.sgp1.digitaloceanspaces.com/${documentData?.document}` } alt="Document"/>
                                    </div>
                                </div>
                                :
                                <div className='d-flex gap-3'>
                                    <div className="image-container">
                                        <div>
                                            <Image src={`https://demoserver3.sgp1.digitaloceanspaces.com/${documentData?.document}` } alt="Document"/>
                                        </div>
                                    </div> 
                                    <div className="image-container">
                                        <div>
                                            <Image src={`https://demoserver3.sgp1.digitaloceanspaces.com/${documentData?.document_back}` } alt="Document"/>
                                        </div>
                                    </div>
                                </div>

                            }
                           
                        
                        
                        <div className='document-btns  pt-3 w-100 d-flex  justify-content-between' >
                            <Link className='btn btn-primary text-white shadow-none py-2 px-4' href={`/account/business/document/${documentData?.id}/edit`} style={{backgroundColor:"#32cd32",border:"1px solid #32cd32"}}><span className='text-white px-2'><MdModeEditOutline /></span>Edit</Link>    
                            <div><button className='btn text-white d-flex py-2 px-3' style={{backgroundColor:'red'}} onClick={handleDocumentDelete}><span className=' px-2'><MdDelete/></span>Delete</button></div>
                        </div>
                    </div>

                   :
                    <div><p className='fs-3'>No Document Found</p></div>
                }
                
            </div>
            <div className="col-5">
                <div className="add-btn text-end  me-5 ">
                    {
                        documentData?""
                        :
                        <Link className='btn btn-primary text-white shadow-none py-2 px-4' href = "/account/business/document/add" style={{backgroundColor:"#32cd32",border:"1px solid #32cd32",fontWeight:"500"}}>Add Document</Link>
                        // <button className='p-2 border-0 rounded' style={{backgroundColor:"#32CD32"}}><Link href="/account/business/document/add" className='text-white'>Add Document</Link></button>
                    }
                   
                </div>
                <div className='d-flex justify-content-end me-5'>
                    <div className='w-75 border p-3 mt-5 mb-5'>
                        <div className="document-top"><img src={documentImg.src} alt="" /></div>
                        <div className="document-mid py-3"><h5>Update your document updated & safe</h5></div>
                        <div className="document-bottom"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel ligula vel leo gravida consequat. Nam turpis nisi, pulvinar eu lectus eu, imperdiet feugiat enim.</p></div>
                    </div>
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