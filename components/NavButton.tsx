import React from 'react'
import { useAddress, useMetamask, useDisconnect } from '@thirdweb-dev/react';


interface Props {
    title: String;
    isActive?: Boolean;
    onClick?: () => void; 
}

function NavButton({ title, isActive, onClick }: Props) {
//   const address = useAddress();
//   const connectWithMetaMask = useMetamask();
//   const disconenctWallet = useDisconnect();
  
  return <button 
  onClick={onClick} 
  className={`${isActive && "bg-[#036756]"} text-white py-2 px-4 rounded hover:bg-[#036756] font-bold`}>
        {title}
  </button>
}

export default NavButton