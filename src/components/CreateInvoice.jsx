import React, { useRef, useState } from 'react';
import UseAnimations from 'react-useanimations';
import download from 'react-useanimations/lib/download';

const CreateInvoice = ({ shops, updateInvoices }) => {
    const curDate = useRef(new Date().toJSON().slice(0,10));
    const [ newInvoice, setNewInvoice ] = useState({ date: curDate.current, shop: 1, note: "" });

    const createInvoice = async () => {
        updateInvoices({ task: 'create-invoice', ...newInvoice });
    };
    
  return (
    <div className="green-box" >
        <select 
            onChange={e => setNewInvoice({...newInvoice, shop: e.target.value })}
            className="create-input"
        >
            {shops.map((shop, i) => <option value={shop.id} key={i}>{shop.name}</option>)}
        </select>
        <input type="date"
            value={newInvoice.date}
            onChange={e => setNewInvoice({...newInvoice, date: e.target.value })}
            className="create-input" 
        />
        <input 
            type="text"
            onChange={e => setNewInvoice({...newInvoice, note: e.target.value })}
            className="create-input"  
            placeholder="Примітка" 
        />
        <UseAnimations
            animation={download}
            size={40}
            strokeColor="white"
            fillColor="white"
            onClick={createInvoice}
            className="clickable"
         />
    </div>
  )
}

export default CreateInvoice