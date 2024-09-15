import React, { useEffect, useState } from 'react';
import { BrowserProvider, formatUnits } from 'ethers'; // Import necessary parts of ethers.js

const Watchlist = ({ watchlist, account }) => {
  const [balances, setBalances] = useState({}); // Store balances for each crypto

  useEffect(() => {
    if (account && watchlist.length > 0) {
      fetchBalances();
    }
  }, [account, watchlist]);

  // Function to fetch ETH balance
  const fetchBalances = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum); // Provider for interacting with MetaMask
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log('Fetching balances for account:', userAddress);
      const newBalances = {};

      // Fetch ETH balance
      const ethBalance = await provider.getBalance(userAddress);
      newBalances['ETH'] = ethBalance;
      console.log(`ETH Balance: ${formatUnits(ethBalance, 18)} ETH`);

      setBalances(newBalances); // Update state with fetched balances
    } catch (error) {
      console.error('Error fetching balances:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Watchlist & Balances</h2>
      {watchlist.length === 0 ? (
        <p>No cryptocurrencies in your watchlist.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Symbol</th>
              <th className="py-2">Balance</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((crypto) => (
              <tr key={crypto.id} className="border-b">
                <td className="py-2 px-4">{crypto.name}</td>
                <td className="py-2 px-4">{crypto.symbol.toUpperCase()}</td>
                <td className="py-2 px-4">
                  {balances[crypto.symbol]
                    ? `${parseFloat(formatUnits(balances[crypto.symbol], 18)).toFixed(4)} ${crypto.symbol}`
                    : 'Loading...'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Watchlist;
