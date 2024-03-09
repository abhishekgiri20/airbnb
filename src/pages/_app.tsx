// import  {store}  from "@/store/store";
import {store} from "../store/store"
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from 'nextjs-progressbar';
import { Provider } from "react-redux";


export default function App({ Component, pageProps }: any) {
 const getLayout = Component.getLayout || ((page:any) =>page)
  return(
    <>
    <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={2} showOnShallow={true}/>


    <Provider store = {store}>   
       {getLayout(<Component {...pageProps} />)}
    </Provider>
   
    </>
  ) 
  
}
