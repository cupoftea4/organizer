import React from 'react';
import Tables from './components/Tables';
import './styles/App.css';

/****************************************
TODO: 
  -css
  -remove github component
  -safe creation of invice row
  -fix "p." year in tears list
  -fix price on invoice row product name edit
  -fix deleting the last invoice in list
  -fix error on focus change
  -fix search datalist
  -fix isMounted
  -add PDF print 
  -add login
  -build an API?
 
*****************************************/

function App() {
  return (
    <div className="App">
      <Tables />
    </div>
  )
}

export default App  

