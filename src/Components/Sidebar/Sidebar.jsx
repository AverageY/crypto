import React, { useState } from 'react';
import Cryptocurrency from '../Cryptocurrency/Cryptocurrency';
import Watchlist from '../WatchList/Watchlist';
import Sendcrypto from '../Sendcrypto/Sendcrypto';
import Cryptodetails from '../Details/Cryptodetails';
import CryptoNews from '../News/News';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('Tab1');
  const [watchlist, setWatchlist] = useState([]);


  const addToWatchlist = (crypto) => {
    setWatchlist((prevWatchlist) => {
      // Check if the crypto is already in the watchlist
      if (prevWatchlist.some((item) => item.id === crypto.id)) {
        alert(`${crypto.name} is already in your watchlist!`);
        return prevWatchlist;
      }
      return [...prevWatchlist, crypto];
    });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-black text-white flex flex-col p-4">
        {/* Logo */}
        <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-white mb-4">
         Crypto
        </h1>
        </div>
        {/* Tabs */}
        <ul className="flex flex-col space-y-4">
          <li>
            <button
              className={`w-full text-left p-2 rounded ${
                activeTab === 'Tab1' ? 'bg-gray-800' : ''
              }`}
              onClick={() => handleTabClick('Tab1')}
            >
              Crypto Currency
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded ${
                activeTab === 'Tab2' ? 'bg-gray-800' : ''
              }`}
              onClick={() => handleTabClick('Tab2')}
            >
              Watch List
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded ${
                activeTab === 'Tab3' ? 'bg-gray-800' : ''
              }`}
              onClick={() => handleTabClick('Tab3')}
            >
              Send Crypto
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded ${
                activeTab === 'Tab4' ? 'bg-gray-800' : ''
              }`}
              onClick={() => handleTabClick('Tab4')}
            >
              News
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded ${
                activeTab === 'Tab5' ? 'bg-gray-800' : ''
              }`}
              onClick={() => handleTabClick('Tab5')}
            >
              Details
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        {activeTab === 'Tab1' && <div><Cryptocurrency addToWatchlist={addToWatchlist} watchlist={watchlist}/></div>}
        {activeTab === 'Tab2' && <div><Watchlist watchlist={watchlist}/></div>}
        {activeTab === 'Tab3' && <div> <Sendcrypto/></div>}
        {activeTab === 'Tab4' && <div> <CryptoNews/></div>}
        {activeTab === 'Tab5' && <div> <Cryptodetails/></div>}
      </div>
    </div>
  );
};

export default Sidebar;
