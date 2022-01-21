import React, { useState } from 'react'

const InvoiceRow = (props) => {
    let id = 0
    const _row = props.row
    const [row, setRow] = useState({id: _row.id, price: _row.price, quantity: _row.quantity, barcode: _row.barcode})
    !props.number ? id = "" : id = props.number 
    return (
             <tr>
                <td>{id}</td>
                <td>{_row.name}</td>
                <td><input
                    type="text"
                    value={row.price}
                    onChange={event => setRow({...row, price: event.target.value})}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            props.setChanges({id: _row.id, key: "price", property: event.target.value})
                        }
                    }}

                /></td>
                <td><input
                    type="text"
                    value={row.quantity}
                    onChange={event => setRow({...row, quantity: event.target.value})}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            props.setChanges({id: _row.id, key: "kilkist", property: event.target.value})
                        }
                    }}

                /></td>
                <td>{_row.sum}</td>
                <td>{_row.barcode}</td>
            </tr>
    )
}

export default InvoiceRow
