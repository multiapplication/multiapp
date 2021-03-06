/**
 * Displays information about MDMs associated to a user 
 * 
 * Current functionality:
 *  - Retrieves all MDM data via references
 *  - Renders mdm information as a "card" which can be clicked
 *  - When an mdm is selected, the associated mdm UID is attached to a global state which is used by ViewMDM.js
 * 
 */
 import {db, auth} from "../utils/firebase.config"
 import { useState, useEffect } from "react"
 import { atom, useRecoilState } from "recoil"
 import { useRouter } from 'next/router';
 import Link from "next/link";
 
 // contains relevant mdm UID to use when viewing/editing 
 export const viewMdmState = atom({
     key:"viewMdmState",
     default:{},
 });
 
 const MdmCard = (mdms) => {
 
     const [mdmData,setMdmData] = useState([]) //holds all mdm data
     const [user, setUser] = useState("");
     const [viewMdm,setViewMdm] = useRecoilState(viewMdmState) // holds the mdm ID associated to a selected card 
 
     const router = useRouter()
  
 
     // add selected MDM ID to global state and route to viewMDM page
     // index is linked to order in which MDM cards are rendered  
     const clickTeam = (index) => {
         setViewMdm(mdms[index])
         router.push("/viewMDM")
     }

     const getUserDetails = () => {
        auth.onAuthStateChanged(async (currentUser) => {
            const userRef = db.collection("users").doc(currentUser.uid)
            setMdmData([]);

            //Retrieve all Mdms linked to a user
            const data = await userRef.get()
            const mdmRefs = data.data().mdms
            if (mdmRefs.length){
                mdmRefs.forEach(async (mdm) => {
                    const resp = await mdm.get();
                    if (resp.exists){
                        setMdmData((arr) => [...arr, resp.data()]);
                        console.log(resp.data())
                    }
            })}
        });
      };
 
     useEffect(() => {
        getUserDetails();
     },[]);
 
     return (
         <div className="grid gap-6 mt-12 w-4/5">
             {mdmData.map(({ meeting_name, meeting_format, meeting_date, meeting_location, meeting_link,meeting_coordinator},index) => (
                // eslint-disable-next-line react/jsx-key
                <div id={index} className="flex flex-col justify-between bg-coolblue rounded p-4 h-max sm:h-fit sm:w-full shadow-lg">
                    <div className="flex flex-row gap-5">
                        <p className="text-lg font-bold">{meeting_name}</p>
                        <p className="opacity-50">{meeting_format}</p>
                    </div>
                    <div className="flex gap-5 mt-2">
                        <p>{meeting_date}</p>
                    </div>
                    <div className="mt-2">
                        {meeting_link === "" ? (
                        <p className="opacity-50">{meeting_location}</p>
                        ) : (
                        <>
                            <Link href={meeting_link}>
                                <a className="text-blue-500">{meeting_link}</a>
                            </Link>
                        </>
                        )}
                    </div>
                    <div className="mt-2">
                        <p className="opacity-50">Coordinator: {meeting_coordinator}</p>
                    </div>
                    <div className="flex flex-row justify-end -mt-10">
                        <button className="bg-[#C4C4C4] hover:bg-[#868686] text-black text-opacity-80 py-2 px-4 rounded-2xl w-36">Add Patient</button>
                    </div>
                </div>           
             ))}
         </div>
     )
 }
 
 export default MdmCard