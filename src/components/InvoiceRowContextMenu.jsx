import React from 'react'
import { confirm } from 'react-confirm-box'
import { confirmOptions } from '../options-box'

const InvoiceRowContextMenu = ({id, position, onRowUpdate, rowName}) => {
  const clipboard = JSON.parse(sessionStorage.getItem("clipboard"));

  const onRowDelete = () => {
    onRowUpdate({ task: "delete-invoice-row", id})
  }

  const onRowCopy = () => {
    sessionStorage.setItem("clipboard", JSON.stringify({ id, name: rowName }));
  }

  const onRowMove = async () => {
    if (!clipboard?.id) return;
    const result = await confirm(
      {msg: `Ця дія видалить товар ${clipboard.name} з попередньої накладної і додасть в цю. Продовжити`},
      confirmOptions
    );
    if (result) {
      onRowUpdate({ id: clipboard.id, task: "move-invoice-row" });
      sessionStorage.removeItem("clipboard");
    }
  }

  const onRowPaste = () => {
    if (!clipboard?.id) return;
    onRowUpdate({ id: clipboard.id, task: "copy-invoice-row" });
    sessionStorage.removeItem("clipboard");
  }

  const showProductName = (name) => {
    if (name.length > 8) {
      return name.slice(0, 8) + '...'
    }
    return name;
  }

  return (
    <div style={{
        position: 'absolute',
        left: position.x, 
        top: position.y
      }} className='contextMenu'>
      <button onClick={onRowCopy}>Скопіювати {showProductName(rowName)}</button>
      {
        clipboard?.id ?
          <>
            <button onClick={onRowPaste}>Вставити сюди {showProductName(clipboard.name)}</button>
            <button onClick={onRowMove}>Перемістити сюди {showProductName(clipboard.name)}</button>
          </> :
          null
      }
      <button onClick={onRowDelete}>Видалити {showProductName(rowName)}</button>
    </div>
  )
}

export default InvoiceRowContextMenu;