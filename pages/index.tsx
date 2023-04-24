import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Login from '../components/Login';
import { 
  useContract,
  useContractRead,
  useMetamask,
  useDisconnect,
  useAddress,
  useContractWrite,
} from '@thirdweb-dev/react';

import Loading from '../components/Loading';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { currency } from '../constants';
import CountdownTimer from '../components/CountdownTimer';
import toast from "react-hot-toast";
import Marquee from "react-fast-marquee";
import AdminControls from '../components/AdminControls';

const Home: NextPage = () => {
  const address = useAddress();
  const [userTickets, setUserTickets] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  //console.log(address);
  const {contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
  const { data: expiration } = useContractRead(
    contract,
    "expiration"
  );
  const { data: remainingTickets } = useContractRead(
    contract,
    "RemainingTickets"
  );

  const { data: CurrentWinningReward } = useContractRead(
    contract,
    "CurrentWinningReward"
  );

  const { data: ticketPrice } = useContractRead(
    contract,
    "ticketPrice"
  );

  const { data: ticketCommission } = useContractRead(
    contract,
    "ticketComission"
  );
  const { data: tickets } = useContractRead(contract, "getTickets");

  const { mutateAsync: BuyTickets } = useContractWrite(contract, "BuyTickets");

  const { data: winnings } = useContractRead(contract, "getWinningsForAddress", address);

  const { mutateAsync: WithdrawWinnings } = useContractWrite(contract, "WithdrawWinnings");

  const { data: lastWinner } = useContractRead(contract, "lastWinner");
  const { data: lastWinnerAmount } = useContractRead(contract, "lastWinnerAmount");
  const { data: isLotteryOperator } = useContractRead(contract, "lotteryOperator")

  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = tickets;
    const noOfUserTickets = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
      0
    );
    setUserTickets(noOfUserTickets);
  },[tickets,address]);
  console.log(userTickets);

  const handleClick =async () => {
    if (!ticketPrice) return;

    const notification = toast.loading("Buying your tickets...");
    try{
      const data = await BuyTickets([
        {
        value: ethers.utils.parseEther(
          (
            Number(ethers.utils.formatEther(ticketPrice))*quantity).toString()
        ),
      },
    ]);

      toast.success("Tickets purchased successfully!",{
        id: notification,
      });
      console.info("contract call success",data);
    }catch(err){
      toast.error("Whoops something went wrong!",{
        id: notification,
      });

      console.error("contract call failure",err);
    }
  };
  const onWithdrawWinnings = async () => {
    const notification = toast.loading("Withdraw winnings...");
    try{
      const data = await WithdrawWinnings([{}]);
      toast.success("Winnings withdrawn successfully!", {
        id: notification,
      });
    } catch (err) {
      toast.error("Whoops something went wrong!",{
        id: notification,
      });

      console.error("contract call failure", err);
    }
  };
  if(!address) return (
      <Login/>
  );

  if(isLoading) return <Loading/>

  return (
    <div className='bg-[#092216] flex flex-col min-h-screen'>
      <Head>
        <title>CRYPTO DIGITAL DRAW</title>
      </Head>
      {/* <div className='flex-1'></div> */}
      <Header/>
      <Marquee className="bg-[#0A1F1C] p-5 mb-5" gradient={false}
      speed={100}>
        <div className="flex space-x-2 mx-10">
          <h4 className="text-white font-bold">Last Winner: {lastWinner?.toString()}</h4>
          <h4 className="text-white font-bold">Previous Winnings: {" "}
          {lastWinnerAmount && 
          ethers.utils.formatEther(lastWinnerAmount?.toString())}{" "}
          {currency}{" "}</h4>
        </div>

      </Marquee>

      {isLotteryOperator === address && (
        <div className="flex justify-center">
          <AdminControls />
        </div>
      )}

      {winnings > 0 && (
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5">
          <button onClick={onWithdrawWinnings} className="p-5 bg-gradient-to-b from-orange-500 to-emerald-600 animate-pulse text-center
          rounded-xl w-full">
            <p className="font-bold">Winner Winner Chicken Dinner!</p>
            <p>
              Total Winnings: {ethers.utils.formatEther(winnings.toString())}{" "}
              {currency}
            </p>
            <br />
            <p className="font-semibold">Click here to withdraw</p>            
          </button>
        </div>
      )}
      
      <div className='space-y-5 md:space-y-0 m-5 md:flex md:flex-row justify-center md:space-x-5 max-w-5xl items-start'>
        <div className='stats-container'>
          <h1 className='text-white text-5xl font-semibold text-center'>
            The Next Draw
          </h1>
        
        
        <div className='flex justify-between p-2 space-x-2'>
          <div className='stats'>
            <h2 className='text-white text-sm'>Total Pool</h2>
            <p className='text-xl text-white'>
              {CurrentWinningReward && ethers.utils.formatEther(CurrentWinningReward.toString())}
              {" "} 
              {currency}
            </p>
          </div>
          <div className="stats">
            <h2 className='text-sm'>Tickets Remaining</h2>
            <p className='text-xl'>{remainingTickets?.toNumber()}</p>
          </div>
        </div>
        
        {/* Countdown Timer */}
        <div className='mt-5 mb-3'>
            <CountdownTimer />
        </div>
      </div>
     
      <div className="stats-container space-y-2">
        <div className="stats-container">
          <div className='flex justify-between items-center text-white pb-2'>
            <h2>Price per Ticket</h2>
            <p>
              { ticketPrice && ethers.utils.formatEther(ticketPrice.toString()) }
              {" "}
              { currency }
            </p>
          </div>
          
          <div className='flex text-white items-center space-x-2 bg-[#091B18] border-[#004337] border p-4'>
            <p>TICKETS</p>
            <input 
            type="number" 
            className='flex bg-transparent text-right w-full outline-none'
            min={1}
            max={10}
            value={quantity}
            onChange={e => setQuantity(Number
            (e.target.value))}/>
          </div>

          <div className='space-y-2 mt-5'>
            <div className='flex items-center justify-between text-emerald-300 text-sm italic font-extrabold'>
              <p>Total cost of Tickets</p>
              <p>
                { ticketPrice && 
                Number(ethers.utils.formatEther(ticketPrice?.toString())) 
                * quantity}
                {" "}
                {currency}
              </p>
            </div>

            <div className='flex items-center justify-between text-emerald-300 text-sm italic'>
              <p>Service fees</p>
              <p>{ticketCommission && ethers.utils.formatEther(ticketCommission?.toString())}
              {" "} 
              {currency}</p>
            </div>

            <div className='flex items-center justify-between text-emerald-300 text-xs italic'>
              <p>+ Network Fees</p>
              <p>TBC</p>
            </div>
          </div>

          <button 
          disabled ={expiration?.toString() < Date.now().toString() || remainingTickets?.toNumber() === 0}
          onClick={handleClick}
          className='mt-5 w-full bg-gradient-to-br 
          from-red-500 to-violet-600 
          rounded-md 
          px-10 py-5 
          font-semibold
          shadow-xl 
          disabled:from-slate-600 disabled:to-slate-200 
          disabled:text-slate-100 disabled:cursor-not-allowed'>
            Buy {quantity} tickets for{" "}
            {ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString()))*quantity}{" "}
            {currency}
          </button>
        </div>

        {userTickets > 0 && (
        <div className="stats">
          <p className="text-lg mb-2">You have {userTickets} Tickets in this draw</p>
          <div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2">
            {Array(userTickets).fill("").map((_, index) => (
              <p key={index} className="text-emerald-300 h-20 w-12 bg-emerald-500/30 rounded-lg flex flex-shrink-0 items-center
              justify-center text-xs italic">
                {index + 1}
              </p>
            ))}
          </div>
      </div>
  )}
  </div>
    </div>
    <div>

    </div>
  </div>
  );
};

export default Home;
