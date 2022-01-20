/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase.config";
import Avatar from "react-avatar";
import { UsersIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Searchbar from "../components/Searchbar";
import Router from "next/router";
import { SpinnerCircularFixed } from "spinners-react";
import { atom, useRecoilState, useRecoilValue } from "recoil";



export const currentPatientState = atom({
  key: "currentPatientState",
  default: ""
});

const DashboardPage = () => {
  // const collectionName = "patients";
  // const [patients, setPatients] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");

  // async function searchPatients(name, setData, term) {
  //   const response = db.collection(name);

  //   const data = await response.orderBy("first_name").get();

  //   if (searchTerm != "") {
  //     data = await response.where("first_name", "==", term).get();
  //   }

  //   setData(
  //     data.docs.map((doc) => ({
  //       id: doc.id,
  //       first_name: doc.data().first_name,
  //       last_name: doc.data().last_name,
  //       age: doc.data().age,
  //       gender: doc.data().gender,
  //       description: doc.data().description,
  //       doctors_attending: doc.data().doctors_attending,
  //     }))
  //   );
  // }

  // useEffect(() => {
  //   searchPatients(collectionName, setPatients, searchTerm);
  // }, [searchTerm]);

  const [user, setUser] = useState("");
  const [pageLoading, setPageLoading] = useState(false);

  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [patientList, setPatientList] = useState([]);

  const [patientId, setPatientId] = useRecoilState(currentPatientState);

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

  const getPatientList = () => {
    auth.onAuthStateChanged((currentUser) => {
      const docRef = db.collection("users").doc(currentUser.uid);
      docRef.collection("user_patients").onSnapshot((snapshot) => {
        const patients = [];
        snapshot.forEach((doc) => {
          patients.push({ ...doc.data(), key: doc.id });
        });
        setPatientList(patients);
        console.log("List fetched");
      });
    });
  };

  useEffect(() => {
    getUserDetails();
    getPatientList();
  }, []);

  return (
    <>
      <div className="flex flex-row">
        {/* flex flex-col content-between justify-center items-center */}
        <div className=" h-screen w-1/5 flex flex-col ">
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

        <div className="bg-gradient-to-b from-[#22577A] via-[#38A3A5] to-[#57CC99] h-screen w-4/5 ">
          <Searchbar />

         

          {patientList.length > 0 ? (
            patientList.map((patient) => {
              return (
                <div
                  key={patient.key}
                  className="rounded-md shadow-md bg-[#F1F5FA] cursor-pointer hover:bg-[#22577A] hover:text-white p-2 w-fit"
                  onClick={() => {


                    setPatientId(patient.key);

                    Router.push("/patientDetails");
                  }}
                >
                  <div className="flex flex-row gap-5">
                    <p className="text-lg font-bold" id="patient">
                      {patient.first_name} {patient.last_name}
                    </p>
                    <p className="text-lg">
                      {patient.age} {patient.sex}
                    </p>
                    <p className="opacity-50">{patient.dob}</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold">Summary</p>
                    <p>{patient.summary}</p>
                  </div>

                  <div className="flex flex-col gap-1 mt-5">
                    {patient.doctors_attending.map((doctor) => {
                      // eslint-disable-next-line react/jsx-key
                      return <p className="opacity-50">{doctor}</p>;
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-md shadow-md bg-[#F1F5FA] p-2 w-fit ">
              <p>You have no patients to view yet</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

