import React, { useEffect, useState } from 'react';
import './bill.css';
import axios from 'axios';

const Bill = () => {
  const [bill,setBill] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/orders/1")
    .then((response)=>{
      console.log(response.data);
      setBill(response.data);
    }).catch((err)=>{
      console.log(err);
    })

  },[]);

  return (
    <div className='container mt-5'>
      {bill.map((order) => (
        <div key={order.id} className="order">
          <h3>Table No: {order.tableno}</h3>
          <h4>Status: {order.status}</h4>
          <h5>Order List:</h5>
          <ul>
            {order.orderList.map((item) => (
              <li key={item.id}>
                <p>Name: {item.menuItem.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.menuItem.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Bill;