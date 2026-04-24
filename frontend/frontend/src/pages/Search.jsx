import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Data from '../Components/products';
import Product from './product';

const Search = () => {

  const { term } = useParams();
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const data = Data.filter((p) =>
      p.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilterData(data);
  }, [term]);

  return <Product Data={filterData} />;
};

export default Search;
