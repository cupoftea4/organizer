import React, { useState, useEffect, useMemo } from 'react'
import './Products.css'
import ProductsRow from '../components/ProductsRow';
import AddProduct from '../components/AddProduct';
import { fetchData } from '../fetchData'
import useLocalStorage from '../useLocalStorage';

const Products = () => {
  const [products, setProducts] = useLocalStorage('products', [{ id_tovar: 1, name: "hhhet", price: 2, quantity: 3, barcode: "013928274973" }]);
  const [groups, setGroups] = useState([]);
  const total = useMemo(() => products.reduce((acc, product) => acc + (product.price * product.quantity), 0).toLocaleString("en", {useGrouping: false, minimumFractionDigits: 2}), [products]); 

  useEffect (
    ()  =>  {
        fetchData({task: "get-groups"})
            .then(({data: groups, dataStatus}) => {
                if (dataStatus !== 'resolved') return;
                setGroups(groups);
            });
    // eslint-disable-next-line      
    }, []
  );

  const deleteRow = id => {
    console.log(products, id);
    setProducts(products.filter(product => product.id_tovar !== id));
  };

  return (
    <div>
      <table className='products-table'>
        <thead>
            <tr>
                <th>№</th>
                <th colSpan={2}>Назва</th>
                <th>Ціна, грн. </th>
                <th>Кiльк. </th>
                <th>Сума, грн. </th>
                <th>Штрих-код	</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
              {products.map((product, id) => <ProductsRow key={product.id_tovar} id={id} product={product} deleteRow={deleteRow}/>)}
          </tbody>
          <tfoot>
              <tr>
                  <th id="total" colSpan="5" className='right-align'>Разом, грн: </th>
                  <td className='right-align'><b>{total}</b></td>
                  <td colSpan="2">
                  </td>
              </tr>
          </tfoot>
      </table>
      <AddProduct groups={groups} setProducts={setProducts}/>
    </div>
  )
}

export default Products 