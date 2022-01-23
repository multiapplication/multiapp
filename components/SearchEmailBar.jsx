import {firebase} from "../utils/firebase.config"
import { useEffect, useState } from "react"
import { TiTick } from 'react-icons/ti';

const SearchEmailBar = () => {

    const [email, setEmail] = useState("")
    const [exists, setExists] = useState(false)

    const searchUsers = async () => {
        
        const userRef = firebase.firestore().collection("users").where('email','==',email);
        const snapshot = await userRef.get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            setExists(false)
            return;
          }  
          
        snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        setExists(true)
        });
    }
    
    useEffect(() => {
        if (email.includes("@")){
            searchUsers()
        }
    },[email])

return (
    <div className="flex flex-row">
        <input className="w-full h-10 pl-8 pr-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" placeholder="Enter User Email" onChange={e => setEmail(e.target.value)}/>
        {exists
        ? <TiTick className= "scale-150 bg-green rounded mt-3 mx-4"/>
        : <TiTick className= "scale-150 bg-red rounded mt-3 mx-4"/>
        }
    </div>
    
    )
}

export default SearchEmailBar