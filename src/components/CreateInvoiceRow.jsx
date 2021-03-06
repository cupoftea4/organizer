import React, { useState, useEffect, useRef } from 'react';
import UseAnimations from 'react-useanimations';
import download from 'react-useanimations/lib/download';
import { confirm } from "react-confirm-box";
import GoodsDatalist from './GoodsDatalist';

const CreateInvoiceRow = ({ groups, fetchData, onRowUpdate, invoiceId }) => {
    const [newProduct, setNewProduct] = useState({ id_tovar: 0, name: "", price: "", optPrice: "", quantity: "", group: 1, barcode: "" });

    const useMountEffect = (fun) => useEffect(fun, [fun]);
    const useFocus = () => {
        const htmlElRef = useRef(null);
        const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }
        return [htmlElRef, setFocus]
    }

    const [barcodeFocus, setBarcodeFocus] = useFocus();
    const [quantityFocus, setQuantityFocus] = useFocus();
    useMountEffect(setBarcodeFocus);

    const resetNewProduct = group => setNewProduct({ id_tovar: 0, name: "", price: "", quantity: "", barcode: "",  optPrice: "", group });
    const confirmCreateProduct = async (product) => {
        if (!product.group) {
            const result = await confirm("OБЕРЕЖНО! Група цього товару 0. Продовжити?", options);
            if (!result) return;
        }
        if (!parseFloat(product.price) || !parseFloat(product.optPrice) || !product.name || !parseInt(product.quantity)) {
            await confirm("OБЕРЕЖНО! Не всі дані введено або введено неправильно. Товар НЕ буде додано.", warningOptions);
            return;
        }
        let updateData = {
            task: 'update-invoice',
            key: 'name',
            id_vidacha: 0,
            id_nakladni: invoiceId,
            id_tovar: product.id_tovar,
            name: product.name,
            price: product.price,
            optPrice: product.optPrice,
            quantity: parseInt(product.quantity),
            group: product.group
        }
        if (product.barcode.length >= 10) {
            onRowUpdate({...updateData, barcode: product.barcode});
            resetNewProduct(product.group);
            setBarcodeFocus();
            return;
        }
        const result = await confirm("Ви впевнені, що хочете створити і додати до накладної товар", options);
        if (result) {
            onRowUpdate({ ...updateData, id_tovar: 0 });
            resetNewProduct(product.group);
            setBarcodeFocus();
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

    const warningOptions = {
        render: (message, onConfirm) => {
            return ( 
                <div className="confirm-container">
                    <div>
                        <p> {message} </p>
                        <button onClick={onConfirm} className="agree-button"> Зрозуміло </button>
                    </div>
                </div>
            );
        }
    }

    return <div className="create-row" >
        <div className="inputs-div">
            <select value={newProduct.group} className="choose-input select" onChange={e => setNewProduct({ ...newProduct, group: e.target.value })}>
                {groups.map(group => <option value={group.id} key={group.id}>{group.name}</option>)}
            </select>
            <input
                className="choose-input"
                type="number"
                min="0"
                max="999999999999999"
                value={newProduct.barcode}
                onChange={event => setNewProduct({ ...newProduct, barcode: event.target.value })}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        setQuantityFocus();
                        fetchData({ task: "select-product", barcode: e.target.value })
                            .then(product => {
                                if (!product) {
                                    setNewProduct({id_tovar: 0, barcode: e.target.value});
                                } else {
                                    setNewProduct(product);
                                }
                            });
                        }
                    }}
            ref={barcodeFocus}
            placeholder="Штрих-код"
                />
        </div>
        <div id="datalist-div">
            <GoodsDatalist
                value={newProduct.name}
                onSelect={product => {
                    setNewProduct({ ...newProduct, ...product });
                    setQuantityFocus();
                }}
                onInput={value => setNewProduct({ ...newProduct, name: value })}
                fetchData={fetchData}
                inputClassName="choose-input datalist" 
            />
        </div>
        <div className="inputs-div">
            <input
                className="choose-input num near-datalist"
                type="number"
                value={newProduct.optPrice}
                onChange={event => setNewProduct({ ...newProduct, optPrice: event.target.value })}
                placeholder="Ціна опт   "
            />
            <input
                className="choose-input num"
                type="number"
                value={newProduct.price}
                onChange={event => setNewProduct({ ...newProduct, price: event.target.value })}
                placeholder="Ціна"
            />
            <input
                className="choose-input num quantity"
                type="number"
                value={newProduct.quantity}
                onChange={event => setNewProduct({ ...newProduct, quantity: event.target.value })}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        setQuantityFocus();
                        confirmCreateProduct(newProduct);
                    }
                }}
                ref={quantityFocus}
                placeholder="Кільк."
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