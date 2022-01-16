import { firebase } from "../utils/firebase.config.js";
import { useState, useEffect } from "react"
import { dateState } from "./AddDate.jsx";
import { indivState } from "./AddIndividual.jsx";
import { useRecoilValue } from "recoil";

const CreateMeeting = () => {

    const meetingDate = useRecoilValue(dateState);
    const indivList = useRecoilValue(indivState);

    const [create,setCreate] = useState(false);

    const meetingInfo = {
        name: 'test',
        type: 'mdm',
    };

    const newMeeting = async (data,proceed) => {
        const db = firebase.firestore()
        if (proceed) {
            const res = await db.collection('meetings').doc('test1').set(data);
        }
    }
    
    useEffect(() => {
        console.log(meetingDate)
        console.log(indivList)
        if (create){
            const confirmBox = window.confirm("Confirm Meeting Creation")
            if (confirmBox){
                newMeeting(meetingInfo,create)
            }
        }
        setCreate(false)
    },[create]);

    return (
        <>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setCreate(true)}>
                <h1>CREATE MEETING</h1>
            </button>
        </>
    )
}

export default CreateMeeting