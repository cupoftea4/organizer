import React, {useState, useEffect} from 'react';
import Tables from '../components/Tables';
import { Link } from 'react-router-dom';
import './Home.css';
import { GroupsContext } from '../Contexts';
import { fetchData } from '../fetchData'

/****************************************
TODO:
  - a component is changing a controlled input to be uncontrolled. (while getting product by barcode in "CreateProductRow")
  - fix task and name appearance in products after "CreateInvoiceRow" 
  - Fix shops state change on every "InvoicesList" component render
  - fix null group when unexisting barcode is entered
  - fix multiple products with same id_tovar
  -css +-
  -remove github component
  -safe creation of invice row ✔
  -fix "p." year in tears list
  -fix price on invoice row product name edit ?
  -fix deleting the last invoice in list ?
  -fix error on focus change ✔
  -fix search datalist 
  -fix isMounted 
  -add login ?
  -build an API? 
 
*****************************************/


function Home() {
  const [groups, setGroups] = useState([{ id: 1, name: "" }]);

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

  return (
    <>
        <div className="right-top">
          <Link className="primary-button" to="/products" para={groups}>Пробити товар</Link>
        </div> 
      <GroupsContext.Provider value={groups}>
        <Tables/>
      </GroupsContext.Provider>
    </>
  );
}

export default Home;

