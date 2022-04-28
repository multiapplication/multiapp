/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
import { useFormik } from "formik";
import { firebase } from "../utils/firebase.config";
import Router from "next/router";
import { useState } from "react";
import { SpinnerCircularFixed } from 'spinners-react';
import Link from "next/link";
import FadeIn from 'react-fade-in';

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
      <div className="bg-gradient-to-b from-navy via-aqua to-green h-screen w-1/3 flex flex-col content-between justify-center items-center">
        <FadeIn delay={400}>
        <p className="text-white text-3xl ">Manage MDMs with ease</p>
        </FadeIn>
      </div>

      <div className="h-screen w-2/3 flex flex-col justify-center items-center content-between "> 
        <h1 className="text-6xl text-transparent bg-clip-text bg-gradient-to-b from-navy via-aqua to-green font-bold mb-24">Project Multi</h1>
        <img src="logo.svg" alt="multi logo" className="mb-20" width="200"></img>
        <div className="-ml-24">
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
                  className="bg-light-grey appearance-none border-2 border-light-grey rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-green"
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
                  className="bg-light-grey appearance-none border-2 border-light-grey rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-green"
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
                  className="shadow bg-green hover:bg-aqua focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  {loading ? (
                 <SpinnerCircularFixed size={30} thickness={180} speed={100} color="#ffffff" secondaryColor="rgba(0, 0, 0, 0)" />
                  ): "Login"}
                </button>
                <br/>
                {errorMessage ? (
                  <><br /><p className="text-xs text-red">{errorMessage}</p></>
                ): null}
                  <br/>
                  <p className="text-xs text-gray">Don't have an account, <Link href="/signup"><a className="text-green">Sign Up</a></Link></p>

              </div>
             
            </div>
          </form>
        </div>
      </div>    
    </div>
  );
};

export default LoginPage;
