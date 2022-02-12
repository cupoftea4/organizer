import React, { useState, useEffect, useMemo } from 'react';
import DataListInput from "react-datalist-input";
import UseAnimations from 'react-useanimations';
import trash from 'react-useanimations/lib/trash';
import { confirm } from "react-confirm-box";
import './Invoice.css';

const InvoiceRow = ({ row, id = 0, onRowUpdate, invoiceId }) => {
    const [quantity, setQuantity] = useState(row.quantity);
    const [price, setPrice] = useState(row.price);
    const [name, setName] = useState(row.name);
    const [barcode, setBarcode] = useState(row.barcode);
    const [goods, setGoods] = useState([]);
    const sum = price * quantity;

    useEffect(() => {
        setName(row.name);
        setPrice(row.price);
        setQuantity(row.quantity);
        setBarcode(row.barcode);
    }, [row]);

    const match = (currentInput, item) => item;
    const deleteRow = async () => {
        const result = await confirm("Ви впевнені, що хочете видалити з цієї накладної", options);
        if (result) {
            onRowUpdate({ task: "delete-row", id: row.id, id_nakladni: invoiceId})
        }
    };

    const options = {
        render: (message, onConfirm, onCancel) => {
            return (
                <div className="confirm-container">
                    <div>
                        <p> {message} <b>{name}</b> {"?"} </p>
                        <button onClick={onConfirm} className="agree-button"> Так </button>
                        <button onClick={onCancel} className="disagree-button"> Ні </button>
                    </div>
                </div>
            );
        }
    }

    const handleSearch = (key, val) => {
        if (val.length >= 3) {
            searchGoods(key, val);
        }
    }

    const updateInvoice = (product) => onRowUpdate({
        task: 'update-invoice',
        id_vidacha: row.id,
        ...product
    });

    const searchGoods = (key, property) => {
        fetch("http://my.com/", {
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ task: "find-goods", property })
        })
            .then(res => res.json())
            .then(setGoods)
    }

    const items = useMemo(
        () => {
            return goods.map((product) => ({
                label: product.name + " - " + ((product?.id_tovar) ? (product.price + "грн." + " | " + product.code) : ""),
                key: product.id_tovar,
                ...product,
            }))
        },
        [goods]
    );

    return (
        <tr>
            <td>
                {id}
            </td>
            <td>
                <DataListInput
                    id={"input" + id}
                    value={name}
                    items={items}
                    onSelect={product => {
                        setName(product.name);
                        updateInvoice({ key: "name", property: product.name, id_tovar: product.id_tovar });
                    }}
                    onInput={value => {
                        setName(value);
                        handleSearch("name", value);
                    }}
                    match={match}
                    dropdownClassName="dropdown"
                    itemClassName="dropdownItem"
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
                />
            </td>
        </tr>
    );
}
export default InvoiceRow;
