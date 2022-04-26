import {useEffect} from "react";
import {auth} from "../utils/firebase.config";
import {FirebaseHelper} from "../utils/FirebaseHelper"
import { setTimeout } from "promise-timers";
 
const firebaseTest = () => {

    const firebaseHelper = new FirebaseHelper();

    const testFunction = () => {
        const teams = firebaseHelper.teams
        console.log(teams)
    }
    
    const getUserDetails = () => {
        auth.onAuthStateChanged((currentUser) => { 
            firebaseHelper.id = currentUser.uid
            firebaseHelper.gen_userRef()
        })
    }

    useEffect(() => {
        getUserDetails();
    },[]);

    return (
        <div>
            <button onClick={() => {testFunction()}} > TEST CALL</button>
        </div>
    );
};

export default firebaseTest;