import React, { useState, useEffect } from 'react';
import calendarData from '../functions/calendarData';
import * as calFns from '../functions/calendarFunctions';


export default function YearMonthSwitch({
    onSwitch,
    defaultYear,
    defaultMonth
}) {

    const [currentYear, setcurrentYear] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(null);
    const [activeSwitch, setactiveSwitch] = useState(0);

    const setCurrent = (currentYearParam = currentYear, currentMonthParam = currentMonth) => {
        setcurrentYear(currentYearParam);
        setCurrentMonth(currentMonthParam);
        onSwitch(currentYearParam, currentMonthParam);
    }

    const goBack = () => {

        if (activeSwitch === 1 && calendarData.minBsYear < currentYear) {
            setCurrent(currentYear - 1);
        }

        if (activeSwitch === 0) {
            let currentMonthRaw = currentMonth - 1;
            let currentYearRaw = currentYear;
            if (currentMonthRaw == 0) {
                currentMonthRaw = 12;
                currentYearRaw = currentYear - 1;
            }
            if (calendarData.minBsYear <= currentYearRaw) {
                setCurrent(currentYearRaw, currentMonthRaw);
            }
        }
    }

    const goForward = () => {
        if (activeSwitch === 1 && calendarData.maxBsYear > currentYear) {
            setCurrent(currentYear + 1);
        }

        if (activeSwitch === 0) {
            let currentMonthRaw = currentMonth + 1;
            let currentYearRaw = currentYear;
            if (currentMonthRaw > 12) {
                currentMonthRaw = 1;
                currentYearRaw = currentYear + 1;
            }
            if (calendarData.maxBsYear >= currentYearRaw) {
                setCurrent(currentYearRaw, currentMonthRaw);
            }
        }
    }

    const loadDefaultValue = () => {
        setcurrentYear(defaultYear);
        setCurrentMonth(defaultMonth);
    }

    useEffect(() => {
        loadDefaultValue();
    }, [defaultMonth, defaultYear])

    useEffect(() => {
        loadDefaultValue()
    }, [])



    return (
        <div className='rn-patro-header'>
            <div className='rn-patro-backBtn' onClick={goBack}></div>

            <div className='rn-patro-middlePart'>
                <div className={`rn-patro-yearBtn ${activeSwitch == 1 ? 'rn-patro-yearBtn-active' : ''}`}
                    onClick={() => setactiveSwitch(1)}>
                    {calFns.toDevanagariDigits(currentYear)}
                </div>
                <div className={`rn-patro-monthBtn ${activeSwitch == 0 ? 'rn-patro-monthBtn-active' : ''}`}
                    onClick={() => setactiveSwitch(0)}>
                    {calendarData.bsMonths[currentMonth - 1]}
                </div>
            </div>

            <div className='rn-patro-forwardBtn' onClick={goForward}></div>
        </div>
    )
}