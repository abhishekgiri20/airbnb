import React from 'react';
import aboutImg from "../../assets/about_us.png";
import Layout from '@/components/Layout';
const index = () => {
  return (
    <>
    <section>
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center " style={{marginTop:"150px"}}>
                    <div className="contact-heading mt-5  fw-bolder"><h1 className='m-0'>About Us</h1></div>
                    <div className="contact-underline m-auto mb-5" style={{border:"3px solid #32CD32", width:"70px"}}></div>
                </div>  
            </div>
            <div className="row">
                <div className="col-6">
                    <div style={{marginBottom:"100px"}}><img src={aboutImg.src} alt="" /></div>
                </div>
                <div className="col-6 ">
                    <div className="aboutus-info" style={{textAlign:"justify"}}>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In in nunc vel purus sollicitudin fringilla in ve l odio.
                        Proin nec lobortis nulla. Nam sit amet dolor vehicula erat malesuada gravida.
                        Quisque consectetur risus tempor, fringilla turpis eu, sodales magna. 
                        Mauris laoreet quis elit et finibus. Maecenas et mauris a justo scelerisque elementum. 
                        Nulla facilisi. Nam rhoncus tincidunt orci, non tempus turpis mattis nec. Sed id molestie nulla,
                        at porttitor lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. 
                        Mauris vel nisi sed purus gravida faucibus ac eget velit.
                        </p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In in nunc vel purus sollicitudin fringilla in vel odio.
                        Proin nec lobortis nulla. Nam sit amet dolor vehicula erat malesuada gravida.
                        Quisque consectetur risus tempor, fringilla turpis eu, sodales magna. 
                        Mauris laoreet quis elit et finibus. Maecenas et mauris a justo scelerisque elementum. 
                        Nulla facilisi. Nam rhoncus tincidunt orci, non tempus turpis mattis nec. Sed id molestie nulla,
                        at porttitor lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. 
                        Mauris vel nisi sed purus gravida faucibus ac eget velit.
                        </p>
                       

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