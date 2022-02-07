import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase.config";
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const createMDMPage = () => {
    const [user, setUser] = useState("");
    const [meetingName, setMeetingName] = useState("");
    const [selectedMeetingOption, setSelectedMeetingOption] = useState(null);
    const [selectedTeamOption, setSelectedTeamOption] = useState(null);
    const [meetingLocation, setMeetingLocation] = useState("");
    const [meetingLink, setMeetingLink] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [cutOffDays, setCutOffDays] = useState(0);
    const [reminderDays, setReminderDays] = useState(0);

    const meetingOptions = [
        { value: 'online', label: 'online' },
        { value: 'in person', label: 'in person' },
        { value: 'hybrid', label: 'hybrid' }
    ]

    const teamOptions = [
        { value: 'none', label: 'none' }
    ]

    const getUserDetails = () => {
        auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser.uid);
        });
    };

    useEffect(()=>{
        //getUserDetails();
        console.log(selectedMeetingOption)
    },[selectedMeetingOption]);

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

                            <div className="flex flex-col lg:flex-row w-full">
                                <div className="mt-5">
                                    <label for="datepicker" className="block text-sm text-charcoal mt-8 mb-2">MDM Date</label>
                                    <DatePicker
                                    className="bg-white border-2 border-white appearance-none rounded-lg py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
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
                            <div className="flex flex-row items-center text-sm text-charcoal mt-8 w-1/2">
                                <div className="mr-6">
                                    Add team participants
                                </div>
                                <button className="mr-6 flex flex-row items-center rounded-full bg-white shadow-lg hover:bg-grey hover:text-white">
                                    <img src="person-plus.png" className="h-6 m-2"></img>
                                    <div className="mr-2">Add team</div>
                                </button>

                                <button className="flex flex-row items-center rounded-full bg-white shadow-lg hover:bg-grey hover:text-white">
                                    <img src="person-plus.png" className="h-6 m-2"></img>
                                    <div className="mr-2">Add participant</div>
                                </button>
                            </div>
                        
                            <div className="flex flex-non justify-center">
                                <table className="table-fixed text-left divide-y divide-metal w-max sm:min-w-3/4 mt-12">
                                    <div className="overflow-y-auto h-[28rem]">
                                        <thead className="bg-navy text-white">
                                            <tr className="">
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                                                    No.
                                                </th>

                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                                                    MDM Role
                                                </th>
                                                
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                                                    Hospital Role
                                                </th>

                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                                                    Hospital
                                                </th>
                                                
                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">Remove</span>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="bg-white divide-y divide-metal">
                                            
                                            {/* make this the component that gets created */}
                                            <tr className="odd:bg-white even:bg-coolblue">
                                                <td className="px-6 py-4 ">
                                                    {/* number on list */}
                                                    <div className="text-sm font-medium text-charcoal">
                                                        1.
                                                    </div>
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm font-medium text-charcoal">
                                                        
                                                    </div>
                                                    
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4  text-sm text-charcoal">
                                                    
                                                </td>

                                                <td className="px-6 py-4  text-right text-sm font-medium">
                                                    <a href="#" className="text-red hover:text-hovered">Remove</a>
                                                </td>
                                                
                                            </tr>

                                            <tr className="odd:bg-white even:bg-coolblue">
                                                <td className="px-6 py-4 ">
                                                    {/* number on list */}
                                                    <div className="text-sm font-medium text-charcoal">
                                                        2.
                                                    </div>
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm font-medium text-charcoal">
                                                        
                                                    </div>
                                                    
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4  text-sm text-charcoal">
                                                    
                                                </td>

                                                <td className="px-6 py-4  text-right text-sm font-medium">
                                                    <a href="#" className="text-red hover:text-hovered">Remove</a>
                                                </td>
                                                
                                            </tr>
                                            
                                            <tr className="odd:bg-white even:bg-coolblue">
                                                <td className="px-6 py-4 ">
                                                    {/* number on list */}
                                                    <div className="text-sm font-medium text-charcoal">
                                                        3.
                                                    </div>
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm font-medium text-charcoal">
                                                        
                                                    </div>
                                                    
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4  text-sm text-charcoal">
                                                    
                                                </td>

                                                <td className="px-6 py-4  text-right text-sm font-medium">
                                                    <a href="#" className="text-red hover:text-hovered">Remove</a>
                                                </td>
                                                
                                            </tr>

                                            <tr className="odd:bg-white even:bg-coolblue">
                                                <td className="px-6 py-4 ">
                                                    {/* number on list */}
                                                    <div className="text-sm font-medium text-charcoal">
                                                        4.
                                                    </div>
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm font-medium text-charcoal">
                                                        
                                                    </div>
                                                    
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4  text-sm text-charcoal">
                                                    
                                                </td>

                                                <td className="px-6 py-4  text-right text-sm font-medium">
                                                    <a href="#" className="text-red hover:text-hovered">Remove</a>
                                                </td>
                                                
                                            </tr>

                                            <tr className="odd:bg-white even:bg-coolblue">
                                                <td className="px-6 py-4 ">
                                                    {/* number on list */}
                                                    <div className="text-sm font-medium text-charcoal">
                                                        5.
                                                    </div>
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm font-medium text-charcoal">
                                                        
                                                    </div>
                                                    
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4  text-sm text-charcoal">
                                                    
                                                </td>

                                                <td className="px-6 py-4  text-right text-sm font-medium">
                                                    <a href="#" className="text-red hover:text-hovered">Remove</a>
                                                </td>
                                                
                                            </tr>

                                            

                                            <tr className="odd:bg-white even:bg-coolblue">
                                                <td className="px-6 py-4 ">
                                                    {/* number on list */}
                                                    <div className="text-sm font-medium text-charcoal">
                                                        6.
                                                    </div>
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm font-medium text-charcoal">
                                                        
                                                    </div>
                                                    
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4  text-sm text-charcoal">
                                                    
                                                </td>

                                                <td className="px-6 py-4  text-right text-sm font-medium">
                                                    <a href="#" className="text-red hover:text-hovered">Remove</a>
                                                </td>

                                            </tr>

                                            <tr className="odd:bg-white even:bg-coolblue">
                                                <td className="px-6 py-4 ">
                                                    {/* number on list */}
                                                    <div className="text-sm font-medium text-charcoal">
                                                        7.
                                                    </div>
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm font-medium text-charcoal">
                                                        
                                                    </div>
                                                    
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4  text-sm text-charcoal">
                                                    
                                                </td>

                                                <td className="px-6 py-4  text-right text-sm font-medium">
                                                    <a href="#" className="text-red hover:text-hovered">Remove</a>
                                                </td>

                                            </tr>

                                            <tr className="odd:bg-white even:bg-coolblue">
                                                <td className="px-6 py-4 ">
                                                    {/* number on list */}
                                                    <div className="text-sm font-medium text-charcoal">
                                                        8.
                                                    </div>
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm font-medium text-charcoal">
                                                        
                                                    </div>
                                                    
                                                </td>
                                                
                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4 ">
                                                    <div className="text-sm text-charcoal"></div>
                                                </td>

                                                <td className="px-6 py-4  text-sm text-charcoal">
                                                    
                                                </td>

                                                <td className="px-6 py-4  text-right text-sm font-medium">
                                                    <a href="#" className="text-red hover:text-hovered">Remove</a>
                                                </td>

                                            </tr>

                                        </tbody>

                                    </div>
                                </table>
                            </div>
                            
                        
                        

                            <div className="flex flex-row justify-center mt-12 gap-6 ">
                                <button className="w-72 mb-4 uppercase shadow bg-white text-aqua hover:bg-navy hover:text-white rounded-full py-2 px-4 font-bold">ADD MEETING</button>
                                <button className="w-72 mb-4 uppercase shadow border-2 border-white hover:border-grey hover:text-grey focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full">CANCEL</button>
                                                    
                            </div>
                        </div>
                       
                        
                    </div>
                </div>
            </div>
                
        </div>
    
    )
}

export default createMDMPage