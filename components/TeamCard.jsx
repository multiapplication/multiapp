/**
 * Displays information about teams associated to a user which includes the team name, the attached hospital as well as the number of participants. 
 *
 * Current functionality:
 *  - Retrieves all team data and associated UIDs
 *  - Renders every team information as a "card" which can be clicked
 *  - When a team is selected, the associated team UID is attached to a global state which is used by ViewTeam.js
 *  - Generate team cards associated to a specific user session
 * 
 * Todo:
 *  - 
 */
import {firebase} from "../utils/firebase.config";
import { useState, useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { useRouter } from 'next/router';

// contains relevant team UID to use when viewing/editing 
export const viewTeamState = atom({
    key:"viewTeamState",
    default:{},
});

const TeamCard = () => {

    const [teams,setTeams] = useState([]); //holds all team data
    const [teamsId,setTeamsId] = useState([]); // holds all team ID
    const [viewTeam,setViewTeam] = useRecoilState(viewTeamState); // holds the team ID associated to a selected card 

    const router = useRouter();

    // retrieve team data
    const getTeams = async (data) => {
        if (data.teams){
            data.teams.forEach(async (teamRef)=> {
                const team = await teamRef.get();
                if (team.exists){
                    setTeams(teamsArr => [...teamsArr, team.data()]);
                    setTeamsId(teamsIdArr => [...teamsIdArr, team.id]);
                }
            })
        }
    }
    
    // retrieve user data           
    const getUserDoc = () => {
        const auth = firebase.auth()
        auth.onAuthStateChanged(async (currentUser) => {
            const db = firebase.firestore();
            const userRef = db.collection("users").doc(currentUser.uid);
            const doc = await userRef.get(); 
            getTeams(doc.data());
        })
    }

    // add selected team ID to global state and route to viewTeam page
    // index is linked to order in which team cards are rendered  
    const clickTeam = (index) => {
        setViewTeam(teamsId[index]);
        router.push("/viewTeam");
    }

    useEffect(() => {
        getUserDoc();
    },[]);

    return (
        <div className="grid gap-6 justify-center ">
            {/* Team card with elements mapped to team data */}
            {!teams.length
            ? <div className=" rounded-md shadow-md bg-coolblue p-2 w-fit "><p>You have no teams to view</p></div>
            : teams.map(({ group_name, attached_hospital, participants },index) => (
                // eslint-disable-next-line react/jsx-key
                <button id={index} className="flex flex-col sm:flex-row justify-between bg-coolblue rounded p-4  w-full sm:h-32 sm:w-full shadow-lg hover:bg-hovercoolblue" onClick={e=>clickTeam(e.target.id)}>
                    <div className="p-4 py-2">
                        {group_name}
                    </div>
                    <div className="p-4 py-2">
                        {attached_hospital}
                    </div>
                    <div className="flex flex-col space-y-10 px-4 py-2">
                        {participants.length} Participants 
                    </div>
                </button>           
            ))}
        </div>
    )
}

export default TeamCard