import React, { useState, useMemo, useEffect, useRef } from 'react';
import DataListInput from "./DataListInput";
import UseAnimations from 'react-useanimations';
import download from 'react-useanimations/lib/download';
import { confirm } from "react-confirm-box";

export const useMountEffect = (fun) => useEffect(fun, []);

const CreateInvoiceRow = ({groups, onRowUpdate, invoiceId}) => {
    const [newProduct, setNewProduct] = useState({ id_tovar: 0, name: "", price: "", quantity: "", group: 1, barcode: ""});
    const [goods, setGoods] = useState([]);

    const useFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
        return [ htmlElRef,  setFocus ] 
    }

    const [barcodeFocus, setBarcodeFocus] = useFocus();
    const [quantityFocus, setQuantityFocus] = useFocus();
    useMountEffect( setBarcodeFocus );

    const match = (currentInput, item) => item;
    const confirmCreateProduct = async (product) => {
        let updateData = {
            task: 'update-invoice',
            key: 'name',
            id_vidacha: 0,
            id_nakladni: invoiceId,
            id_tovar: product.id_tovar,
            price: product.price,
            quantity: product.quantity
        } 
        if (product.barcode.length >= 10) {
            onRowUpdate(updateData);
            setNewProduct({ id_tovar: 0, name: "", price: "", quantity: "", group: 1, barcode: "" });
            setBarcodeFocus();
            return;
        }
        const result = await confirm("Ви впевнені, що хочете створити і додати до накладної товар", options);
        if (result) {
            onRowUpdate({...updateData, id_tovar: 0, name: product.name});
        }
    };

    const options = {
        render: (message, onConfirm, onCancel) => {
            return (
                <div className="confirm-container">
                    <div>
                        <p> {message} <b>{newProduct.name}</b> {"?"} </p>
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

    const searchGoods = (key, property) => {
        fetch("http://my.com/", {
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ task: "find-goods", property, group: newProduct.group})
        })
            .then(res => res.json())
            .then(setGoods)
    }
 
    const items = useMemo(
        () => {
        // console.log(goods);
            return goods.map((product) => ({
                label: product.name + " - " + ((product?.id_tovar) ? (product.price + "грн." + " | " + product.code) : ""),
                key: product.id_tovar,
                barcode: product.code,
                quantity: "",
                ...product,
            }))
        },
        [goods]
    );

    useEffect (
        () => handleSearch("name", newProduct.name),
        [newProduct.group]
    );

    return <div className="create-row" >
            <div className="inputs-div">
                <select className="create-row-input" onChange={e => setNewProduct({...newProduct, group: e.target.value})}>
                    {groups.map(group => <option value={group.id} key={group.id}>{group.name}</option> )}
                </select>
                <input
                    className="create-row-input"
                    type="text" 
                    value={newProduct.barcode} 
                    onChange={event => setNewProduct({...newProduct, barcode: event.target.value})}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            setQuantityFocus();
                            fetch("http://my.com/", {
                                method: 'POST',
                                header: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: JSON.stringify({ task: "select-product", barcode: e.target.value})
                            })
                                .then(res => res.json())
                                .then(setNewProduct);
                        }
                    }}
                    ref={barcodeFocus}
                    placeholder="Штрих-код"
                />
            </div>
            <div id="datalist-div">
                <DataListInput
                    value={newProduct.name}
                    items={items}
                    onSelect={product => {
                        // console.log({ key: "name", property: product.name, barcode: product.code });
                        setNewProduct(product);
                        setQuantityFocus();
                    }}
                    onInput={value => {
                        // console.log(value);
                        setNewProduct({...newProduct, name: value});
                        handleSearch("name", value);
                        // console.log("EDITING", editing);
                    }}
                    match={match}
                    dropdownClassName="dropdown"
                    itemClassName="dropdownItem"
                    inputClassName="create-row-input"
                    placeholder="Назва товару"
                />
            </div>
            <div className="inputs-div">
                <input
                    className="create-row-input"
                    type="text"
                    value={newProduct.price}
                    onChange={event => setNewProduct({...newProduct, price: event.target.value})}
                    placeholder="Ціна"
                />
                <input
                    className="create-row-input"
                    type="text"
                    value={newProduct.quantity}
                    onChange={event => setNewProduct({...newProduct, quantity: event.target.value})}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            setQuantityFocus();
                            confirmCreateProduct(newProduct);
                            console.log(newProduct);
                        }
                    }}
                    ref={quantityFocus}
                    placeholder="Кількість"
                />

                <UseAnimations
                    animation={download}
                    size={40}
                    onClick={() => confirmCreateProduct(newProduct)}
                />
            </div>
    </div>;
};

export default CreateInvoiceRow;
