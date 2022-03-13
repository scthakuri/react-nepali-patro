import './Calender.css';
import Calendar from './components/Calendar';
import React from 'react';

export default function App() {
    return (
        <div className="calender_main_container">
            <Calendar
                onChange={(date) => {
                    console.log(date);
                }}
            />
        </div>
    )
}