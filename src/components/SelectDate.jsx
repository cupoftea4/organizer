import React, { useRef } from 'react';

const SelectDate = ({dates, onYearChange, selectedDate, onMonthChange}) => {
    const monthsNames = useRef([ "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", 
           "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень" ]);
    return <div  className="date-div">
        <select className="choose-input date"
            onChange={e => onYearChange(e.target.value)}>
            { dates.years.map(year => <option value={year} key={year} >{year}p.</option>) }
        </select>
        <select className="choose-input date"
            onChange={e => onMonthChange(e.target.value, selectedDate.year)}
        >
            { dates.months.map(month => <option value={month} key={month} >{monthsNames.current[month-1]}</option>) }
        </select>
    </div>;
}; 

export default SelectDate;
