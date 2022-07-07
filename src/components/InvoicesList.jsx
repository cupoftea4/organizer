import React, { useState, useEffect } from 'react';
import CreateInvoice from './CreateInvoice';
import InvoicesListRow from './InvoicesListRow';

const InvoicesList = ({ invoices, fetchData, updateInvoices, onRowUpdate, selectedInvoiceId, setSelectedInvoiceId }) => {
    const [ shops, setShops ] = useState([{ id: 0, name: "" }]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        fetchData({task: "get-shops"}).then(setShops);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(isMounted) {
            setSelectedInvoiceId(invoices[0]?.id);
            onRowUpdate({ task: "get-table", id: invoices[0]?.id })
        } else setIsMounted(true);
        // if(invoices.length == 0) 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoices]);

    return (
        <div className="table-div">
            <CreateInvoice shops={shops} updateInvoices={updateInvoices}  />
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Дата</th>
                        <th>Точка</th>
                        <th>Примітка</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map(invoice => <InvoicesListRow
                        invoice={invoice}
                        key={invoice.id}
                        shops={shops}
                        updateInvoice={onRowUpdate}
                        updateInvoices={updateInvoices}
                        selectedRowId={selectedInvoiceId}
                        setSelectedRowId={setSelectedInvoiceId} 
                    />)}
                </tbody>
            </table>
        </div>
    );
};

export default InvoicesList;
