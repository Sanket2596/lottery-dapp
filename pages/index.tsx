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
  //console.log(address);
  const {contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);

  if(isLoading) return (
    <div>
      <div>
        <img></img>
        <h1>LOADING THE DIGITAL DRAW</h1>
      </div>
    </div>
  );

  if(!address) return (
      <Login/>
  )

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
