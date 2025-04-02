"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchWeatherData } from "../store/slices/weatherSlice"
import { fetchCryptoData } from "../store/slices/cryptoSlice"
import { fetchCryptoNews } from "../store/slices/newsSlice"
import WeatherSection from "../components/WeatherSection"
import CryptoSection from "../components/CryptoSection"
import NewsSection from "../components/NewsSection"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorAlert from "../components/ErrorAlert"

const Dashboard = () => {
  const dispatch = useDispatch()
  const { favoriteCities, favoriteCryptos } = useSelector((state) => state.preferences)
  const { loading: weatherLoading, error: weatherError } = useSelector((state) => state.weather)
  const { loading: cryptoLoading, error: cryptoError } = useSelector((state) => state.crypto)
  const { loading: newsLoading, error: newsError } = useSelector((state) => state.news)

  useEffect(() => {
    dispatch(fetchWeatherData(favoriteCities))
    dispatch(fetchCryptoData())
    dispatch(fetchCryptoNews())
  }, [dispatch, favoriteCities])

  const isLoading = weatherLoading || cryptoLoading || newsLoading
  const hasError = weatherError || cryptoError || newsError

  if (isLoading) {
    return <LoadingSpinner />
  }

  

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <WeatherSection />
        </div>
        <div className="lg:col-span-1">
          <CryptoSection />
        </div>
        <div className="lg:col-span-1">
          <NewsSection />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

