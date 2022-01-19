import { useState, useEffect } from "react"
import {firebase} from "../utils/firebase.config"

const TeamCard = () => {

    const TEAMS_COLL_NAME = "teams"

    const [teams,setTeams] = useState([])
    
    const getTeams = async () => {
        const dataArr = [];
        const db = firebase.firestore();
        const teamsRef = db.collection(TEAMS_COLL_NAME);

        const snapshot = await teamsRef.get();
        snapshot.forEach(doc => {
            if (doc.exists){
                dataArr.push(doc.data());
            }
            else {
                console.log("error: document does not exist")
            }
        });
        setTeams(dataArr)
    }

    useEffect(() => {
        getTeams()
    },[]);

    return (
        <div className="grid gap-6">
            {teams.map(({ group_name, attached_hospital, participants }) => (
                <div className="flex flex-col sm:flex-row justify-between bg-coolblue rounded p-4 h-96 w-full sm:h-32 sm:w-full shadow-lg hover:bg-hovercoolblue">
                    <div className="p-4 py-2">
                        {group_name}
                    </div>
                    <div className="p-4 py-2">
                        {attached_hospital}
                    </div>
                    <div className="px-4 py-2">
                        {participants.length} Participants
                    </div>
                </div>           
            ))}

        </div>
    )

}

export default TeamCard