import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Replace with your actual API key
const API_KEY = "6e91efe018bb1ef0925bfaa8ed464c89";
const cityList = ["London", "New York", "Tokyo"];

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (cityList, { rejectWithValue }) => {
    try {
      const requests = cityList.map((city) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        )
      );

      const responses = await Promise.all(requests);
      return responses.map((response) => response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch weather data");
    }
  }
);

export const fetchCityForecast = createAsyncThunk(
  "weather/fetchCityForecast",
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      return { city, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch forecast data");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    cities: [],
    forecasts: {},
    loading: false,
    forecastLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch weather data";
      })
      .addCase(fetchCityForecast.pending, (state) => {
        state.forecastLoading = true;
      })
      .addCase(fetchCityForecast.fulfilled, (state, action) => {
        state.forecastLoading = false;
        state.forecasts[action.payload.city] = action.payload.data;
      })
      .addCase(fetchCityForecast.rejected, (state, action) => {
        state.forecastLoading = false;
        state.error = action.payload || "Failed to fetch forecast data";
      });
  },
});

export default weatherSlice.reducer;
