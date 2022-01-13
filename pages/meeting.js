import CreateMeeting from "../components/createMeeting";
import AddIndividual from "../components/AddIndividual";
import AddDate from "../components/AddDate";

const MeetingPage = () => {
    
    return (
        <div className="flex flex-col w-1/4">
            <AddIndividual></AddIndividual>
            <AddDate></AddDate>
            <CreateMeeting></CreateMeeting>
        </div>
    )
}

export default MeetingPage