/**
 * Allows user to view an existing team. Editable fields include: team name, attached hospital and a participants list. 
 * 
 * Current functionality:
 *  - change any details about an exisiting team 
 *  - delete team
 * 
 * Todo:
 *  - Finish Routing
 */
import {firebase} from "../utils/firebase.config";
import { useRouter } from 'next/router';
import { useState,useEffect } from "react";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // CSS for dialog box
import {FaTrash} from "react-icons/fa";
import TeamList from "../components/TeamList";
import AddParticipant from "../components/AddParticipant";
import { idListState } from "../components/AddParticipant";
import { viewTeamState } from "../components/TeamCard";

const viewTeamPage = () => {
    const [teamName,setTeamName] = useState("");
    const [hospitalName,setHospitalName] = useState("");
    const [idList, setIdList] = useRecoilState(idListState); // All relevant user ID linked to a team 
    const teamId = useRecoilValue(viewTeamState); // UID for the selected team, used to correctly render  
    const resetIdList = useResetRecoilState(idListState);
    const auth = firebase.auth();

    const router = useRouter();

    // fetch all data relevant to the selected team 
    const getTeam = async () => {
        const teamRef = firebase.firestore().collection('teams').doc(teamId);
        const doc = await teamRef.get();
        if (!doc.exists) {
        console.log('No such document!');
        } 
        else {
            setTeamName(doc.data().group_name);
            setHospitalName(doc.data().attached_hospital);
            setIdList(doc.data().participants); // set global state of userIDs used to render list 
        }
    }

    // write relevant changes to database 
    const editTeam = async () => {
        const res = await firebase.firestore().collection("teams").doc(teamId).update({ // data structure for teams
            attached_hospital: hospitalName,
            group_name: teamName,
            participants: idList
        });
        resetIdList();
        router.push("/myTeams");
    }

    // delete team from database 
    const deleteTeam = async () => {
        const respTeam = await firebase.firestore().collection('teams').doc(teamId).delete();
        const userRef = firebase.firestore().collection("users").doc(auth.currentUser.uid);
        const respUser = await userRef.update({
            teams: firebase.firestore.FieldValue.arrayRemove(firebase.firestore().doc('/teams/'+ teamId))
        })
        resetIdList();
        router.push('/myTeams');
    }

    const submit = () =>{
        confirmAlert({
            title: 'Confirm changes to team?',
            message: '',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {editTeam()}
              },
              {
                label: 'No',
              }
            ]
        });
    }

    const removeTeam = () => {
        confirmAlert({
            title: 'Are you sure you want to delete this team?',
            message: '',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {deleteTeam()}
              },
              {
                label: 'No',
              }
            ]
        });
    }
    
    // fetch all team data
    useEffect(() => {
        getTeam();
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
                    <div className="flex justify-between text-3xl bg-white font-bold pt-4 pb-6 px-4">
                        Edit team
                        <FaTrash className="cursor-pointer hover:fill-red" onClick={removeTeam}></FaTrash>
                    </div>
                    <div className="bg-metal py-6 px-12 h-full">
                        <div>
                            <label for="teamName" className="mt-12">Team name</label>
                            <input
                                className="bg-white appearance-none border-2 border-metal rounded-lg w-1/3 mx-4 py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                type="text"                        
                                defaultValue={teamName}
                                onChange={e => setTeamName(e.target.value)}
                            />
                        </div>
                        <div className="mt-6">
                            <label for="attached_hospital" className="mt-12">Attached hospital</label>
                            <input
                                className="bg-white appearance-none border-2 border-metal rounded-lg w-1/3 mx-4 py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                type="text"                        
                                defaultValue= {hospitalName}
                                onChange={e => setHospitalName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-row items-center mt-8">
                            <AddParticipant></AddParticipant>
                        </div>                        
                        
                        <TeamList></TeamList>

                        <div className="flex flex-row justify-center mt-12 gap-6 ">
                            <button className="w-64 mb-4 uppercase shadow bg-white text-aqua hover:bg-navy hover:text-white rounded-full py-2 px-4 font-bold" onClick={submit}>SUBMIT CHANGES</button>
                            <button className="w-64 mb-4 uppercase shadow border-2 border-white hover:border-grey hover:text-grey focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full" 
                            onClick={() => {
                                resetIdList()
                                router.push('/myTeams')
                            }}>CANCEL</button>       
                        </div>
                        
                    </div>
                </div>
            </div>
                
        </div>
    )
}

export default viewTeamPage