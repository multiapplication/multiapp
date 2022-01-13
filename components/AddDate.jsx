import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { atom } from 'recoil';



const AddDate = () => {

    const [date, setDate] = useState(new Date());

    const selectDate = () => {
        var month = date.getUTCMonth() + 1; 
        var day = date.getUTCDate() + 1;
        var year = date.getUTCFullYear();
        var selectedDate = day + "/" + month + "/" + year;
    }
   
    return (
        <div className='flex flex-row items-center'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => selectDate()}>
                <h1>SELECT DATE</h1>
            </button>
            <Calendar
            id="react-calendar"
            className='react-calendar'
            onChange={setDate}
            value={date}
            />
        </div>
    )
}

export default AddDate