import React, { useState, useEffect } from 'react';
import UseAnimations from 'react-useanimations';
import trash from 'react-useanimations/lib/trash';
import { confirm } from "react-confirm-box";
import { confirmOptions } from '../options-box';


const InvoicesListRow = ({ invoice, shops, updateInvoice, updateInvoices, selectedRowId, setSelectedRowId }) => {
    const [ note, setNote ] = useState(invoice.note);

    useEffect(() => {
        setNote(invoice.note);
    }, [invoice.note]);

    const updateNote = () => updateInvoices({ task: "update-invoice-list", id: invoice.id, note });
    const deleteRow = async () => {
        const result = await confirm({msg: "Ви впевнені, що хочете видалити цю накладну"}, confirmOptions);
        if (result) {
            updateInvoices({ task: "delete-invoice", id: invoice.id});
            setSelectedRowId(0);
        }
    };

    return (
        <tr
            onClick={() => {
                setSelectedRowId(invoice.id);
                updateInvoice({ task: "get-table", id: invoice.id });
            }}
            className={invoice.id === selectedRowId ? "selected-row" : ""}
        >
            <td><b>{invoice.id}</b></td>
            <td>{invoice.date}</td>
            <td>{shops.find(shop => shop.id === invoice.tochka)?.name ?? "не знайдено"}</td>
            <td><input type="text" 
                value={note ?? ""}
                title={note ?? ""}
                onChange={e => setNote(e.target.value)}
                onBlur={updateNote}
                onKeyDown={e => {if(e.key === 'Enter') updateNote()} }
            /></td>
            <td>
                <UseAnimations
                    animation={trash}
                    onClick={deleteRow}
                    className="clickable"
                />
            </td>
        </tr>
    )
};

export default InvoicesListRow;