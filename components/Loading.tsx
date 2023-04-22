import CircleLoader from 'react-spinners/CircleLoader';
import React from 'react';
import { useEffect } from 'react';

function Loading() {
    
    return (
        <div className='bg-[#091B18] h-screen flex flex-col items-center justify-center'>
          
          <div className='flex space-x-2 mb-10 items-center'>
            
            <img className='rounded-full h-20 w-20' src='https://insidebitcoins.com/wp-content/uploads/2019/09/bitcoin-loterryyy.png' alt=''></img>
            
            <h1 className='text-lg text-white font-bold'>LOADING THE DIGITAL DRAW</h1>
          
          </div>
          <CircleLoader color="#36d7b7" size={60}/>
        </div>
      );
}

export default Loading;