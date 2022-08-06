import React from 'react';
import CreateInvoiceRow from './CreateInvoiceRow';
import { confirm } from 'react-confirm-box';
import { warningOptions } from '../options-box';

const AddProduct = ({groups, setProducts}) => {

  const addProduct = async product => {
    if (!product.id_tovar) {
      await confirm({msg: 'OБЕРЕЖНО! Такого товару немає в базі. Товар НЕ буде додано.'}, warningOptions);
      return;
    }
    setProducts(prevProducts => {
      // mby optimize this
      let foundProd = prevProducts.find(p => p.id_tovar === product.id_tovar);
      if (foundProd) {
        prevProducts = prevProducts.filter(p => p.id_tovar !== product.id_tovar);
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
};

export default AddProduct;