import React, { useState, useEffect } from 'react';
import * as calF from '../functions/calendarFunctions';
import MonthList from './MonthList';
import MonthView from './MonthView';
import YearMonthSwitch from './YearMonthSwitch';
import LoadingIcon from '../1488.gif'
import CalendarEvents from './CalendarEvents';

export default function Calendar({
    onChange
}) {

    const [activeDate, setActiveDate] = useState(null);
    const [activeBsDate, setActiveBsDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeDay, setactiveDay] = useState(null);

    useEffect(() => {
        const loadDefault = () => {
            const date = new Date();
            setActiveDate(date);
            setactiveDay(date.getDate());
            setActiveBsDate(calF.convertADtoBS(date.getFullYear(), date.getMonth() + 1, date.getDate()));
            setLoading(false);
        }
        loadDefault();
    }, [])

    const switchViewsYearMonth = (year, month) => {
        setActiveBsDate({ bsYear: year, bsMonth: month, bsDate: activeBsDate.bsDate })
    }

    if (loading) {
        return (
            <div className='loading_full'>
                <img src={LoadingIcon} alt='Loading' />
            </div>
        )
    }


    const { bsYear, bsMonth } = activeBsDate;
    return (
        <div className={`rn-nepali-patro royal-navy`}>
            <MonthList
                defaultMonth={bsMonth}
                defaultYear={bsYear}
                onClickMonth={(year, month) => switchViewsYearMonth(year, month)}
            />
            <div className='calendar-inner'>
                <YearMonthSwitch
                    defaultMonth={bsMonth}
                    defaultYear={bsYear}
                    onSwitch={(year, month) => switchViewsYearMonth(year, month)}
                />
                <MonthView
                    viewBsYear={bsYear}
                    viewBsMonth={bsMonth}
                    defaultActiveDate={activeDate}
                    onDayClicked={(date) => { 
                        if( onChange ){
                            onChange(date);
                            setActiveDate(date)
                        }
                     }}
                />
            </div>

            <CalendarEvents
                activeDate={activeDate}
                defaultMonth={bsMonth}
                defaultYear={bsYear}
            />
        </div>
    );
}

