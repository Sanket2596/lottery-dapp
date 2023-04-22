import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Login from '../components/Login';
import { 
  useContract,
  useMetamask,
  useDisconnect,
  useAddress,
} from '@thirdweb-dev/react';

const Home: NextPage = () => {
  const address = useAddress();
  console.log(address);

  // if(!address) return (<Login/>)

  return (
    <div className='bg-[#092216] flex flex-col min-h-screen'>
      <Head>
        <title>CRYPTO LOTTERY DRAW</title>
      </Head>
      <Header/>
    </div>
  )
}

export default Home
