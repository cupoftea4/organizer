import React from 'react';
import Tables from './components/Tables';
import './styles/App.css';

/****************************************
TODO: 
  -css
  -delete github component
  -fix deleting the last invoice in list
  -fix error on focus change
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