/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase.config";
import Avatar from "react-avatar";
import Link from "next/link";
import { useFormik } from "formik";
import { SpinnerCircularFixed } from "spinners-react";
import Select from "react-select";
import { useRecoilValue } from "recoil";
import { currentPatientState} from "./dashboard";
import Router from "next/router";


const PatientDetailsPage = () => {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [pageLoading, setPageLoading] = useState(false);

  const patientState = useRecoilValue(currentPatientState);

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
            <div className="p-3 cursor-pointer hover:bg-navy hover:text-white" onClick={()=>{
              Router.push('/dashboard');
            }}>
              <p className=" opacity-70 text-xl">My Patients</p>
            </div>

            <div>
              <div className="p-3 cursor-pointer hover:bg-navy hover:text-white"
              onClick={()=>{
                Router.push('/myMDM');
              }}>
                <p className=" opacity-70 text-xl">My MDMs</p>
              </div>

              <div className="ml-2">
                <div className="ml-12 mt-2 border-my-metal border-b-2 border-l-2 p-1 cursor-pointer hover:bg-navy hover:text-white ">
                  <p className=" opacity-70 ">Upcoming MDMs</p>
                </div>

                <div className="ml-12 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-navy hover:text-white ">
                  <p className=" opacity-70 ">Past MDMs</p>
                </div>

                <div className="ml-20 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-navy hover:text-white ">
                  <p className=" opacity-70 ">Attendance</p>
                </div>

                <div className="ml-12 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-navy hover:text-white " >
                  <p className=" opacity-70 ">Manage MDMs</p>
                </div>

                <div className="ml-20 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-navy hover:text-white ">
                  <p className=" opacity-70 ">+ New MDM</p>
                </div>
              </div>
            </div>

                  <div>
                  <div className="p-3 cursor-pointer hover:bg-navy hover:text-white">
              <p className=" opacity-70 text-xl">My Teams</p>
            </div>

            <div className="ml-2">
              <div className="ml-12 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-navy hover:text-white ">
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

        <div className="bg-gradient-to-b from-navy via-aqua to-green h-screen w-4/5 flex flex-col justify-start items-center ">
          <div className="rounded-md shadow-md bg-[#F1F5FA]  p-2 mt-5 w-3/4">
            <div className="flex flex-row justify-evenly mb-5">
              <p className="text-lg font-bold">
                {patientState.patient_name}
              </p>
              <p className="opacity-50">
                {patientState.age} {patientState.gender}
              </p>
              <p className="opacity-50">{patientState.dob}</p>
              <p className="opacity-50">{patientState.hospital}</p>
              <p className="opacity-50">{patientState.ur}</p>
            </div>

            <div className="mb-5">
              <p className="text-lg font-bold opacity-50">Summary</p>
              <p>{patientState.clinical_summary}</p>
            </div>

            <div className="mb-5">
              <p className="text-lg font-bold opacity-50">Clinical Question</p>
              <p>{patientState.clinical_question}</p>
            </div>

            <div className="mb-5">
              <p className="text-lg font-bold opacity-50">
                Patient Outcome(s)
              </p>
              <p>{patientState.patient_outcome}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDetailsPage;
