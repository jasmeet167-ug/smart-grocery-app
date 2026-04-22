import React from 'react'
import { Link } from 'react-router-dom'

 function Herosection() {
  return (
    <div className='bg-orange-200 flex flex-col md:flex-row min-h-[380px] px-4 md:px-12 py-8 gap-6 w-full'>
     {/* text */}
      <div className='md:w-1/2 w-full px-6 md:px-16 py-12 flex flex-col gap-5 justify-center text-center md:text-left'>
       <h1 className=' text-2xl md:text-5xl font-extrabold leading-tight'>Big Savings on <span className='text-orange-600'>Fresh Groceries</span></h1>
       <p className='max-w-md mx-auto md:mx-0 leading-relaxed text-gray-700'>Best quality fruits, vegetables and daily needs at great prices
        Fast delivery and trusted freshness, every single day.</p>

       <Link to="/about"><button className=' border-2 border-orange-600  bg-orange-300 text-black px-6 py-3 w-fit text-sm rounded-xl hover:bg-orange-100 transition '>Explor more</button></Link>
      </div>

      {/* image */}
      <div className=' w-full md:w-1/2  aspect-[4/3] md:aspect-[16/9]'>
       <img src='vegitables.png'alt='' className=' object-cover h-full w-full rounded-2xl'/>
      </div>
    </div>
  )
}

export default Herosection