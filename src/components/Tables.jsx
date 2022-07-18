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
    const [dataStatus, setDataStatus] = useState('pending');
    
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
            if (res.ok) setDataStatus('resolved');
            let r;
            console.log(r = res.json(), changes)
            return r
        }).catch(err => {
            setDataStatus('rejected');
        })
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
                    .then(setInvoices);
            });
    }


    const handleRowUpdate = (changes) => {
        fetchData({...changes, id_nakladni: selectedInvoiceId}).then(setInvoiceRows);
    };

    const handleInvoicesUpdate = (changes) => {
        const month = changes.date?.substr(5, 2) ?? null;
        const getDate = (changes.task === "create-invoice" && month)
            ? (!month[0] ? month : month[1]) + "-" + changes.date.substr(0, 4)
            : selectedDate.month + "-" + selectedDate.year;
        fetchData({...changes, getDate }).then(setInvoices);
    }

    const onYearChange = year => {
        fetchData({ task: "get-months", year})
            .then(months => {
                setDates({...dates, months}); 
                onMonthChange((months.includes(selectedDate.month))?selectedDate.month:months[0], year)
            });
    }

    const onMonthChange = (month, year) => {
        setSelectedDate({ month, year })
        fetchData({
            task: "get-invoices",
            date: (month + "-" + year)
        })
            .then(setInvoices);
    }

    return (
        <div>
            {dataStatus === 'resolved' && 
            <>
                <div className="select-date-div">
                    <SelectDate dates={dates} onYearChange={onYearChange} selectedDate={selectedDate} onMonthChange={onMonthChange}/>
                </div>
                <div id="tables">
                    <InvoicesList invoices={invoices} fetchData={fetchData} updateInvoices={handleInvoicesUpdate} onRowUpdate={handleRowUpdate} selectedInvoiceId={selectedInvoiceId} setSelectedInvoiceId={setSelectedInvoiceId} />
                    <Invoice rows={invoiceRows} fetchData={fetchData} onRowUpdate={handleRowUpdate} id={selectedInvoiceId} />
                </div>
            </> }
            {dataStatus === 'pending' && <div className='status loading'>Loading...</div> }
            {dataStatus === 'rejected' && 
                <div className='status error'>
                    <div className='loader'>
                    <div/>
                    Error
                </div>
            </div> }
        </div>
    )
}

export default Tables;
