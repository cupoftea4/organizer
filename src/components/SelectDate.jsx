import React, { useRef } from 'react';

const SelectDate = ({dates, onYearChange, selectedDate, onMonthChange}) => {
    const monthsNames = useRef([ "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", 
           "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень" ]);
    return (
        <div className="green-box">
            <select className="create-input" value={selectedDate.year}
                onChange={e => onYearChange(e.target.value)}>
                { dates.years && dates.years.map(year => <option value={year} key={year} >{year}p.</option>) }
            </select>
            <select className="create-input" value={selectedDate.month}
                onChange={e => onMonthChange(e.target.value, selectedDate.year)}
            >
                { dates?.months && dates.months.map(month => <option value={month} key={month} >{monthsNames.current[month-1]}</option>) }
            </select>
        </div>
    )
}; 

export default SelectDate;