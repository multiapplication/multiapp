/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase.config";
import Avatar from "react-avatar";

import Link from "next/link";
import { useFormik } from "formik";
import { SpinnerCircularFixed } from "spinners-react";
import Select from "react-select";
import Router from "next/router";

const UserPage = () => {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // form logic hook
  const formik = useFormik({
    initialValues: {
      healthcare_occupation: userData.healthcare_occupation,
      role: userData.role,
      organisation: userData.organisation,
      about_me: userData.about_me,
    },
    enableReinitialize: "true",
  });


  // fetching user data for rendering

  const getUser = () => {
    setPageLoading(true);
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser.uid);

      const docRef = db.collection("users").doc(currentUser.uid);
      docRef.onSnapshot((doc) => {
        if (doc.exists) {
          setUserData(doc.data());
          setUserName(doc.data().first_name + " " + doc.data().last_name);
          console.log("shit happens");
          setPageLoading(false);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="flex flex-row">
      <div className=" h-screen w-1/5 flex flex-col  ">
          <div className="flex flex-col items-center">
            <img
              src="logo.svg"
              alt="multi logo"
              className="mb-10 mt-5 w-1/3"
            ></img>
          </div>

          <div
            className="cursor-pointer hover:bg-[#22577A] hover:text-white"
            onClick={() => {
              Router.push("/user");
            }}
          >
            <div className="flex flex-row mb-5 ml-5 mt-5">
              <div>
                {pageLoading ? (
                  <SpinnerCircularFixed
                    className="items-center"
                    size={50}
                    thickness={180}
                    speed={100}
                    color="#22577A"
                    secondaryColor="rgba(0, 0, 0, 0)"
                  />
                ) : (
                  <Avatar
                    name={userName}
                    size="50"
                    round={true}
                    className="mr-5"
                  />
                )}
              </div>

              <div>
                <p className="font-semibold opacity-70">
                  {userData.first_name} {userData.last_name}
                </p>
                <p className="opacity-50">{userData.organisation}</p>
                <p className="opacity-50">{userData.role}</p>
              </div>
            </div>
          </div>

          <hr />

          <div className="flex flex-col gap-5">
            <div className="p-3 cursor-pointer hover:bg-[#22577A] hover:text-white" onClick={()=>{
              Router.push('/dashboard');
            }}>
              <p className=" opacity-70 text-xl">My Patients</p>
            </div>

            <div>
              <div className="p-3 cursor-pointer hover:bg-[#22577A] hover:text-white">
                <p className=" opacity-70 text-xl">My MDMs</p>
              </div>

              <div className="ml-2">
                <div className="ml-12 mt-2 border-my-metal border-b-2 border-l-2 p-1 cursor-pointer hover:bg-[#22577A] hover:text-white ">
                  <p className=" opacity-70 ">Upcoming MDMs</p>
                </div>

                <div className="ml-12 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white ">
                  <p className=" opacity-70 ">Past MDMs</p>
                </div>

                <div className="ml-20 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white ">
                  <p className=" opacity-70 ">Attendance</p>
                </div>

                <div className="ml-12 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white " >
                  <p className=" opacity-70 ">Manage MDMs</p>
                </div>

                <div className="ml-20 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white ">
                  <p className=" opacity-70 ">+ New MDM</p>
                </div>
              </div>
            </div>

                  <div>
                  <div className="p-3 cursor-pointer hover:bg-[#22577A] hover:text-white">
              <p className=" opacity-70 text-xl">My Teams</p>
            </div>

            <div className="ml-2">
              <div className="ml-12 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white ">
                <p className=" opacity-70 ">+ New Team</p>
              </div>
            </div>
                  </div>
            

            <div className="p-3">
              <Link href="/">
                <a className="text-red-500 text-l">Logout</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-b from-[#22577A] via-[#38A3A5] to-[#57CC99] h-screen w-4/5 flex flex-col justify-start gap-10 items-center ">
          {pageLoading ? (
            <SpinnerCircularFixed
              size={50}
              thickness={180}
              speed={100}
              color="#ffffff"
              secondaryColor="rgba(0, 0, 0, 0)"
            />
          ) : (
            <Avatar name={userName} size="100" round={true} className="mt-5" />
          )}

          <div className="">
            <label
              className="block text-white font-bold mb-2"
              htmlFor="first_name"
            >
              Healthcare Occupation
            </label>
            <input
              className="bg-white rounded-lg w-96 py-2 px-4 text-gray-700 leading-tight"
              id="healthcare_occupation"
              name="healthcare_occupation"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.healthcare_occupation}
            />
          </div>

          <div className="">
            <label
              className="block text-white font-bold mb-2"
              htmlFor="first_name"
            >
              MDM Meeting Role
            </label>
            <select
              className="bg-white rounded-lg w-96 py-2 px-4 text-gray-700 leading-tight"
              id="role"
              name="role"
              onChange={formik.handleChange}
              value={formik.values.role}
              defaultValue="MDM Meeting Role"
            >
              <option value="Clinician">Clinician</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Scribe">Scribe</option>
            </select>
          </div>

          <div className="">
            <label
              className="block text-white font-bold mb-2"
              htmlFor="first_name"
            >
              Organisation(s)
            </label>
            <input
              className="bg-white rounded-lg w-96 py-2 px-4 text-gray-700 leading-tight"
              id="organisation"
              name="organisation"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.organisation}
            />
          </div>
          <div className="">
            <textarea
              className="
        w-96
        h-48
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        
        rounded-lg
        transition
        ease-in-out
        m-0
        focus:text-gray-700
      "
              id="about_me"
              name="about_me"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.about_me}
              rows="3"
              placeholder="About me"
            ></textarea>
          </div>
          <button
            className="bg-white hover:bg-[#22577A] hover:text-white text-gray-700 font-bold py-2 px-10 rounded-2xl w-fit"
            onClick={() => {
              setLoading(true);
              auth.onAuthStateChanged((currentUser) => {
                setUser(currentUser.uid);

                const docRef = db.collection("users").doc(currentUser.uid);

                docRef
                  .update({
                    healthcare_occupation: formik.values.healthcare_occupation,
                    role: formik.values.role,
                    organisation: formik.values.organisation,
                    about_me: formik.values.about_me,
                  })
                  .catch((error) => {
                    setErrorMessage(error.message);
                    setLoading(false);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              });
            }}
          >
            {loading ? (
              <SpinnerCircularFixed
                size={30}
                thickness={180}
                speed={100}
                color="#ffffff"
                secondaryColor="rgba(0, 0, 0, 0)"
              />
            ) : (
              "Save"
            )}
          </button>
          {errorMessage ? (
            <p className="text-xs text-red-600">{errorMessage}</p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UserPage;
