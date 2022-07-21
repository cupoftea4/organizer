import React, { useMemo } from 'react'
import UseAnimations from 'react-useanimations';
import trash from 'react-useanimations/lib/trash';

const ProductsRow = ({product, deleteRow, id}) => {
  const sum = useMemo(() => {
    return (product.price * product.quantity).toLocaleString("en", {useGrouping: false, minimumFractionDigits: 2})
  }, [product.price, product.quantity]);

  return (
    <tr>
      <td>{id + 1}</td>
      <td colSpan={2} >{product.name}</td>
      <td className='right-align'>{product.price}</td>
      <td className='right-align'>{product.quantity}</td>
      <td className='right-align'>{sum}</td>
      <td>{product.barcode}</td>
      <td>       
        <UseAnimations
          animation={trash}
          onClick={() => deleteRow(product.id_tovar)}
          className="icon-button clickable"
        />
      </td>
    </tr>
  )
}

export default ProductsRow