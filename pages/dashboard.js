import { useEffect, useState } from "react";
import { db } from "../utils/firebase.config";
import { PatientTile } from "../components/PatientTile";
import Searchbar from "../components/Searchbar";
import Navbar from "../components/Navbar";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const DashboardPage = () => {
  const collectionName = "patients";
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");



  async function searchPatients(name, setData, term) {
    const response = db.collection(name);

    const data = await response.orderBy("first_name").get();

    if (searchTerm != "") {
      data = await response.where("first_name", "==", term).get();
    }

    setData(
      data.docs.map((doc) => ({
        id: doc.id,
        first_name: doc.data().first_name,
        last_name: doc.data().last_name,
        age: doc.data().age,
        gender: doc.data().gender,
        description: doc.data().description,
        doctors_attending: doc.data().doctors_attending,
      }))
    );
  }

  useEffect(() => {
    searchPatients(collectionName, setPatients, searchTerm);
  }, [searchTerm]);


  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col gap-20 justify-center items-center content-between">
        <Searchbar setTerm={setSearchTerm} />

        <div className="grid grid-cols-3 gap-4 place-content-center">
          {patients.map(
            ({
              id,
              first_name,
              last_name,
              gender,
              age,
              description,
              doctors_attending,
            }) => (
              <PatientTile
                key={id}
                firstName={first_name}
                lastName={last_name}
                age={age}
                description={description}
                gender={gender}
                doctorsAttending={doctors_attending}
                onClick={()=>{
                }}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
