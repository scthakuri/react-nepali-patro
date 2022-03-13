import React from 'react'
import calendarData from '../functions/calendarData';

export default class MonthList extends React.Component {

    constructor(){
        super();
        this.state={
            hide : true
        }
    }

    render() {
        return (
            <div className={`calendar-sidebar ${this.state.hide ? "calendar-sidebar-hide" : ""}`}>
                <div className='month_list_header'>महिना</div>
                <div className="month-list">
                    <ul className="calendar-months">
                        {
                            calendarData.bsMonths.map((month, key) => {
                                let listClass = 'month-list';
                                if( (key + 1) == this.props.defaultMonth ){
                                    listClass += ' active-month';
                                }
                                return(
                                    <li onClick={() => {
                                        this.props.onClickMonth(this.props.defaultYear, key + 1);
                                    }} className={listClass} key={key}>{month}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <span onClick={() => {
                    this.setState({
                        hide : !this.state.hide
                    })
                }} id="sidebarToggler" title="Close sidebar"><button className="icon-button"><span className="bars"></span></button></span>
            </div>
        )
    }
}