import React, { useState, useEffect, useMemo } from 'react';
import InvoiceRow from './InvoiceRow';
import CreateInvoiceRow from './CreateInvoiceRow';


const Invoice = ({ rows, fetchData, onRowUpdate, id }) => {
    const total = useMemo(() => rows.reduce((acc, row) => acc + (row.price * row.quantity), 0), [rows]); 
    const [groups, setGroups] = useState([{ id: 1, name: "" }]);

    useEffect (
        ()  =>  {
            fetchData({task: "get-groups"})
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
            <CreateInvoiceRow groups={groups} fetchData={fetchData} onRowUpdate={onRowUpdate} invoiceId={id} />
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Назва товару</th>
                        <th>Ціна, грн.</th>
                        <th>Клк.</th>
                        <th>Сума, грн.</th>
                        <th>Штрих-код</th>
                        <th></th>
                    </tr>
                    {rows.map((row, index) => {
                        return <InvoiceRow id={index+1} row={row} key={row.id} fetchData={fetchData} onRowUpdate={onRowUpdate} invoiceId={id}  />
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
