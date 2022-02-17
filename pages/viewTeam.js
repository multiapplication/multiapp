/**
 * Allows user to view an existing team. Editable fields include: team name, attached hospital and a participants list. 
 * 
 * Current functionality:
 *  - change any details about an exisiting team 
 *  - delete team
 * 
 * Todo:
 *  - Finish Routing
 */
import {firebase} from "../utils/firebase.config";
import { useRouter } from 'next/router';
import { useState,useEffect } from "react";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // CSS for dialog box
import {FaTrash} from "react-icons/fa";
import TeamList from "../components/TeamList";
import AddParticipant from "../components/AddParticipant";
import { idListState } from "../components/AddParticipant";
import { viewTeamState } from "../components/TeamCard";
import Avatar from "react-avatar";
import { SpinnerCircularFixed } from "spinners-react";
import { db, auth } from "../utils/firebase.config";

const ViewTeamPage = () => {
    const [teamName,setTeamName] = useState("");
    const [hospitalName,setHospitalName] = useState("");
    const [idList, setIdList] = useRecoilState(idListState); // All relevant user ID linked to a team 
    const teamId = useRecoilValue(viewTeamState); // UID for the selected team, used to correctly render  
    const resetIdList = useResetRecoilState(idListState);
    const auth = firebase.auth();
    const [user, setUser] = useState("");
    const [pageLoading, setPageLoading] = useState(false);
    const [userData, setUserData] = useState([]);
    const [userName, setUserName] = useState("");

    const router = useRouter();

    // fetch all data relevant to the selected team 
    const getTeam = async () => {
        const teamRef = firebase.firestore().collection('teams').doc(teamId);
        const doc = await teamRef.get();
        if (!doc.exists) {
        console.log('No such document!');
        } 
        else {
            setTeamName(doc.data().group_name);
            setHospitalName(doc.data().attached_hospital);
            setIdList(doc.data().participants); // set global state of userIDs used to render list 
        }
    }

    // write relevant changes to database 
    const editTeam = async () => {
        const res = await firebase.firestore().collection("teams").doc(teamId).update({ // data structure for teams
            attached_hospital: hospitalName,
            group_name: teamName,
            participants: idList
        });
        resetIdList();
        router.push("/myTeams");
    }

    // delete team from database 
    const deleteTeam = async () => {
        const respTeam = await firebase.firestore().collection('teams').doc(teamId).delete();
        const userRef = firebase.firestore().collection("users").doc(auth.currentUser.uid);
        const respUser = await userRef.update({
            teams: firebase.firestore.FieldValue.arrayRemove(firebase.firestore().doc('/teams/'+ teamId))
        })
        resetIdList();
        router.push('/myTeams');
    }

    const submit = () =>{
        confirmAlert({
            title: 'Confirm changes to team?',
            message: '',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {editTeam()}
              },
              {
                label: 'No',
              }
            ]
        });
    }

    const removeTeam = () => {
        confirmAlert({
            title: 'Are you sure you want to delete this team?',
            message: '',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {deleteTeam()}
              },
              {
                label: 'No',
              }
            ]
        });
    }

    const getUserDetails = () => {
        setPageLoading(true);
        auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser.uid);

        const docRef = db.collection("users").doc(currentUser.uid);

        docRef.onSnapshot((doc) => {
            if (doc.exists) {
            setUserData(doc.data());
            setUserName(doc.data().first_name + " " + doc.data().last_name);
            console.log("shit happens");
            setPageLoading(false);
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
        });
        });
    };

    
    // fetch all team data
    useEffect(() => {
        getTeam();
        getUserDetails();
    },[]);

    return (
        <div className="flex flex-row h-full">
    
            {/* <!-- nav bar --> */}
            <div className=" h-screen w-1/5 flex flex-col  ">
                <div className="flex flex-col items-center">
                    <img
                    src="logo.svg"
                    alt="multi logo"
                    className="mb-10 mt-5 w-1/3"
                    ></img>
                </div>

                <div
                    className="cursor-pointer hover:bg-[#22577A] hover:text-white"
                    onClick={() => {
                    Router.push("/user");
                    }}
                >
                    <div className="flex flex-row mb-5 ml-5 mt-5">
                    <div>
                        {pageLoading ? (
                        <SpinnerCircularFixed
                            className="items-center"
                            size={50}
                            thickness={180}
                            speed={100}
                            color="#22577A"
                            secondaryColor="rgba(0, 0, 0, 0)"
                        />
                        ) : (
                        <Avatar
                            name={userName}
                            size="50"
                            round={true}
                            className="mr-5"
                        />
                        )}
                    </div>

                    <div>
                        <p className="font-semibold opacity-70">
                        {userData.first_name} {userData.last_name}
                        </p>
                        <p className="opacity-50">{userData.organisation}</p>
                        <p className="opacity-50">{userData.role}</p>
                    </div>
                    </div>
                </div>

                <hr />

                <div className="flex flex-col gap-5">
                    <div className="p-3 cursor-pointer hover:bg-[#22577A] hover:text-white flex flex-row"
                    onClick={() => {
                        Router.push("/dashboard");
                      }}>
                    <p className=" opacity-70 text-xl">My Patients</p>
                    </div>

                    <div>
                    <div
                        className="p-3 cursor-pointer hover:bg-[#22577A] hover:text-white"
                        onClick={() => {
                        Router.push("myMDM");
                        }}
                    >
                        <p className=" opacity-70 text-xl">My MDMs</p>
                    </div>

                    <div className="ml-2">
                        <div className="ml-12 mt-2 border-my-metal border-b-2 border-l-2 p-1 cursor-pointer hover:bg-[#22577A] hover:text-white ">
                        <p className=" opacity-70 ">Upcoming MDMs</p>
                        </div>

                        <div className="ml-12 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white ">
                        <p className=" opacity-70 ">Past MDMs</p>
                        </div>

                        <div className="ml-20 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white ">
                        <p className=" opacity-70 ">Attendance</p>
                        </div>

                        <div className="ml-12 mt-2 border-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white ">
                            <p className=" opacity-70 ">Manage MDMs</p>
                        </div>

                        <div className="ml-20 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white "
                        onClick={() => {
                            Router.push("/createMDM");
                          }}>
                        <p className=" opacity-70 ">+ New MDM</p>
                        </div>
                    </div>
                    </div>

                    <div>
                    <div className="p-3 cursor-pointer hover:bg-[#22577A] hover:text-white">
                        <p className=" opacity-70 text-xl"
                        onClick={() => {Router.push("/myTeams");}}>My Teams</p>
                    </div>

                    <div className="ml-2">
                        <div className="ml-12 mt-2 border-my-metal border-b-2 border-l-2 p-1  cursor-pointer hover:bg-[#22577A] hover:text-white ">
                        <p className=" opacity-70 "
                        onClick={() => {Router.push("/createTeam");}}>+ New Team</p>
                        </div>
                    </div>
                    </div>

                    <div className="p-3">
                    <p
                        className="text-red-500 text-l cursor-pointer"
                        onClick={() => {
                        auth.signOut().finally(() => {
                            Router.push("/");
                        });
                        }}
                    >
                        Logout
                    </p>
                    </div>
                </div>
            </div>
    
            {/* <!-- team creation page --> */}
            <div className="bg-gradient-to-b from-navy via-aqua to-green w-full p-12 text-lg h-full">
                                
                {/* <!-- form styling --> */}

                <div className="flex flex-col mt-12 mx-12">
                    <div className="flex justify-between text-3xl bg-white font-bold pt-4 pb-6 px-4">
                        Edit team
                        <FaTrash className="cursor-pointer hover:fill-red" onClick={removeTeam}></FaTrash>
                    </div>
                    <div className="bg-metal py-6 px-12 h-full">
                        <div>
                            <label  className="mt-12">Team name</label>
                            <input
                                className="bg-white appearance-none border-2 border-metal rounded-lg w-1/3 mx-4 py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                type="text"                        
                                defaultValue={teamName}
                                onChange={e => setTeamName(e.target.value)}
                            />
                        </div>
                        <div className="mt-6">
                            <label  className="mt-12">Attached hospital</label>
                            <input
                                className="bg-white appearance-none border-2 border-metal rounded-lg w-1/3 mx-4 py-2 px-4 text-charcoal leading-tight focus:outline-none focus:bg-white focus:border-green"
                                type="text"                        
                                defaultValue= {hospitalName}
                                onChange={e => setHospitalName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-row items-center mt-8">
                            <AddParticipant></AddParticipant>
                        </div>                        
                        
                        <TeamList></TeamList>

                        <div className="flex flex-row justify-center mt-12 gap-6 ">
                            <button className="w-64 mb-4 uppercase shadow bg-white text-aqua hover:bg-navy hover:text-white rounded-full py-2 px-4 font-bold" onClick={submit}>SUBMIT CHANGES</button>
                            <button className="w-64 mb-4 uppercase shadow border-2 border-white hover:border-grey hover:text-grey focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full" 
                            onClick={() => {
                                resetIdList()
                                router.push('/myTeams')
                            }}>CANCEL</button>       
                        </div>
                        
                    </div>
                </div>
            </div>
                
        </div>
    )
}

export default ViewTeamPage