import React, { useState, useEffect } from 'react'
import { convertADtoBS, toDevanagariDigits } from '../functions/calendarFunctions';
import calendarData from '../functions/calendarData'
import LoadingIcon from '../1488.gif'

export default function CalendarEvents({
    activeDate,
    defaultMonth,
    defaultYear
}) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const getEventsData = async () => {
        try {
            let fullDate = `${activeDate.getFullYear()}-${activeDate.getMonth()}-${activeDate.getDate()}`;
            await fetch(`https://hamrocsit.com/wp-json/hamrocsit/v3/events/${fullDate}`)
                .then(response => response.json())
                .then((data) => {
                    try {
                        if (data.length > 0) {
                            setLoading(false);
                            setData(data);
                        } else {
                            throw "empty";
                        }
                    } catch (error) {
                        setLoading(false);
                        setData(null);
                    }
                }).catch((r) => {
                    setLoading(false);
                    setData(null);
                })
        } catch (error) {
            setLoading(false);
            setData(null);
        }
    }

    const loadDefault = () => {
        setLoading(true);
        getEventsData();
    }

    useEffect(() => {
        loadDefault();
    }, [])

    useEffect(() => {
        loadDefault();
    }, [defaultMonth, defaultYear, activeDate])


    const date = convertADtoBS(
        activeDate.getFullYear(),
        activeDate.getMonth() + 1,
        activeDate.getDate()
    );
    return (
        <div className="calendar-events">

            <div className='event-day-wrap'>
                <div className='event-date'>{toDevanagariDigits(date.bsDate)}</div>
                <div className='event-week-day'>{calendarData.bsDaysFull[activeDate.getDay()]}</div>
            </div>

            <div className="event-header">Events</div>

            {
                loading ?
                    <div className='loading_image'>
                        <img src={LoadingIcon} alt="Loading Icon" />
                    </div>
                    : <div className="event-list">
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <div className="event-container" key={index}>
                                            <div className="event-icon"><div className="event-bullet-holiday"></div></div>
                                            <div className="event-info">
                                                <p className="event-title">{item.time}</p>
                                                <p className="event-desc">{item.data}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            : <div className="event-container no-dot">
                                    <div className="event-info">
                                        <p className="event-title">No Event Found</p>
                                        <p className="event-desc">We cannot find any event related to this date.If you know any event then contribute us via HAMROCSIT.</p>
                                    </div>
                                </div>
                        }
                    </div>
            }

        </div>

    )
}