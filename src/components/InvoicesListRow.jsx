import React, { useState, useEffect } from 'react';
import UseAnimations from 'react-useanimations';
import trash from 'react-useanimations/lib/trash';
import { confirm } from "react-confirm-box";


const InvoicesListRow = ({ invoice, updateInvoice, updateInvoices, selectedRowId, setSelectedRowId }) => {
    // console.log(invoice);
    const [ note, setNote ] = useState(invoice.note);

    useEffect(() => {
        setNote(invoice.note);
    }, [invoice.note]);

    const deleteRow = async () => {
        const result = await confirm("Ви впевнені, що хочете видалити цю накладну", options);
        if (result) {
            updateInvoices({ task: "delete-invoice", id: invoice.id});
            setSelectedRowId(0);
        }
    };

    const options = {
        render: (message, onConfirm, onCancel) => {
            return (
                <div className="confirm-container">
                    <div>
                        <p> {message} {"?"} </p>
                        <button onClick={onConfirm} className="agree-button"> Так </button>
                        <button onClick={onCancel} className="disagree-button"> Ні </button>
                    </div>
                </div>
            );
        }
    }

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
            <td><input type="text" 
                value={note ?? ""}
                onChange={e => setNote(e.target.value)}
                onBlur={() => updateInvoices({ task: "update-invoice-list", id: invoice.id, note })}
            /></td>
            <td>
                <UseAnimations
                    animation={trash}
                    onClick={deleteRow}
                />
            </td>
        </tr>
    );
};

export default InvoicesListRow;
