import {firebase} from "../utils/firebase.config"
import { useEffect, useState } from "react"
import { TiTick } from 'react-icons/ti';
import {MdPersonAdd} from "react-icons/md";
import { atom, useRecoilState } from "recoil";

export const idListState = atom({
    key:"idListState",
    default:[],
});

const AddParticipant = () => {
    const [click,setClicked] = useState(false)
    const [email, setEmail] = useState("")
    const [exists, setExists] = useState(false)
    const [id,setId] = useState("")
    const [idList, setIdList] = useRecoilState(idListState)

    const searchUsers = async () => {
        
        const userRef = firebase.firestore().collection("users").where('email','==',email);
        const snapshot = await userRef.get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            setExists(false)
            return;
          }  
          
        snapshot.forEach(doc => {
            setId(doc.id)
            setExists(true)
        });
    }
    
    useEffect(() => {
        if (email.includes("@")){
            searchUsers()
        }
        else{
            setExists(false)
        }

        if (click && exists){
            if (!idList.includes(id)) {
                setIdList((idList) => [...idList, id])
            }
            else {
                console.log("user already in team!")
            }
        }
        else {
            setClicked(false)
        }
    },[email,click])

    return( 

    <div className="flex flex-row">

        <div className="mr-4">
            Add team participants
        </div>

        <button className="flex flex-row items-center px-3 space-x-4 rounded-full bg-white shadow-lg hover:bg-grey hover:text-white" onClick={() => setClicked(true)}>
            <MdPersonAdd></MdPersonAdd>
            <div className="mr-2 text-sm">Add participant</div>
        </button>
        <input className="bg-white appearance-none border-2 border-metal rounded-lg w-fit mx-4 py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green" 
                type="text" 
                placeholder="enter participant email..."   
                onChange={e => setEmail(e.target.value)}
        />
        {exists
        ? <TiTick className= "scale-150 bg-green rounded mt-3 mx-4"/>
        : <TiTick className= "scale-150 bg-red rounded mt-3 mx-4"/>
        }
    </div>

    )
}

export default AddParticipant
