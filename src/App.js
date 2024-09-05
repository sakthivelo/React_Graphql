import logo from './logo.svg';
import './App.css';
import graphqlUrl from './graphqlUrl';
import { useEffect, useState } from 'react';


export function App() {
 const [hello, sethello] = useState("This is amazing!!");
 const [widgets, setWidgets] = useState([]);
  useEffect(()=>{
    const query= {
      query:`
        {
        getAllProducts{
        id
        name
        description
        price
        stores{
          store
        }
      }
      } 
      `
    }
    try{      
      fetch(graphqlUrl.baseUrl,{
        method:"POST",
        headers: graphqlUrl.headers,
        body:JSON.stringify(query)
      }).then(response=>response.json())
      .then(data=>{
        setWidgets(data.data.getAllProducts)
    });
    }catch(Exception){
      console.log(Exception)
    }
  },[])
  return (    
    <div className="App">
      <header className="App-header">
        <h1>{hello}, Welcome to graphql app!! </h1>
        <ul>
          { widgets && widgets.map((widget) => (
            <li key={widget.id}>
              {widget.name} - {widget.description} - {widget.price} - {widget.stores.map((store)=>store.store+" ")}
            </li>
          ))} 
        </ul>
      </header>
    </div>
  );
}

//export default App;
