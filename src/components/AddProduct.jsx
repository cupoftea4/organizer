import React from 'react'
import CreateInvoiceRow from './CreateInvoiceRow'

const AddProduct = ({groups, setProducts}) => {

  const addProduct = product => {
    setProducts(prevProducts => {
      // mby optimize this
      let foundProd = prevProducts.find(p => p.id_tovar === product.id_tovar);
      if (foundProd) {
        prevProducts = prevProducts.filter((p) => p.id_tovar !== product.id_tovar);
        foundProd.quantity += product.quantity;
        return [...prevProducts, foundProd];
      }
      return [...prevProducts, product]
    });
  } 
  return (
    <div className='bottom-panel'>
      <CreateInvoiceRow onRowUpdate={addProduct} groups={groups} />
    </div>
  )
}

export default AddProduct