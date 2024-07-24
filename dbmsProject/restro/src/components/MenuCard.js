import React, { useEffect, useState } from 'react';
import './sample.css';
import axios from 'axios';
import Addtocart from './Addtocart';
import Sample from './Sample';
import NoResults from './NoResults';

const MenuCard = () => {
    const [menuItems,setMenuItems]=useState([]);
    const [categories,setCategories]=useState([]);
    const [selectedCategory,setSelectedCategory]=useState("All");
    const [filteredMenu,setFilteredMenu]=useState([]);
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
            setMenuItems(response.data);
            setFilteredMenu(response.data);
            const distinctcategories= Array.from(new Set(response.data.map(item => item.category)));
            const categoriesWithAll = ['All', ...distinctcategories];
            setCategories(categoriesWithAll);
            if(quantity.length===0){
                const initialquantity = Array(response.data.length).fill(0);
                setQuantity(initialquantity);
            }
        }).catch((err)=>{
            console.log(err);
        });
    },[]);

    useEffect(() => {
        if (selectedCategory === 'All') {
          setFilteredMenu(menuItems); // If no category is selected, show all menu items
        } else {
          const filteredItems = menuItems.filter(item => item.category === selectedCategory);
          setFilteredMenu(filteredItems);
        }
      }, [selectedCategory]);

    const receiveDataFromChild = (data) => {
        setFilteredMenu(data);
      };


      useEffect(() => {
        localStorage.setItem('quantity', JSON.stringify(quantity));
        localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
      }, [quantity,totalQuantity,totalPrice]);

  return (
    <div className='Menu-page'>
        <Sample sendDataToParent={receiveDataFromChild} menu={menuItems} category={selectedCategory}></Sample> 
        <div className='menu-bg'>
            <div className="category-filter">
            {categories.map((category, index) => (
                <button
                key={index}
                className={`btn btn-primary category-button ${selectedCategory === category ? 'active' : ''}`} 
                onClick={() => setSelectedCategory(category)}>
                {category}
                </button>
            ))}
            </div>
            <div className="container-fluid mt-4">
              {filteredMenu.length===0 && <NoResults></NoResults>}
          <div className="row">
          {filteredMenu.map((item) => (
              <div key={item.id} className="col-lg-3 col-md-6 col-sm-8 col-12 mb-4">
                <div className="card" style={{ background: 'rgba(0,0,0,0.8)' }}>
                  <div className='img-container'>
                    <img src={item.image}  alt={item.image} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <div className='pricerate'>
                      <p className="price">₹ {item.price}</p>
                      <div className="star-rating">
                          <span>{item.rating}&#9733;</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                  {quantity[item.id-1]>0 ? (
                    <div className='plusminus-btn'>
                      <div className="minus-btn" onClick={()=>{
                            const newQuantity = [...quantity];
                            if(newQuantity[item.id-1]>0){
                                newQuantity[item.id - 1]--;
                                const newTotalPrice = totalPrice-item.price;
                                setTotalQuantity(totalQuantity-1);
                                setTotalPrice(newTotalPrice);
                            }
                            setQuantity(newQuantity);
                      }}>
                        <i className="bi bi-dash-square"></i>
                      </div>
                      <div className='qty-val'>{quantity[item.id-1]}</div>
                      <div className="plus-btn" onClick={()=>{
                        const newQuantity = [...quantity];
                        newQuantity[item.id - 1]++;
                        const newTotalPrice = totalPrice+item.price;
                        setTotalQuantity(totalQuantity+1);
                        setTotalPrice(newTotalPrice);
                        setQuantity(newQuantity);
                      }}>
                        <i className="bi bi-plus-square"></i>
                      </div>
                    </div>
                  ) : (
                    <button className="add-to-cart-button btn-block" onClick={()=>{
                        const newQuantity = [...quantity];
                        newQuantity[item.id - 1]++;
                        const newTotalPrice = totalPrice+item.price;
                        setTotalQuantity(totalQuantity+1);
                        setTotalPrice(newTotalPrice);
                        setQuantity(newQuantity);
                    }}>
                      Add to Cart &#128722;
                    </button>
                  )}
                  </div>
                </div> 
              </div>))}
        </div> 
        </div>   
        </div>
        {totalQuantity>0 &&
      <Addtocart quantity={totalQuantity} price={totalPrice}></Addtocart>}
    </div>
  )
}

export default MenuCard;