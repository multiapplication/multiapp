/**
 * User is able to create an MDM  
 *
 * Current functionality:
 *  - 
 * 
 * Todo:
 *  - 
 */
import {firebase} from "../utils/firebase.config"
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase.config";
import { useRouter } from 'next/router';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddParticipant from "../components/AddParticipant"
import AddTeam from "../components/AddTeam"
import TeamList from "../components/TeamList"
import { idListState } from "../components/AddParticipant"
import { useRecoilValue, useResetRecoilState } from "recoil";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css' 

const createMDMPage = () => {
    const [user, setUser] = useState("");
    const [teams, setTeams] = useState([]);
    const [meetingName, setMeetingName] = useState("");
    const [selectedMeetingOption, setSelectedMeetingOption] = useState(null);
    const [meetingLocation, setMeetingLocation] = useState("");
    const [meetingLink, setMeetingLink] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [cutOffDays, setCutOffDays] = useState(0);
    const [reminderDays, setReminderDays] = useState(0);
    const idList = useRecoilValue(idListState)
    const resetIdList = useResetRecoilState(idListState);

    const router = useRouter();

    const meetingOptions = [
        { value: 'online', label: 'online'},
        { value: 'in person', label: 'in person' },
        { value: 'hybrid', label: 'hybrid' }
    ];

    const getUserData = () => {
        auth.onAuthStateChanged(async (currentUser) => {
            setUser(currentUser.uid);
            const userRef = db.collection("users").doc(currentUser.uid)
            const doc = await userRef.get(); 
            setTeams(doc.data().teams)
        });
    };

    // if all fields are complete, add team to database
    const addMDM = async () => {
        if (meetingName === ""){
            alert("Incomplete fields!");
            return;
        }
       
        const respMeeting = await db.collection("mdms").add({ // data structure for mdms
            meeting_name: meetingName,
            meeting_format: selectedMeetingOption.value,
            meeting_location: meetingLocation,
            meeting_link: meetingLink,
            meeting_date: startDate,
            cut_off_days: cutOffDays,
            reminder_days: reminderDays,
            participants: idList 
        });
        const userRef = db.collection("users").doc(auth.currentUser.uid);
        const respUser = await userRef.update({
            mdms: firebase.firestore.FieldValue.arrayUnion(db.doc('mdms/'+respMeeting.id))
        })

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
        console.log(idList)
    },[idList]);

    return (
        <div className="flex flex-row h-full">
    
            {/* <!-- nav bar --> */}
            <div className="flex flex-col bg-white w-64 p-4">
                <div className="flex items-center justify-center">
                    <img src="logo.png" className="h-16 mb-4"></img>
                </div>
    
                <div className="flex flex-row border-metal border-b-2 items-center mb-6 p-2 hover:bg-navy hover:text-white">
                   <div className="flex bg-green rounded-full w-12 h-12 mr-4 text-center items-center justify-center">
                       SG 
                       {/* <!-- placeholder for profile picture or initials if no pic uploaded --> */}
                   </div>
    
                   <div className="flex flex-col">
                        <div>
                            Name
                        </div>
                        <div className="text-sm mb-2">
                            Organisation
                        </div>
                        
                        <div className="text-sm">
                            Role
                        </div>
                        
                        <div className="text-sm">
                            MDM Role
                        </div>
                        
                   </div>
                </div>
    
                <div className="flex flex-row hover:text-white hover:bg-navy">
                    <img src="person-rolodex.png" className="hover:fill-coolblue w-12 h-12"></img>
                    <div className="flex items-center justify-center ml-2">
                        My Patients
                    </div>
                </div>
    
                <div className="flex flex-row mt-4 hover:text-white hover:bg-navy">
                    <img src="clipboard.png" className="w-12 h-12"></img>
                    <div className="flex items-center justify-center ml-2">
                        My MDMs
                    </div>
    
                    
                </div>
                
                <div className="ml-2">
                    <div className="ml-12 mt-2 border-metal border-b-2 border-l-2 p-1 hover:bg-navy hover:text-white">
                        Upcoming MDMs
                    </div>
        
                    <div className="ml-12 mt-2 border-metal border-b-2 border-l-2 p-1 hover:bg-navy hover:text-white">
                        Past MDMs
                    </div>
        
                    <div className="ml-20 mt-2 border-metal border-b-2 border-l-2 p-1 hover:bg-navy hover:text-white">
                        Attendance
                    </div>
        
                    <div className="ml-12 mt-2 border-metal border-b-2 border-l-2 p-1 hover:bg-navy hover:text-white">
                        Manage MDMs
                    </div>
        
                    <div className="ml-20 mt-2 border-metal border-b-2 border-l-2 p-1 hover:bg-navy hover:text-white">
                        + New MDM
                    </div>
                </div>
                
    
                <div className="flex flex-row mt-4 hover:text-white hover:bg-navy">
                    <img src="people-fill.png" className="w-12 h-12"></img>
                    <div className="flex items-center justify-center ml-2 hover:bg-navy">
                        My Teams
                    </div>
    
                    
                </div>
    
                <div className="ml-2">
                    <div className="ml-12 mt-2 border-metal border-b-2 border-l-2 hover:bg-navy hover:bg-navy hover:text-white">
                        + New Team
                    </div>
                </div>
    
                
    
                <div className="mb-4 mt-16 py-8 absolute bottom-0">
    
                    <button className="text-aqua font-bold">Logout</button>
                    <div className="flex flex-row mt-2 hover:text-white hover:bg-navy">
                        <img src="gear-fill.png" className="w-12 h-12"></img>
                        <div className="flex items-center justify-center ml-2">
                            Settings
                        </div>
                    </div>
                </div>
                
            </div>
    
            {/* <!-- meeting creation page --> */}
            <div className="bg-gradient-to-b from-navy via-aqua to-green w-full p-12 text-lg h-full">
                                
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