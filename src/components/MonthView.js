import { styles } from './styles';
import * as React from 'react';
import calendarData from '../functions/calendarData';
import * as calFns from '../functions/calendarFunctions';
import injectSheet from 'react-jss';


class MonthView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: props.defaultActiveDate || new Date()
        }
    }

    getDayInfo(date) {
        const bsDate = calFns.convertADtoBS(date.getFullYear(), date.getMonth() + 1, date.getDate());
        return { adDate: new Date(date), ...(bsDate) }
    }

    getDays() {
        let startDay, lastDay;
        const { viewBsMonth, viewBsYear } = this.props;
        startDay = calFns.convertBStoAD(viewBsYear, viewBsMonth, 1);
        startDay.setDate(startDay.getDate() - startDay.getDay()); // Sunday, the first day in the view
        lastDay = calFns.convertBStoAD(viewBsYear, viewBsMonth, calFns.getBsMonthDays(viewBsYear, viewBsMonth));
        lastDay.setDate(lastDay.getDate() + (6 - lastDay.getDay())); // Saturday, the last day in the view
        const days = [];
        while (startDay <= lastDay) {
            days.push(this.getDayInfo(startDay));
            startDay.setDate(startDay.getDate() + 1)
        }
        return days;
    }

    isSameDate(adDate, toMatch = new Date()) {
        return adDate.getDate() == toMatch.getDate() &&
            adDate.getMonth() == toMatch.getMonth() &&
            adDate.getFullYear() == toMatch.getFullYear();
    }

    onDaySelect(date) {
        this.setState({ selectedDate: date });
        this.props.onDayClicked(date);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={`r-n-cal-month-view ${classes.calendar}`}>
                <div className={`r-n-cal-weekdays ${classes.weekdays}`}>
                    {
                        calendarData.bsDays.map((day) => (
                            <div key={day} className={classes.weekday}>{day}</div>
                        ))
                    }
                </div>
                <div className={`r-n-cal-days ${classes.days}`}>
                    {
                        this.getDays().map(({ adDate, bsDate, bsMonth }, i) => {
                            return (
                                <div
                                    className={
                                        `rn-patro-day r-n-cal-day 
                                        ${i % 7 == 6 ? classes.weekend : ''}
                                        ${classes.day} ${bsMonth !== this.props.viewBsMonth ? classes.dayMuted : ''} 
                                        ${this.isSameDate(adDate) ? `${classes.today} today_date` : ''}`
                                    }
                                    key={`${bsDate} ${bsMonth}`}
                                    onClick={() => this.onDaySelect(adDate)}>
                                    {calFns.toDevanagariDigits(bsDate)}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default injectSheet(styles)(MonthView);