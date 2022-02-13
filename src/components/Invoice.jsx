import React, { useState, useEffect } from 'react';
import InvoiceRow from './InvoiceRow';
import CreateInvoiceRow from './CreateInvoiceRow';


const Invoice = ({ rows, onRowUpdate, id }) => {
    const total = rows.reduce((acc, row) => acc + (row.price * row.quantity), 0);
    const [groups, setGroups] = useState([{ id: 1, name: "" }]);

    useEffect (
        ()  =>  {
            fetch("http://my.com/", {
                method: 'POST',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({task: "get-groups"})
            })
                .then(data => data.json())
                .then(setGroups);
        }, []
    );

    const printInvoice = () => {
        fetch("http://my.com/print.php", {
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({id})
        })
    }

    return (
        <div className="table-div invoice">
            <h2>Накладна №{id}</h2>
            <CreateInvoiceRow groups={groups} onRowUpdate={onRowUpdate} invoiceId={id} />
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Назва товару</th>
                        <th>Ціна, грн.</th>
                        <th>Кількість</th>
                        <th>Сума, грн.</th>
                        <th>Штрих-код</th>
                        <th></th>
                    </tr>
                    {rows.map((row, index) => {
                        return <InvoiceRow id={index+1} row={row} key={row.id} onRowUpdate={onRowUpdate} invoiceId={id}  />
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <th id="total" colSpan="4">Разом: </th>
                        <td><b>{total}</b></td>
                        <td colSpan="2">
                            <button onClick={printInvoice} className="print-btn" >Друкувати</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Invoice;
