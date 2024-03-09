import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import henceforthApi from '@/utils/henceforthApi';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../store/userSlice'; 

const Layout = ({ children }: any) => {

  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);

  const  fetchDataAndUpdateStore = async () => {
    try {
      const apiRes = await henceforthApi.Auth.getProfile();
      const data = apiRes.data;
      dispatch(setData(data));
      console.log("profile data...........", data);
    } catch (error) {
      console.log("error in getting data:", error);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateStore();
  }, []);

  console.log(userData, "store data.........");

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
