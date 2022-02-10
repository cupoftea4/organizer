import React, { useState, useEffect } from 'react';
import InvoiceRow from './InvoiceRow';
import './Invoice.css';
import CreateInvoiceRow from './CreateInvoiceRow';


const Invoice = ({ rows, setRows, onRowUpdate, id }) => {
    const total = rows.reduce((acc, row) => acc + (row.price * row.quantity), 0);
    const [groups, setGroups] = useState([{ id: 1, name: "" }]);
    //console.log(goodsList);

    const create = () => {
        setRows([{price: 0, quantity: 0, id: 0}, ...rows]);
        // fetch("http://my.com/", {
        //     method: 'POST',
        //     header: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: JSON.stringify({ task: "create-new" })
        // }).then(res => res.json())
        // .then(newRow => setRows([...rows, newRow]))
        console.log(rows)
    };

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

    return (
        <div style={{padding: "20px"}}>
            <CreateInvoiceRow groups={groups} onRowUpdate={onRowUpdate} invoiceId={id} />
            <table>
            {/* <InvoiceRow id={"+"} row={{id: 0, price: "", quantity: ''}} onRowUpdate={onRowUpdate}/> */}
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
                        <th id="total" colSpan="4">Total:</th>
                        <td>{total}</td>
                    </tr>
                    <tr>
                        {/* <td>
                            <input list="items" />
                            <datalist id="items" >
                                {goods.map((item) => <option value={item.name + " " + item.code} key={item.id_tovar} />)}
                            </datalist>
                        </td> */}
                    </tr>
                </tfoot>
            </table>
            <button onClick={create}>Додати товар</button>
        </div>
    )
}

export default Invoice;
