import React, { useEffect, useState, useMemo, useRef } from 'react';
import DataListInput from "./DatalistLib/DataListInput";

const GoodsDatalist = ({ id = 0, value, onInput, onSelect, fetchData, inputClassName, group = 1 }) => {
    const [goods, setGoods] = useState([]);
    const [isMounted, setIsMounted] = useState(false);


    const match = (currentInput, item) => item;
    const handleSearch = (val) => { if (val.length >= 3) searchGoods(val) }

    useEffect(
        () => {
            if (isMounted) {
                handleSearch(value);
            } else setIsMounted(true);
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const searchGoods = (property) => {
            fetchData({ task: "find-goods", property, group }).then(setGoods);            
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

    return (<DataListInput
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
        title={value}
    />);
};

export default GoodsDatalist;
