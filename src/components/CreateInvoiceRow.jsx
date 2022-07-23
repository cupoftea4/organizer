import React, { useState, useEffect, useRef } from 'react';
import UseAnimations from 'react-useanimations';
import download from 'react-useanimations/lib/download';
import { confirm } from "react-confirm-box";
import GoodsDatalist from './GoodsDatalist';
import { fetchData } from '../fetchData';

const CreateInvoiceRow = ({ groups, onRowUpdate, invoiceId = 0 }) => {
    const [newProduct, setNewProduct] = useState({ id_tovar: 0, name: "", price: "", optPrice: "", quantity: 1, group: 1, barcode: "" });

    // eslint-disable-next-line
    const useMountEffect = (fun) => useEffect(fun, []);
    
    const useFocus = () => {
        const htmlElRef = useRef(null);
        const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }
        return [htmlElRef, setFocus]
    }

    const [barcodeFocus, setBarcodeFocus] = useFocus();
    const [quantityFocus, setQuantityFocus] = useFocus();
    useMountEffect(setBarcodeFocus);

    const resetNewProduct = group => setNewProduct({ id_tovar: 0, name: "", price: "", quantity: 1, barcode: "",  optPrice: "", group });
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
                <div className="center-container">
                    <p> {message} <b>{newProduct.name}</b>{"?"} </p>
                    <button onClick={onConfirm} className="primary-button red"> Так </button>
                    <button onClick={onCancel} className="primary-button"> Ні </button>
                </div>
            );
        }
    }

    const warningOptions = {
        render: (message, onConfirm) => {
            return ( 
                <div className="center-container error">
                    <p> {message} </p>
                    <button onClick={onConfirm} className="primary-button"> Зрозуміло </button>
                </div>
            );
        }
    }

    return <div className="green-box" >
        <select value={newProduct.group} className="create-input" onChange={e => setNewProduct({ ...newProduct, group: e.target.value })}>
            {groups.map(group => <option value={group.id} key={group.id}>{group.name}</option>)}
        </select>
        <input
            className="create-input"
            type="number"
            min="0"
            max="999999999999999"
            value={newProduct.barcode}
            onChange={event => setNewProduct({ ...newProduct, barcode: event.target.value })}
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    setQuantityFocus();
                    fetchData({ task: "select-product", barcode: e.target.value })
                        .then(({data:product, dataStatus}) => {
                            if (dataStatus !== "resolved") return;
                            if (!product) {
                                setNewProduct({...newProduct, id_tovar: 0, barcode: e.target.value});
                            } else {
                                setNewProduct({...newProduct, ...product});
                            }
                        });
                    }
                }}
            ref={barcodeFocus}
            placeholder="Штрих-код"
        />
        <div className="name-input">
            <GoodsDatalist
                value={newProduct.name}
                onSelect={product => {
                    setNewProduct({ ...newProduct, ...product });
                    setQuantityFocus();
                }}
                onInput={value => setNewProduct({ ...newProduct, name: value })}
                fetchData={fetchData}
                inputClassName="create-input" 
            />
        </div>
        {invoiceId !== 0 && <input
            className="create-input number-input"
            type="number"
            value={newProduct.optPrice}
            onChange={event => setNewProduct({ ...newProduct, optPrice: event.target.value })}
            placeholder="Ціна опт   "
        />}
        <input
            className="create-input number-input"
            type="number"
            value={newProduct.price}
            onChange={event => setNewProduct({ ...newProduct, price: event.target.value })}
            placeholder="Ціна"
        />
        <input
            className="create-input number-input"
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
            className="clickable"
        />
    </div>;
};

export default CreateInvoiceRow;