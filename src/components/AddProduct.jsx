import React from 'react'
import CreateInvoiceRow from './CreateInvoiceRow'
// import CreateInvoiceRow from './CreateInvoiceRow'
// import GroupsContext from './Invoice'



const AddProduct = ({groups, setProducts}) => {
  console.log(groups);
  const addProduct = product => {
    setProducts(prevProducts => [...prevProducts, product]);
  } 
  return (
    <div className='bottom-panel'>
      <CreateInvoiceRow onRowUpdate={addProduct} groups={groups} />
    </div>
  )
}

export default AddProduct