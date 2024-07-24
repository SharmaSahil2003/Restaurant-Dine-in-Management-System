import React from 'react';
import './noresults.css';

const NoResults = () => {
  return (
    <div class="img-cont">
        <div class="centered-image">
            <img src="images/no_result.png" alt=""/>
            <h1>Oops! No Results Found.</h1>
        </div>
    </div>
  )
}

export default NoResults;