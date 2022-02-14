import React, { useState, useEffect, useMemo } from 'react';
import UseAnimations from 'react-useanimations';
import trash from 'react-useanimations/lib/trash';
import { confirm } from "react-confirm-box";
import GoodsDatalist from './GoodsDatalist';

const InvoiceRow = ({ row, id = 0, fetchData, onRowUpdate, invoiceId }) => {
    const [quantity, setQuantity] = useState(row.quantity);
    const [price, setPrice] = useState(row.price);
    const [barcode, setBarcode] = useState(row.barcode);
    const [name, setName] = useState(row.name);
    let sum = useMemo(() => (price * quantity).toLocaleString("en",{useGrouping: false,minimumFractionDigits: 2}), [price, quantity]);

    useEffect(() => {
        setName(row.name);
        setPrice(row.price);
        setQuantity(row.quantity);
        setBarcode(row.barcode);
    }, [row]);

    const deleteRow = async () => {
        const result = await confirm("Ви впевнені, що хочете видалити з цієї накладної ", options);
        if (result) {
            onRowUpdate({ task: "delete-row", id: row.id, id_nakladni: invoiceId })
        }
    };

    const options = {
        render: (message, onConfirm, onCancel) => {
            return (
                <div className="confirm-container">
                    <div>
                        <p> {message} <b> {name} </b> {"?"} </p>
                        <button onClick={onConfirm} className="agree-button"> Так </button>
                        <button onClick={onCancel} className="disagree-button"> Ні </button>
                    </div>
                </div>
            );
        }
    }

    const updateInvoice = (product) => onRowUpdate({
        task: 'update-invoice',
        id_vidacha: row.id,
        ...product
    });

    return (
        <tr>
            <td>
                {id}
            </td>
            <td>
                <GoodsDatalist 
                    id={row.id} 
                    value={name}
                    onSelect={product => {
                        setName(product.name);
                        updateInvoice({ key: "name", property: product.name, id_tovar: product.id_tovar });
                    }} 
                    onInput={ value => setName(value)}
                    fetchData={fetchData}
                    inputClassName="name-input"
                />
            </td>
            <td><input
                type="text"
                value={price}
                onChange={event => setPrice(event.target.value)}
                onBlur={() => updateInvoice({ key: "price", property: price, barcode })}
                title={"Оптова ціна: " + row.optPrice}
            /></td>
            <td><input
                type="text"
                value={quantity}
                onChange={event => setQuantity(event.target.value)}
                onBlur={() => updateInvoice({ key: "kilkist", property: quantity, barcode })}
            /></td>
            <td>{sum}</td>
            <td>{barcode}</td>
            <td>
                <UseAnimations
                    animation={trash}
                    onClick={deleteRow}
                    className="anim-btn"
                />
            </td>
        </tr>
    );
}
export default InvoiceRow;
