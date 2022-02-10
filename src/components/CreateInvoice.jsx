import React from 'react'

const CreateInvoice = () => {
  return (
    <div>
        <input type="date" className="create-row-input" />
        <select className="create-row-input"><option value="option" /></select>
        <input className="create-row-input" type="text" placeholder="Примітка" />
    </div>
  )
}

export default CreateInvoice