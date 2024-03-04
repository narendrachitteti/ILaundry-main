import React from 'react';
import './Process.css';
import Laundry_basket_01 from "../assets/images/Laundry_basket_01-min.gif";
import Laundry_basket_02 from "../assets/images/Laundry_basket_02-min.gif";
import Laundry_basket_03 from "../assets/images/Laundry_basket_03-min.gif";
import Laundry_basket_04 from "../assets/images/Laundry_basket_04-min.gif";
import Laundry_basket_05 from "../assets/images/Laundry_basket_05-min.gif";
import Laundry_basket_06 from "../assets/images/Laundry_basket_06-min.gif";

function Process() {
  return (
    <div className='Process-body'>
        <h1 className='Process-h1'>How we work?</h1>
        <p className='head-p'>Just drop-off your clothes at any of our stores or request for
a pick up online. We will do the rest!</p>
    <div className='Process'>
      <img src={Laundry_basket_01} width="200px" height="200px"/>
      <div>
        <img src={Laundry_basket_02} width="200px" height="200px"/>
      </div>
      <div>
        <img src={Laundry_basket_03} width="200px" height="200px"/>
      </div>
      <div>
        <img src={Laundry_basket_04} width="200px" height="200px"/>
      </div>
      <div>
        <img src={Laundry_basket_05} width="200px" height="200px"/>
      </div>
      <div>
        <img src={Laundry_basket_06} width="200px" height="200px"/>
      </div>
      </div>

      <div className='process_types'>
        <p className='pickup'>Pick-up</p>
        <p className='Process-p'>Process</p>
        <p className='delivery'>Delivery</p>
      </div>
    </div>
    
  );
}

export default Process;
