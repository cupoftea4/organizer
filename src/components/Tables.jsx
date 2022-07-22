import React, { useState, useEffect } from 'react';
import Invoice from './Invoice';
import InvoicesList from './InvoicesList';
import SelectDate from './SelectDate';
import { fetchData } from '../fetchData';

const Tables = () => {
    const [invoiceRows, setInvoiceRows] = useState([]);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(150);
    const [invoices, setInvoices] = useState([]);

    const [selectedDate, setSelectedDate] = useState({ year: 2022, month: ''});
    const [dates, setDates] = useState({ years: [], months: []});
    const [dataStatus, setDataStatus] = useState('pending');
    // console.warn(dataStatus, dates);
    
    useEffect(() => {
        getUptoDateInvoices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUptoDateInvoices = () => {
        fetchData({ task: "get-dates" })
            .then(({data:dates, dataStatus}) => {
                setDataStatus(dataStatus);
                if (dataStatus !== 'resolved') return;
                setDates(dates);
                setSelectedDate({ month: dates.months[0], year: dates.years[0]});
                fetchData({
                    task: "get-invoices",
                    date: (dates.months[0] + "-" + dates.years[0])
                })
                    .then(({data:invoices, dataStatus}) => {
                        setDataStatus(dataStatus);
                        if (dataStatus !== 'resolved') return;
                        setInvoices(invoices);
                    })
            });
    }


    const handleRowUpdate = (changes) => {
        fetchData({...changes, id_nakladni: selectedInvoiceId})
            .then(({data:invoiceRows, dataStatus}) => {
                setDataStatus(dataStatus);
                if (dataStatus !== 'resolved') return;
                setInvoiceRows(invoiceRows);
            });
    };

    const handleInvoicesUpdate = (changes) => {
        const month = changes.date?.substr(5, 2) ?? null;
        const getDate = (changes.task === "create-invoice" && month)
            ? (!month[0] ? month : month[1]) + "-" + changes.date.substr(0, 4)
            : selectedDate.month + "-" + selectedDate.year;
        setDataStatus('pending');
        fetchData({...changes, getDate })
        .then(({data:invoices, dataStatus}) => {
            setDataStatus(dataStatus);
            if (dataStatus !== 'resolved') return;
            setInvoices(invoices);
        });
    }

    const onYearChange = year => {
        setDataStatus('pending');
        fetchData({ task: "get-months", year})
            .then(({data:months, dataStatus}) => {
                setDataStatus(dataStatus);
                if (dataStatus !== 'resolved') return;
                setDates({...dates, months}); 
                onMonthChange((months.includes(selectedDate.month))?selectedDate.month:months[0], year)
            });
    }

    const onMonthChange = (month, year) => {
        setSelectedDate({ month, year });
        setDataStatus('pending');
        fetchData({
            task: "get-invoices",
            date: (month + "-" + year)
        })
            .then(({data:invoices, dataStatus}) => {
                // console.log(invoices, dataStatus);
                setDataStatus(dataStatus);
                if (dataStatus !== 'resolved') return;
                setInvoices(invoices);
            });
    }

    return (
        <>
            {dataStatus === 'resolved' ? 
                <div className="tables">
                    <div className='table-div'>
                        <SelectDate dates={dates} onYearChange={onYearChange} selectedDate={selectedDate} onMonthChange={onMonthChange}/>
                        <InvoicesList invoices={invoices} updateInvoices={handleInvoicesUpdate} onRowUpdate={handleRowUpdate} selectedInvoiceId={selectedInvoiceId} setSelectedInvoiceId={setSelectedInvoiceId} />
                    </div>
                    <Invoice rows={invoiceRows} onRowUpdate={handleRowUpdate} id={selectedInvoiceId} />
                </div> : 
            dataStatus === 'pending' ? 
                <div className='center-container'>Підгружаю таблиці...</div> 
                : 
                <div className='center-container error'>Сталася помилка. Перевірте підключення до інтернету або зверніться до власника.
                    <button className="primary-button" onClick={() => window.location.reload(false)}>Перезагрузити</button>
                </div>
            }
        </>
    )
}

export default Tables;
