import React from 'react';
import Tables from '../components/Tables';
import './Home.css';

/****************************************
TODO: 
  -css
  -remove github component
  -safe creation of invice row ✔
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

function Home() {
  return (
    <div className="home">
      <Tables />
    </div>
  )
}

export default Home  

