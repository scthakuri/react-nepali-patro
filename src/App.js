import logo from './logo.svg';
import './App.css';
import './Calender.css';
import Calendar from './components/Calendar';
import * as calFns from './functions/calendarFunctions'
import React from 'react';
import calendarData from './functions/calendarData'
import LoadingIcon from './1488.gif'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenDate: null,

            todayDate: null,
            fullDate: null,
            weekDay: null,
            events: null,
            eventLoading: true,
            fetchDate: null
        };
    }

    getEventsData = async () => {
        try {
            await fetch(`https://hamrocsit.com/wp-json/hamrocsit/v3/events/${this.state.fetchDate}`)
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        eventLoading: false,
                        fetchDate: data
                    })
                }).catch((r) => {
                    this.setState({
                        eventLoading: false,
                        fetchDate: null
                    })
                })
        } catch (error) {

        }
    }

    componentDidMount = () => {
        this.mounted = true;
        if (this.mounted) {
            this.renderDate();
        }
    }


    componentWillUnmount = () => {
        this.mounted = false;
    }


    renderDate = (passedDate = false) => {
        let date = passedDate ? passedDate : new Date();
        this.setState({
            fetchDate: date.getFullYear() + "-" + (date.getMonth() + 1),
            eventLoading: true,
            fullDate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        }, () => {
            const bsDate = calFns.convertADtoBS(
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate()
            );

            this.setState({
                todayDate: calFns.toDevanagariDigits(bsDate.bsDate),
                weekDay: calendarData.bsDaysFull[date.getDay()]
            })
        })
    }

    getEventsCode = () => {
        console.log(this.state.events);
        if (this.state.events && this.state.events != null) {
            if (this.state.events.hasOwnProperty(this.state.fullDate)) {
                let eventData = this.state.events.hasOwnProperty(this.state.fullDate);
                if (eventData && Array.isArray(eventData)) {
                    return (
                        <ul className="calendar-events">
                            {
                                eventData.length > 0 ?
                                    eventData.map((ev, index) => {
                                        return (
                                            <li key={index}>
                                                <p>{ev.hasOwnProperty('time') ? <><strong>{ev.time}</strong><br /></> : null}{ev.data}</p>
                                            </li>
                                        )
                                    })
                                    : <li><p><strong>No Event Found</strong><br /></p></li>
                            }
                        </ul>
                    )
                }
            }
        }
        return <ul className="calendar-events"><li><p><strong>No Event Found</strong><br /></p></li></ul>;
    }

    render() {
        return (
            // <div className="patro_container">
            //     <div className="calender">
            //         <div className="calander_container">
            //             <Calendar 
            //                 onChange={date => {
            //                     this.renderDate(date);
            //                 }}
            //             />
            //         </div>
            //         <div className="right_part sidebar">
            //             <div className="num-date">{this.state.todayDate}</div>
            //             <div className="day">{this.state.weekDay}</div>
            //             <h3 className="primary-color">Events</h3>
            //             {
            //                 this.state.eventLoading ? 
            //                     <div className='loading_image'>
            //                         <img src={LoadingIcon} alt="Loading Icon" />
            //                     </div>
            //                 : this.getEventsCode()
            //             }
            //         </div>
            //     </div>
            // </div>
            <div className="calender_main_container">
                <Calendar
                    onChange={(date) => {
                        console.log(date);
                    }}
                />
            </div>
        )
    }
}

export default App;
