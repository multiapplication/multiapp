/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { SpinnerCircularFixed } from "spinners-react";
import Avatar from "react-avatar";
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase.config";
import Router from "next/router";
import { useFormik } from "formik";

import { useRecoilValue } from "recoil";
import { currentMDMState } from "./myMDM";

const AddPatientPage = () => {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [mdmData, setMDMData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const mdmId = useRecoilValue(currentMDMState);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      dob: "",
      age: "",
      gender: "",
      hospital: "",
      ur: "",
      patient_informed: "",
      mdm_discussion: "",
      radiology_info: "",
      pathology_info: "",
      clinical_summary: "",
      clinical_question: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.first_name) {
        errors.first_name = "Required";
      }

      if (!values.last_name) {
        errors.last_name = "Required";
      }

      if (!values.dob) {
        errors.dob = "Required";
      }

      if (!values.age) {
        errors.age = "Required";
      }

      if (!values.gender) {
        errors.gender = "Required";
      }

      return errors;
    },

    onSubmit: (values) => {
      setLoading(true);
      auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser.uid);

      
        const collectionRef = db.collection("mdms").doc(mdmId).collection("patients");

        collectionRef
          .add({
            first_name: values.first_name,
            last_name: values.last_name,
            dob: values.dob,
            age: values.age,
            gender: values.gender,
            hospital: values.hospital,
            ur: values.ur,
            patient_informed: values.patient_informed,
            mdm_discussion: values.mdm_discussion,
            radiology_info: values.radiology_info,
            pathology_info: values.pathology_info,
            clinical_summary: values.clinical_summary,
            clinical_question: values.clinical_question,
            scribe_notes: "",
            mdm_id: mdmId,
            attending_clinician: userName,

          })
          .catch((error) => {
            setErrorMessage(error.message);
            setLoading(false);
          })
          .finally(() => {
            setLoading(false);
          });
      });
    },
  });

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
        .doc(mdmId);
      docRef.onSnapshot((doc) => {
        if (doc.exists) {
          setMDMData(doc.data());
        } else {
          console.log("No such document");
        }
      });
    });
  };

  useEffect(() => {
    getUser();
    getMDMDetails();
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

        <div className="bg-gradient-to-b from-navy via-aqua to-green h-fit w-4/5 flex flex-col justify-start items-center ">
          <div className="rounded-md shadow-md bg-light-grey w-3/4  pb-2">
            <div className="bg-dark-grey text-white">
              <div className="flex flex-row justify-between font-bold p-2">
                <p>{mdmData.meeting_name}</p>
                <p>{mdmData.meeting_date}</p>
              </div>
              <div className="flex flex-row justify-between p-2">
                <p>{mdmData.meeting_location}</p>

              </div>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-row justify-evenly mt-5">
                <div className="md:w-1/3">
                  <input
                    className="bg-white appearance-none border-2 border-light-grey rounded w-full py-2 px-4 text-dark-grey leading-tight focus:outline-none focus:bg-white focus:border-green"
                    placeholder="First Name"
                    id="first_name"
                    name="first_name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                  />
                  {formik.errors.first_name ? (
                    <div className="text-red">
                      {formik.errors.first_name}
                    </div>
                  ) : null}
                </div>

                <div className="md:w-1/3">
                  <input
                    className="bg-white appearance-none border-2 border-light-grey rounded w-full py-2 px-4 text-dark-grey leading-tight focus:outline-none focus:bg-white focus:border-green"
                    placeholder="Last Name"
                    id="last_name"
                    name="last_name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                  />
                  {formik.errors.last_name ? (
                    <div className="text-red">
                      {formik.errors.last_name}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-row justify-evenly mt-5">
                <div className="md:w-1/3">
                  <input
                    className="bg-white appearance-none border-2 border-light-grey rounded w-full py-2 px-4 text-dark-grey leading-tight focus:outline-none focus:bg-white focus:border-green"
                    placeholder="DOB in dd/mm/yyyy "
                    id="dob"
                    name="dob"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.dob}
                  />
                  {formik.errors.dob ? (
                    <div className="text-red">{formik.errors.dob}</div>
                  ) : null}

                  <input
                    className="bg-white appearance-none border-2 border-light-grey rounded w-1/3 py-2 px-4 text-dark-grey leading-tight focus:outline-none focus:bg-white focus:border-green"
                    placeholder="Age"
                    id="age"
                    name="age"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.age}
                  />
                  {formik.errors.age? (
                    <div className="text-red">{formik.errors.age}</div>
                  ) : null}
                </div>

                <div className="md:w-1/3">
                  <select
                    className="bg-white rounded w-full py-2 px-4 text-dark-grey leading-tight"
                    id="gender"
                    name="gender"
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                  >
                    <option value="" disabled selected>
                      Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formik.errors.gender ? (
                    <div className="text-red">{formik.errors.gender}</div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-row justify-evenly mt-5">
                <div className="md:w-1/3">
                  <input
                    className="bg-white appearance-none border-2 border-light-grey rounded w-full py-2 px-4 text-dark-grey leading-tight focus:outline-none focus:bg-white focus:border-green"
                    placeholder="Hospital"
                    id="hospital"
                    name="hospital"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.hospital}
                  />
                </div>

                <div className="md:w-1/3">
                  <input
                    className="bg-white appearance-none border-2 border-light-grey rounded w-full py-2 px-4 text-dark-grey leading-tight focus:outline-none focus:bg-white focus:border-green"
                    placeholder="U.R"
                    id="ur"
                    name="ur"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.ur}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-evenly mt-5">
                <div className="md:1/3">
                  <label
                    className="block text-black font-semibold mb-2"
                    htmlFor="patient_informed"
                  >
                    Patient informed of MDM discussion ?
                  </label>
                  <select
                    className="bg-white rounded w-full py-2 px-4 text-dark-grey leading-tight"
                    id="patient_informed"
                    name="patient_informed"
                    onChange={formik.handleChange}
                    value={formik.values.patient_informed}
                  >
                    <option value="" disabled selected>
                      Yes/No
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="md:1/3">
                  <label
                    className="block text-black font-semibold mb-2"
                    htmlFor="mdm_discussion"
                  >
                    MDM discussion ?
                  </label>
                  <select
                    className="bg-white rounded w-full py-2 px-4 text-dark-grey leading-tight"
                    id="mdm_discussion"
                    name="mdm_discussion"
                    onChange={formik.handleChange}
                    value={formik.values.mdm_discussion}
                  >
                    <option value="" disabled selected>
                      Pre-Op/Post-Op
                    </option>
                    <option value="Pre-Op">Pre-Op</option>
                    <option value="Post-Op">Post-Op</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-row justify-center mt-5">
                <textarea
                  className="
        w-2/3
        h-48
        px-3
        py-1.5
        text-base
        font-normal
        text-dark-grey
        bg-white bg-clip-padding
        
        rounded-lg
        transition
        ease-in-out
        m-0
        focus:text-dark-grey
      "
                  id="radiology_info"
                  name="radiology_info"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.radiology_info}
                  rows="3"
                  placeholder="Radiology info"
                ></textarea>
              </div>

              <div className="flex flex-row justify-center mt-5">
                <textarea
                  className="
        w-2/3
        h-48
        px-3
        py-1.5
        text-base
        font-normal
        text-dark-grey
        bg-white bg-clip-padding
        
        rounded-lg
        transition
        ease-in-out
        m-0
        focus:text-dark-grey
      "
                  id="pathology_info"
                  name="pathology_info"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.pathology_info}
                  rows="3"
                  placeholder="Pathology info"
                ></textarea>
              </div>

              <div className="flex flex-row justify-center mt-5">
                <textarea
                  className="
        w-2/3
        h-48
        px-3
        py-1.5
        text-base
        font-normal
        text-dark-grey
        bg-white bg-clip-padding
        
        rounded-lg
        transition
        ease-in-out
        m-0
        focus:text-dark-grey
      "
                  id="clinical_summary"
                  name="clinical_summary"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.clinical_summary}
                  rows="3"
                  placeholder="Clinical Summary/Diagnosis"
                ></textarea>
              </div>

              <div className="flex flex-row justify-center mt-5 ">
                <textarea
                  className="
        w-2/3
        h-48
        px-3
        py-1.5
        text-base
        font-normal
        text-dark-grey
        bg-white bg-clip-padding
        
        rounded-lg
        transition
        ease-in-out
        m-0
        focus:text-dark-grey
      "
                  id="clinical_question"
                  name="clinical_question"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.clinical_question}
                  rows="3"
                  placeholder="Clinical Question"
                ></textarea>
              </div>

              <div className="flex flex-row justify-evenly mt-5">
                <button
                  className="bg-white hover:bg-navy hover:text-white text-dark-grey font-bold py-2 px-10 rounded-2xl w-fit"
                  type="submit"
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
                    "Add Patient"
                  )}
                </button>
              </div>
            </form>
            {errorMessage ? (
              <p className="text-xs text-red">{errorMessage}</p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPatientPage;
