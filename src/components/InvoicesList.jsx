import React, { useState, useEffect } from 'react';
import CreateInvoice from './CreateInvoice';
import InvoicesListRow from './InvoicesListRow';

const InvoicesList = ({ invoices, onRowUpdate, selectedInvoiceId, setSelectedInvoiceId }) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        if(isMounted) {
            setSelectedInvoiceId(invoices[0].id);
            onRowUpdate({ task: "get-table", id: invoices[0].id })
        } else setIsMounted(true);
    }, [invoices]);

    return (
        <div id="invoce-list">
            <CreateInvoice />
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Дата</th>
                        <th>Точка</th>
                        <th>Примітка</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map(invoice => <InvoicesListRow
                        invoice={invoice}
                        key={invoice.id}
                        updateInvoice={onRowUpdate}
                        selectedRowId={selectedInvoiceId}
                        setSelectedRowId={setSelectedInvoiceId} 
                    />)}
                </tbody>
            </table>
        </div>
    );
};

export default InvoicesList;
