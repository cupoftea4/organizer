import React, { useEffect, useState, useMemo } from 'react';
import { useTransition } from 'react';
import DataListInput from "./DatalistLib/DataListInput";
import { fetchData } from '../fetchData';

const GoodsDatalist = ({ id = 0, value, onInput, onSelect, inputClassName}) => {
    const [startTransition] = useTransition();
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
        fetchData({ task: "find-goods", property })
        .then(({ data:goods, dataStatus }) => {
                if (dataStatus !== 'resolved') return;
                setGoods(goods);
            });            
    }

    const items = useMemo(
        () => {
            return goods.map((product) => ({
                // eslint-disable-next-line
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
            startTransition(() => handleSearch(value));
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
