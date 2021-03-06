/**
 * Renders a participants list based on a global state containing UserID's. This is dynamically changed through user interaction 
 *
 * Current functionality:
 *  - render all participants from a global state 
 *  - delete any participant 
 * 
 * Todo:
 *  - 
 */
import {firebase} from "../utils/firebase.config";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { idListState } from "./AddParticipant";

const TeamList = () => {

    const [idList, setIdList] = useRecoilState(idListState);
    const [userList, setUserList] = useState([]);

    // retrieve users based on ID 
    const fetchUsers = () => {
        const userRef = firebase.firestore().collection("users");
        
        setUserList([]);

        idList.forEach(async (user) => {
            const userDoc = await userRef.doc(user).get();

            if (!userDoc.exists) {  
                console.log("error: user does not exist");
              } 
              else {
                setUserList(userList => [...userList, userDoc.data()]);
              }
        })
    }

    // remove user based on index in idList. Index is the same as the button id assigned to the participant
    const removeFromTeam = (index) => {
        const temp = [...idList];
        temp.splice(index,1);
        setIdList(temp);
    }
    
    // update userList based on changes to id array
    useEffect(() => {
        fetchUsers();
    },[idList]);

    return (
        <div className="flex flex-none justify-center mt-8">
            <table className="table-fixed text-left divide-y divide-metal w-max sm:min-w-3/4">
                <div className="overflow-y-auto h-[28rem]">
                    <thead className="bg-navy text-white">
                        <tr className="">
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                                No.
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                                MDM Role
                            </th>
                            
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Hospital Role
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Hospital
                            </th>
                            
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Remove</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-metal">

                        {/* based on id array, map the relevant user data to display participant list */}
                        {userList.map(({id,first_name, last_name, healthcare_occupation, organisation, role},index) => ( 
                            // eslint-disable-next-line react/jsx-key
                            <tr className="odd:bg-white even:bg-coolblue" id={index}>
                                <td className="px-6 py-4 ">
                                    <div className="text-sm font-medium text-charcoal">
                                        {index+1}
                                    </div>
                                </td>
                                
                                <td className="px-6 py-4" id={index}>
                                    <div className="text-sm font-medium text-charcoal">
                                        {first_name+" "+last_name}
                                    </div>
                                    
                                </td>
                                
                                <td className="px-6 py-4" id={index}>
                                    <div className="text-sm text-charcoal">
                                        {role}
                                    </div>
                                </td>

                                <td className="px-6 py-4" id={index}>
                                    <div className="text-sm text-charcoal">
                                        {healthcare_occupation}
                                    </div>
                                </td>

                                <td className="px-6 py-4  text-sm text-charcoal" id={index}>
                                    {organisation}
                                </td>

                                <td className="px-6 py-4 text-right text-sm font-medium" id={index}>
                                    <button id={index} className="text-red hover:text-hovered" onClick={e => (removeFromTeam(e.target.id))}>Remove</button>
                                </td>
                            </tr> 
                        ))}
                    </tbody>
                </div>
            </table>
        </div>
                                   
    )
}

export default TeamList