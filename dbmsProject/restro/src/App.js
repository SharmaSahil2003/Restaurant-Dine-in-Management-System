import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Auth from './components/Auth';
import Card from './components/Card';

import RestaurantCart from './components/RestaurantCart';
import Bill from './components/Test';

const App = () => {

  return (
    <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      <Route exact path='/' element={<Home></Home>}></Route>
      <Route exact path='/Menu' element={<Card></Card>}></Route>
      <Route exact path='/About' element={<About></About>}></Route>
      <Route exact path='/Contact' element={<Contact></Contact>}></Route>
      <Route exact path='/Booking' element={<Booking></Booking>}></Route>
      <Route exact path='/Login' element={<Auth></Auth>}></Route>
      <Route exact path='/Cart' element={<RestaurantCart></RestaurantCart>}></Route>
      <Route exact path='/Bill' element={<Bill/>}></Route>
    </Routes>


    <Footer></Footer>
    </BrowserRouter>
  );
};

export default App;
