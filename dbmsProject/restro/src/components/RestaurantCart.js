import axios from 'axios';
import React, { useEffect } from 'react';
import { useState} from 'react';
import { Link } from 'react-router-dom';
import "./restaurantcart.css";
import OrderConfirmationDialog from './OrderConfirmationDialog';


const RestaurantCart = () => {
  const [isOrderConfirmationOpen, setOrderConfirmationOpen] = useState(false);
  const [myCart,setMyCart]=useState([]);
  const [quantity,setQuantity]=useState(() => {
    const storedQuantities = JSON.parse(localStorage.getItem('quantity'));
    return storedQuantities || [];
  });
  const [totalQuantity, setTotalQuantity] = useState(() => {
    const storedTotalQuantity = JSON.parse(localStorage.getItem('totalQuantity'));
    return storedTotalQuantity || 0;
  });
  const [totalPrice, setTotalPrice] = useState(() => {
    const storedTotalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    return storedTotalPrice || 0;
  });

  useEffect(()=>{
    axios.get("http://localhost:8080/menu")
    .then((response)=>{
      const menuItems = response.data;
      const updatedmycart = menuItems.filter(item=>quantity[item.id-1]!==0);
      setMyCart(updatedmycart);
    }).catch((err)=>{
      console.log(err);
    })
  },[]);

  useEffect(() => {
    localStorage.setItem('quantity', JSON.stringify(quantity));
    localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  }, [quantity,totalQuantity,totalPrice]);

  const gstRate = 0.18;
  const gst = (totalPrice * gstRate).toFixed(2);
  const total = parseFloat(totalPrice) + parseFloat(gst);

  const removeItem = (itemId) => {
    const updatedCart = myCart.filter((item) => item.id !== itemId);
    setMyCart(updatedCart);
  };

  const handleCloseOrderConfirmation = () => {
    setOrderConfirmationOpen(false);
  };

  const handleOrder = async ()=>{
    if(myCart.length===0){
      return;
    }
     const orders = myCart.map(item=>({
        quantity:quantity[item.id-1],
        menuItem: {...item}
     }));
     const placeorderjson={orderList: orders};
     axios.post("http://localhost:8080/orders/1",placeorderjson)
     .then((response)=>{
      console.log(response);
      if(response.status===200){
          setMyCart([]);
          
          const zeroQuantity = Array(quantity.length).fill(0);
          setQuantity(zeroQuantity);
          
          setTotalPrice(0);
          setTotalQuantity(0);
      }
     }).catch((err)=>{
      console.log(err);
     });
     setOrderConfirmationOpen(true);
  }

  return (
    <div className='cart-main-bg'>
    <div className=" mycart container rounded-top mt-5" id="zero-pad">
      {myCart.length!==0? (
      <div className="row d-flex justify-content-center">
        <div className="col-lg-10 col-12 pt-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4>My Cart</h4>
            </div>
          </div>
          <div className="d-flex flex-column pt-4">
            <div>
              <h5 className="text-uppercase font-weight-normal">shopping bag</h5>
            </div>
            <div className="font-weight-normal">{myCart.length} item(s)</div>
          </div>
          <div className="d-flex flex-row px-lg-5 mx-lg-5 mobile" id="heading">
            <div className="px-lg-5 mr-lg-5" id="produc">
              PRODUCTS
            </div>
            <div className="px-lg-5 ml-lg-5" id="prc">
              PRICE
            </div>
            <div className="px-lg-5 ml-lg-1" id="quantity">
              QUANTITY
            </div>
            <div className="px-lg-5 ml-lg-3" id="total">
              TOTAL
            </div>
          </div>


          {myCart.map((item) => (
            <div
              key={item.id}
              className="cart-item d-flex flex-row justify-content-between align-items-center pt-lg-4 pt-2 pb-3 border-bottom mobile"
            >
              <div className="d-flex flex-row align-items-center">
                <div>
                  <img
                    src={item.image}
                    width="130"
                    height="130"
                    alt={item.name}
                    id="image"
                  />
                </div>
                <div className="d-flex flex-column pl-md-3 pl-1">
                  <div>
                    <h6>{item.name}</h6>
                  </div>
                  <div>
                    Category:<span className="pl-2">{item.category}</span>
                  </div>
                  <div>
                    Subcategory:<span className="pl-3">{item.subcategory}</span>
                  </div>
                </div>
              </div>
              <div className="pl-md-0 pl-1">
                <b>₹ {item.price}</b>
              </div>
              <div className="pl-md-0 pl-2">
                <span
                  className="incdec fa fa-minus-square"
                  onClick={()=>{
                    const newQuantity = [...quantity];
                    newQuantity[item.id - 1]--;
                    const newTotalPrice = totalPrice-item.price;
                    if(newQuantity[item.id-1]===0){
                      removeItem(item.id);
                    }
                    else{
                      item.ItemTotalPrice-=item.price;
                    }
        
                    setTotalQuantity(totalQuantity-1);
                    setTotalPrice(newTotalPrice);

                    setQuantity(newQuantity);
                  }}
                  style={{ cursor: 'pointer' }}
                ></span>
                <span className="px-md-3 px-1">{quantity[item.id-1]}</span>
                <span
                  className="incdec fa fa-plus-square"
                  onClick={()=>{
                    const newQuantity = [...quantity];
                    newQuantity[item.id - 1]++;
                    const newTotalPrice = totalPrice+item.price;
                    setTotalQuantity(totalQuantity+1);
                    setTotalPrice(newTotalPrice);
                    setQuantity(newQuantity);
                  }}
                  style={{ cursor: 'pointer' }}
                ></span>
              </div>
              <div className="pl-md-0 pl-1">
                <b>₹{item.price * quantity[item.id-1]}</b>
              </div>
              <div
                className="close"
                onClick={() => {
                  const newQuantity=[...quantity];
                  setTotalQuantity(totalQuantity-quantity[item.id-1]);
                  setTotalPrice(totalPrice-quantity[item.id-1] * item.price);
                  newQuantity[item.id-1]=0;
                  setQuantity(newQuantity);
                  removeItem(item.id)
                }}
                style={{ cursor: 'pointer' }}
              >
                &times;
              </div>
            </div>
          ))}



          <div className="d-flex justify-content-end pt-3">
            <div className="cal-prices d-flex flex-column">
              <div className="d-flex justify-content-between">
                <div>Subtotal: </div>
                <div>₹{totalPrice.toFixed(2)}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>GST:</div>
                <div>₹{gst}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <b>Total:</b>
                </div>
                <div>
                  <b>₹{total.toFixed(2)}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
):(<div className='empty-cart'><div className='empty-centered'><img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png" alt="Empty Cart"/><h1>Your Cart is Empty!!!</h1></div></div>)}
    </div>
    <div className="order-cont container rounded-bottom py-4" id="zero-pad">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-10 col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
            <Link to="/menu"> <button className="btn btn-sm bg-dark border border-dark">GO BACK</button></Link>
            </div>
            <div className="px-md-0 px-1" id="footer-font">
              <b className="pl-md-4">TOTAL<span className="pl-md-4">₹{total.toFixed(2)}</span></b>
            </div>
            <div>
              <button className="btn btn-sm bg-dark text-white px-lg-5 px-3" onClick={handleOrder}>ORDER NOW</button>
              <Link to="/Bill"><button className="btn btn-sm bg-dark text-white px-lg-5 px-3 ml-1">GET BILL</button></Link>

                <OrderConfirmationDialog isOpen={isOrderConfirmationOpen} onClose={handleCloseOrderConfirmation}/>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default RestaurantCart;