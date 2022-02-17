import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase.config";
import { SpinnerCircularFixed } from "spinners-react";
import Router from "next/router";
import Link from "next/link";
import Avatar from "react-avatar";
import MdmCard from "../components/MdmCard";

const ManageMDMPage = () =>{
  const [user, setUser] = useState("");
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const getUserDetails = () => {
    setPageLoading(true);
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser.uid);

      const docRef = db.collection("users").doc(currentUser.uid);

      docRef.onSnapshot((doc) => {
        if (doc.exists) {
          setUserData(doc.data());
          setUserName(doc.data().first_name + " " + doc.data().last_name);
          setPageLoading(false);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
    });
  };

  useEffect(()=>{
    getUserDetails();
  },[]);

    return (<>
        <div className="flex flex-row">
          {/* flex flex-col content-between justify-center items-center */}
          <div className=" h-max w-1/5 flex flex-col  ">
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
                 onClick={() => {
                  Router.push("/myMDM");
                }}>
                  <p className=" opacity-70 text-xl">My MDMs</p>
                </div>
  
                <div className="ml-2">
                  <div className="ml-12 mt-2 border-metal border-b-2 border-l-2 p-1 cursor-pointer hover:bg-navy hover:text-white ">
                    <p className=" opacity-70 ">Upcoming MDMs</p>
                  </div>
  
                  <div className="ml-12 mt-2 border-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-navy hover:text-white ">
                    <p className=" opacity-70 ">Past MDMs</p>
                  </div>
  
                  <div className="ml-20 mt-2 border-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-navy hover:text-white ">
                    <p className=" opacity-70 ">Attendance</p>
                  </div>
  
                  <div className="ml-12 mt-2 border-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white ">
                     <p className=" opacity-70 ">Manage MDMs</p>
                  </div>
  
                  <div className="ml-20 mt-2 border-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-navy hover:text-white "
                   onClick={() => {
                    Router.push("/createMDM");
                  }}>
                    <p className=" opacity-70 ">+ New MDM</p>
                  </div>
                </div>
              </div>
  
                    <div>
                    <div className="p-3 cursor-pointer hover:bg-navy hover:text-white"
                     onClick={() => {
                      Router.push("/myTeams");
                    }}>
                <p className=" opacity-70 text-xl">My Teams</p>
              </div>
  
              <div className="ml-2">
                <div className="ml-12 mt-2 border-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-navy hover:text-white "
                 onClick={() => {
                  Router.push("/createTeam");
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
          </div>
        </div>
      </>);
};

export default ManageMDMPage;

