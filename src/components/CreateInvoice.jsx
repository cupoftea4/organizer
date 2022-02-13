import React, { useRef, useState } from 'react';
import UseAnimations from 'react-useanimations';
import download from 'react-useanimations/lib/download';

const CreateInvoice = ({ updateInvoices, shops }) => {
    const curDate = useRef(new Date().toJSON().slice(0,10));
    const [ newInvoice, setNewInvoice ] = useState({ date: curDate.current, shop: 1, note: "" });

    const createInvoice = async () => {
        console.log({ task: 'create-invoice', ...newInvoice });
        updateInvoices({ task: 'create-invoice', ...newInvoice });
    };
    

  return (
    <div className="create-row create-invoice" >
        <select 
            onChange={e => setNewInvoice({...newInvoice, shop: e.target.value })}
            className="choose-input select shop"
        >
            {shops.map((shop, i) => <option value={shop.id} key={i}>{shop.name}</option>)}
        </select>
        <input type="date"
            value={newInvoice.date}
            onChange={e => setNewInvoice({...newInvoice, date: e.target.value })}
            className="choose-input date" 
        />
        <input 
            type="text"
            onChange={e => setNewInvoice({...newInvoice, note: e.target.value })}
            className="choose-input note"  
            placeholder="Примітка" 
        />
        <UseAnimations
            animation={download}
            size={40}
            strokeColor="white"
            fillColor="white"
            onClick={createInvoice}
            className="anim-btn"
         />
    </div>
  )
}

export default CreateInvoice