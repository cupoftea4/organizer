import React, { useState } from 'react'
import './Products.css'
import ProductsRow from '../components/ProductsRow';
import AddProduct from '../components/AddProduct';

const Products = () => {
  const [products, setProducts] = useState([]);

  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>№</th>
                <th>Назва</th>
                <th>Ціна, грн. </th>
                <th>Кiльк. </th>
                <th>Сума, грн. </th>
                <th>Штрих-код	</th>
            </tr>
          </thead>
          <tbody>
              {products.map(invoice => <ProductsRow

              />)}
          </tbody>
      </table>
      <AddProduct/>
    </div>
  )
}

export default Products 