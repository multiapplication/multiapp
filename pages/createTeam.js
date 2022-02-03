/**
 * Allows user to create a team. Editable fields include: team name, attached hospital and a participants list  
 *
 * Current functionality:
 *  - dynamically add and remove participants to team via email
 * 
 * Todo:
 * - Finish Routing
 * - Fix Nav bar (make it static)
 * - Fix Dynamic Scrolling
 */
import {firebase} from "../utils/firebase.config";
import { useRouter } from 'next/router';
import { useState,useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // CSS for dialog box
import TeamList from "../components/TeamList";
import AddParticipant from "../components/AddParticipant";
import { idListState } from "../components/AddParticipant";

const createTeamPage = () => {
    const [teamName,setTeamName] = useState("");
    const [hospitalName,setHospitalName] = useState("");
    const resetIdList = useResetRecoilState(idListState);
    const idList = useRecoilValue(idListState);
    const auth = firebase.auth();
    const router = useRouter();

    // if all fields are complete, add team to database
    const addTeam = async () => {
        if (hospitalName === "" || teamName === "" ){
            alert("Incomplete fields!");
            return;
        }
        //const idListRef = idList.map(i=>"/users/"+i) // CORRECT USER REFERENCE IGNORED FOR NOW 
        const respTeam = await firebase.firestore().collection("teams").add({ // data structure for teams
            attached_hospital: hospitalName,
            group_name: teamName,
            participants: idList // need to change to idListRef once referencing is correct 
        });
        const userRef = firebase.firestore().collection("users").doc(auth.currentUser.uid);
        const respUser = await userRef.update({
            teams: firebase.firestore.FieldValue.arrayUnion(firebase.firestore().doc('teams/'+ respTeam.id))
        })
        resetIdList()
        router.push("/myTeams");
    }

    // dialog box 
    const submit = () => {
        confirmAlert({
          title: 'Are you sure you want to create this team?',
          message: '',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {addTeam()}
            },
            {
              label: 'No',
            }
          ]
        });
    };

    useEffect(() => {
        resetIdList();
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
    
            {/* <!-- team creation page --> */}
            <div className="bg-gradient-to-b from-navy via-aqua to-green w-full p-12 text-lg h-full">
                                
                {/* <!-- form styling --> */}

                <div className="flex flex-col mt-12 mx-12">
                    <div className="text-3xl bg-white font-bold pt-4 pb-6 px-4">
                        Create a new team
                    </div>
                
                    <div className="bg-metal py-6 px-12 h-full">
                        <div>
                            <label for="teamName" className="mt-12">Team name</label>
                            <input
                                className="bg-white appearance-none border-2 border-metal rounded-lg w-1/3 mx-4 py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                id="teamName"
                                name="teamName"
                                type="teamName"                        
                                placeholder="enter team name..."
                                onChange={e => setTeamName(e.target.value)}
                                
                            />
                        </div>
                        <div className="mt-6">
                            <label for="attached_hospital" className="mt-12">Attached hospital</label>
                            <input
                                className="bg-white appearance-none border-2 border-metal rounded-lg w-1/3 mx-4 py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                id="attached_hospital"
                                name="attached_hospital"
                                type="attached_hospital"                        
                                placeholder="enter hospital name..."
                                onChange={e => setHospitalName(e.target.value)}
                                
                            />
                        </div>
                        <div className="flex flex-row items-center mt-8">
                            <AddParticipant></AddParticipant>
                        </div>                        
                        
                        <TeamList></TeamList>

                        <div className="flex flex-row justify-center mt-12 gap-6 ">
                            <button className="w-64 mb-4 uppercase shadow bg-white text-aqua hover:bg-navy hover:text-white rounded-full py-2 px-4 font-bold" onClick={submit}>ADD TEAM</button>
                            <button className="w-64 mb-4 uppercase shadow border-2 border-white hover:border-grey hover:text-grey focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full" onClick={() => router.push('/myTeams')}>CANCEL</button>       
                        </div>
                        
                    </div>
                </div>
            </div>
                
        </div>
    
    )
}

export default createTeamPage