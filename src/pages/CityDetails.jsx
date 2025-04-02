"use client"

import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchCityForecast } from "../store/slices/weatherSlice"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorAlert from "../components/ErrorAlert"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const CityDetails = () => {
  const { cityId } = useParams()
  const dispatch = useDispatch()
  const { forecasts, forecastLoading, error } = useSelector((state) => state.weather)
  const cityForecast = forecasts[cityId]

  useEffect(() => {
    if (!cityForecast) {
      dispatch(fetchCityForecast(cityId))
    }
  }, [dispatch, cityId, cityForecast])

  if (forecastLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorAlert message={`Error loading forecast data: ${error}`} />
  }

  if (!cityForecast) {
    return <div>No forecast data available</div>
  }

  // Process forecast data for chart
  const forecastList = cityForecast.list || []
  const chartData = {
    labels: forecastList.slice(0, 8).map((item) => {
      const date = new Date(item.dt * 1000)
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }),
    datasets: [
      {
        label: "Temperature (°C)",
        data: forecastList.slice(0, 8).map((item) => item.main.temp),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Feels Like (°C)",
        data: forecastList.slice(0, 8).map((item) => item.main.feels_like),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `24-Hour Forecast for ${cityId}`,
      },
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{cityId} Weather Details</h1>
        <Link to="/" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </div>

      <div className="card">
        <h2 className="section-title">Current Weather</h2>
        {cityForecast.list && cityForecast.list[0] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-4xl font-bold">{cityForecast.list[0].main.temp.toFixed(1)}°C</p>
              <p className="text-lg capitalize">{cityForecast.list[0].weather[0].description}</p>
              <p>Feels like: {cityForecast.list[0].main.feels_like.toFixed(1)}°C</p>
            </div>
            <div>
              <p>Humidity: {cityForecast.list[0].main.humidity}%</p>
              <p>Wind: {cityForecast.list[0].wind.speed} m/s</p>
              <p>Pressure: {cityForecast.list[0].main.pressure} hPa</p>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="section-title">Temperature Forecast (24 Hours)</h2>
        <div className="h-80">
          <Line options={chartOptions} data={chartData} />
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">5-Day Forecast</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Temp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Weather
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Humidity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Wind
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {forecastList
                .filter((_, index) => index % 8 === 0) // Get one forecast per day
                .map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(item.dt * 1000).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.main.temp.toFixed(1)}°C</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{item.weather[0].description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.main.humidity}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.wind.speed} m/s</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CityDetails

