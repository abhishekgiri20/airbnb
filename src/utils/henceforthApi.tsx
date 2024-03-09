import { parseCookies } from "nookies";
import superagent from "superagent";
// const SuperagentPromise = require("superagent-promise");
// const superagent = SuperagentPromise(_superagent, global.Promise);
const API_ROOT = "https://airbnbclone.henceforthsolutions.com:8081/api/";

let token: any = null;

const tokenPlugin = (req: any) => {
  let cookies = parseCookies(null, 'accessToken')
  console.log(cookies,'colokes')
  if(cookies.accessToken){
    req.set('Authorization', `Bearer ${cookies.accessToken}`);

  }
  console.log(cookies.accessToken, "token.....")
}

const responseBody = (res: any) => res.body;

const requests = {
    del : (url:string) => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get : (url:string) => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    put:  (url: string, body: any) => superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url:string, body :any) => superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    file: (url: string, key: string, file: any) =>superagent.post(`${API_ROOT}${url}`).attach(key, file).use(tokenPlugin).then(responseBody),
}


const Auth = {
   login: (info: any) => requests.post("login",info),
   signUp: (info: any) => requests.post("register",info),
   emailVerification: (info: any) => requests.post("verify-email",info),
   numberVerification: (info: any) => requests.post("verify-phone",info),
   forgetPassword: (info: any) => requests.post("forgot-password",info),
   resetPassword: (info: any) => requests.post("reset-password",info),
   changePassword: (info: any) => requests.put("change-password",info),
   getProfile: () => requests.get("profile"),
   editProfile: (info: any) => requests.put("profile-update", info),
   uploadImg: (info:any) => requests.file("image-upload", "image", info),
   sendEmailVerification:(info:any) => requests.post("send-email-verify",info),
   sendPhoneVerification: (info:any) => requests.post("send-phone-verify",info),
   checkEmailOTP : (info:any) => requests.post("check-otp-email",info),
   uploadDocuments: (info:any) => requests.post("document", info),
   documentImgUplaod: (info:any) => requests.file("document-upload","document", info),
   getDocumentData: () => requests.get("document"),
   deleteDocument: (id:any) => requests.del(`document/${id}`),

  }

  const host = {
    uploadHostDocuments: (info:any) => requests.post("host/host-document", info),
    hostDocumentImgUplaod: (info:any) => requests.file("host/document-upload","document", info),
    getHostDocumentData: () => requests.get("host/host-document"),
    deleteHostDocument: (id:any) => requests.del(`host/host-document/${id}`),
    editHostDocuments: (info:any, id:any) => requests.put(`host/host-document/${id}`, info)

  }



const henceforthApi = {
    Auth,
    token,
    requests,
    host
}


export default henceforthApi;