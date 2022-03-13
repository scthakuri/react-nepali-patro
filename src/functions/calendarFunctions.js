import calendarData from './calendarData';

export const toDevanagariDigits = (number) => {
    return String(number).split('').map((ed) => calendarData.nepaliNumbers[Number(ed)]).join('');
}

export const getTotalDaysNumFromMinBsYear = (bsYear, bsMonth, bsDate) => {
    if (bsYear < calendarData.minBsYear || bsYear > calendarData.maxBsYear) {
        return null;
    }

    let daysNumFromMinBsYear = 0;
    const diffYears = bsYear - calendarData.minBsYear;
    for (let month = 1; month <= 12; month++) {
        if (month < bsMonth) {
            daysNumFromMinBsYear += getMonthDaysNumFormMinBsYear(month, diffYears + 1);
        } else {
            daysNumFromMinBsYear += getMonthDaysNumFormMinBsYear(month, diffYears);
        }
    }

    if (bsYear > 2085 && bsYear < 2088) {
        daysNumFromMinBsYear += bsDate - 2;
    } else if (bsYear === 2085 && bsMonth > 5) {
        daysNumFromMinBsYear += bsDate - 2;
    } else if (bsYear > 2088) {
        daysNumFromMinBsYear += bsDate - 4;
    } else if (bsYear === 2088 && bsMonth > 5) {
        daysNumFromMinBsYear += bsDate - 4;
    } else {
        daysNumFromMinBsYear += bsDate;
    }

    return daysNumFromMinBsYear;
}

export const getMonthDaysNumFormMinBsYear = (bsMonth, yearDiff) => {
    let yearCount = 0;
    let monthDaysFromMinBsYear = 0;
    if (yearDiff === 0) return 0;

    const bsMonthData = calendarData.extractedBsMonthData[bsMonth - 1];
    for (let i = 0; i < bsMonthData.length; i++) {
        if (bsMonthData[i] === 0) {
            continue;
        }
        const bsMonthUpperDaysIndex = i % 2;
        if (yearDiff > yearCount + bsMonthData[i]) {
            yearCount += bsMonthData[i];
            monthDaysFromMinBsYear += calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] * bsMonthData[i];
        } else {
            monthDaysFromMinBsYear += calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] * (yearDiff - yearCount);
            yearCount = yearDiff - yearCount;
            break;
        }
    }

    return monthDaysFromMinBsYear;
}

export const getBsMonthDays = (bsYear, bsMonth) => {
    let yearCount = 0;
    const totalYears = (bsYear + 1) - calendarData.minBsYear;
    const bsMonthData = calendarData.extractedBsMonthData[bsMonth - 1];
    for (let i = 0; i < bsMonthData.length; i++) {
        if (bsMonthData[i] === 0) {
            continue;
        }

        const bsMonthUpperDaysIndex = i % 2;
        yearCount += bsMonthData[i];
        if (totalYears <= yearCount) {
            if ((bsYear === 2085 && bsMonth === 5) || (bsYear === 2088 && bsMonth === 5)) {
                return calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] - 2;
            } else {
                return calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex];
            }
        }
    }

    return null;
};

export const convertADtoBS = (adYear, adMonth, adDate) => {

    let bsYear = adYear + 57;
    let bsMonth = (adMonth + 9) % 12;
    bsMonth = bsMonth === 0 ? 12 : bsMonth;
    let bsDate = 1;

    if (adMonth < 4) {
        bsYear -= 1;
    }

    const bsMonthFirstAdDate = convertBStoAD(bsYear, bsMonth, 1);
    if (adDate >= 1 && adDate < bsMonthFirstAdDate.getDate()) {
        if (adMonth === 4) {
            const bsYearFirstAdDate = convertBStoAD(bsYear, 1, 1);
            if (adDate < bsYearFirstAdDate.getDate()) {
                bsYear -= 1;
            }
        }
        bsMonth = (bsMonth !== 1) ? bsMonth - 1 : 12;
        const bsMonthDays = getBsMonthDays(bsYear, bsMonth);
        bsDate = bsMonthDays - (bsMonthFirstAdDate.getDate() - adDate) + 1;
    } else {
        bsDate = adDate - bsMonthFirstAdDate.getDate() + 1;
    }

    return { bsYear, bsMonth, bsDate };
}


export const convertBStoAD = (bsYear, bsMonth, bsDate) => {
    const daysNumFromMinBsYear = getTotalDaysNumFromMinBsYear(bsYear, bsMonth, bsDate);
    const adDate = new Date(calendarData.minAdDateEqBsDate.ad.year, calendarData.minAdDateEqBsDate.ad.month, calendarData.minAdDateEqBsDate.ad.date - 1);
    adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);
    return adDate;
}