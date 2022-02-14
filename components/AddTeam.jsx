/**
 * Allows user to select one team to add to the meeting.
 *
 * Current functionality:
 *  - 
 * 
 * Todo:
 *  - 
 */
 import {MdGroupAdd} from "react-icons/md";
 import { useEffect, useState } from "react";
 import Select from 'react-select';
 import { idListState } from "./AddParticipant"
 import { useRecoilState } from "recoil";
 
 const AddTeam = ({TeamRefs}) => {

    const [selectedTeamOption, setSelectedTeamOption] = useState(null);
    const [idList, setIdList] = useRecoilState(idListState)
    const [teamOptions, setTeamOptions] = useState([]);

    const fillTeamOptions = () => {
        TeamRefs.forEach(async (team) => {
            const resp = await team.get()
            const option = {value: resp.data().group_name, label: resp.data().group_name}
            setTeamOptions((options) => [...options, option]);
        });
    }

    const addToList = async () => {
        if (selectedTeamOption!== null){
            const selectedTeamIndex = teamOptions.findIndex( object => {
                return object.value == selectedTeamOption.value;
            })
            const resp = await TeamRefs[selectedTeamIndex].get(); 
            resp.data().participants.forEach((participant)=>{
                if (!idList.includes(participant)) {
                    setIdList((oldList) => [...oldList, participant]);
                }
                else {
                    console.log("user already in team!")
                }
            })
        }
    }

    useEffect(() => {
        setTeamOptions([])
        fillTeamOptions()
    },[TeamRefs]);

    return( 
 
     <div className="flex flex-row">
 
         <div className="mr-4">
             Add team 
         </div>
 
         <button className="flex flex-row items-center px-4 space-x-4 rounded-full bg-white shadow-lg hover:bg-grey hover:text-white" onClick={() => addToList()}>
             <MdGroupAdd className="scale-125"></MdGroupAdd>
             <div className="mr-2 text-sm">Add team</div>
         </button>
         
         <Select
            className='rounded-lg w-fit mx-4 py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green'
            options={teamOptions}
            defaultValue={selectedTeamOption}
            onChange={setSelectedTeamOption}
        />
     </div>
 
     )
 }
 
 export default AddTeam