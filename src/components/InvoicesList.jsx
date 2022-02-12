import React, { useState, useEffect } from 'react';
import CreateInvoice from './CreateInvoice';
import InvoicesListRow from './InvoicesListRow';

const InvoicesList = ({ invoices, updateInvoices, onRowUpdate, selectedInvoiceId, setSelectedInvoiceId }) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        if(isMounted) {
            setSelectedInvoiceId(invoices[0]?.id);
            onRowUpdate({ task: "get-table", id: invoices[0]?.id })
        } else setIsMounted(true);
        // if(invoices.length == 0) {

        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoices]);

    return (
        <div id="invoce-list">
            <CreateInvoice updateInvoices={updateInvoices} />
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
