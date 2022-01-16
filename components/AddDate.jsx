import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { atom, useRecoilState} from 'recoil';

export const dateState = atom({
    key:"dateState",
    default:[],
});

const AddDate = () => {
    const [meetingDate, setMeetingDate] = useRecoilState(dateState)
    const [calDate, setCalDate] = useState(new Date());

    useEffect (() => {
        var day, month, year, selectedDate;
        
        day = calDate.getDate();
        month = calDate.getMonth() + 1; 
        year = calDate.getFullYear();

        selectedDate = day + "/" + month + "/" + year;

        setMeetingDate(selectedDate)
    },[calDate])

    return (
        <div className='flex flex-col items-center'>
            <button className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded">
                <h1>SELECT DATE</h1>
            </button>

            <Calendar
            onChange={setCalDate}
            value={calDate}
            />
        </div>
    )
}

export default AddDate