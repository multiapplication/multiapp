import { useState, useEffect } from "react"
import { getDocs } from "../utils/utils.js";

const TeamsPage = () => {

    var users = [];
    var teams = [];
    const USERS_COLL_NAME = "UsersTest"
    const TEAMS_COLL_NAME = "teams"

    useEffect(() => {
        getDocs(USERS_COLL_NAME).then((data) => {
            users = Object.assign({}, data);
        })

        getDocs(TEAMS_COLL_NAME).then((data) => {
            teams = Object.assign({}, data);
        })
    },[]);

    function showTeams(){
        console.log(teams)
    }

    function showUsers(){
        console.log(users)
    }
    
    return (
        <div>
            <button className="bg-slate-100 shadow-lg font-sans text-black py-3 px-3 rounded-lg w-full"onClick={showTeams}> TEAM </button>
            <button className="bg-slate-100 shadow-lg font-sans text-black py-3 px-3 rounded-lg w-full"onClick={showUsers}> USERS </button>
        </div>
    )
}

export default TeamsPage