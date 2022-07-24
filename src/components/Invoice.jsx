import React, { useMemo, useContext } from 'react';
import InvoiceRow from './InvoiceRow';
import CreateInvoiceRow from './CreateInvoiceRow';
import {GroupsContext} from '../contexts';


const Invoice = ({ rows, onRowUpdate, id }) => {
    const total = useMemo(() => rows.reduce((acc, row) => acc + (row.price * row.quantity), 0).toLocaleString("en", {useGrouping: false, minimumFractionDigits: 2}), [rows]); 
    const groups = useContext(GroupsContext);

    return (
        <div className="table-div invoice">
            <h2>Накладна №{id} <span style={{"fontSize": "14px"}}> Сума: {total}грн </span> </h2>
                <CreateInvoiceRow groups={groups} onRowUpdate={onRowUpdate} invoiceId={id} />
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th colSpan="2">Назва товару</th>
                        <th>Ціна, грн.</th>
                        <th>Кiльк.</th>
                        <th>Сума, грн.</th>
                        <th>Штрих-код</th>
                        <th></th>
                    </tr>
                    {rows.map((row, index) => {
                        return <InvoiceRow 
                                id={index+1} 
                                row={row} 
                                key={row.id} 
                                onRowUpdate={onRowUpdate} 
                                invoiceId={id}  
                                />
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <th id="total" colSpan="5" className='right-align'>Разом, грн: </th>
                        <td className='right-align'><b>{total}</b></td>
                        <td colSpan="2">
                            <a href={'http://my.com/print.php?id=' + id} rel="noreferrer" target="_blank" >
                                <input className="primary-button clickable" type="button" value="Друкувати"/> 
                            </a>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
};

export default Invoice;
