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

export const currentMDMState = atom({
  key: "currentMDMState",
  default: "",
});

const MyMDMPage = () => {
  const [user, setUser] = useState("");
  const [pageLoading, setPageLoading] = useState(false);

  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [mdmList, setmdmList] = useState([]);
  const [searchMDMList, setSearchMDMList] = useState([]);
  const [mdmId, setmdmId] = useRecoilState(currentMDMState);

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

  const getMDMList = () => {
    auth.onAuthStateChanged((currentUser) => {
      const docRef = db.collection("users").doc(currentUser.uid);
      docRef.collection("user_mdms").onSnapshot((snapshot) => {
        const mdms = [];
        snapshot.forEach((doc) => {
          mdms.push({ ...doc.data(), key: doc.id });
        });
        setmdmList(mdms);
        setSearchMDMList(mdms);
        console.log("List fetched");
      });
    });
  };

  // update input for search, based on key input to the search bar
  const updateInput = async (input) => {
    const filtered = mdmList.filter((mdm) => {
      return mdm.mdm_name.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setSearchMDMList(filtered);
  };

  useEffect(() => {
    getUserDetails();
    getMDMList();
  }, []);

  return (
    <>
      <div className="flex flex-row">
        {/* flex flex-col content-between justify-center items-center */}
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
            <div
              className="p-3 cursor-pointer hover:bg-[#22577A] hover:text-white flex flex-row"
              onClick={() => {
                Router.push("/dashboard");
              }}
            >
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

                <div className="ml-12 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white">
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
              <p
                className="text-red-500 text-l cursor-pointer"
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

        <div className="bg-gradient-to-b from-[#22577A] via-[#38A3A5] to-[#57CC99] h-screen w-4/5 flex flex-col items-center gap-5">
          <Searchbar setKeyword={updateInput} keyword={input} placeholder="Search MDMs by name" />

          {searchMDMList.length > 0 ? (
            searchMDMList.map((mdm) => {
              return (
                <div
                  key={mdm.key}
                  //   hover:bg-[#22577A] hover:text-white
                  className="rounded-md shadow-md bg-[#F1F5FA] p-2 w-4/5"
                  //   onClick={() => {
                  //     setmdmId(mdm.key);
                  //     Router.push("/patientDetails");
                  //   }}
                >
                  <div className="flex flex-row gap-5">
                    <p className="text-lg font-bold">{mdm.mdm_name}</p>
                    <p className="opacity-50">{mdm.mdm_mode}</p>
                  </div>

                  <div className="flex flex-row gap-5 mt-2">
                    <p>{mdm.mdm_date}</p>
                    <p>{mdm.mdm_time}</p>
                  </div>

                  <div className="mt-2">
                    {mdm.mdm_link === "" ? (
                      <p className="opacity-50">{mdm.mdm_location}</p>
                    ) : (
                      <>
                        <Link href={mdm.mdm_link}>
                          <a className="text-blue-500">{mdm.mdm_link}</a>
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="mt-2">
                    <p className="opacity-50">Chair: {mdm.mdm_chair}</p>
                  </div>

                  <div className="flex flex-row justify-end">
                    <button
                      className="bg-[#C4C4C4] hover:bg-[#868686] text-black text-opacity-80 py-2 px-4 rounded-2xl w-36"
                      onClick={()=>{
                        setmdmId(mdm.key);
                        Router.push('/addPatient');
                      }}
                    >
                      Add Patient
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-md shadow-md bg-[#F1F5FA] p-2 w-fit ">
              <p>You have no mdms to view</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyMDMPage;
