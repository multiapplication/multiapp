/**
 * Displays information about teams associated to a user which includes the team name, the attached hospital as well as the number of participants. 
 *
 * Current functionality:
 *  - Retrieves all team data and associated UIDs
 *  - Renders every team information as a "card" which can be clicked
 *  - When a team is selected, the associated team UID is attached to a global state which is used by ViewTeam.js
 * 
 * Todo:
 *  - Generate team cards associated to a specific user session
 */
import {firebase} from "../utils/firebase.config"
import { useState, useEffect } from "react"
import { atom, useRecoilState } from "recoil"
import { useRouter } from 'next/router';

// contains relevant team UID to use when viewing/editing 
export const viewTeamState = atom({
    key:"viewTeamState",
    default:{},
});

const TeamCard = () => {

    const [teams,setTeams] = useState([]) //holds all team data
    const [teamsId,setTeamsId] = useState([]) // holds all team ID
    const [viewTeam,setViewTeam] = useRecoilState(viewTeamState) // holds the team ID associated to a selected card 

    const router = useRouter()
    
    // retrieve all teams
    const getTeams = async () => {
        const dataArr = [];
        const idArr = [];
        const db = firebase.firestore();
        const teamsRef = db.collection("teams");

        const snapshot = await teamsRef.get(); // listener not needed as teams are user defined 
        snapshot.forEach(doc => {
            if (doc.exists){
                dataArr.push(doc.data());
                idArr.push(doc.id)
            }
            else {
                console.log("error: document does not exist")
            }
        });
        setTeamsId(idArr)
        setTeams(dataArr)
    }

    // add selected team ID to global state and route to viewTeam page
    // index is linked to order in which team cards are rendered  
    const clickTeam = (index) => {
        setViewTeam(teamsId[index])
        router.push("/viewTeam")
    }

    useEffect(() => {
        getTeams()
    },[]);

    return (
        <div className="grid gap-6">
            {/* Team card with elements mapped to team data */}
            {teams.map(({ group_name, attached_hospital, participants },index) => (
                <button id={index} className="flex flex-col sm:flex-row justify-between bg-coolblue rounded p-4 h-96 w-full sm:h-32 sm:w-full shadow-lg hover:bg-hovercoolblue" onClick={e=>clickTeam(e.target.id)}>
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