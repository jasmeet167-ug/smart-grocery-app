import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Data from '../Components/products'
import Product from './product.jsx'

const ProductsByCategory = ({ cart, setCart }) => {   
  const { cat } = useParams()
  const [filterData, setFilterData] = useState([])

  useEffect(() => {
    const filtered = Data.filter(
      (p) => p.category === cat
      
    )
    setFilterData(filtered)
  }, [cat])

  return (
    <Product 
      Data={filterData} 
      showBar={true} 
      setData={setFilterData}
      cart={cart}         
      setCart={setCart}  
    />
  )
}

export default ProductsByCategory