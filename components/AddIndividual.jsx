import { firebase } from "../utils/firebase.config.js";
import { useState, useEffect } from "react";
import { atom, useRecoilState } from "recoil";

export const indivState = atom({
    key:"indivState",
    default:[],
});

const AddIndividual = () => {

    const COLLECTION_NAME = "users";

    const [allUsers,setAllUsers] = useState([])
    const [clicked,setClicked] = useState(false)
    const [indivs, setIndivs] = useRecoilState(indivState)

    const addIndiv = (userId) => {
        if (!indivs.some(indiv => indiv.id === userId.id || !indivs.length)){
            setIndivs(indivs => [...indivs, userId]);
        }
    }

    const removeIndiv = (userId) => {
        if (indivs.length){
            var userIndex = indivs.findIndex(function (indiv) {
                return indiv.id === userId.id
            })
            const removeList = [...indivs]
            indivs = removeList.splice(userIndex,1)
        }
    }

    const searchDB = async (collectionName,setData) => {

        const response = firebase.firestore().collection(collectionName)

        const data = await response.get();

        setData(data.docs.map(doc => (
                    {id:doc.id, 
                    email:doc.data().email,
                    firstName:doc.data().first_name, 
                    lastName:doc.data().last_name,
                    organisation:doc.data().organisation,
                    role:doc.data().role}
                )
            )
        )
    }

    useEffect(() => {
        if (clicked) searchDB(COLLECTION_NAME,setAllUsers)
        setClicked(false)
    },[clicked])
    
    return (
        <>
            <div className="flex flex-col items-center">
                <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setClicked(true)}>
                    <h1>ADD INDIVIDUAL</h1>
                </button>
                <div className="grid gap-4 grid-cols-2 overflow-y-auto">
                    {allUsers.map(({ id, firstName, lastName, organisation, role }) => (
                        <div>
                            <button className="bg-slate-100 shadow-lg font-sans text-black py-3 px-3 rounded-lg w-full" onClick={() => addIndiv({id})}> {firstName} {lastName} {role} {organisation }  </button>
                            <button className="bg-slate-100 shadow-lg font-sans text-black py-3 px-3 rounded-lg w-full" onClick={() => removeIndiv({id})}> X </button>
                        </div>
                        
                    ))}
                </div>
            </div>
        </>
    )
}

export default AddIndividual