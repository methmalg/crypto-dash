import { useEffect, useState, useCallback } from "react";
import { getCoins, type Coin } from "./services/api";
import "./index.css";

function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const loadData = useCallback(async () => {
    setLoading(true);
    const data = await getCoins();
    setCoins(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchCoins = async () => {
      setLoading(true);
      const data = await getCoins();
      if (isMounted) {
        setCoins(data);
        setLoading(false);
      }
    };

    fetchCoins();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <h1>CryptoDash 🪙</h1>
        <p> Top 100 Crypto currency prices</p>

        <button onClick={loadData} className="refresh-btn">
          Refresh Data
        </button>
      </div>

      <input
        type="text"
        placeholder="Seach for a coin..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading market data...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin) => (
                <tr key={coin.id}>
                  <td>
                    <div className="coin-info">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="coin-icon"
                      />
                      <span>{coin.name}</span>
                      <span className="symbol">{coin.symbol}</span>
                    </div>
                  </td>
                  <td>${coin.current_price.toLocaleString()}</td>
                  <td
                    className={
                      coin.price_change_percentage_24h > 0 ? "green" : "red"
                    }
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td>${coin.market_cap.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  No coins found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
