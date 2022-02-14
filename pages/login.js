/* eslint-disable react/no-unescaped-entities */
import { useFormik } from "formik";
import { firebase } from "../utils/firebase.config";
import Router from "next/router";
import { useState } from "react";
import { SpinnerCircularFixed } from 'spinners-react';
import Link from "next/link";

const auth = firebase.auth();

const LoginPage = () => {



  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {

    
      
      setLoading(true);

      firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
          Router.push("/dashboard");
          console.log("User logged in...");
        })
        .catch((error) => {
          // var errorCode = error.code;
          // var errorMessage = error.message;
          setErrorMessage(error.message);
          setLoading(false);

        });    
    },
  });
  return (
    <div className="flex flex-row ">
      <div className=" bg-gradient-to-b from-[#22577A] via-[#38A3A5] to-[#57CC99] h-screen w-1/3 flex flex-col content-between justify-center items-center">

      </div>
      <div className="h-screen w-2/3 flex flex-col justify-center items-center content-between ">
      
        <div>
        {/* <img src="logo.svg" alt="multi logo" className="md:flex md:items-center mb-6" width="200"></img> */}
          <form onSubmit={formik.handleSubmit}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="email"
                >
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#57CC99]"
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#57CC99]"
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
            </div>

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-[#57CC99] hover:bg-[#38A3A5] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  {loading ? (
                 <SpinnerCircularFixed size={30} thickness={180} speed={100} color="#ffffff" secondaryColor="rgba(0, 0, 0, 0)" />
                  ): "Login"}
                </button>
                <br/>
                {errorMessage ? (
                  <><br /><p className="text-xs text-red-600">{errorMessage}</p></>
                ): null}
                  <br/>
                  <p className="text-xs text-gray-300">Don't have an account, <Link href="/signup"><a className="text-[#57CC99]">Sign Up</a></Link></p>

              </div>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
