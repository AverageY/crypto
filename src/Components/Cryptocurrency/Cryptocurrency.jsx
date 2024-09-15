import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoaderComp from '../Loader/LoaderComp';
import ErrorComponent from '../Error/ErrorComp';



const CryptoCurrencyList = ({ addToWatchlist, watchlist }) => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 50,
            page: 1,
          }
        });
        setCryptos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data", error);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to check if a crypto is already in the watchlist
  const isAddedToWatchlist = (crypto) => {
    return watchlist.some((item) => item.id === crypto.id);
  };

  if (loading) return <div><LoaderComp/></div>;
  if (error) return <div><ErrorComponent/></div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Top Cryptocurrencies</h1>

      <div className="max-h-[700px] overflow-y-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Rank</th>
              <th className="py-2">Name</th>
              <th className="py-2">Symbol</th>
              <th className="py-2">Price</th>
              <th className="py-2">Market Cap</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto) => (
              <tr key={crypto.id} className="border-b">
                <td className="py-2 px-4">{crypto.market_cap_rank}</td>
                <td className="py-2 px-4">
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="inline-block w-6 h-6 mr-2"
                  />
                  {crypto.name}
                </td>
                <td className="py-2 px-4">{crypto.symbol.toUpperCase()}</td>
                <td className="py-2 px-4">${crypto.current_price.toLocaleString()}</td>
                <td className="py-2 px-4">${crypto.market_cap.toLocaleString()}</td>
                <td className="py-2 px-4">
                  {isAddedToWatchlist(crypto) ? (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      disabled
                    >
                      Added
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded"
                      onClick={() => addToWatchlist(crypto)}
                    >
                      Add to Watchlist
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoCurrencyList;
