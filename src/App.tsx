import { useEffect, useState } from "react";
import { getCoins, type Coin } from "./services/api";
import "./index.css";

function App() {
  const [coins, setCoins] = useState<Coin[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCoins();
      setCoins(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>CryptoDash 🪙</h1>
      <p> Top 100 Crypto currency prices</p>

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
            {coins.map((coin) => (
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
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
