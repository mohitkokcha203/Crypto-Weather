import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MapPin, Droplets, Wind } from "lucide-react";

const WeatherSection = () => {
  const { cities, loading, error } = useSelector((state) => state.weather);

  if (loading) {
    return (
      <div className="card">
        <h2 className="section-title">Weather</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="section-title">Weather</h2>
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          Error loading weather data: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="section-title">Weather</h2>
      <div className="space-y-4">
        {cities.length > 0 ? (
          cities.map((city) => (
            <Link
              to={`/city/${city.name}`}
              key={city.id}
              className="block p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-gray-500 dark:text-gray-400" size={18} />
                  <h3 className="font-medium text-lg">{city.name}</h3>
                </div>
                <div className="text-2xl font-bold">{Math.round(city.main.temp)}°C</div>
              </div>

              <div className="mt-2 flex items-center space-x-2">
                <img
                  src={`https://openweathermap.org/img/wn/${city.weather[0].icon}.png`}
                  alt={city.weather[0].description}
                  className="w-10 h-10"
                />
                <span className="capitalize">{city.weather[0].description}</span>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Droplets size={16} />
                  <span>Humidity: {city.main.humidity}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Wind size={16} />
                  <span>Wind: {city.wind.speed} m/s</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">No weather data available</div>
        )}
      </div>
    </div>
  );
};

export default WeatherSection;
