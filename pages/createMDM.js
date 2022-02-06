import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase.config";

const createMDMPage = () => {
    const [user, setUser] = useState("");

    const getUserDetails = () => {
        auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser.uid);
        });
    };

    useEffect(()=>{
        getUserDetails();
    },[]);

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
                            <label for="mdmName" className="block text-sm text-charcoal mb-2">Name</label>
                            <input
                                className="bg-white border-2 border-white appearance-none rounded-lg w-1/2 py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                id="mdmName"
                                name="mdmName"
                                type="mdmName"                        
                                placeholder="enter meeting name..."
                                
                            />
                            
                            {/* location */}                                                      
                            {/* single select checklist */}
                            <label for="online" className="text-sm text-charcoal mt-8 mb-2">Location</label>

                            <div className="flex flex-row items-center">
                                <input className="rounded-full mr-2" type="checkbox" id="online" name="" value="" />
                                <label for="online" className="mr-8">Online</label>

                                <input className="rounded-full mr-2" type="checkbox" id="in-person" name="" value="" />
                                <label for="in-person" className="mr-8">In person</label>

                                <input className="rounded-full mr-2" type="checkbox" id="hybrid" name="" value="" />
                                <label for="hybrid" className="mr-8">Hybrid</label>
                            </div>
                        

                            {/* Location field */}
                            <label for="in-person" className="block text-sm text-charcoal mt-8 mb-2">Room location</label>
                            <input
                                className="bg-white border-2 border-white appearance-none rounded-lg w-2/3 py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                id="in-person"
                                name="in-person"
                                type="in-person"                        
                                placeholder="enter room and building..."
                                
                            />

                            {/* link field */}
                            <label for="virtual" className="block text-sm text-charcoal mt-8 mb-2">Conferencing link</label>
                            <input
                                className="bg-white border-2 border-white appearance-none rounded-lg w-2/3 py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                id="virtual"
                                name="virtual"
                                type="virtual"                        
                                placeholder="e.g. zoom or webex conference link..."
                                
                            />

                            {/* meeting date and time */}

                            <div className="flex flex-col lg:flex-row w-10/12">
                                {/* calendar placeholder text. make something like this: https://tailwindcomponents.com/component/datepicker-with-tailwindcss-and-alpinejs */}                                                                
                                <div className="mt-5">
                                    <label for="datepicker" className="block text-sm text-charcoal mt-8 mb-2">MDM Date</label>
                                    <input
                                        className="bg-white border-2 border-white appearance-none rounded-lg py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                        id="datepicker"
                                        name="datepicker"
                                        type="datepicker"                        
                                        placeholder="Select date"
                                    
                                    />
                                </div>
                                

                                {/* time - numerical value and am/pm */}
                                
                                <div className="mt-5 lg:ml-4">
                                    <label for="ampm" className="block text-sm text-charcoal mt-8 mb-2">Time</label>
                                    <div className="flex flex-row items-center">
                                        <input type="text" name="ampm" id="ampm" className="py-2 px-4 bg-white border-2 border-white rounded-lg text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green" placeholder="7:30"/>
                                            
                                        <div className="">
                                            <select id="" name="" className="-ml-12 block appearance-none border-1 p-0 border-white rounded-lg text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                            </select>
                                            
                                        </div>
                                    </div>
                                        
                                </div>

                                <div className="lg:ml-8">
                                    <label for="cutoff" className="block text-sm text-charcoal mt-8 ">Days before meeting: </label>
                                    <label for="cutoff" className="block text-sm text-charcoal mb-2">Cuttoff patient additions</label>
                                    <input
                                        className="bg-white border-2 border-white appearance-none rounded-lg py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                        id="cutoff"
                                        name="cutoff"
                                        type="cutoff"                        
                                        placeholder="e.g 5..."
                                    
                                    />
                                </div>

                                <div className="lg:ml-4">
                                    <label for="reminder" className="block text-sm text-charcoal mt-8">Days before meeting:</label>
                                    <label for="cutoff" className="block text-sm text-charcoal mb-2">Email reminder to participants</label>
                                    <input
                                        className="bg-white border-2 border-white appearance-none rounded-lg py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                        id="reminder"
                                        name="reminder"
                                        type="reminder"                        
                                        placeholder="e.g. 2..."
                                    
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