import React, { useState} from 'react';

const Sample = (props) => {
  const [query, setQuery] = useState('');
  let timer;

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    clearTimeout(timer);
    timer = setTimeout(() => {

    if(query.trim===''){
      props.sendDataToParent=props.menu;
    }
    else{

    const filteredResults = props.menu.filter(item =>
      (item.name.toLowerCase().includes(newQuery.toLowerCase()) && (props.category==='All' || item.category===props.category))
    );
    props.sendDataToParent(filteredResults);
    }
  },300);
  };

  return (
    <div className='container'>
    <div className='search-menu'>
      <input type='text' className='search-bar' placeholder='Search by name...' value={query}
        onChange={handleChange}></input>
      <div className='search-icon'><i className="bi bi-search"></i></div>
    </div>
    </div>
  )
}

export default Sample;