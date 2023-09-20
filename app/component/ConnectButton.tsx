import React, { useEffect } from 'react';
import { connectWallet, checkConnection } from '../bet/web3/web3Client';
import { cropWallet } from '../utils/utils';
import { useTContext } from '../context/Context';

const ConnectButton = () => {
  const { wallet, setWallet, connect, setConnect } = useTContext();

  const handleSelectWallet = async () => {
    await connectWallet().then(res => {
      setWallet(res.address);
      setConnect(true);
    });
  };

  useEffect(() => {
    (async () => {
      await checkConnection(setWallet);
      if (wallet !== '') {
        setConnect(true);
      }
    })();
  }, [wallet, setWallet, setConnect]);

  return (
    <>
      {connect ? (
        <p className="px-2 py-1 font-semibold text-cc3 bg-cc3/50 rounded-md">
          Wallet : {wallet !== '' && cropWallet(wallet)}
        </p>
      ) : (
        <button
          onClick={handleSelectWallet}
          className=" px-2 py-1 font-semibold text-cc3 bg-cc3/50 rounded-md h-2/3"
        >
          Connect wallet
        </button>
      )}
    </>
  );
};

export default ConnectButton;