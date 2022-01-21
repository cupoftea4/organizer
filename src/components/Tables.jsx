import React, { useState, useEffect } from 'react'
import Invoice from './Invoice'

const Tables = () => {
    //localStorage.removeItem('response')
    const [invoiceRows, setInvoiceRows] = useState([
		{ id: '0', name: 'Назва товару',  price: 'Ціна, грн.', quantity: 'Кількість', sum: 'Сума, грн.', barcode: 'Штрих-код' }
	])
    const [changes, setChanges] = useState({});
    
    useEffect(() => {
       const getTable = async () => {
            console.log("useEffect")
            try {    
            const res = await fetch("http://my.com/", {
                method: 'POST',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(changes)
            })
                //console.log(await res.text())
                let response = JSON.parse(await res.text())
                setInvoiceRows([...invoiceRows, ...response])
            } catch(err) {
                console.error(err)
            }
        }
        getTable()
    }, [changes])
    return (
        <div>
           <Invoice rows={invoiceRows} setRows={setInvoiceRows} title="Invoice"  changes={changes} setChanges={setChanges}/>
        </div>
    )
}

export default Tables
