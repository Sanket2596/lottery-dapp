import { useMetamask } from '@thirdweb-dev/react'
import React from 'react'

function Login() {
  
  const connectWithMetaMask = useMetamask();

  return (
    <div className='bg-[#0a260b] min-h-screen flex flex-col items-center justify-center text-center'>
      <div className='flex flex-col items-center mb-10'>
        <img className="rounded-full h-56 wo-56 mb-10" src='https://insidebitcoins.com/wp-content/uploads/2019/09/bitcoin-loterryyy.png' alt='Image Not found!'/>
      </div>
      <h1 className='text-white text-6xl font-bold'>DIGITAL DRAW</h1>
      <h2 className='text-white mt-10'>Get Started by logging in with your MetaMask account!</h2>

      <button onClick={ connectWithMetaMask } className='bg-gradient-to-r from-red-500 via-purple-600 to-violet-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 px-8 py05 mt-10 rounded-lg shadow-lg font-bold bg-slate-50'>Login with MetaMask!</button>

    </div>
  )
}

export default Login