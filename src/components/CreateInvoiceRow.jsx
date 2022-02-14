import React, { useState, useEffect, useRef } from 'react';
import UseAnimations from 'react-useanimations';
import download from 'react-useanimations/lib/download';
import { confirm } from "react-confirm-box";
import GoodsDatalist from './GoodsDatalist';

const CreateInvoiceRow = ({ groups, fetchData, onRowUpdate, invoiceId }) => {
    const [newProduct, setNewProduct] = useState({ id_tovar: 0, name: "", price: "", quantity: "", group: 1, barcode: "" });

    const useMountEffect = (fun) => useEffect(fun, []);
    const useFocus = () => {
        const htmlElRef = useRef(null);
        const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }
        return [htmlElRef, setFocus]
    }

    const [barcodeFocus, setBarcodeFocus] = useFocus();
    const [quantityFocus, setQuantityFocus] = useFocus();
    useMountEffect(setBarcodeFocus);

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
            onRowUpdate({ ...updateData, id_tovar: 0, name: product.name });
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

    return <div className="create-row" >
        <div className="inputs-div">
            <select className="choose-input select" onChange={e => setNewProduct({ ...newProduct, group: e.target.value })}>
                {groups.map(group => <option value={group.id} key={group.id}>{group.name}</option>)}
            </select>
            <input
                className="choose-input"
                type="text"
                value={newProduct.barcode}
                onChange={event => setNewProduct({ ...newProduct, barcode: event.target.value })}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        setQuantityFocus();
                        fetchData({ task: "select-product", barcode: e.target.value })
                            .then(setNewProduct);
                        }
                    }}
            ref={barcodeFocus}
            placeholder="Штрих-код"
                />
        </div>
        <div id="datalist-div">
            <GoodsDatalist
                value={newProduct.name}
                group={newProduct.group}
                onSelect={product => {
                    setNewProduct(product);
                    setQuantityFocus();
                }}
                onInput={value => setNewProduct({ ...newProduct, name: value })}
                fetchData={fetchData}
                inputClassName="choose-input datalist"
            />
        </div>
        <div className="inputs-div">
            <input
                className="choose-input num"
                type="text"
                value={newProduct.price}
                onChange={event => setNewProduct({ ...newProduct, price: event.target.value })}
                placeholder="Ціна"
            />
            <input
                className="choose-input num"
                type="text"
                value={newProduct.quantity}
                onChange={event => setNewProduct({ ...newProduct, quantity: event.target.value })}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        setQuantityFocus();
                        confirmCreateProduct(newProduct);
                    }
                }}
                ref={quantityFocus}
                placeholder="Кількість"
            />

            <UseAnimations
                animation={download}
                size={40}
                strokeColor="white"
                fillColor="white"
                onClick={() => confirmCreateProduct(newProduct)}
                className="anim-btn"
            />
        </div>
    </div>;
};

export default CreateInvoiceRow;