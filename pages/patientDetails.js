import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase.config";
import Avatar from "react-avatar";

import Link from "next/link";
import { useFormik } from "formik";
import { SpinnerCircularFixed } from "spinners-react";
import Select from "react-select";
import { useRecoilValue } from "recoil";
import { currentPatientState } from "./dashboard";


const PatientDetailsPage = () => {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [pageLoading, setPageLoading] = useState(false);

  const patientId = useRecoilValue(currentPatientState);



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
        <div className=" h-screen w-1/5 flex flex-col ">
          <div className="flex flex-col items-center">
            <img
              src="logo.svg"
              alt="multi logo"
              className="mb-10 mt-5 w-1/3"
            ></img>
          </div>

          <div className="cursor-pointer hover:bg-[#22577A] hover:text-white">
            <div className="flex flex-row mb-5 ml-5 mt-5">
              <div>
                {pageLoading ? (
                  <SpinnerCircularFixed
                    size={50}
                    thickness={180}
                    speed={100}
                    color="#38A3A5"
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

          {/* <div className="flex flex-row ml-5 cursor-pointer">
              <UsersIcon className="w-5 mr-5" />
              <p className=" opacity-70 text-l">My Patients</p>
            </div> */}

          <div className="p-5 cursor-pointer hover:bg-[#22577A] hover:text-white">
            <p className=" opacity-70 text-xl">My Patients</p>
          </div>

          <div className="p-5 cursor-pointer hover:bg-[#22577A] hover:text-white">
            <p className=" opacity-70 text-xl">My MDMs</p>
          </div>

          <div>
            <Link href="/">
              <a className="text-red-500 text-l">Logout</a>
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#22577A] via-[#38A3A5] to-[#57CC99] h-screen w-4/5 flex flex-col justify-start items-center ">
          <div className="rounded-md shadow-md bg-[#F1F5FA]  p-2 w-3/4">
            <div className="flex flex-row justify-evenly mb-5">
              <p className="text-lg font-bold">Astitva Gautam</p>
              <p>{patientId}</p>
              <p className="text-lg">22 M</p>
              <p className="opacity-50">16/10/1999</p>
              <p className="opacity-50">Hospital</p>
              <p className="opacity-50">URN</p>
            </div>

            <div className="mb-5">
              <p className="text-lg font-bold opacity-50">Summary</p>
              <p>
                Excepteur dolor dolore est minim. Laborum excepteur labore magna
                est Lorem qui minim mollit ipsum. Velit eu proident ipsum enim.
                Do cupidatat ipsum magna nulla incididunt culpa velit enim non.
                Dolore officia quis nostrud est qui. Veniam dolore eiusmod nisi
                non voluptate minim nostrud.
              </p>
            </div>

            <div className="mb-5">
              <p className="text-lg font-bold opacity-50">
                Patient Outcomes(s)
              </p>
              <p>
                Sit labore ipsum adipisicing nisi tempor do sint tempor commodo
                consectetur veniam. Cupidatat qui exercitation et aliqua eu do
                excepteur amet. Sunt nostrud aute cillum cupidatat et anim.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDetailsPage;

