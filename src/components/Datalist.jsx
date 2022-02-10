import React from 'react';

const Datalist = ({goods, datalistid}) => {
    //console.log(goods)
    return <datalist id={"items"+datalistid} >
    {goods.map(item => {
        // console.log("In map: ", goods);
        // console.log("In map(item): ", item.id_tovar);
        return <option value={item.name+item.id_tovar} key={item.id_tovar} />
    })} 
    </datalist>;
};

export default Datalist;
