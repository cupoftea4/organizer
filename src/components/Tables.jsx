import React, { useState, useEffect } from 'react';
import Invoice from './Invoice';
import InvoicesList from './InvoicesList';
import SelectDate from './SelectDate';
import './styles/Invoice.css';

const Tables = () => {
    const [invoiceRows, setInvoiceRows] = useState([]);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(150);
    const [invoices, setInvoices] = useState([]);

    const [selectedDate, setSelectedDate] = useState({ year: [], month: []});
    const [dates, setDates] = useState({ years: [], months: []});
    
    useEffect(() => {
        getUptoDateInvoices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = (changes = {}) => {
        return fetch("http://my.com/", {
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(changes)
        }).then(res => {
            let r;
            console.log(r = res.json(), changes)
            return r
        });
    }


    const getUptoDateInvoices = () => {
        fetchData({ task: "get-dates" })
        .then(dates => {
            setDates(dates);
            setSelectedDate({ month: dates.months[0], year: dates.years[0]});
            fetchData({
                task: "get-invoices",
                date: (dates.months[0] + "-" + dates.years[0])
            })
                .then(setInvoices)
        })
    }


    const handleRowUpdate = (changes) => {
        fetchData({...changes, id_nakladni: selectedInvoiceId}).then(setInvoiceRows);
    };

    const handleInvoicesUpdate = (changes) => {
        fetchData({...changes, selectedDate: selectedDate.month + "-" + selectedDate.year}).then(setInvoices);
    }

    const onYearChange = year => {
        fetchData({ task: "get-months", year})
            .then(months => {
                setDates({...dates, months}); 
                onMonthChange((months.includes(selectedDate.month))?selectedDate.month:months[0], year)
            })
    }

    const onMonthChange = (month, year) => {
        setSelectedDate({ month, year })
        fetchData({
            task: "get-invoices",
            date: (month + "-" + year)
        })
            .then(setInvoices)
    }

    return (
        <div>
            <div>
                <SelectDate dates={dates} onYearChange={onYearChange} selectedDate={selectedDate} onMonthChange={onMonthChange}/>
            </div>
            <div id="tables">
                <InvoicesList invoices={invoices} updateInvoices={handleInvoicesUpdate} onRowUpdate={handleRowUpdate} selectedInvoiceId={selectedInvoiceId} setSelectedInvoiceId={setSelectedInvoiceId} />
                <Invoice rows={invoiceRows} onRowUpdate={handleRowUpdate} id={selectedInvoiceId} />
            </div>
        </div>
    )
}

export default Tables;
