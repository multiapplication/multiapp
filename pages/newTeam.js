import SearchEmailBar from "../components/SearchEmailBar"
import { useState } from "react"

const newTeamPage = () => {

    const [teamName,setTeamName] = useState("")

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
    
            {/* <!-- my teams page --> */}
            <div className="bg-gradient-to-b from-navy via-aqua to-green w-screen p-6 text-lg h-screen">

                {/* Team Name Inout */}
                <input className="w-full h-12 px-4 mb-2 text-lg text-grey placeholder-grey border rounded-lg focus:shadow-outline" type="text" placeholder="Enter Team Name" onChange={e => setTeamName(e.target.value)}/>
                
                {/* Adding participants */}
                <div className="flex flex-row space-x-4">
                    
                    <button className="bg-white hover:bg-aqua text-aqua hover:text-white font-bold py-2 px-4 border-b-4 border-white hover:border-aqua rounded">
                        Add Participant
                    </button>

                    <div className="relative text-gray-700 w-1/2">
                        
                        <SearchEmailBar></SearchEmailBar>
                        
                        <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                        </div>
                        
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default newTeamPage 