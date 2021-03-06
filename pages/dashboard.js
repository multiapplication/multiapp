/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase.config";
import Avatar from "react-avatar";
import { UserIcon, UsersIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Searchbar from "../components/Searchbar";
import Router from "next/router";
import { SpinnerCircularFixed } from "spinners-react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { setIn } from "formik";

export const currentPatientState = atom({
  key: "currentPatientState",
  default: {
    id: "",
    patient_name: "",
    gender: "",
    age: "",
    dob: "",
    hospital: "",
    ur: "",
    clinical_summary: "",
    clinical_question: "",
    patient_outcome: "",
  },
});

const DashboardPage = () => {
  const [user, setUser] = useState("");
  const [pageLoading, setPageLoading] = useState(false);

  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [patientList, setPatientList] = useState([]);
  const [searchPatientList, setSearchPatientList] = useState([]);
  const [patientState, setPatientState] = useRecoilState(currentPatientState);

  const [input, setInput] = useState("");

  const getUserDetails = () => {
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

  const getPatients = () => {
    auth.onAuthStateChanged((currentUser) => {
      // const docRef = db.collection("users").doc(currentUser.uid);

      
      // docRef.collection("user_mdms").onSnapshot((snapshot) => {
      //   const patients = [];
      //   snapshot.forEach((doc) => {
      //     docRef
      //       .collection("user_mdms")
      //       .doc(doc.id)
      //       .collection("mdm_patients")
      //       .onSnapshot((snapshot) => {
      //         snapshot.forEach((doc) => {
      //           patients.push({ ...doc.data(), key: doc.id });
      //         });
      //         setPatientList(patients);
      //         setSearchPatientList(patients);
      //         console.log(patientList);

      //         console.log("List fetched");
      //       });
      //   });
      // });


      const collectionRef = db.collection("mdms");
      collectionRef.onSnapshot((snapshot)=>{
        const patients = [];
        snapshot.forEach((doc)=>{
          var participants = doc.data().participants;

          if (participants.includes(currentUser.uid)){
            
            db.collection("mdms").doc(doc.id).collection("patients").onSnapshot((snapshot)=>{
              snapshot.forEach((doc)=>{
                patients.push({...doc.data(),key:doc.id});
              });
              setPatientList(patients);
              setSearchPatientList(patients);
              console.log(patientList);
            });
          }
        });
      })

    });
  };

  // update input for search, based on key input to the search bar
  const updateInput = async (input) => {
    const filtered = patientList.filter((patient) => {
      return patient.first_name.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setSearchPatientList(filtered);
  };

  useEffect(() => {
    getUserDetails();
    getPatients();
  }, []);

  return (
    <>
      <div className="flex flex-row">
        {/* flex flex-col content-between justify-center items-center */}
        <div className=" h-screen w-1/5 flex flex-col">
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

        <div className="bg-gradient-to-b from-navy via-aqua to-green h-screen w-4/5 flex flex-col items-center gap-5">
          <Searchbar
            setKeyword={updateInput}
            keyword={input}
            placeholder="Search patients by first name"
          />

          {searchPatientList.length > 0 ? (
            searchPatientList.map((patient) => {
              return (
                <div
                  key={patient.key}
                  className="rounded-md shadow-md bg-white cursor-pointer hover:bg-navy hover:text-white p-2 w-4/5"
                  onClick={() => {
                    console.log(patientState);
                    setPatientState({
                      id: patient.key,
                      patient_name:
                        patient.first_name + " " + patient.last_name,
                      gender: patient.gender,
                      age: patient.age,
                      dob: patient.dob,
                      hospital: patient.hospital,
                      ur: patient.ur,
                      clinical_summary: patient.clinical_summary,
                      clinical_question: patient.clinical_question,
                      patient_outcome: patient.scribe_notes,
                    });
                    Router.push("/patientDetails");
                  }}
                >
                  <div className="flex flex-row gap-10">
                    <p className="text-lg font-bold" id="patient">
                      {patient.first_name} {patient.last_name}
                    </p>
                    <p className="text-lg">
                      {patient.age} {patient.gender}
                    </p>
                    <p className="opacity-50">{patient.dob}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-md shadow-md bg-white p-2 w-fit ">
              <p>You have no patients to view</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
