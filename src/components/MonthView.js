import React, { useState, useEffect } from 'react';
import calendarData from '../functions/calendarData';
import * as calFns from '../functions/calendarFunctions';


export default function MonthVIew({
    defaultActiveDate,
    onDayClicked,
    viewBsMonth,
    viewBsYear
}) {

    const [selectedDate, setSelectedDate] = useState(null);

    const loadDefault = () => {
        setSelectedDate(defaultActiveDate || new Date());
    }

    const getDayInfo = (date) => {
        const bsDate = calFns.convertADtoBS(date.getFullYear(), date.getMonth() + 1, date.getDate());
        return { adDate: new Date(date), ...(bsDate) }
    }

    const getDays = () => {
        let startDay, lastDay;
        startDay = calFns.convertBStoAD(viewBsYear, viewBsMonth, 1);
        startDay.setDate(startDay.getDate() - startDay.getDay());
        lastDay = calFns.convertBStoAD(viewBsYear, viewBsMonth, calFns.getBsMonthDays(viewBsYear, viewBsMonth));
        lastDay.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
        const days = [];
        while (startDay <= lastDay) {
            days.push(getDayInfo(startDay));
            startDay.setDate(startDay.getDate() + 1)
        }
        return days;
    }

    const isSameDate = (adDate, toMatch = new Date()) => {
        return adDate.getDate() == toMatch.getDate() &&
            adDate.getMonth() == toMatch.getMonth() &&
            adDate.getFullYear() == toMatch.getFullYear();
    }

    const onDaySelect = (date) => {
        setSelectedDate(date);
        onDayClicked(date);
    }

    useEffect(() => {
        loadDefault();
    }, [])

    useEffect(() => {
        loadDefault();
    }, [defaultActiveDate])


    let daysCount = -1;
    return (
        <table className='nepali-patro-month'>
            <thead>
                <tr>
                    {
                        calendarData.bsDays.map((day, index) => (
                            <td key={day} className={`week_name week_${index}`}>{day}</td>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    [0, 1, 2, 3, 4].map((rows) => {
                        return (
                            <tr key={`days_row_${rows}`}>
                                {
                                    [0, 1, 2, 3, 4, 5, 6].map((days) => {
                                        daysCount++;
                                        let { adDate, bsDate, bsMonth } = getDays()[daysCount];
                                        let enDays = new Date(adDate).getDate();
                                        return (
                                            <td 
                                                key={`days_column_${rows}_${days}`}
                                                className={
                                                    `nepali-patro-day
                                                    ${bsMonth !== viewBsMonth ? 'nepali-patro-disabled' : ''} 
                                                    ${isSameDate(adDate) ? `nepali-patro-today-date` : ''}`
                                                }
                                                onClick={() => {
                                                    if( bsMonth == viewBsMonth ){
                                                        onDaySelect(adDate);
                                                    }
                                                }}
                                            >{
                                                calFns.toDevanagariDigits(bsDate)
                                            } <span>{enDays}</span></td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}