import React from 'react'
import NavButton from './NavButton'
import {Bars3BottomRightIcon} from '@heroicons/react/24/solid';
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import { disconnect } from 'process';

function Header() {

  const address = useAddress();
  const connectWithMetaMask = useMetamask();
  const disconenctWallet = useDisconnect();
  
  return (
    <div className='grid grid-cols-2 md:grid-cols-5 justify-between items-center'>
        <div className='flex space-x-5 items-center'>
            <img className="rounded-full h-10 w-10 space-x-10" src="https://insidebitcoins.com/wp-content/uploads/2019/09/bitcoin-loterryyy.png" alt="Image Not Found!" />
        <div >
            <h1 className='text-lg text-white font-bolds'>CRYPTOCREW DIGITAL DRAW</h1>
            <p className='text-xs text-emerald-400 truncate'>
                User:{address?.substring(0, 5)}...
                {address?.substring(address.length, address.length - 5)}
                {/* User Address:{address} */}
            </p>
        </div>
    </div>
        
        <div className='md:col-span-3 hidden md:flex items-center justify-center rounded-md'>
            <div className='bg-[#0A1F1C] p-4 space-x-2'>
                { /* Buttons */}
                <NavButton  isActive title= 'Buy Ticket'/>
                <NavButton  onClick={disconenctWallet} title= 'Logout'/>
            </div>
        </div>
            
        <div className='flex flex-col ml-auto text-right'>
            <Bars3BottomRightIcon className='h-8 cursor-pointer w-8 mx-auto text-white'/>
        <span className='md:hidden'>
            <NavButton  onClick={disconenctWallet} title='Logout'/> 
        </span>
        </div>
    </div>
    
  )
}

export default Header