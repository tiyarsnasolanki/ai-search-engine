import React, { useState } from 'react';
import Blog from './Blog';
 import Navbar from '../components/Navbar';
//import Navbar2 from '../components/Navbar2';
const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className='w-full'>
      <Navbar onSearch={handleSearch} />
      <Blog searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
