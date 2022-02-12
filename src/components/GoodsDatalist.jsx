import React, { useEffect, useState, useMemo } from 'react';
import DataListInput from "react-datalist-input";

const GoodsDatalist = ({ id = 0, value, onInput, onSelect, inputClassName, group = 1 }) => {
    const [goods, setGoods] = useState([]);

    const match = (currentInput, item) => item;
    const handleSearch = (val) => { if (val.length >= 3) searchGoods(val) }

    useEffect (
        () => handleSearch("name", value), // eslint-disable-next-line react-hooks/exhaustive-deps
        [group]
    ); 

    const searchGoods = (property) => {
        fetch("http://my.com/", {
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ task: "find-goods", property, group })
        })
            .then(res => res.json())
            .then(setGoods)
    }

    const items = useMemo(
        () => {
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

    return <DataListInput
        id={"datalist" + id}
        value={value}
        items={items}
        onSelect={product => onSelect(product)}
        onInput={value => {
            onInput(value);
            handleSearch(value);
        }}
        match={match}
        dropdownClassName="dropdown"
        itemClassName="dropdownItem"
        inputClassName={inputClassName}
        placeholder="Назва товару"
    />;
};

export default GoodsDatalist;
