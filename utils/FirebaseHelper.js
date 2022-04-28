/*
Firebase helper class

Usage: 

1) instantiate new class 
2) call in useEffect 
3) retrieve required information to render elements via class properties


e.g.
import {useEffect} from "react";
import {auth} from "../utils/firebase.config";
import {FirebaseHelper} from "../utils/FirebaseHelper"

const firebaseHelper = new FirebaseHelper();

 const testFunction = () => { // called with onClick
    console.log(firebaseHelper.teams)
}

const getUserDetails = () => {
    auth.onAuthStateChanged((currentUser) => { 
        firebaseHelper.id = currentUser.uid;
        firebaseHelper.get_details();
        firebaseHelper.get_teams();
        firebaseHelper.get_mdms();
    })
}

useEffect(() => {
    getUserDetails();
},[]);
*/

import {db} from "./firebase.config";

export class FirebaseHelper { 
    constructor(){
        this.id;
        this.userRef;
        this.first_name;
        this.last_name;
        this.email;
        this.organisation; 
        this.teams = []; 
        this.mdms = [];
        this.patients = [];
    }

    get_userRef(){
        if (!this.userRef){
            this.userRef = db.collection('users').doc(this.id);
        }
    }

    get_details(){

        this.get_userRef();
        this.userRef.onSnapshot((doc) => { // attach listener to user doc
            if (doc.exists) {  // get all user information
                this.first_name = doc.data().first_name;
                this.last_name = doc.data().last_name;
                this.email = doc.data().email;
                this.organisation = doc.data().organisation;
            } 
            else {
                console.log("No such document!");
            }
        });

    }

    get_teams() {
        
        this.get_userRef();
        this.userRef.onSnapshot((doc) => { // attach listener to user doc
            if (doc.exists) { 
                if(doc.data().teams){
                    const teams = doc.data().teams; // get list of references to teams linked to user 
                    teams.forEach(async (teamRef)=> { 
                        const team = await teamRef.get();
                        if (team.exists){
                            this.teams.push(team.id,team.data());
                        }
                    })
                }
            } 
            else {
                console.log("No such document!");
            }
        });
    }

    get_mdms() {
        
        this.get_userRef();
        this.userRef.onSnapshot((doc) => { // attach listener to user doc
            if (doc.exists) { 
                if(doc.data().mdms){
                    const mdms = doc.data().mdms; // get list of references to mdms linked to user 
                    mdms.forEach(async (mdmRef)=> { 
                        const mdm = await mdmRef.get();
                        if (mdm.exists){
                            this.mdms.push(mdm.id,mdm.data())
                        }
                    })
                }
            } 
            else {
                console.log("No such document!");
            }
        });
    }

    get_patients() {
        
        this.get_userRef();
        this.userRef.onSnapshot((doc) => { // attach listener to user doc
            if (doc.exists) { 
                if(doc.data().patients){
                    const patients = doc.data().patients; // get list of references to patients linked to user 
                    patients.forEach(async (patientRef)=> { 
                        const patient = await patientRef.get();
                        if (patient.exists){
                            this.patients.push(patient.id,patient.data())
                        }
                    })
                }
            } 
            else {
                console.log("No such document!");
            }
        });
    }
}
