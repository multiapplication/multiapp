import {db} from "./firebase.config";

export class FirebaseHelper { 
    constructor(){
        this.id;
        this.userRef;
    }

    gen_userRef(){
        this.userRef = db.collection('users').doc(this.id);
    }

    get teams() {
        
        const teamList = []

        this.userRef.onSnapshot((doc) => { // attach listener to user doc
            if (doc.exists) { 
                if(doc.data().teams){
                    const teams = doc.data().teams; // get list of references to teams linked to user 
                    teams.forEach(async (teamRef)=> { 
                        const team = await teamRef.get();
                        if (team.exists){
                            teamList.push(team.id,team.data())
                        }
                    })
                }
            } else {
                console.log("No such document!");
            }
        });
        return teamList
    }
}
