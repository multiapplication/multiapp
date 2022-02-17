/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { SpinnerCircularFixed } from "spinners-react";
import Avatar from "react-avatar";
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase.config";
import Router from "next/router";
import { useFormik } from "formik";

import { atom, useRecoilState, useRecoilValue } from "recoil";
import { currentMDMState } from "./myMDM";

export const currentMDMPatientState = atom({
  key: "currentMDMPatientState",
  default: "",
});

const MDMDetailsPage = () => {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [mdmData, setMDMData] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [mdmPatientId, setmdmPatientId] = useRecoilState(
    currentMDMPatientState
  );

  const mdmId = useRecoilValue(currentMDMState);

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

  const getMDMDetails = () => {
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser.uid);

      const docRef = db
        .collection("mdms")
        .doc(mdmId)
        
      docRef.onSnapshot((doc) => {
        if (doc.exists) {
          setMDMData(doc.data());
        } else {
          console.log("No such document");
        }
      });
    });
  };

  const getMDMPatientList = () => {
    auth.onAuthStateChanged((currentUser) => {
      const docRef = db
        .collection("mdms")
        .doc(mdmId)
        
      docRef.collection("patients").onSnapshot((snapshot) => {
        const patients = [];
        snapshot.forEach((doc) => {
          patients.push({ ...doc.data(), key: doc.id });
        });
        setPatientList(patients);
      });
    });
  };

  useEffect(() => {
    getUser();
    getMDMDetails();
    getMDMPatientList();
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
            <div
              className="p-3 cursor-pointer hover:bg-navy hover:text-white"
              onClick={() => {
                Router.push("/dashboard");
              }}
            >
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

                <div
                  className="ml-12 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-navy hover:text-white "
                  onClick={() => {
                    Router.push("/manageMDM");
                  }}
                >
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
          <div className="rounded-md shadow-md bg-light-grey w-3/4 ">
            <div className="bg-dark-grey text-white">
              <div className="flex flex-row justify-between font-bold p-2">
                <p>{mdmData.meeting_name}</p>
                <p>{mdmData.meeting_date}</p>
              </div>
              <div className="flex flex-row justify-between p-2">
                <p>{mdmData.meeting_location}</p>

              </div>
            </div>

            <div className="flex flex-row justify-center">
              <p className="font-semibold text-lg">Patient Agenda</p>
            </div>

            {patientList.length > 0 ? (
              patientList.map((patient) => {
                return (
                  <div key={patient.key} className="bg-white p-2 mt-4">
                    <div className="flex flex-row justify-evenly">
                      <p className="font-semibold">
                        {patient.first_name} {patient.last_name}
                      </p>
                      <p className="font-semibold">{patient.gender}</p>
                      <p className="font-semibold">{patient.dob}</p>
                      <p className="font-semibold">{patient.hospital}</p>
                      <p className="font-semibold">{patient.ur}</p>
                    </div>
                    <p className="font-semibold mt-2">Clinical Summary</p>
                    <div>{patient.clinical_summary}</div>
                    <p className="font-semibold mt-2">Clinical Question</p>

                    <div>{patient.clinical_question}</div>
                    <p className="font-semibold mt-2">Radiology info</p>

                    <div>{patient.radiology_info}</div>
                    <p className="font-semibold mt-2">Pathology info</p>

                    <div>{patient.pathology_info}</div>
                    <div className="flex flex-row gap-2 justify-end mt-2">
                      <button
                        className="bg-dark-grey hover:bg-grey text-black text-opacity-80 py-2 px-4 rounded-2xl w-24"
                        onClick={() => {
                          setmdmPatientId(patient.key);
                          Router.push("/scribePatient");
                        }}
                      >
                        Scribe
                      </button>
                      <button
                        className="bg-dark-grey hover:bg-red text-black text-opacity-80 py-2 px-4 rounded-2xl w-24"
                        onClick={() => {
                          auth.onAuthStateChanged((currentUser) => {
                            setUser(currentUser.uid);

                            db.collection("mdms")
                              .doc(mdmId)
                              .collection("patients")
                              .doc(patient.key).delete().then(()=>{
                                console.log("Delete successful")
                              }).catch((error)=>{
                                console.error("Error removing document: ", error);
                              });
                          });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-row justify-center">
                <p>You have no patients to view</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MDMDetailsPage;
