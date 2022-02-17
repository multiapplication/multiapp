/**
 * User is able to create an MDM  
 *
 * Current functionality:
 *  - Can input key meeting details, add participants from exisiting teams or inidivually
 *  - Links all participants to created meetings
 * 
 * Todo:
 *  - 
 */
 import {firebase} from "../utils/firebase.config";
 import { useEffect, useState } from "react";
 import { db, auth } from "../utils/firebase.config";
 import { useRouter } from 'next/router';
 import Select from 'react-select';
 import DatePicker from "react-datepicker";
 import "react-datepicker/dist/react-datepicker.css";
 import AddParticipant from "../components/AddParticipant";
 import AddTeam from "../components/AddTeam";
 import TeamList from "../components/TeamList";
 import { idListState } from "../components/AddParticipant";
 import { useRecoilValue, useResetRecoilState } from "recoil";
 import { confirmAlert } from "react-confirm-alert";
 import 'react-confirm-alert/src/react-confirm-alert.css';
 import { SpinnerCircularFixed } from "spinners-react";
 import Router from "next/router";
 import Link from "next/link";
 import Avatar from "react-avatar";
 
 const createMDMPage = () => {
     const [user, setUser] = useState("");
     const [userName, setUserName] = useState("");
     const [userData, setUserData] = useState([]);
     const [pageLoading, setPageLoading] = useState(false);
     const [teams, setTeams] = useState([]);
     const [meetingName, setMeetingName] = useState("");
     const [selectedMeetingOption, setSelectedMeetingOption] = useState(null);
     const [meetingLocation, setMeetingLocation] = useState("");
     const [meetingLink, setMeetingLink] = useState("");
     const [startDate, setStartDate] = useState(new Date());
     const [cutOffDays, setCutOffDays] = useState(0);
     const [reminderDays, setReminderDays] = useState(0);
     const idList = useRecoilValue(idListState);
     const resetIdList = useResetRecoilState(idListState);
 
     const router = useRouter();
 
     const meetingOptions = [
         { value: 'Online', label: 'Online'},
         { value: 'In Person', label: 'In Person' },
         { value: 'Hybrid', label: 'Hybrid' }
     ];
 
     const getUserData = () => {
         setPageLoading(true);
         auth.onAuthStateChanged(async (currentUser) => {
             setUser(currentUser.uid);
             const userRef = db.collection("users").doc(currentUser.uid);
             userRef.onSnapshot((doc) => {
             if (doc.exists) {
                 setUserData(doc.data());
                 setUserName(doc.data().first_name + " " + doc.data().last_name);
                 setTeams(doc.data().teams);
                 setPageLoading(false);
             } else {
                 // doc.data() will be undefined in this case
                 console.log("No such document!");
             }
             });
         });
     };
 
     const linkParticipants = (meetingId) => {
         idList.forEach(async (id) => {
             const userRef = db.collection("users").doc(id);
             const respUser = await userRef.update({
             mdms: firebase.firestore.FieldValue.arrayUnion(db.doc('mdms/'+meetingId))
         })
         });
     }
 
     const formatDate = () => {
         const isoForm = startDate.toISOString().split('T')[0];
         const regForm = isoForm.split('-');
         const time = startDate.toLocaleTimeString('en-AU', {
             hour: 'numeric',
             minute: 'numeric',
             hour12: true
         });
         return regForm[2]+"/"+regForm[1]+"/"+regForm[0] + "  "+time
     }
 
     // if all fields are complete, add team to database
     const addMDM = async () => {
         if (meetingName === "" || selectedMeetingOption === null){
             alert("Incomplete fields!");
             return;
         }
        
         const respMeeting = await db.collection("mdms").add({ // data structure for mdms
             meeting_coordinator: userName,
             meeting_name: meetingName,
             meeting_format: selectedMeetingOption.value,
             meeting_location: meetingLocation,
             meeting_link: meetingLink,
             meeting_date: formatDate(),
             cut_off_days: cutOffDays,
             reminder_days: reminderDays,
             participants: idList 
         });
         const userRef = db.collection("users").doc(auth.currentUser.uid);
         const respUser = await userRef.update({
             mdms: firebase.firestore.FieldValue.arrayUnion(db.doc('mdms/'+respMeeting.id))
         })
         linkParticipants(respMeeting.id)
         resetIdList()
         router.push("/dashboard");
     }
 
     const submit = () =>{
         confirmAlert({
             title: 'Are you sure you want to Create this MDM?',
             message: '',
             buttons: [
               {
                 label: 'Yes',
                 onClick: () => {addMDM()}
               },
               {
                 label: 'No',
               }
             ]
         })
     }
 
     useEffect(()=>{
         getUserData();
     },[idList]);
 
     return (
         <div className="flex flex-row h-full">
 
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
                    Router.push('/manageMDM');
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
            
             {/* <!-- meeting creation page --> */}
             <div className="bg-gradient-to-b from-navy via-aqua to-green w-4/5  text-lg h-full">
                                 
                 {/* <!-- form styling --> */}
 
                 <div className="flex flex-col mt-12 mx-12">
                     <div className="text-3xl bg-white font-bold pt-4 pb-6 px-4">
                         Create a new meeting
                     </div>
                 
                     <div className="bg-metal py-12 px-24 h-full">
 
                         <div className="flex flex-col">
                             
                              {/* enter name */}
                             <label className="block text-sm text-charcoal mb-2">Name</label>
                             <input
                                 className="bg-white border-2 border-white appearance-none rounded-lg w-1/2 py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                 id="mdmName"
                                 type="text"                        
                                 placeholder="Enter meeting name..."
                                 onChange={e=>setMeetingName(e.target.value)}
                             />
                             
                             {/* location */}                                                      
                             {/* single select checklist */}
                             <label className="text-sm text-charcoal mt-8 mb-2">Location</label>
 
                             <div className="flex flex-row items-center">
                                 <Select
                                     className='max-w-fit'
                                     options={meetingOptions}
                                     defaultValue={selectedMeetingOption}
                                     onChange={setSelectedMeetingOption}
                                 />
                             </div>
                         
 
                             {/* Location field */}
                             <label className="block text-sm text-charcoal mt-8 mb-2">Room location</label>
                             <input
                                 className="bg-white border-2 border-white appearance-none rounded-lg w-2/3 py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                 type="text"                      
                                 placeholder="Enter room and building..."
                                 onChange={(e)=>setMeetingLocation(e.target.value)}
                             />
 
                             {/* link field */}
                             <label className="block text-sm text-charcoal mt-8 mb-2">Conferencing link</label>
                             <input
                                 className="bg-white border-2 border-white appearance-none rounded-lg w-2/3 py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                 type="text"                        
                                 placeholder="e.g. zoom or webex conference link..."
                                 onChange={(e)=>setMeetingLink(e.target.value)}
                             />
 
                             {/* meeting date and time */}
 
                             <div className="flex flex-col lg:flex-row">
                                 <div className="mt-5">
                                     <label for="datepicker" className="block text-sm text-charcoal mt-8 mb-2">MDM Date</label>
                                     <DatePicker
                                     className="bg-white border-2 border-white appearance-none rounded-lg py-2 px-4 ml-6 w-full text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                     showTimeSelect
                                     selected={startDate}
                                     onChange={(date) => setStartDate(date)}
                                     dateFormat="MMMM d, yyyy h:mm aa"
                                     />
                                 </div>
                                 
 
                                 <div className="lg:ml-8">
                                     <label for="cutoff" className="block text-sm text-charcoal mt-8 ">Days before meeting: </label>
                                     <label for="cutoff" className="block text-sm text-charcoal mb-2">Cuttoff patient additions</label>
                                     <input
                                         className="bg-white border-2 border-white appearance-none rounded-lg py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                         type="number"                        
                                         placeholder="e.g 5..."
                                         min={0}
                                         onChange={e=>setCutOffDays(e.target.value)}
                                     />
                                 </div>
 
                                 <div className="lg:ml-4">
                                     <label for="reminder" className="block text-sm text-charcoal mt-8">Days before meeting:</label>
                                     <label for="cutoff" className="block text-sm text-charcoal mb-2">Email reminder to participants</label>
                                     <input
                                         className="bg-white border-2 border-white appearance-none rounded-lg py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                         type="number"                        
                                         placeholder="e.g. 2..."
                                         min={0}
                                         onChange={e=>setReminderDays(e.target.value)}
                                     />
                                 </div>
                                 
                             </div>
 
                             {/* adding meeting members */}
                             <div className="flex flex-col items-center text-sm space-y-8 text-charcoal mt-12 w-fit">
                                 <AddParticipant></AddParticipant>
                                 <AddTeam TeamRefs={teams}></AddTeam>
                             </div>
                         
                             <div className="flex flex-non justify-center">
                                 <TeamList></TeamList>
                             </div>
                             
                             <div className="flex flex-row justify-center mt-12 gap-6 ">
                                 <button className="w-72 mb-4 uppercase shadow bg-white text-aqua hover:bg-navy hover:text-white rounded-full py-2 px-4 font-bold" onClick={submit}>ADD MEETING</button>
                                 <button className="w-72 mb-4 uppercase shadow border-2 border-white hover:border-grey hover:text-grey focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full" 
                                 onClick={() => {
                                 resetIdList()
                                 router.push('/dashboard')
                             }}>CANCEL</button>
                                                     
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
 
         </div>
     )
 }
 
 export default createMDMPage