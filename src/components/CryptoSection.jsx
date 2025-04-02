import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CryptoSection = () => {
  const { cryptos, loading, error } = useSelector((state) => state.crypto);

  if (loading) {
    return (
      <div className="card">
        <h2 className="section-title">Cryptocurrency</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 dark:bg-gray-700 rounded-md"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="section-title">Cryptocurrency</h2>
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          Error loading crypto data: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="section-title">Cryptocurrency</h2>
      <div className="space-y-4">
        {cryptos.length > 0 ? (
          cryptos.map((crypto) => (
            <div
             
              key={crypto.id}
              className="block p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div>
                    <h3 className="font-medium">{crypto.name || crypto.symbol}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {crypto.symbol.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    ${crypto.current_price?.toLocaleString() || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No cryptocurrency data available
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoSection;
