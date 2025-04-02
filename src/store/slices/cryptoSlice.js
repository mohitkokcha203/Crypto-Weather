import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const COINLAYER_API_URL = "http://api.coinlayer.com/api/live";
const COINLAYER_DETAIL_API = "http://api.coinlayer.com/api/coin"; // Example API endpoint
const API_KEY = "bf8aab926885b471e219f35cb629d824"; 

// AsyncThunk to fetch cryptocurrency data for dashboard
export const fetchCryptoData = createAsyncThunk(
  "crypto/fetchCryptoData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(COINLAYER_API_URL, {
        params: {
          access_key: API_KEY,
          symbols: "BTC,ETH,DOGE",
        },
      });

      if (response.data.success) {
        const formattedData = Object.keys(response.data.rates).map((symbol) => ({
          id: symbol,
          name: symbol, // Use the symbol as the name (change if API provides a proper name)
          symbol,
          current_price: response.data.rates[symbol],
        }));
        return formattedData;
      } else {
        throw new Error(response.data.error.info || "API returned an unsuccessful response");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.info || "Failed to fetch cryptocurrency data"
      );
    }
  }
);

// AsyncThunk to fetch cryptocurrency details
export const fetchCryptoDetails = createAsyncThunk(
  "crypto/fetchCryptoDetails",
  async (cryptoId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${COINLAYER_DETAIL_API}/${cryptoId}`, {
        params: {
          access_key: API_KEY,
        },
      });

      if (response.data.success) {
        return { cryptoId, data: response.data };
      } else {
        throw new Error(response.data.error.info || "API returned an unsuccessful response");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.info || "Failed to fetch cryptocurrency details"
      );
    }
  }
);

// Create the cryptoSlice
const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    cryptos: [],
    cryptoDetails: {},
    loading: false,
    detailsLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For fetching dashboard data
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.cryptos = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cryptocurrency data";
      })
      // For fetching individual crypto details
      .addCase(fetchCryptoDetails.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(fetchCryptoDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.cryptoDetails[action.payload.cryptoId] = action.payload.data;
      })
      .addCase(fetchCryptoDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload || "Failed to fetch cryptocurrency details";
      });
  },
});

export default cryptoSlice.reducer;
