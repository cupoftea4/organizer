import React from 'react';

const InvoicesListRow = ({ invoice, updateInvoice, selectedRowId, setSelectedRowId }) => {
    return (
        <tr
            onClick={() => {
                setSelectedRowId(invoice.id);
                updateInvoice({ task: "get-table", id: invoice.id });
            }}
            className={invoice.id === selectedRowId ? "selected-row" : ""}
        >
            <td>{invoice.id}</td>
            <td>{invoice.date}</td>
            <td>{invoice.tochka}</td>
            <td>{invoice.note}</td>
        </tr>
    );
};

export default InvoicesListRow;
