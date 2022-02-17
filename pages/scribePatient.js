/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase.config";
import Avatar from "react-avatar";
import Link from "next/link";
import { useFormik } from "formik";
import { SpinnerCircularFixed } from "spinners-react";
import Select from "react-select";
import Router from "next/router";
import { useRecoilValue } from "recoil";
import { currentMDMPatientState } from "./mdmDetails";
import { currentMDMState } from "./myMDM";

const ScribePatientPage = () => {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [mdmPatientDetails, setmdmPatientDetails] = useState([]);

  const mdmPatientId = useRecoilValue(currentMDMPatientState);
  const mdmId = useRecoilValue(currentMDMState);

  //   form logic hook
  const formik = useFormik({
    initialValues: {
      scribe_notes: mdmPatientDetails.scribe_notes,
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

  const getMDMPatientDetails = () => {
    auth.onAuthStateChanged((currentUser) => {
      const docRef = db
        .collection("mdms")
        .doc(mdmId)
        .collection("patients")
        .doc(mdmPatientId)
        
      docRef.onSnapshot((doc) => {
        if (doc.exists) {
          setmdmPatientDetails(doc.data());
        } else {
          console.log("No such document");
        }
      });
    });
  };

  useEffect(() => {
    getUser();

    getMDMPatientDetails();
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
            className="cursor-pointer hover:bg-navy hover:text-white"
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
                 <div className="p-3 cursor-pointer hover:bg-[#22577A] hover:text-white"
                 onClick={()=>{
                  Router.push('/myMDM');
              }}>
                   <p className=" opacity-70 text-xl">My MDMs</p>
                 </div>
   
                 <div className="ml-2">
                   <div className="ml-12 mt-2 border-metal border-b-2 border-l-2 p-1 cursor-pointer hover:bg-[#22577A] hover:text-white ">
                     <p className=" opacity-70 ">Upcoming MDMs</p>
                   </div>
   
                   <div className="ml-12 mt-2 border-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white ">
                     <p className=" opacity-70 ">Past MDMs</p>
                   </div>
   
                   <div className="ml-20 mt-2 border-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white ">
                     <p className=" opacity-70 ">Attendance</p>
                   </div>
   
                   <div className="ml-12 mt-2 border-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white "
                   onClick={()=>{
                    Router.push('');
                }}>
                     <p className=" opacity-70 ">Manage MDMs</p>
                   </div>
   
                   <div className="ml-20 mt-2 border-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white "
                   onClick={()=>{
                    Router.push('/createMDM');
                }}>
                     <p className=" opacity-70 ">+ New MDM</p>
                   </div>
                 </div>
             </div>
   
             <div>
                 <div className="p-3 cursor-pointer hover:bg-[#22577A] hover:text-white"
                 onClick={()=>{
                  Router.push('/myTeams');
              }}>
                     <p className=" opacity-70 text-xl">My Teams</p>
                 </div>
   
                 <div className="ml-2">
                     <div className="ml-12 mt-2 border-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white "
                     onClick={()=>{
                      Router.push('/createTeam');
                  }}>
                     <p className=" opacity-70 ">+ New Team</p>
                     </div>
                 </div>
             </div>
               
   
               <div className="p-3">
               <p
                className="text-red text-l cursor-pointer"
                onClick={() => {
                  auth.signOut().finally(() => {
                    Router.push("/");
                  });
                }}
              >
                Logout
              </p>
               </div>
             </div>

         
          
        </div>
        <div className="bg-gradient-to-b from-navy via-aqua to-green h-screen w-4/5 flex flex-col justify-start gap-10 items-center ">
          <div className="rounded-md shadow-md bg-light-grey w-3/4 pb-2">
            <div className="bg-light-grey text-black">
              <div className="flex flex-row justify-between font-bold p-2">
                <p>
                  {mdmPatientDetails.first_name} {mdmPatientDetails.last_name}
                </p>
                <p>{mdmPatientDetails.dob}</p>
                <p>{mdmPatientDetails.gender}</p>
              </div>
            </div>

            <div className="p-2">
              <p className="font-semibold mt-2">Clinical Summary</p>
              <p>{mdmPatientDetails.clinical_summary}</p>
            </div>

            <div className="p-2">
              <p className="font-semibold mt-2">Clinical Question</p>
              <p>{mdmPatientDetails.clinical_question}</p>
            </div>

            <div className="p-2">
              <p className="font-semibold mt-2">Radiology info</p>
              <p>{mdmPatientDetails.radiology_info}</p>
            </div>

            <div className="p-2">
              <p className="font-semibold mt-2">Pathology info</p>
              <p>{mdmPatientDetails.pathology_info}</p>
            </div>

            <div className="p-2">
              <p className="font-semibold mt-2">Scribe Sheet</p>
              <textarea
                className="
        w-full
        h-48
        px-3
        py-1.5
        text-base
        font-normal
        text-black
        bg-white bg-clip-padding
        
        rounded-lg
        transition
        ease-in-out
        m-0
        focus:text-black
      "
                id="scribe_notes"
                name="scribe_notes"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.scribe_notes}
                rows="3"
                placeholder="Scribe..."
              ></textarea>
            </div>

            <div className="flex flex-row justify-evenly mt-5">
              <button
                className="bg-white hover:bg-navy hover:text-white text-black font-bold py-2 px-10 rounded-2xl w-fit"
                onClick={() => {
                  setLoading(true);
                  auth.onAuthStateChanged((currentUser) => {
                    setUser(currentUser.uid);

                    const docRef = db
                      .collection("mdms")
                      .doc(mdmId)
                      .collection("patients")
                      .doc(mdmPatientId)
                    
                    docRef
                      .update({
                        scribe_notes: formik.values.scribe_notes,
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
                <p className="text-xs text-red">{errorMessage}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScribePatientPage;
