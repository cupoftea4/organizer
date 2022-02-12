import React, { useEffect, useState } from 'react';
import UseAnimations from 'react-useanimations';
import download from 'react-useanimations/lib/download';

const CreateInvoice = ({ updateInvoices }) => {

    const [ shops, setShops ] = useState([{ id: 0, name: "" }]);
    const [ newInvoice, setNewInvoice ] = useState({ date: "", shop: 1, note: "" });

    const fetchData = (changes = {}) => {
        return fetch("http://my.com/", {
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(changes)
        }).then(res => res.json());
    }

    useEffect(() => {
        fetchData({task: "get-shops"}).then(setShops);
    }, []);

    const createInvoice = async () => {
        console.log({ task: 'create-invoice', ...newInvoice });
        updateInvoices({ task: 'create-invoice', ...newInvoice });
        // fetchData({ task: 'create-invoice', ...newInvoice }).then(setInvoices);
    };
    

  return (
    <div>
        <input type="date"
            onChange={e => setNewInvoice({...newInvoice, date: e.target.value })}
            className="create-row-input" 
        />
        <select 
            onChange={e => setNewInvoice({...newInvoice, shop: e.target.value })}
            className="create-row-input"
        >
            {shops.map((shop, i) => <option value={shop.id} key={i}>{shop.name}</option>)}
        </select>
        <input 
            type="text"
            onChange={e => setNewInvoice({...newInvoice, note: e.target.value })}
            className="create-row-input"  
            placeholder="Примітка" 
        />
        <UseAnimations
            animation={download}
            size={40}
            onClick={createInvoice}
         />
    </div>
  )
}

export default CreateInvoice