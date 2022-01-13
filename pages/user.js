/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { db } from "../utils/firebase.config";
import Avatar from "react-avatar";
import { UsersIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Searchbar from "../components/Searchbar";
import Button from "../components/Button";

const UserPage = () => {
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
                <Avatar
                  name="John Appleseed"
                  size="50"
                  round={true}
                  className="mr-5"
                />
              </div>

              <div>
                <p className="font-semibold opacity-70">John Appleseed</p>
                <p className="opacity-50">Monash</p>
                <p className="opacity-50">Clinician</p>
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

        <div className="bg-gradient-to-b from-[#22577A] via-[#38A3A5] to-[#57CC99] h-screen w-4/5 flex flex-col justify-evenly items-center">
          <Avatar
            name="John Appleseed"
            size="100"
            round={true}
            className="mr-5"
          />

          <div className="">
            <select
              className="bg-white rounded-lg w-96 py-2 px-4 text-gray-700 leading-tight"
              id="role"
              name="role"
              //   onChange={formik.handleChange}
              //   value={formik.values.role}
            >
              <option value="" disabled selected>
                Healthcare Occupation/Position
              </option>

              <option value="Clinician">Clinician</option>
              <option value="PA">PA</option>
              <option value="Radiologist">Radiologist</option>
              <option value="Pathologist">Pathologist</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="bg-white rounded-lg text-gray-700 p-5 w-fit">
            <p className="text-lg"> Meeting Role</p>
            <p className="text-sm">Click all that apply</p>

            <div className="grid grid-cols-3 gap-5 m-5">
              <div>
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-lg bg-white checked:bg-[#22577A] checked:border-[#22577A] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
                <label
                  className="form-check-label inline-block text-gray-700"
                  htmlFor="inlineCheckbox1"
                >
                  Chair
                </label>
              </div>

              <div>
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-lg bg-white checked:bg-[#22577A] checked:border-[#22577A] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
                <label
                  className="form-check-label inline-block text-gray-700"
                  htmlFor="inlineCheckbox1"
                >
                  Co-ordinator
                </label>
              </div>

              <div>
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-lg bg-white checked:bg-[#22577A] checked:border-[#22577A] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
                <label
                  className="form-check-label inline-block text-gray-700"
                  htmlFor="inlineCheckbox1"
                >
                  Scribe
                </label>
              </div>

              <div>
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-lg bg-white checked:bg-[#22577A] checked:border-[#22577A] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
                <label
                  className="form-check-label inline-block text-gray-700"
                  htmlFor="inlineCheckbox1"
                >
                  Tech Assistance
                </label>
              </div>

              <div>
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-lg bg-white checked:bg-[#22577A] checked:border-[#22577A] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
                <label
                  className="form-check-label inline-block text-gray-700"
                  htmlFor="inlineCheckbox1"
                >
                  Other
                </label>
              </div>
            </div>
          </div>

          <div className="">
            <input
              className="bg-white rounded-lg w-96 py-2 px-4 text-gray-700 leading-tight"
              placeholder="Organisation(s)"
              id="organisation"
              name="organisation"
              type="text"
              //   onChange={formik.handleChange}
              //   value={formik.values.organisation}
            />
          </div>

          <div className="">
            <textarea
              className="
        w-96
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        
        rounded-lg
        transition
        ease-in-out
        m-0
        focus:text-gray-700
      "
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="About me"
            ></textarea>
          </div>

          <button className="bg-white hover:bg-[#22577A] hover:text-white text-gray-700 font-bold py-2 px-10 rounded-2xl w-fit"
    onClick={()=>{}}>
        Save
    </button>
        </div>
      </div>
    </>
  );
};

export default UserPage;
