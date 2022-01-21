import React, { useState } from 'react'
import InvoiceRow from './InvoiceRow'
import './Invoice.css';

const Invoice = (props) => {
    let total = 0
    const [goodsList, setGoodsList] = useState([{id: 1}, {}])
    const Create = async () => {
        await props.setRows([...props.rows, {}])
        console.log("123")
        try {
            const res = await fetch("http://my.com/", {
                method: 'POST',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify("create-new")
            })
            let response = JSON.parse(await res.text())
            console.log(response)
            setGoodsList(...response)
            console.log(goodsList)

            //const searchResult = response.filter(input => response.name.includes(input))
            //setInvoiceRows([...invoiceRows, ...response])
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <table>
                <tbody>
                    {props.rows.map((row, index) => {
                        (index) ? (total += row.sum) : (total = 0)
                        return <InvoiceRow number={index} row={row} key={index} rows={props.rows} setRows={props.setRows} changes={props.changes} setChanges={props.setChanges} />
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <th id="total" colSpan="3">Total:</th>
                        <td>
                            <input list="browsers" name="browser" id="browser" />
                            <datalist>          
                                {goodsList.map((item, index) => {return <option value={item} key={index}/>})}
                            </datalist>
                        </td>
                        <td>{total.toString()}</td>
                        <td><button onClick={Create}>Додати товар</button></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Invoice
