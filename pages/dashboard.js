/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase.config";
import Avatar from "react-avatar";
import { UsersIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Searchbar from "../components/Searchbar";
import Router from "next/router";

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
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {

      setUser(currentUser.uid);

      const docRef = db.collection("users").doc(currentUser.uid);


      docRef.onSnapshot((doc)=>{
        if (doc.exists) {
          setUserData(doc.data());
          setUserName(doc.data().first_name + " " + doc.data().last_name);

          console.log("shit happens");
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });

      // docRef
      //   .get()
      //   .then((doc) => {
      //     if (doc.exists) {
      //       setUserData(doc.data())
      //       setUserName(doc.data().first_name +" "+ doc.data().last_name)
      //       console.log("shit is happening");
      //     } else {
      //       // doc.data() will be undefined in this case
      //       console.log("No such document!");
      //     }
      //   })
      //   .catch((error) => {
      //     console.log("Error getting document:", error);
      //   });
    });
  },[]);

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
                <Avatar
                  name={userName}
                  size="50"
                  round={true}
                  className="mr-5"
                />
              </div>

              <div>
                <p className="font-semibold opacity-70">{userData.first_name} {userData.last_name}</p>
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

        <div className="bg-gradient-to-b from-[#22577A] via-[#38A3A5] to-[#57CC99] h-screen w-4/5 flex flex-col  items-center content-between">
          <Searchbar />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
