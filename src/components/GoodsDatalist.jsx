import React, { useEffect, useState, useMemo, useRef } from 'react';
import DataListInput from "./DatalistLib/DataListInput";

const GoodsDatalist = ({ id = 0, value, onInput, onSelect, fetchData, inputClassName}) => {
    // useEffect(
    //     () => {
    //         console.log("GoodsList group:", group);
    //     }, // eslint-disable-next-line react-hooks/exhaustive-deps
    //     [group]
    // );
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
            fetchData({ task: "find-goods", property }).then(setGoods);            
    }

    const items = useMemo(
        () => {
            return goods.map((product) => ({
                label: product.name?.replace(/&quot;/g, '"') + " - " + ((product?.id_tovar) ? (product.price + "грн." + " | " + product.barcode) : ""),
                key: product.id_tovar,
                quantity: "",
                ...product,
            }))
        },
        [goods]
    );

    return (<DataListInput
        id={"datalist" + id}
        value={value?.replace(/&quot;/g, '"')}
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
        datatitle={value}
    />);
};

export default GoodsDatalist;
