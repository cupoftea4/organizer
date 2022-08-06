import React, { useState, useEffect } from 'react';
import CreateInvoice from './CreateInvoice';
import InvoicesListRow from './InvoicesListRow';
import { fetchData } from '../fetchData';

const InvoicesList = ({ invoices, updateInvoices, onRowUpdate, selectedInvoiceId, setSelectedInvoiceId }) => {
    const [ shops, setShops ] = useState([{ id: 0, name: "" }]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        fetchData({task: 'get-shops'})
        .then(({data: shops, dataStatus}) => {
            if (dataStatus !== 'resolved') return;
            setShops(shops);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isMounted) {
            setSelectedInvoiceId(invoices[0]?.id);
            onRowUpdate({ task: 'get-table', id: invoices[0]?.id })
        } else setIsMounted(true);
        // if(invoices.length == 0) 
        return () => { setIsMounted(false) };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoices]);

    return (
        <>
            <CreateInvoice shops={shops} updateInvoices={updateInvoices}  />
            <table className='invoices-list'>
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
                    {invoices?.map(invoice => <InvoicesListRow
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
        </>
    )
};

function invoiceListPropsAreEqual(prevMovie, nextMovie) {
    return prevMovie.invoices === nextMovie.invoices
      && prevMovie.selectedInvoiceId === nextMovie.selectedInvoiceId;
}

export default React.memo(InvoicesList, invoiceListPropsAreEqual);